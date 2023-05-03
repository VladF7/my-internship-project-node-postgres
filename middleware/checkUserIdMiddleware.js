export const checkUserId = () => {
  return (req, res, next) => {
    if (req.method === 'OPTIONS') {
      next()
    }
    try {
      const decodedData = req.user

      if (decodedData.masterId) {
        const { masterId } = req.params
        if (decodedData.masterId !== +masterId) {
          return res.status(403).json({ message: "Don't have access" })
        }
      } else {
        const { customerId } = req.params
        if (decodedData.customerId !== +customerId) {
          return res.status(403).json({ message: "Don't have access" })
        }
      }

      next()
    } catch (error) {
      return res.status(403).json({ message: 'User not authorized' })
    }
  }
}
