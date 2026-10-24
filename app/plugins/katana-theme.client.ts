import { useInitTheme, useGetThemeMode, useGetResolved, type ThemeMode } from 'katanakit-js'

/**
 * KatanaKit ThemeService owns theming: it writes `data-theme` and the
 * `light`/`dark` classes on <html>. Nuxt UI reads the same class, so we
 * sync `colorMode.preference` from the Katana onChange hook — one source
 * of truth, no duplicated switchers.
 */
export default defineNuxtPlugin(() => {
  const colorMode = useColorMode()
  const mode = useState<ThemeMode>('theme-mode', () => 'dark')
  const resolved = useState<'light' | 'dark'>('theme-resolved', () => 'dark')

  useInitTheme({
    defaultMode: 'dark',
    onChange: (nextMode, nextResolved) => {
      mode.value = nextMode
      resolved.value = nextResolved
      colorMode.preference = nextResolved
    },
  })

  // Reflect the state applied by the initial useInitTheme() call.
  mode.value = useGetThemeMode()
  resolved.value = useGetResolved()
})
