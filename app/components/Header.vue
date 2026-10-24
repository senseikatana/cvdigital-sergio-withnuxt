<script setup lang="ts">
import { meta } from '~/data/resume'

const { lang, t } = useLang()
const route = useRoute()

const navItems = computed(() => [
  { path: 'contact', label: t.value.nav.contact },
])

const whatsappUrl = `https://wa.me/${meta.whatsapp}?text=${encodeURIComponent(t.value.whatsappPrefill)}`

function isActive(path: string) {
  const href = resumePath(lang.value, path)
  return path === '' ? route.path === href : route.path.startsWith(href)
}
</script>

<template>
  <header class="sticky top-0 z-50 h-16 border-b border-dark-700/70 bg-dark-900/80 backdrop-blur-md">
    <div class="mx-auto flex h-16 w-full max-w-6xl items-center gap-5 px-5 sm:px-8">
      <nav class="hidden flex-1 gap-1.5 md:flex" aria-label="Principal">
        <NuxtLink
          v-for="item in navItems"
          :key="item.path"
          :to="resumePath(lang, item.path)"
          class="rounded-full px-3 py-1.5 text-sm transition-colors"
          :class="isActive(item.path)
            ? 'bg-dark-800/60 text-white-50'
            : 'text-white-400 hover:bg-dark-800/60 hover:text-white-50'"
          :aria-current="isActive(item.path) ? 'page' : undefined"
        >
          {{ item.label }}
        </NuxtLink>
        <a
          :href="whatsappUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1.5 rounded-full border border-[oklch(0.62_0.14_155)]/50 px-3 py-1.5 text-sm font-semibold text-[oklch(0.55_0.13_155)] transition-colors hover:border-[oklch(0.62_0.14_155)] hover:bg-[oklch(0.62_0.14_155)]/10 dark:text-[oklch(0.78_0.12_155)]"
        >
          <UIcon name="i-simple-icons-whatsapp" class="size-4" />
          WhatsApp
        </a>
      </nav>

      <div class="ml-auto flex items-center gap-2">
        <LangSwitcher />
        <a
          :href="meta.github"
          target="_blank"
          rel="noopener"
          aria-label="GitHub"
          class="hidden size-9 items-center justify-center rounded-full border border-dark-700/70 bg-dark-800/50 text-white-400 transition-colors hover:border-dark-600 hover:text-white-100 md:inline-flex"
        >
          <UIcon name="i-simple-icons-github" class="size-4" />
        </a>
        <ThemeToggle />
      </div>
    </div>
  </header>
</template>
