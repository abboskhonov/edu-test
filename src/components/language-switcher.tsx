import { useI18n, type Language } from "@/lib/i18n"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconLanguage, IconCheck } from "@tabler/icons-react"

const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "ru", label: "Русский" },
  { value: "uz", label: "O'zbek" },
]

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n()
  const current = languages.find((l) => l.value === language)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button
          className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-xs font-medium text-background/60 transition-colors hover:bg-white/10 hover:text-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none md:text-sm"
          aria-label={t("common.language")}
        >
          <IconLanguage size={16} stroke={1.5} />
          <span className="uppercase tracking-wide">{language}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[8rem]">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.value}
            onClick={() => setLanguage(lang.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-sm">{lang.label}</span>
            {language === lang.value && (
              <IconCheck size={14} className="text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
