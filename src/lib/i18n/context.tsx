import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react"
import { translations, type Language } from "./translations"

const STORAGE_KEY = "twa-language"
const DEFAULT_LANGUAGE: Language = "en"

function getStoredLanguage(): Language {
  if (typeof window === "undefined") return DEFAULT_LANGUAGE
  const stored = localStorage.getItem(STORAGE_KEY) as Language | null
  if (stored && translations[stored]) return stored
  return DEFAULT_LANGUAGE
}

interface I18nContextValue {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getStoredLanguage)

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, lang)
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".")
      let value: any = translations[language]
      for (const k of keys) {
        if (value === undefined || value === null) return key
        value = value[k]
      }
      if (typeof value === "string") return value
      return key
    },
    [language]
  )

  // Update html lang attribute on client
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language
    }
  }, [language])

  return (
    <I18nContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }
  return context
}

export function useLanguage() {
  const { language, setLanguage } = useI18n()
  return { language, setLanguage }
}
