-- Fix security vulnerability: Restrict profile visibility to own profile only
-- Drop the overly permissive policy that allows viewing all profiles
DROP POLICY "Users can view all profiles" ON public.profiles;

-- Create a secure policy that only allows users to view their own profile
CREATE POLICY "Users can view own profile only" 
ON public.profiles 
FOR SELECT 
USING (auth.uid() = user_id);