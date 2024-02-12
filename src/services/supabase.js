
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://bnwsnesurxdxgykgtjdx.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJud3NuZXN1cnhkeGd5a2d0amR4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NzM3MDksImV4cCI6MjAyMzE0OTcwOX0.73kx-9IloE7QZ6QWIQnUEJbGkQSRemOxbp3GlJImNjI";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;