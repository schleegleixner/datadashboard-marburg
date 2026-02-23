export function isTranslatedProxy() {
  return (
    typeof window !== 'undefined' &&
    window.location.hostname.endsWith('.translate.goog')
  )
}

export function handleTranslate(language: string = 'en') {
  const translate_url = buildTranslatedUrl(window.location.pathname, language)
  window.open(translate_url, '_blank')
}

export function buildTranslatedUrl(path: string, language?: string): string {
  const params = new URLSearchParams(window.location.search)

  if (language) {
    localStorage.setItem('translate_language', language)
  }

  const target_lang =
    params.get('_x_tr_tl') ||
    params.get('hl') ||
    language ||
    localStorage.getItem('translate_language') ||
    'en'
  const source_lang = params.get('_x_tr_sl') || 'de'

  const original_url = process.env.NEXT_PUBLIC_URL + path

  return (
    'https://translate.google.com/translate?' +
    `hl=${target_lang}&sl=${source_lang}&u=${encodeURIComponent(original_url)}`
  )
}
