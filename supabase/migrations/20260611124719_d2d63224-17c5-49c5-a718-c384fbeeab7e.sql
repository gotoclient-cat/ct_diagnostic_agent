CREATE POLICY "Backend service manages claim diagnostics"
ON public.claim_diagnostics
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);