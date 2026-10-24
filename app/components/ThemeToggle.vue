<script setup lang="ts">
import { useToggleTheme } from 'katanakit-js'

const { t } = useLang()
const resolved = useState<'light' | 'dark'>('theme-resolved', () => 'dark')

function toggle() {
  useToggleTheme()
}
</script>

<template>
  <button
    type="button"
    class="inline-flex size-9 items-center justify-center rounded-full border border-dark-700/70 bg-dark-800/50 text-white-400 transition-colors hover:border-dark-600 hover:text-white-100"
    :aria-label="t.themeToggle"
    :aria-pressed="resolved === 'dark'"
    @click="toggle"
  >
    <UIcon :name="resolved === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'" class="size-4" />
  </button>
</template>
