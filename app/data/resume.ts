/**
 * Fuente única del CV digital (/resume).
 * El contenido vive en `app/data/content.json` — edítalo para cambiar textos,
 * experiencias, idiomas o secciones sin tocar código.
 * Este módulo lo re-exporta tipado para que los consumidores no cambien.
 * El PDF descargable vive en public/resume/cv/sergio-jurado.pdf.
 */
import content from './content.json'

export type Lang = 'es' | 'ca' | 'en'
export type ProfileId = 'logistica' | 'fullstack' | 'generico'

export interface Experience {
  company: string
  role: string
  period: string
  description: string
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  period: string
  note?: string
}

export interface ProfileEntry {
  title: string
  role: string
  description: string
  about: string
  skills: string[]
  experience: { role: string; company: string; period: string; highlights: string[] }[]
}

export interface Resume {
  name: string
  title: string
  summary: string
  location: string
  note?: string
  license: string
  availability: string
  experience: Experience[]
  education: Education[]
  softSkills: string[]
  hardSkills: string[]
  languages: { name: string; level: string }[]
  additional: string[]
}

export interface UiStrings {
  nav: { cv: string; services: string; contact: string }
  heroGreeting: string
  heroIntro: string
  downloadPdf: string
  viewProfiles: string
  sectionProfile: string
  sectionExperience: string
  sectionEducation: string
  sectionSkills: string
  sectionAvailability: string
  experienceSubtitle: string
  softSkills: string
  hardSkills: string
  languages: string
  additionalTitle: string
  profilesTitle: string
  profilesSubtitle: string
  viewProfile: string
  ctaText: string
  sendEmail: string
  servicesTitle: string
  servicesSubtitle: string
  servicesIntro: string
  contactTitle: string
  contactSubtitle: string
  contactIntro: string
  whatsappTitle: string
  whatsappSub: string
  whatsappCta: string
  whatsappPrefill: string
  orWrite: string
  formName: string
  formEmail: string
  formMsg: string
  send: string
  profileSkills: string
  profileExperience: string
  profileContact: string
  backToCv: string
  footerPartOf: string
  seoDescription: string
  skipToContent: string
  themeToggle: string
}

export const meta = content.meta

export const resume = content.resume as unknown as Record<Lang, Resume>

export const profiles = content.profiles as unknown as Record<ProfileId, Record<Lang, ProfileEntry>>

export const services = content.services as unknown as Record<Lang, { title: string; description: string }[]>

export const sections = content.sections as unknown as Record<Lang, { id: string; label: string; title: string; icon: string }[]>

export const ui = content.ui as unknown as Record<Lang, UiStrings>

export const langs = content.langs as unknown as { code: Lang; htmlLang: string; label: string }[]

export const profileIds = content.profileIds as unknown as ProfileId[]
