import { useState } from "react";

const CATEGORIAS = [
  { id: "tecnica", label: "Técnica", desc: "Processo, domínio, resultado do trabalho" },
  { id: "mentalidade", label: "Mentalidade", desc: "Crenças e perspectivas sobre cuidado" },
  { id: "dor", label: "Dor", desc: "Medos reais antes de contratar" },
  { id: "emocional", label: "Emocional", desc: "Sentimentos, memórias, momentos" },
  { id: "fisico", label: "Físico", desc: "Resultado visual, aparência, fotos" },
  { id: "resultado", label: "Resultado", desc: "Antes e depois, transformação real" },
];

const FUNIS = [
  { id: "topo", label: "Topo", desc: "Atrair pessoas novas" },
  { id: "meio", label: "Meio", desc: "Aprofundar autoridade" },
  { id: "fundo", label: "Fundo", desc: "Converter e fechar" },
];

const FORMATOS = [
  { key: "reels", label: "Reels" },
  { key: "carrossel", label: "Carrossel" },
  { key: "stories", label: "Stories" },
];

function buildPrompt(categoria, funil) {
  const principio = `
PRINCÍPIO CENTRAL:
Um gancho poderoso não informa. Ele reconhece.
A pessoa lê e pensa: "é exatamente isso. Como ela sabia?"
Aí ela salva pra não perder, manda pra amiga que está passando pelo mesmo, ou comenta porque precisa falar sobre aquilo.
O gancho não explica o problema. Ele nomeia o que a pessoa já sentia mas nunca tinha ouvido dito assim.
Quanto mais específica a verdade nomeada, mais forte a identificação. Genérico não salva. Específico e verdadeiro, salva.
Antes de aprovar cada gancho, responda internamente:
1. A pessoa leria isso e sentiria que foi escrito pra ela?
2. Ela mandaria pra uma amiga que está passando pelo mesmo?
3. Ela sentiria vontade de comentar ou contar sua própria história?
Se não passar nas três, reescreve.`;

  const catMap = {
    tecnica: `CATEGORIA — TÉCNICA:
Nomeia o que a noiva ou cliente sente quando a maquiagem é feita por alguém que realmente sabe o que faz, ou o que ela sente quando não foi. Não ensina técnica pra ela. Fala sobre a diferença que ela percebe, a segurança que sente, o que aparece ou desaparece nas fotos. O que a preparação de pele certa faz que ela nunca viu explicado antes. Por que maquiagem de noiva não é maquiagem de festa com véu.`,
    mentalidade: `CATEGORIA — MENTALIDADE:
Toca em crenças que a noiva carrega sobre investir em si mesma. A culpa de gastar com algo que parece supérfluo. A pressão pra cortar maquiagem do orçamento. A sensação de que cuidar de si é exagero. Não diga "você merece" como frase solta. Mostre a crença errada com uma verdade que ela reconhece da própria vida.`,
    dor: `CATEGORIA — DOR:
Nomeia medos reais e específicos: não se reconhecer nas fotos, se arrepender no dia que não tem como refazer, ter escolhido pelo preço e pago de outro jeito. A memória de alguém que passou por isso. A ansiedade de não saber como avaliar qualidade antes de contratar. Quanto mais específico o medo nomeado, mais forte a identificação.`,
    emocional: `CATEGORIA — EMOCIONAL:
Conecta com o peso emocional do momento, não com o resultado visual. O que significa se olhar e se reconhecer no dia mais importante. O que fica pra sempre nas fotos. A diferença entre se sentir arrumada e se sentir ela mesma, numa versão que ela vai querer lembrar. Fala do sentimento, não da aparência.`,
    fisico: `CATEGORIA — FÍSICO:
Nomeia o resultado concreto e visível de forma que a pessoa reconhece sem precisar ser convencida. O que o flash faz com pele sem preparo. A maquiagem que some nas fotos externas. O que acontece nos olhos depois de horas de emoção. O que ela vê nas fotos de quem fez certo versus quem economizou. Tangível, específico.`,
    resultado: `CATEGORIA — RESULTADO:
Nomeia a diferença real entre contratar bem e contratar mal, de um jeito que ela já viu acontecer com alguém próximo ou já imaginou acontecer com ela. Não promessa de transformação. Verdade sobre o que fica quando a escolha foi certa, e o que fica quando não foi.`,
  };

  const funilMap = {
    topo: `ETAPA — TOPO:
Pra alguém que nunca ouviu falar dessa maquiadora. Não menciona serviço, preço ou agenda. Forte o suficiente pra ser salvo ou mandado pra uma amiga que está planejando casamento. Funciona como uma verdade que as pessoas compartilham porque parece escrita pra elas.`,
    meio: `ETAPA — MEIO:
A pessoa já segue mas ainda não decidiu. Aprofunda confiança mostrando que essa profissional enxerga o que outras não veem. Mais específico. Gera comentários do tipo "nunca tinha pensado assim" ou "isso aconteceu exatamente comigo".`,
    fundo: `ETAPA — FUNDO:
A pessoa está quase decidindo. Nomeia a dúvida que está travando a decisão ou a consequência de adiar. Pode ser mais direto sobre o que ela perde se esperar ou escolhe pelo preço. Gera comentários de quem já passou por isso ou quer saber mais.`,
  };

  return `Você cria ganchos de Instagram para maquiadoras profissionais que atendem noivas e clientes de maquiagem geral.

QUEM VAI LER: noivas buscando maquiadora para o casamento, e mulheres buscando maquiagem profissional para eventos, ensaios ou ocasiões especiais.

${principio}

${catMap[categoria]}

${funilMap[funil]}

REGRAS DE VOZ:
- Direto, firme, quente. Como alguém que sabe o que a mulher sente antes de ela nomear.
- Frase curta. Sem enrolação. O gancho precisa funcionar sozinho, sem contexto.
- Proibido: "mergulhar", "jornada", "potencial", "empoderar", "você merece" como frase solta, "dia dos seus sonhos", "você vai arrasar", "incrível", travessão como recurso estilístico, adjetivos vazios, qualquer frase motivacional genérica.
- Prefira verdades específicas que geram identificação imediata.
- Evite começar com "Você". Varie as aberturas.
- Nunca genérico. Se pode valer pra qualquer nicho, reescreve até ser específico pra esse.

FORMATOS:
REELS: frase dos primeiros 3 segundos. Afirmação que confronta, verdade que ela nunca ouviu dita assim, ou pergunta que toca num ponto que ela não quer responder.
CARROSSEL: texto do primeiro slide. Início de uma verdade que ela precisa completar. Faz ela arrastar porque ficou curiosa ou se identificou demais.
STORIES: direto, pessoal, como uma conversa com uma amiga. Pode ter ironia leve. Mais curto que os outros.

Gere 5 ganchos por formato. Cada um precisa passar pelo teste dos três — salvar, compartilhar, comentar.

Retorne APENAS JSON válido sem texto antes ou depois, sem blocos de código markdown:
{"reels":["gancho1","gancho2","gancho3","gancho4","gancho5"],"carrossel":["gancho1","gancho2","gancho3","gancho4","gancho5"],"stories":["gancho1","gancho2","gancho3","gancho4","gancho5"]}`;
}

export default function App() {
  const [categoria, setCategoria] = useState(null);
  const [funil, setFunil] = useState(null);
  const [hooks, setHooks] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(null);

  const canGenerate = categoria && funil;

  const generate = async () => {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);
    setHooks(null);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1400,
          system: buildPrompt(categoria, funil),
          messages: [{ role: "user", content: "Gere os ganchos agora." }],
        }),
      });
      const data = await res.json();
      const text = (data.content || []).map((b) => b.text || "").join("");
      const clean = text.replace(/```json/g, "").replace(/```/g, "").trim();
      setHooks(JSON.parse(clean));
    } catch (e) {
      setError("Não foi possível gerar. Tente novamente.");
    }
    setLoading(false);
  };

  const copyText = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const formatColor = {
    reels: { bg: "#FEF2F2", text: "#991B1B", border: "#FECACA" },
    carrossel: { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
    stories: { bg: "#F0FDF4", text: "#166534", border: "#BBF7D0" },
  };

  const funilColor = {
    topo: { active: "#ECFDF5", text: "#065F46", border: "#6EE7B7" },
    meio: { active: "#FFF7ED", text: "#92400E", border: "#FCD34D" },
    fundo: { active: "#FDF4FF", text: "#6B21A8", border: "#E879F9" },
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f9f9f9",
      display: "flex",
      justifyContent: "center",
      padding: "2rem 1.25rem",
    }}>
      <div style={{ width: "100%", maxWidth: 680 }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem", borderBottom: "0.5px solid #e8e8e8", paddingBottom: "1.25rem" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.18em", color: "#bbb", textTransform: "uppercase", margin: "0 0 6px" }}>
            Lá Noiva Pro · Ferramenta de conteúdo
          </p>
          <h1 style={{ fontSize: 24, fontWeight: 400, color: "#1a1a1a", margin: "0 0 6px", letterSpacing: "-0.3px", fontFamily: "Georgia, serif" }}>
            Gerador de ganchos
          </h1>
          <p style={{ fontSize: 13, color: "#999", margin: 0, lineHeight: 1.6 }}>
            Ganchos que fazem salvar, compartilhar e comentar. Escolha a categoria e a etapa do funil.
          </p>
        </div>

        {/* Categoria */}
        <div style={{ marginBottom: "1.75rem" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#bbb", textTransform: "uppercase", margin: "0 0 12px" }}>
            Categoria
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {CATEGORIAS.map((cat) => {
              const active = categoria === cat.id;
              return (
                <button key={cat.id} onClick={() => setCategoria(cat.id)} style={{
                  padding: "10px 12px",
                  border: active ? "1px solid #1a1a1a" : "0.5px solid #e8e8e8",
                  borderRadius: 8,
                  background: active ? "#1a1a1a" : "#fff",
                  color: active ? "#fff" : "#555",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{cat.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.65, lineHeight: 1.4 }}>{cat.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Funil */}
        <div style={{ marginBottom: "2rem" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.1em", color: "#bbb", textTransform: "uppercase", margin: "0 0 12px" }}>
            Etapa do funil
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
            {FUNIS.map((f) => {
              const active = funil === f.id;
              const c = funilColor[f.id];
              return (
                <button key={f.id} onClick={() => setFunil(f.id)} style={{
                  padding: "10px 12px",
                  border: active ? `1px solid ${c.border}` : "0.5px solid #e8e8e8",
                  borderRadius: 8,
                  background: active ? c.active : "#fff",
                  color: active ? c.text : "#666",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s",
                }}>
                  <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 11, opacity: 0.8 }}>{f.desc}</div>
                </button>
              );
            })}
          </div>
        </div>

        {canGenerate && !loading && (
          <p style={{ fontSize: 12, color: "#bbb", marginBottom: "0.75rem" }}>
            {CATEGORIAS.find(c => c.id === categoria)?.label} · {FUNIS.find(f => f.id === funil)?.label} de funil
          </p>
        )}

        {/* Botão */}
        <button onClick={generate} disabled={!canGenerate || loading} style={{
          padding: "11px 28px",
          fontSize: 14,
          fontWeight: 500,
          background: canGenerate && !loading ? "#1a1a1a" : "#f0f0f0",
          color: canGenerate && !loading ? "#fff" : "#ccc",
          border: "none",
          borderRadius: 8,
          cursor: canGenerate && !loading ? "pointer" : "not-allowed",
          marginBottom: "2rem",
          transition: "all 0.15s",
        }}>
          {loading ? "Gerando..." : "Gerar ganchos"}
        </button>

        {error && <p style={{ fontSize: 13, color: "#991B1B", marginBottom: "1rem" }}>{error}</p>}

        {!hooks && !loading && (
          <div style={{ border: "0.5px dashed #e8e8e8", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#ccc", margin: 0 }}>Escolha a categoria e a etapa do funil para gerar.</p>
          </div>
        )}

        {loading && (
          <div style={{ border: "0.5px solid #f5f5f5", borderRadius: 12, padding: "2.5rem", textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "#bbb", margin: 0 }}>Criando ganchos para o seu perfil...</p>
          </div>
        )}

        {/* Resultado */}
        {hooks && (
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {FORMATOS.map((fmt) => {
              const c = formatColor[fmt.key];
              const items = hooks[fmt.key] || [];
              return (
                <div key={fmt.key}>
                  <div style={{ marginBottom: 12 }}>
                    <span style={{
                      fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 6,
                      background: c.bg, color: c.text, border: `0.5px solid ${c.border}`,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                    }}>
                      {fmt.label}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {items.map((hook, i) => {
                      const id = `${fmt.key}-${i}`;
                      const isCopied = copied === id;
                      return (
                        <div key={id} style={{
                          background: "#fff", border: "0.5px solid #ebebeb",
                          borderRadius: 10, padding: "14px 16px",
                          display: "flex", alignItems: "flex-start", gap: 12,
                        }}>
                          <span style={{ fontSize: 11, color: "#ddd", fontWeight: 500, minWidth: 14, paddingTop: 3, flexShrink: 0 }}>
                            {i + 1}
                          </span>
                          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.7, color: "#1a1a1a", flex: 1, fontFamily: "Georgia, serif" }}>
                            {hook}
                          </p>
                          <button onClick={() => copyText(hook, id)} style={{
                            fontSize: 11, padding: "4px 10px", flexShrink: 0,
                            background: "transparent",
                            border: `0.5px solid ${isCopied ? "#6EE7B7" : "#e0e0e0"}`,
                            borderRadius: 6, cursor: "pointer",
                            color: isCopied ? "#065F46" : "#bbb",
                            transition: "all 0.2s",
                          }}>
                            {isCopied ? "Copiado" : "Copiar"}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            <button onClick={generate} style={{
              padding: "10px 20px", fontSize: 13, background: "transparent",
              border: "0.5px solid #e0e0e0", borderRadius: 8,
              cursor: "pointer", color: "#999", alignSelf: "flex-start",
            }}>
              Gerar novos ganchos ↗
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
