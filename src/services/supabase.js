import { createClient } from '@supabase/supabase-js';
export const supabaseUrl = 'https://ijzofhphoesxidtgsapb.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlqem9maHBob2VzeGlkdGdzYXBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxODY5NDksImV4cCI6MjAyMTc2Mjk0OX0.g4hB6gmw06bIkLR9_z2_lYGxpkVdkbaCqcsljeWH00g';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
