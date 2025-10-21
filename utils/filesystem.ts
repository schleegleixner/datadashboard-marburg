function getCachedContentPath() {
  return [process.cwd(), 'assets/cache'].filter(Boolean).join('/')
}

export function getDataPath(filename: string | boolean = false) {
  return [process.cwd(), 'assets/data', filename].filter(Boolean).join('/')
}

export function getFilePath(filename: string | boolean = false, folder: string | boolean = false, is_public: boolean = false) {
  return [process.cwd(), is_public ? 'public/' : 'assets/cache/', folder, filename]
    .filter(Boolean)
    .join('/')
}

export function getCacheFolderPath(
  content_type: string | null = 'content',
  folder: string | boolean = false,
) {
  return [getCachedContentPath(), content_type, folder]
    .filter(Boolean)
    .join('/')
}

// get the file path for the cache
export function getCachePath(
  content_type: string | null = 'content',
  folder: string | boolean = false,
  id: string | number | boolean,
) {
  const target = getCacheFolderPath(content_type, id ? folder : false)

  return [target, `${id || folder || 'default'}.json`].filter(Boolean).join('/')
}
