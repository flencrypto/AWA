import { getToken } from 'next-auth/jwt'
import { readCollection, writeCollection } from '@/lib/google-drive'
import { getAuthSecret } from '@/lib/auth-secret'
import { NextRequest, NextResponse } from 'next/server'

const VALID_COLLECTIONS = ['clients', 'jobs', 'quotes', 'invoices', 'certificates']
const MAX_PAYLOAD_BYTES = 500_000 // 500 kB

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params
  if (!VALID_COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
  }

  const token = await getToken({ req, secret: getAuthSecret() })
  if (!token?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await readCollection(token.accessToken as string, collection)
    return NextResponse.json(data)
  } catch (err) {
    console.error(`Drive read error [${collection}]:`, err)
    return NextResponse.json({ error: 'Failed to read data' }, { status: 500 })
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ collection: string }> }
) {
  const { collection } = await params
  if (!VALID_COLLECTIONS.includes(collection)) {
    return NextResponse.json({ error: 'Invalid collection' }, { status: 400 })
  }

  const token = await getToken({ req, secret: getAuthSecret() })
  if (!token?.accessToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const contentLength = Number(req.headers.get('content-length') ?? 0)
  if (contentLength > MAX_PAYLOAD_BYTES) {
    return NextResponse.json({ error: 'Payload too large' }, { status: 413 })
  }

  try {
    const body: unknown = await req.json()
    if (!Array.isArray(body)) {
      return NextResponse.json({ error: 'Request body must be an array' }, { status: 400 })
    }
    await writeCollection(token.accessToken as string, collection, body)
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(`Drive write error [${collection}]:`, err)
    return NextResponse.json({ error: 'Failed to write data' }, { status: 500 })
  }
}
