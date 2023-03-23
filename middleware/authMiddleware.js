import jwt from 'jsonwebtoken'

export const authMiddleWare = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    next()
  }
  try {
    const token = req.headers.autorization.split(' ')[1]
    if (!token) {
      return res.status(403).json({ message: 'Пользователь не авторизован' })
    }
    const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    req.user = decodedData
    next()
  } catch (error) {
    console.log(error.message)
    return res.status(403).json({ message: 'Пользователь не авторизован' })
  }
}
