import { createClient } from '@/lib/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data, error } = await supabase
      .from('medical_records')
      .select(
        `
        *,
        patient:patients(first_name, last_name, mrn, date_of_birth),
        provider:healthcare_providers(user_id, profiles:user_id(full_name))
      `
      )
      .eq('id', params.id)
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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
    };

    const { data, error } = await supabase
      .from('medical_records')
      .update(recordData)
      .eq('id', params.id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Hard delete for medical records (or implement soft delete if preferred)
    const { error } = await supabase
      .from('medical_records')
      .delete()
      .eq('id', params.id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
