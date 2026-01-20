"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Bolt,
  Compass,
  Goal,
  LineChart,
  Search,
  Sparkles,
  Trophy,
} from "lucide-react";

type AnalysisResult = {
  score: number;
  difficulty: "Alta" | "Media" | "Baja";
  quickWins: string[];
  roadmap: { title: string; items: string[] }[];
  projections: { label: string; value: string; description: string }[];
};

const featurePillars = [
  {
    title: "Auditoría Técnica 360°",
    description:
      "Rastreo automático que detecta problemas de velocidad, estructura y core web vitals antes de que afecten tu ranking.",
    icon: <Compass className="h-6 w-6" />,
  },
  {
    title: "Optimización Semántica",
    description:
      "Procesamos la intención de búsqueda de tus keywords y proponemos outline, FAQs y entidades para dominar los rich results.",
    icon: <Search className="h-6 w-6" />,
  },
  {
    title: "Growth Sprints Automatizados",
    description:
      "Genera briefs, titles y CTAs alineados a tu tono de marca en cuestión de segundos, listos para pasar a tu CMS.",
    icon: <Bolt className="h-6 w-6" />,
  },
  {
    title: "Inteligencia Competitiva",
    description:
      "Monitoreo continuo de backlinks, share of voice y gaps por cluster para adelantarte a la competencia.",
    icon: <BarChart3 className="h-6 w-6" />,
  },
];

const playbooks = [
  {
    title: "Día 1 · Auditoría instantánea",
    summary:
      "Conecta tu dominio y detecta 37 puntos críticos de performance, crawleo y arquitectura.",
    bullet: "Prioriza quick wins listos para implementar sin equipo adicional.",
  },
  {
    title: "Semana 1 · Contenido que escala",
    summary:
      "Genera roadmaps temáticos con entidades SEO, esquema y briefs listos para tu equipo editorial.",
    bullet: "Automatiza la calendarización en Google Sheets o Notion.",
  },
  {
    title: "Mes 1 · Autoridad y conversiones",
    summary:
      "Activa campañas de link building smart y optimiza conversiones con experimentos A/B integrados.",
    bullet: "Reportes ejecutivos con métricas de negocio listos para stakeholders.",
  },
];

const faqs = [
  {
    question: "¿En cuánto tiempo veré resultados?",
    answer:
      "El 80% de los equipos detectan mejoras en tráfico orgánico en los primeros 45 días gracias a la priorización de quick wins y sprints de contenido.",
  },
  {
    question: "¿Necesito un equipo técnico grande?",
    answer:
      "No. El agente sugiere tareas agrupadas por impacto y complejidad, con instrucciones listas para marketing, producto o ingeniería.",
  },
  {
    question: "¿Se integra con mis herramientas actuales?",
    answer:
      "Ofrecemos integraciones con Google Search Console, Analytics, Ahrefs y Webflow / Wordpress mediante API o Webhooks.",
  },
];

type AnalyzeInput = {
  domain: string;
  keywords: string;
  competitor: string;
  audience: string;
};

function analyzeSeo({ domain, keywords, competitor, audience }: AnalyzeInput): AnalysisResult {
  const keywordList = keywords
    .split(",")
    .map((kw) => kw.trim())
    .filter(Boolean);

  const domainLength = domain.replace(/^https?:\/\//, "").length;
  const competitorSimilarity = competitor && domain ? similarityScore(domain, competitor) : 0.2;
  const audienceFocus = audience.length > 40 ? 0.12 : 0.06;

  let score = 52;
  score += Math.min(18, keywordList.length * 4.5);
  score += domainLength < 18 ? 9 : domainLength < 28 ? 4 : -5;
  score += competitorSimilarity < 0.35 ? 8 : competitorSimilarity < 0.55 ? 3 : -4;
  score += audienceFocus * 100;
  score = Math.max(18, Math.min(98, Math.round(score)));

  const difficulty = score > 78 ? "Baja" : score > 62 ? "Media" : "Alta";

  const quickWins = [
    keywordList.length < 3
      ? "Amplía tu set de keywords long tail para capturar intención transaccional."
      : "Prioriza las keywords de intención media con contenido clúster para subir CTR.",
    domainLength > 32
      ? "Optimiza la arquitectura de URLs para acortar slugs y mejorar el crawling."
      : "Refuerza enlaces internos hacia páginas de negocio con anchor semántico.",
    competitorSimilarity > 0.6
      ? "Diferencia tu propuesta de valor en meta titles para desplazar al competidor directo."
      : "Detecta los gaps de contenido respecto a tu competidor y crea comparativas dedicadas.",
  ];

  const roadmap = [
    {
      title: "Sprint técnico",
      items: [
        "Optimiza Core Web Vitals mejorando LCP bajo 2.5s en tus landings prioritarias.",
        "Implementa datos estructurados FAQ + Producto donde aplique.",
        "Reestructura los enlaces internos siguiendo un modelo hub & spoke.",
      ],
    },
    {
      title: "Sprint de contenido",
      items: [
        `Crea ${Math.max(3, keywordList.length)} briefs optimizados con entidades E-E-A-T.`,
        "Incluye comparativas y tablas dinámicas para mejorar dwell time.",
        "Activa un workflow de actualización para los artículos top 10 históricos.",
      ],
    },
    {
      title: "Sprint de autoridad",
      items: [
        "Detecta oportunidades de backlinks en dominios con DR > 55 alineados al buyer persona.",
        "Lanza colaboraciones de guest posts y podcasts con CTAs medibles.",
        "Monitorea menciones de marca y responde con propuestas de enlace contextual.",
      ],
    },
  ];

  const projections = [
    {
      label: "Tráfico orgánico",
      value: `${Math.round(score * 180)} visitas / mes`,
      description: "Proyección conservadora con optimización on-page sostenida.",
    },
    {
      label: "Keywords top 3",
      value: `${Math.max(4, Math.round(keywordList.length * 1.6))} objetivos`,
      description: "Prioridad en términos con intención transaccional media-alta.",
    },
    {
      label: "ROI estimado",
      value: `${(score * 1.6).toFixed(0)}%`,
      description: "Ahorro frente a campañas paid al mantener CPL saludable.",
    },
  ];

  return { score, difficulty, quickWins, roadmap, projections };
}

function similarityScore(source: string, target: string) {
  const clean = (value: string) => value.replace(/^https?:\/\//, "").replace(/www\./, "").split("/")[0];
  const a = clean(source);
  const b = clean(target);
  const maxLength = Math.max(a.length, b.length);
  if (!maxLength) return 0;
  let matches = 0;
  for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
    if (a[i] === b[i]) matches += 1;
  }
  return matches / maxLength;
}

export default function HomePage() {
  const [domain, setDomain] = useState("midominio.com");
  const [keywords, setKeywords] = useState("seo b2b, marketing digital, agencia inbound");
  const [competitor, setCompetitor] = useState("competidor-top.com");
  const [audience, setAudience] = useState(
    "CMOs de empresas SaaS en LatAm que buscan generar pipeline sin escalar paid ads",
  );
  const [submitted, setSubmitted] = useState(false);

  const result = useMemo(() => {
    if (!submitted) return null;
    return analyzeSeo({ domain, keywords, competitor, audience });
  }, [submitted, domain, keywords, competitor, audience]);

  const handleAnalyze = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  const personaKeywords = useMemo(
    () =>
      keywords
        .split(",")
        .map((kw) => kw.trim())
        .filter(Boolean),
    [keywords],
  );

  return (
    <div className="bg-slate-950 text-slate-50">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.24),_transparent_55%)]" />
        <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-12 px-6 pb-20 pt-28 md:px-12">
          <div className="flex flex-col gap-6 md:max-w-3xl">
            <span className="inline-flex items-center gap-2 self-start rounded-full border border-slate-700/60 bg-slate-900/40 px-3 py-1 text-sm font-medium text-cyan-300/90">
              <Sparkles className="h-4 w-4" /> Agente SEO Rank 1
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-slate-50 md:text-6xl">
              Lanza un agente SEO que escala tráfico orgánico y lidera tu categoría.
            </h1>
            <p className="text-lg text-slate-300 md:text-xl">
              Automatiza auditorías, contenidos y autoridad en un solo panel. Diseñado para equipos de growth que quieren resultados medibles en 30 días sin depender de campañas pagadas.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="submit"
                form="analysis-form"
                className="inline-flex items-center gap-2 rounded-full bg-cyan-400 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-cyan-300"
              >
                Auditar ahora
                <ArrowRight className="h-4 w-4" />
              </button>
              <Link
                href="#playbook"
                className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-6 py-3 text-base font-semibold text-slate-200 transition hover:border-cyan-400/90 hover:text-cyan-200"
              >
                Ver playbook
                <LineChart className="h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4 text-cyan-300" />
                12M visitas impulsadas para clientes en 2023
              </div>
              <div className="flex items-center gap-2">
                <Goal className="h-4 w-4 text-cyan-300" />
                4.8x retorno medio frente a medios pagados
              </div>
            </div>
          </div>

          <form
            id="analysis-form"
            onSubmit={handleAnalyze}
            className="grid gap-6 rounded-3xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl shadow-cyan-500/5 backdrop-blur md:grid-cols-2"
          >
            <div className="md:col-span-2">
              <h2 className="text-xl font-semibold text-slate-100">
                Configura tu agente SEO personalizado
              </h2>
              <p className="text-sm text-slate-400">
                Completa tu contexto y descubre quick wins, roadmap priorizado y proyecciones.
              </p>
            </div>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-300">Dominio principal</span>
              <input
                value={domain}
                onChange={(event) => setDomain(event.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                placeholder="tusitio.com"
                required
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-300">Competidor directo</span>
              <input
                value={competitor}
                onChange={(event) => setCompetitor(event.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                placeholder="competidor.com"
              />
            </label>

            <label className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-300">Keywords objetivo</span>
              <input
                value={keywords}
                onChange={(event) => setKeywords(event.target.value)}
                className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                placeholder="keyword principal, keyword secundaria, long tail"
                required
              />
              <p className="text-xs text-slate-500">
                Separa cada keyword por coma para obtener sugerencias de contenido y clusters.
              </p>
            </label>

            <label className="md:col-span-2 flex flex-col gap-2">
              <span className="text-sm font-medium text-slate-300">Audiencia y propuesta de valor</span>
              <textarea
                value={audience}
                onChange={(event) => setAudience(event.target.value)}
                className="min-h-[120px] rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-600 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-300/30"
                placeholder="Describe a quién te diriges y lo que te hace único."
              />
            </label>

            <div className="md:col-span-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="rounded-full border border-slate-800 px-3 py-1 uppercase tracking-wide text-slate-400">
                No se requiere tarjeta
              </span>
              <span className="rounded-full border border-slate-800 px-3 py-1 uppercase tracking-wide text-slate-400">
                Resultados en 30 segundos
              </span>
              <span className="rounded-full border border-slate-800 px-3 py-1 uppercase tracking-wide text-slate-400">
                Datos cifrados
              </span>
            </div>
          </form>
        </div>
      </section>

      <section className="bg-slate-950">
        <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-16 md:px-12 md:grid-cols-4">
          {featurePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition hover:border-cyan-400/50"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/15 text-cyan-300">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-semibold text-slate-100">{pillar.title}</h3>
              <p className="text-sm leading-relaxed text-slate-400">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-slate-900/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-3xl font-semibold text-slate-100">Diagnóstico accionable en segundos</h2>
              <p className="max-w-2xl text-sm text-slate-400">
                Nuestro motor analiza señales técnicas, contenido y autoridad para recomendar el sprint con mayor impacto en tráfico orgánico.
              </p>
            </div>
            {result && (
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cyan-200">
                Score actualizado: {result.score}/100 · Dificultad {result.difficulty}
              </span>
            )}
          </div>

          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-wide text-slate-500">Contexto</p>
                  <h3 className="text-2xl font-semibold text-slate-100">{domain}</h3>
                </div>
                <div className="text-right text-sm text-slate-400">
                  <p>Competidor: <span className="text-slate-100">{competitor || "N/A"}</span></p>
                  <p>Keywords: <span className="text-slate-100">{personaKeywords.join(", ")}</span></p>
                </div>
              </div>

              {result ? (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="rounded-2xl border border-cyan-400/30 bg-cyan-400/5 p-5">
                    <p className="text-sm text-cyan-200">Opportunity Score</p>
                    <p className="mt-3 text-4xl font-semibold text-cyan-100">{result.score}</p>
                    <p className="mt-2 text-xs text-cyan-100/80">
                      Calculado usando señales semánticas, autoridad percibida y salud técnica.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
                    <p className="text-sm text-slate-300">Quick wins sugeridos</p>
                    <ul className="mt-3 flex flex-col gap-2 text-sm text-slate-400">
                      {result.quickWins.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="md:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/40 p-5">
                    <p className="text-sm text-slate-300">Roadmap recomendado</p>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {result.roadmap.map((phase) => (
                        <div key={phase.title} className="flex flex-col gap-3 rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                          <p className="text-sm font-semibold text-slate-100">{phase.title}</p>
                          <ul className="flex flex-col gap-2 text-xs text-slate-400">
                            {phase.items.map((task) => (
                              <li key={task} className="flex items-start gap-2">
                                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                                <span>{task}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-slate-800 p-10 text-center text-sm text-slate-500">
                  <Sparkles className="h-10 w-10 text-cyan-200" />
                  Ingresa tus datos y activa el agente para ver el roadmap personalizado.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                <p className="text-sm uppercase tracking-wide text-slate-500">Proyecciones</p>
                <div className="mt-4 flex flex-col gap-4">
                  {result?.projections.map((projection) => (
                    <div key={projection.label} className="rounded-2xl border border-slate-800 bg-slate-900/60 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        {projection.label}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-slate-50">{projection.value}</p>
                      <p className="text-xs text-slate-400">{projection.description}</p>
                    </div>
                  )) || (
                    <div className="rounded-2xl border border-dashed border-slate-800 p-6 text-sm text-slate-500">
                      Obtén métricas de tráfico, ranking y ROI estimado tras la auditoría.
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-400/30 bg-cyan-400/5 p-6">
                <p className="text-sm text-cyan-200">Integraciones instantáneas</p>
                <p className="mt-2 text-lg font-semibold text-cyan-100">
                  Conecta Search Console, Analytics y Ahrefs en 3 clics.
                </p>
                <p className="mt-2 text-xs text-cyan-100/80">
                  Importamos tu histórico para detectar patrones de crecimiento y priorizar clusters con intención transaccional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="playbook" className="bg-slate-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-12">
          <div className="md:flex md:items-end md:justify-between">
            <div className="max-w-3xl">
              <h2 className="text-3xl font-semibold text-slate-100">Playbook para dominar tu SERP</h2>
              <p className="mt-2 text-sm text-slate-400">
                Nuestro agente combina inteligencia humana + IA para ejecutar en sprints de alto impacto. Así es como alcanzamos el top 1 para 120+ keywords competitivas.
              </p>
            </div>
            <Link
              href="#pricing"
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/50 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-200 hover:bg-cyan-400/10 md:mt-0"
            >
              Revisar planes
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {playbooks.map((play) => (
              <div key={play.title} className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6">
                <p className="text-xs uppercase tracking-wide text-slate-500">{play.title}</p>
                <p className="text-lg font-semibold text-slate-100">{play.summary}</p>
                <p className="text-sm text-slate-400">{play.bullet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-900/20">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 md:grid-cols-[1.2fr_1fr] md:px-12">
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-3xl font-semibold text-slate-100">Resultados reales</h2>
              <p className="mt-2 text-sm text-slate-400">
                Historias de equipos que activaron el agente y multiplicaron su share of voice.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                <p className="text-sm text-slate-300">
                  “Duplicamos el tráfico orgánico en 90 días y capturamos 6 keywords top 3 con intención de compra. El roadmap fue tan claro que ejecutamos sin sumar headcount.”
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  María López · VP Growth, Fintech LatAm
                </p>
              </div>
              <div className="rounded-3xl border border-slate-800 bg-slate-950/60 p-6">
                <p className="text-sm text-slate-300">
                  “Las recomendaciones técnicas se conectaron directo con nuestro backlog en Linear. Cerramos 27 tickets críticos y mejoramos el CLS un 38%.”
                </p>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Rodrigo Díaz · CTO, Marketplace B2B
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-950/70 p-6">
            <h3 className="text-lg font-semibold text-slate-100">Preguntas frecuentes</h3>
            <div className="flex flex-col gap-5">
              {faqs.map((faq) => (
                <div key={faq.question} className="border-b border-slate-800 pb-4 last:border-b-0 last:pb-0">
                  <p className="text-sm font-semibold text-slate-200">{faq.question}</p>
                  <p className="mt-2 text-xs leading-6 text-slate-400">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="bg-slate-950">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 py-16 md:px-12">
          <div className="flex flex-col gap-4 text-center">
            <h2 className="text-3xl font-semibold text-slate-100">Planes diseñados para crecer</h2>
            <p className="text-sm text-slate-400">
              Elige el agente que mejor se adapta a tu etapa. Cancela cuando quieras.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Starter</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">$299</p>
                <p className="text-xs text-slate-500">Ideal para startups B2B que arrancan SEO.</p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-slate-300">
                <li>Auditoría semanal + 10 recomendaciones</li>
                <li>2 clusters de contenido automatizado</li>
                <li>Reportes ejecutivos mensuales</li>
              </ul>
              <button className="mt-auto rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-200">
                Comenzar
              </button>
            </div>

            <div className="flex flex-col gap-6 rounded-3xl border border-cyan-400/50 bg-gradient-to-b from-cyan-400/10 to-slate-950 p-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-cyan-200">Pro · Popular</p>
                <p className="mt-3 text-3xl font-semibold text-slate-50">$699</p>
                <p className="text-xs text-cyan-100/80">Growth squads que necesitan escala y reporting avanzado.</p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-slate-100">
                <li>Auditoría diaria + priorización automática</li>
                <li>5 clusters + 15 briefs listos para CMS</li>
                <li>Integraciones directas con GSC, Analytics y HubSpot</li>
                <li>Modelo predictivo de ROI orgánico</li>
              </ul>
              <button className="mt-auto rounded-full bg-cyan-400 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-cyan-300">
                Solicitar demo
              </button>
            </div>

            <div className="flex flex-col gap-6 rounded-3xl border border-slate-800 bg-slate-900/40 p-6">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">Enterprise</p>
                <p className="mt-3 text-3xl font-semibold text-slate-100">Custom</p>
                <p className="text-xs text-slate-500">Para organizaciones globales con múltiples dominios.</p>
              </div>
              <ul className="flex flex-col gap-2 text-sm text-slate-300">
                <li>Sprints dedicados liderados por especialistas</li>
                <li>Soporte 24/7 y dashboards ilimitados</li>
                <li>Integración BI & data warehouse</li>
              </ul>
              <button className="mt-auto rounded-full border border-slate-700 px-5 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-400 hover:text-cyan-200">
                Hablar con ventas
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-slate-950/90">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-slate-500 md:flex-row md:items-center md:justify-between md:px-12">
          <div className="flex flex-col gap-2">
            <p className="text-base font-semibold text-slate-200">Agente SEO Rank 1</p>
            <p>Construye relevancia, autoridad y conversiones orgánicas sin fricción.</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#playbook" className="hover:text-cyan-200">
              Playbook
            </Link>
            <Link href="#pricing" className="hover:text-cyan-200">
              Precios
            </Link>
            <Link href="mailto:hola@agente-seo.com" className="hover:text-cyan-200">
              hola@agente-seo.com
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
