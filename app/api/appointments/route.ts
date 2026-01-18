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
    const providerId = searchParams.get('provider_id');
    const status = searchParams.get('status');
    const date = searchParams.get('date');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let query = supabase
      .from('appointments')
      .select(
        `
        *,
        patient:patients(first_name, last_name, mrn, phone),
        provider:healthcare_providers(id, profiles:user_id(full_name), specialty)
      `,
        { count: 'exact' }
      )
      .order('appointment_date', { ascending: true })
      .order('appointment_time', { ascending: true })
      .range(offset, offset + limit - 1);

    if (patientId) query = query.eq('patient_id', patientId);
    if (providerId) query = query.eq('provider_id', providerId);
    if (status) query = query.eq('status', status);
    if (date) query = query.eq('appointment_date', date);

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

    const appointmentData = {
      patient_id: body.patient_id,
      provider_id: body.provider_id,
      appointment_date: body.appointment_date,
      appointment_time: body.appointment_time,
      duration_minutes: parseInt(body.duration_minutes) || 30,
      appointment_type: body.appointment_type,
      status: body.status || 'scheduled',
      reason: body.reason || null,
      notes: body.notes || null,
      created_by: user.id,
    };

    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
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