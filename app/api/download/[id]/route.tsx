import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import fs from 'fs'
import { promisify } from 'util'

const stat = promisify(fs.stat)

export async function GET(req: NextRequest, props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const file_name = params.id
  const file_path = path.join(
    process.cwd(),
    'assets',
    'cache',
    'source',
    file_name,
  )

  try {
    await stat(file_path)
  } catch {
    return new NextResponse(`Die Datei ${file_name} ist nicht verfügbar.`, {
      status: 404,
    })
  }

  const file_buffer = await fs.promises.readFile(file_path)
  const response = new NextResponse(file_buffer)

  response.headers.set('Content-Type', 'application/octet-stream')
  response.headers.set(
    'Content-Disposition',
    `attachment; filename="${file_name}"`,
  )

  return response
}
