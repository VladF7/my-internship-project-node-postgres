import jwt from 'jsonwebtoken'
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
      if (!validEmail) {
        return res.status(400).json({ message: 'Wrong email' })
      }
      const validPassword = password === process.env.ADMIN_PASSWORD
      if (!validPassword) {
        return res.status(400).json({ message: 'Wrong password' })
      }
      const token = generateAccessToken(email)
      return res.status(200).json({ token, user: email })
    } catch (error) {
      console.log(error.errors)
      return res.status(400).json(...error.errors)
    }
  },
  auth: async (req, res) => {
    try {
      const user = req.user
      const { email } = authSchema.parse(user)
      const token = generateAccessToken(email)
      return res.status(200).json({ token, user: email })
    } catch (error) {
      console.log(error)
    }
  }
}
