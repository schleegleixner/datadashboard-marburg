import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function Img(req: NextApiRequest, res: NextApiResponse) {
  const { name = null, w = 1200, h, q = 75 } = req.query
  const width = +w
  const height = h !== undefined ? +h : undefined
  const quality = +q

  if (!name || (Array.isArray(name) && name.length === 0)) {
    res.status(400).end('Missing image name')
    return
  }

  const src_path = path.join(
    process.cwd(),
    'assets',
    'cache',
    'images',
    path.basename(Array.isArray(name) ? name[0] : name),
  )
  const cache_dir = path.join(process.cwd(), 'assets', 'cache', 'images')
  const base = path.basename(src_path, path.extname(src_path))
  const deriv_name = `${base}_${width}x${height ?? 'auto'}_q${quality}.jpg`
  const cache_path = path.join(cache_dir, deriv_name)

  try {
    await fs.mkdir(cache_dir, { recursive: true })

    try {
      const cached = await fs.readFile(cache_path)
      res.setHeader('X-Cache', 'HIT')
      res.setHeader('Content-Type', 'image/jpeg')
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      res.end(cached)
      return
    } catch {
      // no cached file, continue
    }

    const buffer = await fs.readFile(src_path)
    const data = await sharp(buffer)
      .resize(width, height)
      .jpeg({ quality })
      .toBuffer()

    fs.writeFile(cache_path, new Uint8Array(data)).catch(() => void 0)

    res.setHeader('X-Cache', 'MISS')
    res.setHeader('Content-Type', 'image/jpeg')
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
    res.end(data) 
  } catch {
    res.status(404).end('')
  }
}