import { createClient } from '@supabase/supabase-js';

function getSupabase() {
  return createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
  );
}

export async function POST(request) {
  try {
    const session = await request.json();
    const supabase = getSupabase();
    const { error } = await supabase.from('sessions').upsert({
      id: session.id,
      timestamp: session.timestamp,
      name: session.startInfo.name,
      company: session.startInfo.company,
      email: session.startInfo.email,
      role: session.startInfo.role,
      messages: session.messages,
      message_count: session.messageCount,
    });
    if (error) throw error;
    return Response.json({ success: true });
  } catch (error) {
    console.error('Sessions POST error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('sessions')
      .select('*')
      .order('timestamp', { ascending: false });
    if (error) throw error;
    const sessions = (data || []).map(s => ({
      id: s.id,
      timestamp: s.timestamp,
      messageCount: s.message_count,
      startInfo: {
        name: s.name,
        company: s.company,
        email: s.email,
        role: s.role,
      },
      messages: s.messages || [],
    }));
    return Response.json({ sessions });
  } catch (error) {
    console.error('Sessions GET error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
