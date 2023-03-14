import jwt from 'jsonwebtoken'

// handle the secret key
const getJwtSecrets = () => {
  // if no secret key 
  if (!process.env.JWT_SECRET) {
    console.log('Missing jwt secrect')
    // exit the server
    return process.exit(1)
  }

  // the secret key exist
  return process.env.JWT_SECRET
}

export const sign = (id: Object) => {
  return jwt.sign(id, getJwtSecrets(), { expiresIn: '3d' })
}

export const verify = (token: string) => {
  try {
    return jwt.verify(token, getJwtSecrets())
  } catch (error) {
    return 'error'
  }
}