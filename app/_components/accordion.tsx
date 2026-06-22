"use client";

import {
  ChevronDown,
} from "lucide-react";
import { useRef, useState } from "react";
import { COLORS } from "../utils/exports";

type Item = {
  title: string;
  content: string;
}

const items: Item[] = [
  {
    title: "Cerimónia – Igreja",
    content: `
      <div class="space-y-6 text-[#FFFFFF]">
        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5 shadow-lg shadow-black/20 space-y-3">
          <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10 9h4"/>
              <path d="M12 7v5"/>
              <path d="M14 22v-3.6a2 2 0 0 0-.6-1.4L12 15.6 10.6 17a2 2 0 0 0-.6 1.4V22"/>
              <path d="M18 22V5l-6-3-6 3v17"/>
              <path d="M4 22h16"/>
              <path d="M6 10h.01"/>
              <path d="M6 14h.01"/>
              <path d="M6 18h.01"/>
              <path d="M18 10h.01"/>
              <path d="M18 14h.01"/>
              <path d="M18 18h.01"/>
            </svg>
            <h3 class="text-base sm:text-lg font-semibold">Informação principal</h3>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-xl bg-white/5 p-4">
              <p class="mb-1 text-xs uppercase tracking-[0.2em] text-[#C8AB8B]/80">Local</p>
              <p class="text-sm text-white break-words">Igreja de Nespereira</p>
            </div>
            <div class="rounded-xl bg-white/5 p-4">
              <p class="mb-1 text-xs uppercase tracking-[0.2em] text-[#C8AB8B]/80">Hora</p>
              <p class="text-sm text-white break-words">14h00</p>
            </div>
          </div>
          <div class="rounded-xl bg-white/5 p-4">
            <p class="mt-1 text-sm leading-6 text-white/80 break-words">Os primeiros dois bancos de cada lado estarão reservados para a família e devidamente identificados com o nome dos familiares.</p>
          </div>
        </div>

        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
          <div class="mb-4 flex items-center gap-2 text-[#C8AB8B]">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <h3 class="text-base sm:text-lg font-semibold">Ordem de entradas</h3>
          </div>
          <div class="space-y-3">
            <div class="rounded-xl bg-white/5 p-4">
              <p class="font-medium text-white break-words">Luís</p>
              <p class="mt-1 text-sm leading-6 text-white/80 break-words">Sai de casa às 13h50 com os pagens e entra na igreja com a mãe, Palmira.</p>
            </div>
            <div class="rounded-xl bg-white/5 p-4">
              <p class="font-medium text-white break-words">Carla</p>
              <p class="mt-1 text-sm leading-6 text-white/80 break-words">Sai de casa às 14h15 e entra na igreja com o irmão, Feliciano.</p>
            </div>
            <div class="rounded-xl bg-white/5 p-4">
              <p class="font-medium text-white break-words">Né</p>
              <p class="mt-1 text-sm leading-6 text-white/80 break-words">Entra com Emília, madrinha da Carla.</p>
            </div>
            <div class="rounded-xl bg-white/5 p-4">
              <p class="font-medium text-white break-words">Menina das alianças</p>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M9 18V5l12-2v13"/>
                <circle cx="6" cy="18" r="3"/>
                <circle cx="18" cy="16" r="3"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Cerimónia</h3>
            </div>
            <ul class="space-y-2 text-sm leading-6 text-white/80">
              <li class="break-words">Padre Humberto</li>
              <li class="break-words">Coro Génesis com missal</li>
              <li class="break-words">Arcos dentro da igreja</li>
            </ul>
          </div>

          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 11h16"/>
                <path d="M8 7h8"/>
                <path d="M8 15h8"/>
                <path d="M6 19h12"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Saída</h3>
            </div>
            <p class="text-sm leading-6 text-white/80 break-words">Cerveja à saída da igreja.</p>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Preparação dos noivos",
    content: `
      <div class="space-y-4 text-[#FFFFFF]">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 7h-9"/>
                <path d="M14 17H5"/>
                <circle cx="17" cy="17" r="3"/>
                <circle cx="7" cy="7" r="3"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Carla</h3>
            </div>
            <ul class="space-y-2 text-sm leading-6 text-white/80">
              <li class="break-words">Casa Carla</li>
              <li class="break-words">10h00 – maquilhagem, cabelo e preparação em casa</li>
              <li class="break-words">Saída às 14h15</li>
            </ul>
          </div>

          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 12a5 5 0 1 0-5-5"/>
                <path d="M12 12a5 5 0 1 1 5-5"/>
                <path d="M6 22v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Luís</h3>
            </div>
            <ul class="space-y-2 text-sm leading-6 text-white/80">
              <li class="break-words">Sai de casa com os pagens</li>
              <li class="break-words">Saída às 13h50</li>
              <li class="break-words">Entrada na igreja com a mãe</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Receção – Quinta das Carpas",
    content: `
      <div class="space-y-4 text-[#FFFFFF]">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Local</h3>
            </div>
            <p class="text-sm leading-6 text-white/80 break-words">Quinta das Carpas</p>
          </div>

          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Hora</h3>
            </div>
            <p class="text-sm leading-6 text-white/80 break-words">16h30</p>
          </div>
        </div>

        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
          <div class="mb-4 flex items-center gap-2 text-[#C8AB8B]">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M8 2v4"/>
              <path d="M16 2v4"/>
              <rect width="18" height="18" x="3" y="4" rx="2"/>
              <path d="M3 10h18"/>
            </svg>
            <h3 class="text-base sm:text-lg font-semibold">Receção</h3>
          </div>
          <div class="space-y-3">
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Porto de honra à entrada</div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Sunset com DJ</div>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Jantar e sala",
    content: `
      <div class="space-y-4 text-[#FFFFFF]">
        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
          <div class="mb-4 flex items-center gap-2 text-[#C8AB8B]">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 3h16"/>
              <path d="M5 3v18"/>
              <path d="M19 3v18"/>
              <path d="M8 7h8"/>
              <path d="M8 11h8"/>
              <path d="M8 15h8"/>
            </svg>
            <h3 class="text-base sm:text-lg font-semibold">Cronologia</h3>
          </div>
          <div class="space-y-3">
            <div class="flex flex-col gap-1 rounded-xl bg-white/5 p-4 sm:flex-row sm:gap-3">
              <span class="text-sm font-semibold text-[#C8AB8B] sm:min-w-[60px] sm:flex-shrink-0">19h30</span>
              <p class="text-sm leading-6 text-white/80 break-words">Convidados entram para a sala</p>
            </div>
            <div class="flex flex-col gap-1 rounded-xl bg-white/5 p-4 sm:flex-row sm:gap-3">
              <span class="text-sm font-semibold text-[#C8AB8B] sm:min-w-[60px] sm:flex-shrink-0">20h15</span>
              <p class="text-sm leading-6 text-white/80 break-words">Entrada dos noivos na sala com música</p>
            </div>
          </div>
        </div>

        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
          <div class="mb-4 flex items-center gap-2 text-[#C8AB8B]">
            <h3 class="text-base sm:text-lg font-semibold">Menu</h3>
          </div>
          <div class="space-y-3">
            <div class="flex flex-col gap-1 rounded-xl bg-white/5 p-4 sm:flex-row sm:gap-3">
              <span class="text-sm font-semibold text-[#C8AB8B] sm:min-w-[95px] sm:flex-shrink-0">Sopa</span>
              <p class="text-sm leading-6 text-white/80 break-words">Creme aveludado de legumes</p>
            </div>
            <div class="flex flex-col gap-1 rounded-xl bg-white/5 p-4 sm:flex-row sm:gap-3">
              <span class="text-sm font-semibold text-[#C8AB8B] sm:min-w-[95px] sm:flex-shrink-0">Peixe</span>
              <p class="text-sm leading-6 text-white/80 break-words">Bacalhau lascado com broa acompanhado com batata a murro e grelos salteados</p>
            </div>
            <div class="flex flex-col gap-1 rounded-xl bg-white/5 p-4 sm:flex-row sm:gap-3">
              <span class="text-sm font-semibold text-[#C8AB8B] sm:min-w-[95px] sm:flex-shrink-0">Carne</span>
              <p class="text-sm leading-6 text-white/80 break-words">Vitela de comer à colher com roupa velha de alheira</p>
            </div>
            <div class="flex flex-col gap-1 rounded-xl bg-white/5 p-4 sm:flex-row sm:gap-3">
              <span class="text-sm font-semibold text-[#C8AB8B] sm:min-w-[95px] sm:flex-shrink-0">Sobremesa</span>
              <p class="text-sm leading-6 text-white/80 break-words">Fondant de Goiabada com gelado de queijo da Serra</p>
            </div>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 7h16"/>
                <path d="M4 12h16"/>
                <path d="M4 17h16"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Mesas</h3>
            </div>
            <ul class="space-y-2 text-sm leading-6 text-white/80">
              <li class="break-words">Mesas identificadas sem lugares marcados</li>
              <li class="break-words">Mesa só com os noivos</li>
            </ul>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Momentos especiais",
    content: `
      <div class="space-y-4 text-[#FFFFFF]">
        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
          <div class="mb-4 flex items-center gap-2 text-[#C8AB8B]">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 21s-6.716-4.35-9-8.5C.8 8.61 3.223 4 7.5 4c2.11 0 3.9 1.01 4.5 2.5C12.6 5.01 14.39 4 16.5 4 20.777 4 23.2 8.61 21 12.5c-2.284 4.15-9 8.5-9 8.5z"/>
            </svg>
            <h3 class="text-base sm:text-lg font-semibold">Sequência da festa</h3>
          </div>
          <div class="space-y-3">
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">
              Entre o peixe e a carne, atua o grupo de dança da noiva.
            </div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">
              Dança dos noivos depois das sobremesas abertas.
            </div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">
              45 minutos de dança livre.
            </div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">
              Noivos vão retocar a maquilhagem.
            </div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">
              Corte do bolo.
            </div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">
              Continuação da dança.
            </div>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Fornecedores",
    content: `
      <div class="space-y-4 text-[#FFFFFF]">
        <div class="grid gap-4 md:grid-cols-3">
          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 4H20a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5"/>
                <path d="M14 2H8a2 2 0 0 0-2 2v6h6a2 2 0 0 0 2-2V2z"/>
                <circle cx="14" cy="14" r="3"/>
              </svg>
              <h3 class="text-sm sm:text-base font-semibold">Fotografia</h3>
            </div>
            <p class="text-sm text-white/80 break-words">Helder Couto</p>
            <p class="text-sm text-white/80 break-words">938402607</p>
          </div>

          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M8 21h8"/>
                <path d="M12 17v4"/>
                <path d="M17 3v7a5 5 0 0 1-10 0V3"/>
                <path d="M8 3v7"/>
              </svg>
              <h3 class="text-sm sm:text-base font-semibold">Catering</h3>
            </div>
            <p class="text-sm text-white/80 break-words">Nuno</p>
          </div>

          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
                <path d="M12 18v4"/>
              </svg>
              <h3 class="text-sm sm:text-base font-semibold">DJ</h3>
            </div>
            <p class="text-sm text-white/80 break-words">SóAnimarte – Tiago Simões</p>
            <p class="text-sm text-white/80 break-words">914 824 360</p>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Pessoas importantes",
    content: `
      <div class="space-y-4 text-[#FFFFFF]">
        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
          <div class="mb-4 flex items-center gap-2 text-[#C8AB8B]">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
              <circle cx="9" cy="7" r="4"/>
              <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <h3 class="text-base sm:text-lg font-semibold">Família e referências</h3>
          </div>
          <div class="grid gap-3 sm:grid-cols-2">
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Mãe da Carla: <span class="text-white font-medium">Rosa</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Irmão da Carla: <span class="text-white font-medium">Feliciano</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Irmã da Carla: <span class="text-white font-medium">Anabela</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Menina das Alianças: <span class="text-white font-medium">Ana Flor</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Avó Carla: <span class="text-white font-medium">Emília</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Madrinha da Carla: <span class="text-white font-medium">Emília</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Mãe do Luís: <span class="text-white font-medium">Palmira</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Pai do Luís: <span class="text-white font-medium">Aurélio</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Irmã do Luís: <span class="text-white font-medium">Ana</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Padrinho do Luís: <span class="text-white font-medium">Né</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Avós Luís: <span class="text-white font-medium">Olívia & Francisco / Aurora</span></div>
            <div class="rounded-xl bg-white/5 p-4 text-sm leading-6 text-white/80 break-words">Padre: <span class="text-white font-medium">Humberto Martins</span></div>
          </div>
        </div>
      </div>
    `,
  },
  {
    title: "Notas importantes",
    content: `
      <div class="space-y-4 text-[#FFFFFF]">
        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Convidados</h3>
            </div>
            <p class="text-sm leading-6 text-white/80 break-words">118 convidados</p>
          </div>

          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" x2="12" y1="9" y2="13"/>
                <line x1="12" x2="12.01" y1="17" y2="17"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Atenção</h3>
            </div>
            <p class="text-sm leading-6 text-white/80 break-words">Há uma convidada especial que não pode ter contacto com marisco.</p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
            <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
              <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" x2="12" y1="9" y2="13"/>
                <line x1="12" x2="12.01" y1="17" y2="17"/>
              </svg>
              <h3 class="text-base sm:text-lg font-semibold">Atenção</h3>
            </div>
            <p class="text-sm leading-6 text-white/80 break-words">Avó materna do Luís tem dificuldade motora. Estará de cadeira de rodas.</p>
          </div>
        </div>

        <div class="rounded-2xl border border-[#C8AB8B]/20 bg-[#0D1017] p-4 sm:p-5">
          <div class="mb-3 flex items-center gap-2 text-[#C8AB8B]">
            <svg class="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M3 7h18"/>
              <path d="M6 7V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
              <path d="M6 12h12"/>
              <path d="M8 12v7"/>
              <path d="M16 12v7"/>
              <path d="M5 21h14"/>
            </svg>
            <h3 class="text-base sm:text-lg font-semibold">Mesa dos noivos</h3>
          </div>
          <p class="text-sm leading-6 text-white/80 break-words">Os noivos terão uma mesa só para eles.</p>
        </div>
      </div>
    `,
  },
];

export default function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleToggle = (index: number) => {
    const isOpening = openIndex !== index;
    setOpenIndex(isOpening ? index : null);

    if (isOpening) {
      requestAnimationFrame(() => {
        itemRefs.current[index]?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        })
      })
    }
  }

  return (
    <div className="flex flex-col gap-4 px-4 pb-6 sm:gap-6 sm:px-6">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className={`scroll-mt-24 overflow-hidden rounded-2xl border transition-all duration-300 ${isOpen
              ? "bg-black/50 shadow-lg shadow-black/30"
              : "bg-black/30"
              }`}
            style={{
              borderColor: isOpen ? COLORS.sand : `${COLORS.sand}55`,
              borderWidth: 1,
            }}
          >
            <button
              type="button"
              onClick={() => handleToggle(index)}
              className="flex w-full items-start justify-between gap-3 p-4 text-left font-medium sm:items-center"
              style={{ color: COLORS.sand }}
            >
              <span className="min-w-0 flex-1 text-sm leading-6 sm:text-base">
                {item.title}
              </span>

              <ChevronDown
                className={`mt-0.5 h-5 w-5 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""
                  }`}
              />
            </button>

            <div
              className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
            >
              <div className="overflow-hidden">
                <div
                  className="px-4 pb-4 text-sm"
                  style={{ color: COLORS.white }}
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  )
}