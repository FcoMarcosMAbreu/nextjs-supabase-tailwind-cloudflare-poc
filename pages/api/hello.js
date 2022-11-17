// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export const config = {
  runtime: 'experimental-edge',
}

/* export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
} */

export default async function (req) {
  return new Response(
    JSON.stringify({ name: 'John Doe' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
