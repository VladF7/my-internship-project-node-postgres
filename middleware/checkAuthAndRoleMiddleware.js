import jwt from 'jsonwebtoken'

export const checkAuthAndRole = (role) => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'User not authorized' })
      }
      const decodedData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)

      if (decodedData.role !== role) {
        return res.status(403).json({ message: "Don't have access" })
      }
      req.user = decodedData
      next()
    } catch (error) {
      return res.status(403).json({ message: 'User not authorized' })
    }
  }
}
