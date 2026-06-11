import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().min(1).max(160),
  email: z.string().trim().email().max(254),
  role: z.string().trim().min(1).max(120),
});

const TokenSchema = z.object({
  id: z.string().uuid(),
  visitorToken: z.string().uuid(),
});

export const createDiagnostic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => ProfileSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("claim_diagnostics")
      .insert(data)
      .select("id, visitor_token")
      .single();
    if (error || !row) throw new Error("No se pudo iniciar el diagnóstico.");
    return { id: row.id, visitorToken: row.visitor_token };
  });

export const loadDiagnostic = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => TokenSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("claim_diagnostics")
      .select("name, company, email, role, messages")
      .eq("id", data.id)
      .eq("visitor_token", data.visitorToken)
      .maybeSingle();
    if (error) throw new Error("No se pudo recuperar el diagnóstico.");
    return row;
  });