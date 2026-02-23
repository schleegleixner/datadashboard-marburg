'use client'

import { handleTranslate } from '@/utils/gtranslate'

export default function LanguageOverlay({ onClose }: { onClose: () => void }) {
  const languages = [
    { code: 'en', label: 'English' },
    { code: 'fr', label: 'Français' },
    { code: 'es', label: 'Español' },
    { code: 'pl', label: 'Polski' },
    { code: 'it', label: 'Italiano' },
    { code: 'ru', label: 'Русский' },
    { code: 'tr', label: 'Türkçe' },
    { code: 'ar', label: 'العربية' },
  ]

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div className="rounded-md bg-white p-6 shadow-xl">
        <h2 className="mb-4 text-lg font-bold">Sprache wählen</h2>
        <ul className="space-y-2">
          {languages.map(lang => (
            <li key={lang.code}>
              <button
                className="hover:bg-primary-dark w-full rounded bg-primary px-4 py-2 text-white"
                onClick={() => {
                  handleTranslate(lang.code)
                  onClose()
                }}
              >
                {lang.label}
              </button>
            </li>
          ))}
        </ul>
        <button
          className="mt-4 block w-full text-sm text-gray-500 hover:underline"
          onClick={onClose}
        >
          Abbrechen
        </button>
      </div>
    </div>
  )
}
