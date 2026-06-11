"use client";
import { useState, useEffect, useRef } from "react";

const CT_LOGO = "data:image/jpeg;base64,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";

const BRAND = {
  navy: "#2D2A43",
  orange: "#FF5A00",
  charcoal: "#333333",
  lightGrey: "#F5F6F7",
  white: "#FFFFFF",
  claims: "#00A3E0",
  ai: "#A100FF",
};

const SYSTEM_PROMPT = `Actúa como un experto senior en transformación digital para aseguradoras, gestión de siniestros, claims intelligence, detección de fraude, inteligencia artificial aplicada al sector asegurador y modernización modular de operaciones.

Tu objetivo es actuar como un agente conversacional de diagnóstico para ayudar a una aseguradora en España a identificar su nivel de madurez en la gestión de siniestros, fraude, eficiencia operativa, automatización, uso de IA y capacidad de modernización modular.

El agente debe estar orientado a generar una conversación útil, consultiva y de alto valor, no a vender directamente. La conversación debe ayudar a detectar problemas reales, prioridades operativas y posibles áreas donde Charles Taylor podría aportar valor.

Contexto de Charles Taylor: Charles Taylor ayuda a aseguradoras a modernizar procesos de claims, fraude y operaciones mediante soluciones tecnológicas, inteligencia aplicada, automatización y servicios especializados. Su enfoque es modular, progresivo y práctico.

El foco debe estar en: AI-driven claims, Claims intelligence, Detección y prevención de fraude, Eficiencia operativa, Gobernanza y auditabilidad, Modernización modular, Mejora de la experiencia de cliente, Reducción de fricción en procesos de siniestros, Identificación de casos de uso concretos de IA.

Adapta el lenguaje según el perfil de la persona que responde. Evita un lenguaje excesivamente técnico salvo que el usuario muestre claramente un perfil tecnológico.

Estructura del diagnóstico en estos bloques:
Bloque 1 — Perfil de la aseguradora: tipo, ramos principales, volumen de siniestros, complejidad, mercados.
Bloque 2 — Situación actual en claims: cómo se reciben, clasifican y gestionan; partes manuales; retrasos; indicadores; visibilidad operativa.
Bloque 3 — Detección de fraude: cómo se detecta; señales o reglas; análisis predictivo o IA; revisión manual; falsos positivos; patrones complejos.
Bloque 4 — Datos e inteligencia operativa: datos disponibles; integración; dashboards; comparativas; decisiones basadas en datos.
Bloque 5 — Automatización e IA: procesos automatizados; casos de uso probados; barreras; áreas de mayor beneficio; gobernanza.
Bloque 6 — Experiencia de cliente y eficiencia: fricciones para el cliente; quejas frecuentes; coste interno; tiempos de resolución.
Bloque 7 — Modernización modular: apertura a mejoras modulares; áreas prioritarias; integración con sistemas actuales; pilotos viables.

Estilo de conversación:
- Tono profesional, claro, directo y consultivo.
- Formula entre 1 y 3 preguntas por bloque.
- Después de cada respuesta del usuario, interpreta brevemente lo que implica y continúa con la siguiente pregunta lógica.
- No suenes como un chatbot genérico. Suena como un consultor experto que entiende el sector asegurador.
- Evita frases demasiado comerciales. Primero diagnostica. Solo al final propone áreas donde Charles Taylor podría aportar valor.

Sistema de scoring al final:
- Nivel 1 Basic: gestión manual, reglas básicas, baja automatización, fraude reactivo.
- Nivel 2 Developing: herramientas definidas pero integración limitada, alta dependencia manual.
- Nivel 3 Advanced: datos, dashboards, automatización parcial, analítica avanzada con margen de mejora.
- Nivel 4 AI-ready: datos estructurados, visión operativa, capacidad de adoptar IA de forma controlada.

Output final con esta estructura: Resumen ejecutivo, Nivel de madurez estimado, Principales fricciones detectadas, Riesgos operativos o de fraude, Oportunidades de mejora, Casos de uso potenciales de IA, Recomendaciones modulares, Próximo paso sugerido.

CTA final: "Con base en este diagnóstico, tendría sentido revisar con más detalle 1 o 2 áreas donde la combinación de inteligencia operativa, IA y modernización modular podría generar impacto real sin necesidad de transformar todo el sistema desde cero. Si lo deseas, puedo ayudarte a convertir este diagnóstico en una agenda de conversación de 15 minutos con Charles Taylor."

Restricciones: No prometas resultados garantizados. No exageres el uso de IA. No hables como vendedor. No uses lenguaje demasiado técnico si el interlocutor no lo requiere. Prioriza siempre el enfoque modular, progresivo y de bajo riesgo operativo.`;

const ROLES = [
  "Director/a de Siniestros",
  "Director/a de Operaciones",
  "Director/a de Transformación",
  "Director/a de Innovación",
  "Director/a de Fraude",
  "CIO / CTO",
  "Director/a de Seguros Generales",
  "Responsable de Claims Excellence",
  "Responsable de Data / Analytics",
  "Otro",
];

const ADMIN_PASSWORD = "ct2024admin";

function formatDate(iso) {
  return new Date(iso).toLocaleDateString("es-ES", {
    day: "2-digit", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function CTLogo({ height = 32 }) {
  return (
    <img
      src={CT_LOGO}
      alt="Charles Taylor"
      style={{ height, width: "auto", display: "block" }}
    />
  );
}

function CTAvatar({ size = 34 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: BRAND.navy, border: "2px solid rgba(255,255,255,0.15)", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: BRAND.orange, fontSize: size * 0.32, fontWeight: 800, letterSpacing: "-0.5px", lineHeight: 1 }}>CT</span>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <div>
      <label style={{ display: "block", fontSize: 11, fontWeight: 600, color: BRAND.charcoal, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </label>
      {children}
      {error && <p style={{ color: "#D0021B", fontSize: 11, marginTop: 4 }}>{error}</p>}
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("start");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId] = useState(() => crypto.randomUUID());
  const [startInfo, setStartInfo] = useState({ name: "", company: "", email: "", role: "" });
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");
  const [sessions, setSessions] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [loadingAdmin, setLoadingAdmin] = useState(false);
  const [startErrors, setStartErrors] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const saveSession = async (msgs) => {
    try {
      const payload = { id: sessionId, timestamp: new Date().toISOString(), startInfo, messages: msgs, messageCount: msgs.length };
      await fetch("/api/sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } catch (e) { console.error("Storage error:", e); }
  };

  const callClaude = async (msgs) => {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: msgs, system: SYSTEM_PROMPT }),
    });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    if (!data.content?.[0]?.text) throw new Error("No response");
    return data.content[0].text;
  };

  const validateStart = () => {
    const errs = {};
    if (!startInfo.name.trim()) errs.name = "Campo obligatorio";
    if (!startInfo.company.trim()) errs.company = "Campo obligatorio";
    if (!startInfo.email.trim()) errs.email = "Campo obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(startInfo.email)) errs.email = "Email no válido";
    if (!startInfo.role) errs.role = "Selecciona tu rol";
    setStartErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const startChat = async () => {
    if (!validateStart()) return;
    setView("chat");
    setLoading(true);
    try {
      const firstMsg = { role: "user", content: `Hola, me llamo ${startInfo.name}, trabajo en ${startInfo.company} como ${startInfo.role}. Estoy aquí para realizar el diagnóstico.` };
      const reply = await callClaude([firstMsg]);
      const initial = [firstMsg, { role: "assistant", content: reply }];
      setMessages(initial);
      await saveSession(initial);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = { role: "user", content: input.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const reply = await callClaude(next);
      const updated = [...next, { role: "assistant", content: reply }];
      setMessages(updated);
      await saveSession(updated);
    } catch (e) { console.error(e); } finally { setLoading(false); }
  };

  const handleKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const loadSessions = async () => {
    setLoadingAdmin(true);
    try {
      const res = await fetch("/api/sessions");
      const data = await res.json();
      setSessions(data.sessions || []);
    } catch (e) { console.error(e); } finally { setLoadingAdmin(false); }
  };

  const handleAdminLogin = () => {
    if (adminPass === ADMIN_PASSWORD) { setAdminError(""); setView("admin"); loadSessions(); }
    else setAdminError("Contraseña incorrecta");
  };

  const exportSessionCSV = (s) => {
    const esc = (v) => `"${String(v ?? "").replace(/"/g, "'")}"`;
    const headers = ["session_id","fecha","empresa","nombre","email","rol","turno","hablante","contenido"];
    const rows = s.messages.map((m, i) => [
      s.id.slice(0, 8), s.timestamp, s.startInfo.company, s.startInfo.name,
      s.startInfo.email || "", s.startInfo.role, i + 1,
      m.role === "user" ? s.startInfo.name : "Agente Charles Taylor",
      m.content,
    ].map(esc).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `diagnostico_${s.startInfo.company.replace(/\s+/g, "_")}_${s.id.slice(0, 6)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  /* shared header */
  const Header = ({ subtitle, right }) => (
    <header style={{ background: BRAND.navy, padding: "14px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ background: BRAND.white, borderRadius: 6, padding: "5px 10px", display: "flex", alignItems: "center" }}>
          <CTLogo height={22} />
        </div>
        {subtitle && (
          <span style={{ borderLeft: `1px solid rgba(255,255,255,0.2)`, paddingLeft: 16, color: "rgba(255,255,255,0.6)", fontSize: 13 }}>
            {subtitle}
          </span>
        )}
      </div>
      {right}
    </header>
  );

  const inputStyle = (hasError) => ({
    width: "100%",
    border: `1px solid ${hasError ? "#D0021B" : "#DEDEDE"}`,
    borderRadius: 6,
    padding: "10px 14px",
    fontSize: 14,
    color: BRAND.charcoal,
    background: BRAND.white,
    outline: "none",
    boxSizing: "border-box",
  });

  /* ─── START ─── */
  if (view === "start") return (
    <div style={{ minHeight: "100vh", background: BRAND.lightGrey, display: "flex", flexDirection: "column" }}>
      <Header
        subtitle="Claims & Fraud Intelligence"
        right={
          <button onClick={() => setView("admin-login")} style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>
            Panel admin →
          </button>
        }
      />

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
        <div style={{ background: BRAND.white, borderRadius: 12, border: "1px solid #E5E5E5", padding: "40px 36px", width: "100%", maxWidth: 440 }}>

          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#FFF0E8", color: BRAND.orange, fontSize: 11, fontWeight: 600, padding: "5px 12px", borderRadius: 20, marginBottom: 16, letterSpacing: "0.04em" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: BRAND.orange }}></span>
              DIAGNÓSTICO DE MADUREZ · 15–20 MIN
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: BRAND.navy, margin: "0 0 8px" }}>Evaluación Claims & Fraude</h1>
            <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, margin: 0 }}>
              Conversación consultiva para identificar el nivel de madurez de tu aseguradora en gestión de siniestros, detección de fraude y uso de IA.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <Field label="Nombre" error={startErrors.name}>
              <input type="text" value={startInfo.name} placeholder="Tu nombre completo"
                onChange={(e) => { setStartInfo((p) => ({ ...p, name: e.target.value })); setStartErrors((p) => ({ ...p, name: "" })); }}
                style={inputStyle(startErrors.name)} />
            </Field>
            <Field label="Compañía" error={startErrors.company}>
              <input type="text" value={startInfo.company} placeholder="Nombre de tu aseguradora"
                onChange={(e) => { setStartInfo((p) => ({ ...p, company: e.target.value })); setStartErrors((p) => ({ ...p, company: "" })); }}
                style={inputStyle(startErrors.company)} />
            </Field>
            <Field label="Email corporativo" error={startErrors.email}>
              <input type="email" value={startInfo.email} placeholder="nombre@aseguradora.com"
                onChange={(e) => { setStartInfo((p) => ({ ...p, email: e.target.value })); setStartErrors((p) => ({ ...p, email: "" })); }}
                style={inputStyle(startErrors.email)} />
            </Field>
            <Field label="Rol" error={startErrors.role}>
              <select value={startInfo.role}
                onChange={(e) => { setStartInfo((p) => ({ ...p, role: e.target.value })); setStartErrors((p) => ({ ...p, role: "" })); }}
                style={{ ...inputStyle(startErrors.role), background: BRAND.white }}>
                <option value="">Selecciona tu rol</option>
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
            </Field>

            <button onClick={startChat}
              style={{ background: BRAND.orange, color: BRAND.white, border: "none", borderRadius: 8, padding: "13px 24px", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4, letterSpacing: "0.02em" }}>
              Iniciar diagnóstico →
            </button>
          </div>

          <p style={{ fontSize: 11, color: "#AAA", textAlign: "center", marginTop: 24, marginBottom: 0 }}>
            Tus respuestas se guardan de forma segura para análisis interno de Charles Taylor.
          </p>
        </div>
      </main>
    </div>
  );

  /* ─── CHAT ─── */
  if (view === "chat") return (
    <div style={{ minHeight: "100vh", background: BRAND.lightGrey, display: "flex", flexDirection: "column" }}>
      <Header
        subtitle="Diagnóstico de Madurez"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22C55E" }}></span>
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: 12 }}>{startInfo.company}</span>
          </div>
        }
      />

      <div style={{ flex: 1, overflowY: "auto", padding: "24px 16px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", flexDirection: "column", gap: 20 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", gap: 12, justifyContent: msg.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-start" }}>
              {msg.role === "assistant" && (
                <div style={{ marginTop: 2 }}><CTAvatar size={34} /></div>
              )}
              <div style={{
                borderRadius: msg.role === "user" ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                padding: "12px 16px", maxWidth: "78%", fontSize: 14, lineHeight: 1.65,
                whiteSpace: "pre-wrap",
                background: msg.role === "user" ? BRAND.navy : BRAND.white,
                color: msg.role === "user" ? BRAND.white : BRAND.charcoal,
                border: msg.role === "user" ? "none" : "1px solid #E8E8E8",
              }}>
                {msg.content}
              </div>
              {msg.role === "user" && (
                <div style={{ width: 34, height: 34, borderRadius: "50%", background: BRAND.orange, color: BRAND.white, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, marginTop: 2 }}>
                  {startInfo.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <CTAvatar size={34} />
              <div style={{ background: BRAND.white, border: "1px solid #E8E8E8", borderRadius: "4px 16px 16px 16px", padding: "12px 18px" }}>
                <div style={{ display: "flex", gap: 5, alignItems: "center", height: 20 }}>
                  {[0, 150, 300].map((d) => (
                    <span key={d} style={{ width: 7, height: 7, borderRadius: "50%", background: "#CBCBCB", display: "inline-block", animation: "bounce 1.2s infinite", animationDelay: `${d}ms` }}></span>
                  ))}
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <style>{`@keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }`}</style>

      <div style={{ borderTop: "1px solid #E5E5E5", background: BRAND.white, padding: "14px 16px 16px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", display: "flex", gap: 10 }}>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey}
            placeholder="Escribe tu respuesta…" rows={2}
            style={{ flex: 1, border: "1px solid #DEDEDE", borderRadius: 8, padding: "10px 14px", fontSize: 14, resize: "none", outline: "none", color: BRAND.charcoal, fontFamily: "inherit" }} />
          <button onClick={sendMessage} disabled={!input.trim() || loading}
            style={{ background: input.trim() && !loading ? BRAND.orange : "#E5E5E5", color: input.trim() && !loading ? BRAND.white : "#AAA", border: "none", borderRadius: 8, padding: "0 20px", fontSize: 14, fontWeight: 700, cursor: input.trim() && !loading ? "pointer" : "not-allowed", transition: "background 0.2s", alignSelf: "flex-end", height: 44 }}>
            Enviar
          </button>
        </div>
        <p style={{ fontSize: 11, color: "#AAA", textAlign: "center", marginTop: 8, marginBottom: 0 }}>Enter para enviar · Shift+Enter para nueva línea</p>
      </div>
    </div>
  );

  /* ─── ADMIN LOGIN ─── */
  if (view === "admin-login") return (
    <div style={{ minHeight: "100vh", background: BRAND.lightGrey, display: "flex", flexDirection: "column" }}>
      <Header />
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
        <div style={{ background: BRAND.white, borderRadius: 12, border: "1px solid #E5E5E5", padding: "36px 32px", width: "100%", maxWidth: 360 }}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ marginBottom: 16 }}>
              <CTLogo height={32} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 700, color: BRAND.navy, margin: "0 0 4px" }}>Panel de administración</h2>
            <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Acceso restringido a Charles Taylor</p>
          </div>
          <input type="password" value={adminPass} placeholder="Contraseña"
            onChange={(e) => { setAdminPass(e.target.value); setAdminError(""); }}
            onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
            style={{ ...inputStyle(!!adminError), marginBottom: 8 }} />
          {adminError && <p style={{ color: "#D0021B", fontSize: 12, marginBottom: 8, marginTop: 0 }}>{adminError}</p>}
          <button onClick={handleAdminLogin}
            style={{ width: "100%", background: BRAND.orange, color: BRAND.white, border: "none", borderRadius: 8, padding: "12px 0", fontSize: 14, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>
            Acceder
          </button>
          <button onClick={() => setView("start")}
            style={{ width: "100%", background: "none", border: "none", color: "#AAA", fontSize: 13, cursor: "pointer", padding: "6px 0" }}>
            ← Volver al inicio
          </button>
        </div>
      </div>
    </div>
  );

  /* ─── ADMIN DASHBOARD ─── */
  if (view === "admin") return (
    <div style={{ minHeight: "100vh", background: BRAND.lightGrey, display: "flex", flexDirection: "column" }}>
      <Header
        subtitle="Panel de administración"
        right={
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{sessions.length} sesión{sessions.length !== 1 ? "es" : ""}</span>
            <button onClick={loadSessions} style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>↻ Actualizar</button>
            <button onClick={() => setView("start")} style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}>← Salir</button>
          </div>
        }
      />

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Session list */}
        <aside style={{ width: 280, flexShrink: 0, borderRight: "1px solid #E5E5E5", background: BRAND.white, overflowY: "auto" }}>
          <div style={{ padding: "14px 16px", borderBottom: "1px solid #F0F0F0" }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: "#AAA", textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>Sesiones guardadas</p>
          </div>
          {loadingAdmin ? (
            <p style={{ padding: 20, color: "#AAA", fontSize: 14 }}>Cargando…</p>
          ) : sessions.length === 0 ? (
            <p style={{ padding: 20, color: "#AAA", fontSize: 14 }}>No hay sesiones todavía.</p>
          ) : sessions.map((s) => (
            <button key={s.id} onClick={() => setSelectedSession(s)}
              style={{ width: "100%", textAlign: "left", padding: "14px 16px", border: "none", borderBottom: "1px solid #F5F5F5", borderLeft: `3px solid ${selectedSession?.id === s.id ? BRAND.orange : "transparent"}`, background: selectedSession?.id === s.id ? "#FFF8F5" : "transparent", cursor: "pointer" }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: BRAND.navy }}>{s.startInfo.company}</div>
              <div style={{ fontSize: 12, color: "#888", marginTop: 2 }}>{s.startInfo.name}</div>
              <div style={{ fontSize: 11, color: BRAND.claims, marginTop: 2 }}>{s.startInfo.email}</div>
              <div style={{ fontSize: 11, color: "#BBB", marginTop: 2 }}>{s.startInfo.role}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontSize: 11, color: "#BBB" }}>{formatDate(s.timestamp)}</span>
                <span style={{ fontSize: 11, background: "#FFF0E8", color: BRAND.orange, padding: "2px 8px", borderRadius: 10, fontWeight: 600 }}>
                  {Math.floor(s.messageCount / 2)} int.
                </span>
              </div>
            </button>
          ))}
        </aside>

        {/* Session detail */}
        <main style={{ flex: 1, overflowY: "auto", padding: 24 }}>
          {!selectedSession ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60%", color: "#CCC" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "#F0F0F0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12 }}>📋</div>
              <p style={{ fontSize: 14, margin: 0 }}>Selecciona una sesión para ver el diagnóstico</p>
            </div>
          ) : (
            <div style={{ maxWidth: 760 }}>
              <div style={{ background: BRAND.white, borderRadius: 12, border: "1px solid #E5E5E5", overflow: "hidden" }}>
                <div style={{ padding: "20px 24px", borderBottom: "1px solid #F0F0F0", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                  <div>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: BRAND.navy, margin: "0 0 4px" }}>{selectedSession.startInfo.company}</h2>
                    <p style={{ fontSize: 13, color: "#888", margin: "0 0 2px" }}>{selectedSession.startInfo.name} · {selectedSession.startInfo.role}</p>
                    <p style={{ fontSize: 12, color: BRAND.claims, margin: "0 0 2px" }}>{selectedSession.startInfo.email}</p>
                    <p style={{ fontSize: 12, color: "#BBB", margin: 0 }}>{formatDate(selectedSession.timestamp)}</p>
                  </div>
                  <button onClick={() => exportSessionCSV(selectedSession)}
                    style={{ display: "flex", alignItems: "center", gap: 6, background: BRAND.lightGrey, color: BRAND.charcoal, border: "1px solid #E5E5E5", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", flexShrink: 0 }}>
                    ↓ Exportar CSV
                  </button>
                </div>

                <div style={{ maxHeight: "68vh", overflowY: "auto" }}>
                  {selectedSession.messages.map((msg, i) => (
                    <div key={i} style={{ padding: "18px 24px", borderBottom: "1px solid #F8F8F8", background: msg.role === "assistant" ? "#FAFBFF" : BRAND.white }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                        <div style={{ width: 22, height: 22, borderRadius: "50%", background: msg.role === "assistant" ? BRAND.navy : BRAND.orange, color: BRAND.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 800, flexShrink: 0 }}>
                          {msg.role === "assistant" ? <span style={{ color: BRAND.orange, fontSize: 7, fontWeight: 800 }}>CT</span> : selectedSession.startInfo.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#AAA", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                          {msg.role === "assistant" ? "Agente Charles Taylor" : selectedSession.startInfo.name}
                        </span>
                        {msg.role === "assistant" && i < 4 && (
                          <span style={{ fontSize: 10, background: "#F0FAFF", color: BRAND.claims, padding: "2px 8px", borderRadius: 10, fontWeight: 600, marginLeft: 4 }}>claims</span>
                        )}
                      </div>
                      <p style={{ fontSize: 13, color: BRAND.charcoal, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0 }}>{msg.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );

  return null;
}
