import { http } from 'follow-redirects'
import config from '../config/index.js'

interface RequestOptions {
  method: string;
  hostname: string | undefined;
  path: string;
  headers: Record<string, string>;
  maxRedirects: number;
}

export function otpSendSms2(
  bookingMessage: string,
  method: string,
): Promise<string> {
  return new Promise((resolve, reject) => {
    const options: RequestOptions = {
      method,
      hostname: config.sms_api_host,
      path: bookingMessage,
      headers: {},
      maxRedirects: 20,
    }

    const req = http.request(options, res => {
      const chunks: Buffer[] = []

      res.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      res.on('end', () => {
        const body = Buffer.concat(chunks)
        resolve(body.toString())
      })

      res.on('error', (error: Error) => {
        reject(error)
      })
    })

    req.end()
  })
}

export const otpGet = async (url: string): Promise<void> => {
  try {
    const res = await fetch(url)
    const data: unknown = await res.json()
    console.log('SMS Response:', data)
  } catch (err) {
    console.error('Error sending SMS:', err)
  }
}
