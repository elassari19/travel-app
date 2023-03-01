import jwt from 'jsonwebtoken'

const getJwtSecrets = () => {
  if (!process.env.JWT_SECRET) {
    console.log('Missing jwt secrect')
    return process.exit(1)
  }
  return process.env.JWT_SECRET
}

export const jwtSign = (id: String) => {
  jwt.sign(id, getJwtSecrets())
}

export const jwtVerify = (token: string) => {
  jwt.verify(token, getJwtSecrets())
}