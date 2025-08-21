import type { NextApiRequest, NextApiResponse } from 'next'
import { getAPI } from '@/lib/cms'

interface DataResponse {
  content?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataResponse>,
) {
  const route = req.query.route as string
  const lifetime = parseInt(req.query.lifetime as string, 10)

  if (!route) {
    return res.status(404).json({ content: 'Not found' })
  }

  const data = await getAPI(route, true, lifetime)

  if (data) {
    res.status(200).json(data)
  } else {
    res.status(404).json({})
  }
}
