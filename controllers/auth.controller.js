import jwt from 'jsonwebtoken'
import { ZodError } from 'zod'
import { authSchema, loginSchema } from '../validation/authSchema.js'

const generateAccessToken = (email) => {
  const payload = {
    email
  }
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, { expiresIn: '24h' })
}

export default {
  login: async (req, res) => {
    try {
      const body = req.body
      const { email, password } = loginSchema.parse(body)
      const validEmail = email === process.env.ADMIN_EMAIL
      const validPassword = password === process.env.ADMIN_PASSWORD
      if (!validEmail || !validPassword) {
        return res.status(400).send({ message: 'Wrong email or password' })
      }
      const token = generateAccessToken(email)
      return res.status(200).json({ token, user: email })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  },
  auth: async (req, res) => {
    try {
      const user = req.user
      const { email } = authSchema.parse(user)
      const token = generateAccessToken(email)
      return res.status(200).json({ token, user: email })
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).send(error.issues)
      } else {
        return res.status(500).send('Something went wrong')
      }
    }
  }
}
