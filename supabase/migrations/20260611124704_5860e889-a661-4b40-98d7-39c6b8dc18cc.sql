CREATE TABLE public.claim_diagnostics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  visitor_token UUID NOT NULL UNIQUE DEFAULT gen_random_uuid(),
  name TEXT NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  company TEXT NOT NULL CHECK (char_length(company) BETWEEN 1 AND 160),
  email TEXT NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254),
  role TEXT NOT NULL CHECK (char_length(role) BETWEEN 1 AND 120),
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  messages JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.claim_diagnostics TO service_role;

ALTER TABLE public.claim_diagnostics ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_claim_diagnostics_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_claim_diagnostics_updated_at
BEFORE UPDATE ON public.claim_diagnostics
FOR EACH ROW
EXECUTE FUNCTION public.set_claim_diagnostics_updated_at();