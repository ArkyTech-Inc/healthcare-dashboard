import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const patientId = searchParams.get('patient_id');
    const recordType = searchParams.get('record_type');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('medical_records')
      .select(
        `
        *,
        patient:patients(first_name, last_name, mrn),
        provider:healthcare_providers(user_id, profiles:user_id(full_name))
      `,
        { count: 'exact' }
      )
      .order('record_date', { ascending: false })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (patientId) {
      query = query.eq('patient_id', patientId);
    }

    if (recordType) {
      query = query.eq('record_type', recordType);
    }

    const { data, error, count } = await query;

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data, count });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    // Build vital signs object
    const vitalSigns: any = {};
    if (body.vital_signs_bp) vitalSigns.blood_pressure = body.vital_signs_bp;
    if (body.vital_signs_hr) vitalSigns.heart_rate = parseFloat(body.vital_signs_hr);
    if (body.vital_signs_temp) vitalSigns.temperature = parseFloat(body.vital_signs_temp);
    if (body.vital_signs_rr) vitalSigns.respiratory_rate = parseFloat(body.vital_signs_rr);
    if (body.vital_signs_spo2) vitalSigns.oxygen_saturation = parseFloat(body.vital_signs_spo2);
    if (body.vital_signs_weight) vitalSigns.weight = parseFloat(body.vital_signs_weight);
    if (body.vital_signs_height) vitalSigns.height = parseFloat(body.vital_signs_height);

    const recordData = {
      patient_id: body.patient_id,
      provider_id: body.provider_id,
      record_type: body.record_type,
      record_date: body.record_date,
      record_time: body.record_time || null,
      status: body.status || 'completed',
      chief_complaint: body.chief_complaint || null,
      present_illness: body.present_illness || null,
      physical_examination: body.physical_examination || null,
      diagnosis: body.diagnosis,
      diagnosis_codes: body.diagnosis_codes
        ? body.diagnosis_codes.split(',').map((s: string) => s.trim())
        : [],
      treatment_plan: body.treatment_plan || null,
      vital_signs: Object.keys(vitalSigns).length > 0 ? vitalSigns : null,
      follow_up_required: body.follow_up_required || false,
      follow_up_date: body.follow_up_date || null,
      follow_up_notes: body.follow_up_notes || null,
      is_confidential: body.is_confidential || false,
      notes: body.notes || null,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from('medical_records')
      .insert([recordData])
      .select()
      .single();

    if (error) {
      console.error('Insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}