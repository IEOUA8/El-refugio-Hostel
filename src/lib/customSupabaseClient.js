import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btawegolhzbuztkaswaj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0YXdlZ29saHpidXp0a2Fzd2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNzYyODIsImV4cCI6MjA3OTY1MjI4Mn0.G8CuTuIycDjV87NOTvmJEq7TTnTIMFjIy4-WMAFHQ10';

const customSupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

export default customSupabaseClient;

export { 
    customSupabaseClient,
    customSupabaseClient as supabase,
};
