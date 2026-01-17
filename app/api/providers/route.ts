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
    const limit = parseInt(searchParams.get('limit') || '100');

    // Fetch healthcare providers with their profile information
    const { data, error } = await supabase
      .from('healthcare_providers')
      .select(
        `
        id,
        user_id,
        license_number,
        specialty,
        profiles:user_id (
          full_name,
          email
        )
      `
      )
      .limit(limit);

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Format the response to make it easier to use
    const formattedData = data?.map((provider) => ({
      id: provider.id,
      user_id: provider.user_id,
      license_number: provider.license_number,
      specialty: provider.specialty,
      full_name: provider.profiles?.full_name || 'Unknown',
      email: provider.profiles?.email || '',
    }));

    return NextResponse.json({ data: formattedData || [] });
  } catch (error: any) {
    console.error('API error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}