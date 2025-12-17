"use client";

import React from "react";

type LocationCardProps = {
    title: string;
    name: string;
    addressLines: string[];
    time?: string;
    mapsUrl: string;
    note?: string;
};

const theme = {
    glass: "rgba(13,16,23,0.55)",
    glassSoft: "rgba(13,16,23,0.35)",
    border: "rgba(200,171,139,0.35)",
    borderSoft: "rgba(200,171,139,0.18)",
    textSoft: "rgba(237,237,237,0.85)",
    textMuted: "rgba(191,179,165,0.9)",
};

function Section({
    id,
    title,
    subtitle,
    children,
}: {
    id: string;
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}) {
    return (
        <section id={id} className="scroll-mt-24">
            <div className="mb-3">
                <h2 className="text-lg font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
                    {title}
                </h2>
                {subtitle ? (
                    <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
                        {subtitle}
                    </p>
                ) : null}
            </div>
            {children}
        </section>
    );
}

function Divider() {
    return <div className="h-px w-full" style={{ background: theme.borderSoft }} />;
}

function Card({ children }: { children: React.ReactNode }) {
    return (
        <div
            className="rounded-2xl border p-4 backdrop-blur"
            style={{
                background: theme.glass,
                borderColor: theme.border,
                boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
            }}
        >
            {children}
        </div>
    );
}

function Pill({ children }: { children: React.ReactNode }) {
    return (
        <span
            className="inline-flex items-center rounded-full border px-2.5 py-1 text-xs"
            style={{
                background: "rgba(13,16,23,0.45)",
                borderColor: "rgba(200,171,139,0.30)",
                color: "var(--secondary)",
            }}
        >
            {children}
        </span>
    );
}

function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-medium transition active:scale-[0.99]"
            style={{
                background: "var(--accent)",
                color: "#0D1017",
                boxShadow: "0 10px 30px rgba(200,171,139,0.18)",
            }}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noreferrer" : undefined}
        >
            {children}
        </a>
    );
}

function SecondaryButton({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <a
            href={href}
            className="inline-flex w-full items-center justify-center rounded-xl border px-4 py-3 text-sm font-medium transition active:scale-[0.99]"
            style={{
                background: theme.glassSoft,
                borderColor: theme.border,
                color: "var(--foreground)",
            }}
            target="_blank"
            rel="noreferrer"
        >
            {children}
        </a>
    );
}

function LocationCard({ title, name, addressLines, time, mapsUrl, note }: LocationCardProps) {
    return (
        <Card>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: theme.textMuted }}>
                        {title}
                    </p>
                    <h3 className="mt-1 text-base font-semibold" style={{ color: "var(--foreground)" }}>
                        {name}
                    </h3>
                    <div className="mt-2 space-y-0.5 text-sm" style={{ color: theme.textSoft }}>
                        {addressLines.map((line, idx) => (
                            <p key={idx}>{line}</p>
                        ))}
                    </div>
                    {time ? (
                        <p className="mt-2 text-sm" style={{ color: theme.textSoft }}>
                            <span className="font-medium">Hora:</span> {time}
                        </p>
                    ) : null}
                    {note ? (
                        <p className="mt-2 text-xs" style={{ color: theme.textMuted }}>
                            {note}
                        </p>
                    ) : null}
                </div>
                <Pill>📍</Pill>
            </div>

            <div className="mt-4">
                <SecondaryButton href={mapsUrl}>Ver no Google Maps</SecondaryButton>
            </div>
        </Card>
    );
}

function TimelineItem({ time, label }: { time: string; label: string }) {
    return (
        <div className="flex gap-3">
            <div className="w-16 shrink-0 text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {time}
            </div>
            <div
                className="flex-1 rounded-xl border px-3 py-2 text-sm"
                style={{
                    background: theme.glassSoft,
                    borderColor: "rgba(200,171,139,0.25)",
                    color: theme.textSoft,
                }}
            >
                {label}
            </div>
        </div>
    );
}

function ColorSwatch({ label }: { label: string }) {
    return (
        <div className="flex items-center gap-3">
            <div
                className="h-8 w-8 rounded-full border shadow-sm"
                style={{
                    background: "rgba(191,179,165,0.18)",
                    borderColor: theme.border,
                }}
            />
            <div className="text-sm" style={{ color: "var(--foreground)" }}>
                {label}
            </div>
        </div>
    );
}

function FAQItem({ q, a }: { q: string; a: React.ReactNode }) {
    return (
        <details
            className="group rounded-2xl border px-4 py-3 shadow-sm open:shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
            style={{
                background: theme.glass,
                borderColor: "rgba(200,171,139,0.30)",
            }}
        >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3">
                <span className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {q}
                </span>
                <span className="group-open:rotate-180" style={{ color: theme.textMuted }}>
                    ▾
                </span>
            </summary>
            <div className="mt-3 text-sm" style={{ color: theme.textSoft }}>
                {a}
            </div>
        </details>
    );
}

export default function WeddingInfoPage() {
    // ✅ Replace these constants with your real data
    const couple = "Luís & Carla";
    const dateLabel = "Sábado, 5 de Julho de 2026";
    const cityLabel = "Guimarães";

    // Example URLs (replace)
    const churchMapsUrl = "https://maps.google.com/?q=Igreja+de+S%C3%A3o+D%C3%A2maso+Guimar%C3%A3es";
    const venueMapsUrl = "https://maps.google.com/?q=Quinta+da+Felgueira+Vizela";

    return (
        <main className="min-h-screen" style={{ background: "transparent", color: "var(--foreground)" }}>
            {/* Top bar / quick nav (mobile-first) */}
            <div
                className="sticky top-0 z-10 border-b backdrop-blur"
                style={{
                    borderColor: theme.borderSoft,
                    background: "rgba(13,16,23,0.45)",
                }}
            >
                <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3">
                    <div className="leading-tight">
                        <p className="text-xs" style={{ color: theme.textMuted }}>
                            Informações
                        </p>
                        <p className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                            {couple}
                        </p>
                    </div>
                    <a
                        href="#rsvp"
                        className="rounded-full px-3 py-1.5 text-xs font-medium shadow-sm"
                        style={{ background: "var(--accent)", color: "#0D1017" }}
                    >
                        RSVP
                    </a>
                </div>
            </div>

            <div className="mx-auto max-w-md px-4 pb-10 pt-6">
                {/* HERO */}
                <div
                    className="rounded-3xl border p-5 backdrop-blur"
                    style={{
                        background: theme.glass,
                        borderColor: theme.border,
                        boxShadow: "0 12px 40px rgba(0,0,0,0.35)",
                    }}
                >
                    <p className="text-xs font-medium uppercase tracking-wide" style={{ color: theme.textMuted }}>
                        O Nosso Grande Dia
                    </p>
                    <h1 className="mt-1 text-2xl font-semibold tracking-tight" style={{ color: "var(--foreground)" }}>
                        {couple}
                    </h1>
                    <div className="mt-3 flex flex-wrap gap-2">
                        <Pill>📅 {dateLabel}</Pill>
                        <Pill>📍 {cityLabel}</Pill>
                    </div>
                    <p className="mt-4 text-sm" style={{ color: theme.textSoft }}>
                        Reunimos aqui as informações essenciais para o dia do casamento — locais, horários, dress code e detalhes úteis.
                    </p>
                </div>

                {/* Content */}
                <div className="mt-6 space-y-8">
                    <Section id="dia" title="O Grande Dia" subtitle="Horários principais (chegue com 15 minutos de antecedência)">
                        <Card>
                            <div className="space-y-3 text-sm">
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0">🕒</div>
                                    <div>
                                        <p className="font-medium" style={{ color: "var(--foreground)" }}>
                                            Início da cerimónia
                                        </p>
                                        <p style={{ color: theme.textSoft }}>15:30 (chegada recomendada: 15:10)</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0">🥂</div>
                                    <div>
                                        <p className="font-medium" style={{ color: "var(--foreground)" }}>
                                            Copo-de-água
                                        </p>
                                        <p style={{ color: theme.textSoft }}>Após a cerimónia</p>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Section>

                    <Section id="cerimonia" title="Cerimónia" subtitle="Local da cerimónia religiosa">
                        <LocationCard
                            title="Cerimónia"
                            name="Igreja de São Dâmaso"
                            addressLines={["Largo Condessa Mumadona", "Guimarães"]}
                            time="15:30"
                            mapsUrl={churchMapsUrl}
                            note="A cerimónia terá início pontualmente."
                        />
                    </Section>

                    <Section id="copo" title="Copo-de-Água" subtitle="Local do jantar e festa">
                        <LocationCard
                            title="Copo-de-Água"
                            name="Quinta da Felgueira"
                            addressLines={["Vizela", "(morada completa aqui)"]}
                            mapsUrl={venueMapsUrl}
                            note="Estacionamento disponível no local."
                        />
                    </Section>

                    <Section id="dress" title="Dress code & cores" subtitle="Ajude-nos a manter a harmonia visual do dia">
                        <Card>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                                        Dress code
                                    </p>
                                    <p className="mt-1 text-sm" style={{ color: theme.textSoft }}>
                                        Sugerimos um estilo <span className="font-medium">formal / elegante</span>.
                                    </p>
                                </div>

                                <Divider />

                                <div>
                                    <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                                        Cores a evitar
                                    </p>
                                    <p className="mt-1 text-sm" style={{ color: theme.textSoft }}>
                                        Para manter a harmonia visual do dia, agradecemos que evite usar as cores reservadas para os padrinhos e madrinhas.
                                    </p>
                                    <div className="mt-4 grid gap-3">
                                        <ColorSwatch label="Borgonha" />
                                        <ColorSwatch label="Champagne" />
                                        <ColorSwatch label="Verde escuro" />
                                    </div>
                                    <p className="mt-3 text-xs" style={{ color: theme.textMuted }}>
                                        Obrigado pela compreensão 🤍
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </Section>

                    <Section id="programa" title="Programa do dia" subtitle="Horários aproximados">
                        <Card>
                            <div className="space-y-3">
                                <TimelineItem time="15:30" label="Cerimónia" />
                                <TimelineItem time="17:00" label="Aperitivos" />
                                <TimelineItem time="18:30" label="Jantar" />
                                <TimelineItem time="21:00" label="Festa" />
                            </div>
                            <p className="mt-4 text-xs" style={{ color: theme.textMuted }}>
                                Os horários podem sofrer pequenos ajustes.
                            </p>
                        </Card>
                    </Section>

                    <Section id="transporte" title="Transporte & estacionamento" subtitle="Sugestões para chegar com tranquilidade">
                        <Card>
                            <div className="space-y-3 text-sm" style={{ color: theme.textSoft }}>
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0">🚗</div>
                                    <p>Estacionamento disponível na quinta.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0">🚕</div>
                                    <p>Se beber, opte por táxi/TVDE ou boleia combinada.</p>
                                </div>
                                <div className="flex items-start gap-3">
                                    <div className="shrink-0">🧭</div>
                                    <p>Se houver transfer, colocamos aqui a informação mais perto da data.</p>
                                </div>
                            </div>
                        </Card>
                    </Section>

                    <Section id="rsvp" title="Confirmação de presença" subtitle="Ajude-nos a organizar tudo com tempo">
                        <Card>
                            <p className="text-sm" style={{ color: theme.textSoft }}>
                                Por favor confirme a sua presença até <span className="font-medium">1 de Junho de 2026</span>.
                            </p>
                            <div className="mt-4">
                                <PrimaryButton href="/rsvp">👉 Confirmar presença</PrimaryButton>
                            </div>
                        </Card>
                    </Section>

                    <Section id="faq" title="Perguntas frequentes" subtitle="Respostas rápidas às dúvidas mais comuns">
                        <div className="space-y-3">
                            <FAQItem q="Posso levar acompanhante?" a={<p>Apenas se estiver indicado no convite/RSVP. Se tiver dúvidas, fale connosco.</p>} />
                            <FAQItem q="Crianças são bem-vindas?" a={<p>Indique no RSVP o número de crianças (se aplicável). Assim garantimos tudo preparado.</p>} />
                            <FAQItem q="Há opções para restrições alimentares?" a={<p>Sim. Por favor indique alergias/intolerâncias no RSVP.</p>} />
                            <FAQItem q="Posso tirar fotografias?" a={<p>Claro! Só pedimos discrição durante a cerimónia.</p>} />
                        </div>
                    </Section>

                    {/* Footer */}
                    <div className="pt-2 text-center text-xs" style={{ color: theme.textMuted }}>
                        <p>Com carinho, {couple} ✨</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
