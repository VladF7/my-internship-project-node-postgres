class CustomError extends Error {
  constructor(code, status, ...params) {
    super(...params)

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError)
    }
    ;(this.code = code), (this.status = status)
  }
}

export default CustomError
