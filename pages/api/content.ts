import type { NextApiRequest, NextApiResponse } from 'next'
import { getContent } from '@/lib/content'

interface DataResponse {
  content?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>,
) {
  const id = req.query.id as string
  const collection = req.query.collection as string

  const data = await getContent(collection, id)

  if (!data) {
    return res.status(404).json({ content: 'Not found' })
  }

  res.status(200).json(data)
}
