// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { sendEmail } from '@/lib/emailservice'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  sendEmail({text:"abfhjavbfjhafvb", to: "loyogoy3@gmail.com"})
  res.status(200).json({ name: 'John Doe' })
}
