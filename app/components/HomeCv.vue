<script setup lang="ts">
import { meta, resume, sections, ui } from '~/data/resume'

const route = useRoute()

const currentLang = computed(() =>
  route.path.startsWith('/ca/') ? 'ca' : route.path.startsWith('/en/') ? 'en' : 'es',
)

const r = computed(() => resume[currentLang.value])
const tabs = computed(() => sections[currentLang.value])
const t = computed(() => ui[currentLang.value])

useHead({ title: `${meta.name} — CV Digital` })
</script>

<template>
  <div class="min-h-screen bg-dark-950 font-sans text-white-50 selection:bg-emerald-400 selection:text-white">
    <!-- Grid de fondo -->
    <div class="pointer-events-none fixed inset-0 z-0 opacity-[0.06]" aria-hidden="true">
      <svg class="h-full w-full">
        <defs>
          <pattern id="grid-cyber" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="oklch(0.7 0.1 255)" stroke-width="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-cyber)" />
      </svg>
    </div>

    <!-- Header único (el layout usa este mismo por las páginas /resume) -->
    <header class="sticky top-0 z-50 h-16 border-b border-dark-700/70 bg-dark-950/80 backdrop-blur-xl">
      <div class="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-5 sm:px-8">
        <NuxtLink
          :to="`/resume/${currentLang}/contact/`"
          class="text-sm font-semibold text-white-200 transition-colors hover:text-emerald-500"
        >
          {{ t.nav.contact }}
        </NuxtLink>
        <a
          :href="`https://wa.me/${meta.whatsapp}`"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.55_0.12_155)]/50 px-3 py-1.5 text-sm font-semibold text-[oklch(0.45_0.12_155)] transition-colors hover:bg-[oklch(0.55_0.12_155)]/10 dark:text-[oklch(0.8_0.12_155)]"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-4" />
          WhatsApp
        </a>

        <div class="ml-auto flex items-center gap-2">
          <nav
            class="flex gap-0.5 rounded-full border border-dark-700/70 bg-dark-800/50 p-0.5"
            aria-label="Idioma"
          >
            <NuxtLink
              v-for="l in [
                { code: 'es', to: '/' },
                { code: 'ca', to: '/ca/' },
                { code: 'en', to: '/en/' },
              ]"
              :key="l.code"
              :to="l.to"
              class="rounded-full px-2.5 py-0.5 text-xs font-bold uppercase transition-colors"
              :class="currentLang === l.code ? 'bg-emerald-500 text-white' : 'text-white-400 hover:text-white-100'"
            >
              {{ l.code }}
            </NuxtLink>
          </nav>
          <a
            :href="meta.github"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
            class="inline-flex size-9 items-center justify-center rounded-full border border-dark-700/70 bg-dark-800/50 text-white-400 transition-colors hover:text-white-100"
          >
            <UIcon name="i-simple-icons-github" class="size-4" />
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>

    <main class="relative z-10 mx-auto max-w-6xl space-y-20 px-5 py-12 sm:px-8">
      <!-- Hero -->
      <section class="relative overflow-hidden rounded-lg border border-dark-700/70">
        <!-- Patrón crosshatch + overlay para difuminar -->
        <div class="hero-crosshatch absolute inset-0 opacity-20" aria-hidden="true" />
        <div class="absolute inset-0 bg-dark-950/80" aria-hidden="true" />

        <div class="relative mx-auto flex max-w-4xl flex-col-reverse items-center gap-10 px-8 py-16 lg:flex-row lg:gap-16">
          <div class="flex-1">
            <p class="mb-4 inline-flex items-center gap-2 rounded-full border border-dark-700/70 bg-dark-800/50 px-3 py-1 font-mono text-xs text-white-300">
              <span class="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
              senseikatana.com/resume
            </p>
            <h1 class="mb-3 text-[clamp(2.5rem,7vw,5rem)] font-black leading-[1.05] tracking-tight text-white-50">
              {{ r.name }}
            </h1>
            <p class="mb-6 text-2xl font-bold text-emerald-500">{{ r.title }}</p>
            <p class="mb-8 max-w-xl text-base leading-relaxed text-white-200">{{ r.summary }}</p>
            <a
              :href="meta.pdfUrl"
              download="CV_sergio-jurado.pdf"
              class="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-emerald-400"
            >
              <UIcon name="i-lucide-download" class="h-4 w-4" />
              {{ t.downloadPdf }}
            </a>
          </div>
          <img
            src="/resume/cv/sergio-jurado.jpg"
            :alt="`Retrato de ${r.name}`"
            width="448"
            height="448"
            class="size-56 rounded-full border-2 border-dark-700/70 object-cover shadow-sm transition-transform duration-300 hover:-translate-y-1 lg:size-64"
          >
        </div>
      </section>

      <!-- Pestañas horizontales -->
      <nav
        class="sticky top-16 z-40 rounded-lg border border-dark-700/70 bg-dark-950/80 py-3 backdrop-blur-xl"
        aria-label="Secciones del CV"
      >
        <div class="mx-auto flex w-full max-w-5xl gap-1 overflow-x-auto px-4">
          <a
            v-for="section in tabs"
            :key="section.id"
            :href="`#${section.id}`"
            class="inline-flex shrink-0 items-center gap-2 rounded-md border border-dark-700/70 bg-dark-800/50 px-4 py-2 font-mono text-sm text-white-200 transition-all hover:-translate-y-0.5 hover:border-emerald-500/60 hover:text-white-50"
          >
            <UIcon :name="`i-lucide-${section.icon}`" class="h-4 w-4 text-emerald-500" />
            <span>{{ section.title }}</span>
          </a>
        </div>
      </nav>

      <!-- Perfil -->
      <section id="perfil" class="scroll-mt-36">
        <h2 class="mb-8 flex items-center gap-3 text-3xl font-black tracking-tight text-white-50">
          <UIcon name="i-lucide-user" class="h-8 w-8 text-emerald-500" />
          {{ t.sectionProfile }}
        </h2>
        <div class="rounded-lg border border-dark-700/70 bg-dark-900/40 p-8">
          <p class="text-xl leading-relaxed text-white-200">{{ r.summary }}</p>
        </div>
      </section>

      <!-- Experiencia -->
      <section id="experiencia" class="scroll-mt-36">
        <h2 class="mb-8 flex items-center gap-3 text-3xl font-black tracking-tight text-white-50">
          <UIcon name="i-lucide-briefcase" class="h-8 w-8 text-emerald-500" />
          {{ t.sectionExperience }}
        </h2>
        <div class="space-y-6">
          <article
            v-for="exp in r.experience"
            :key="`${exp.company}-${exp.period}`"
            class="rounded-lg border border-dark-700/70 bg-dark-900/40 p-6 transition-all hover:-translate-y-1 hover:border-emerald-500/40"
          >
            <div class="mb-2 flex flex-wrap items-baseline justify-between gap-2">
              <h3 class="text-xl font-bold text-white-50">{{ exp.role }}</h3>
              <span class="font-mono text-xs text-white-400">{{ exp.period }}</span>
            </div>
            <p class="mb-3 text-sm font-semibold text-emerald-500">{{ exp.company }}</p>
            <ul class="space-y-2">
              <li v-for="h in exp.highlights" :key="h" class="flex gap-3 text-sm text-white-200">
                <UIcon name="i-lucide-check-circle-2" class="mt-1 h-4 w-4 shrink-0 text-emerald-500" />
                <span>{{ h }}</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <!-- Formación -->
      <section id="formacion" class="scroll-mt-36">
        <h2 class="mb-8 flex items-center gap-3 text-3xl font-black tracking-tight text-white-50">
          <UIcon name="i-lucide-graduation-cap" class="h-8 w-8 text-emerald-500" />
          {{ t.sectionEducation }}
        </h2>
        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="edu in r.education"
            :key="`${edu.degree}-${edu.period}`"
            class="rounded-lg border border-dark-700/70 bg-dark-900/40 p-6 transition-all hover:-translate-y-0.5 hover:border-emerald-500/40"
          >
            <div class="mb-2 flex items-baseline justify-between gap-2">
              <h3 class="font-bold text-white-50">{{ edu.degree }}</h3>
              <span class="shrink-0 font-mono text-xs text-white-400">{{ edu.period }}</span>
            </div>
            <p class="text-sm text-emerald-500">{{ edu.institution }}</p>
            <p v-if="edu.note" class="mt-1 text-xs text-white-400">{{ edu.note }}</p>
          </div>
        </div>
      </section>

      <!-- Skills -->
      <section id="skills" class="scroll-mt-36">
        <h2 class="mb-8 flex items-center gap-3 text-3xl font-black tracking-tight text-white-50">
          <UIcon name="i-lucide-sparkles" class="h-8 w-8 text-emerald-500" />
          {{ t.sectionSkills }}
        </h2>
        <div class="grid gap-6 md:grid-cols-3">
          <div class="rounded-lg border border-dark-700/70 bg-dark-900/40 p-6">
            <h3 class="mb-4 text-lg font-bold text-white-100">{{ t.softSkills }}</h3>
            <ul class="space-y-2">
              <li v-for="s in r.softSkills" :key="s" class="flex items-center gap-2 text-sm text-white-200">
                <UIcon name="i-lucide-zap" class="h-4 w-4 shrink-0 text-emerald-500" />
                {{ s }}
              </li>
            </ul>
          </div>
          <div class="rounded-lg border border-dark-700/70 bg-dark-900/40 p-6">
            <h3 class="mb-4 text-lg font-bold text-white-100">{{ t.hardSkills }}</h3>
            <ul class="space-y-2">
              <li v-for="s in r.hardSkills" :key="s" class="flex items-center gap-2 text-sm text-white-200">
                <UIcon name="i-lucide-wrench" class="h-4 w-4 shrink-0 text-emerald-500" />
                {{ s }}
              </li>
            </ul>
          </div>
          <div class="rounded-lg border border-dark-700/70 bg-dark-900/40 p-6">
            <h3 class="mb-4 text-lg font-bold text-white-100">{{ t.languages }}</h3>
            <ul class="space-y-2">
              <li v-for="l in r.languages" :key="l.name" class="flex items-center gap-2 text-sm text-white-200">
                <UIcon name="i-lucide-globe" class="h-4 w-4 shrink-0 text-emerald-500" />
                <span class="font-bold">{{ l.name }}</span>
                <span class="text-xs text-white-400">{{ l.level }}</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Información -->
      <section id="extra" class="scroll-mt-36">
        <h2 class="mb-8 flex items-center gap-3 text-3xl font-black tracking-tight text-white-50">
          <UIcon name="i-lucide-info" class="h-8 w-8 text-emerald-500" />
          {{ t.sectionAvailability }}
        </h2>
        <div class="rounded-lg border border-dark-700/70 bg-dark-900/40 p-8">
          <ul class="space-y-3">
            <li v-for="item in r.additional" :key="item" class="flex items-center gap-3 text-white-200">
              <UIcon name="i-lucide-circle-check" class="h-5 w-5 shrink-0 text-emerald-500" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </section>
    </main>

    <footer class="relative z-10 mt-16 border-t border-dark-700/70 bg-dark-950/60 py-8">
      <div class="mx-auto max-w-6xl px-5 text-center font-mono text-xs text-white-400">
        © 2026 {{ meta.name }} · CV Digital ·
        <a href="https://senseikatana.com" class="text-emerald-500 underline hover:text-white-50">senseikatana.com</a>
      </div>
    </footer>
  </div>
</template>
