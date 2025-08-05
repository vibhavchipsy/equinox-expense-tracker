// lib/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
// const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabaseUrl = 'https://dxvbrfzqbvlsnwtiaxrc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR4dmJyZnpxYnZsc253dGlheHJjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyOTg4ODMsImV4cCI6MjA2OTg3NDg4M30.kOpbDP4yQ99rxJ_0Vq1KR67jVOuPUjNfsrGjbLNbVYQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);