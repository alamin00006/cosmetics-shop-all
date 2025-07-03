import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  sms_api_key: process.env.SMS_API_KEY_VALUE,
  sms_sender_id: process.env.SMS_SENDER_ID,
  sms_api_host: process.env.SMS_API_HOST_SITE,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  secretKey: process.env.secretKey,
  api_key: process.env.API_KEY,
  authMail: process.env.NODE_MAILER_AUTH_USER_EMAIL,
  authMailPassword: process.env.NODE_MAILER_AUTH_USER_PASS,
  jwt: {
    secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_secret: process.env.REFRESH_TOKEN_SECRET,
    expires_in: process.env.JWT_EXPIRES_IN,
    refresh_expires_in: process.env.JWT_REFRESH_EXPIRES_IN,
  },
}
