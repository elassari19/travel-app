import request from 'supertest'
import app from '../../app'
import { ISignup } from './_.type'

const mochSignup = (params: ISignup) => {
  return request(app)
    .post(`${process.env.API_VERSION}/signup`)
    .set('Accept', 'application-json')
    .send(params)
}

describe('POST /api/v1/signup', () => {
  it('it should return invalid data', async () => {
    await mochSignup({
      email: 'elassari19',
      password: 'fds',
      confirm: 'fdsfjklj4r'
    })
    .expect(422)
  })

  it('it should return signup succeeded', async () => {
    const response = await mochSignup({
      email: 'elassari19@gamil.com',
      password: 'fdsfjklj4rwr',
      confirm: 'fdsfjklj4rwr'
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('password')
  })

  it('it should return already exist', async () => {
    await mochSignup({
      email: 'elassari19@gamil.com',
      password: 'fdsfjklj4rwr',
      confirm: 'fdsfjklj4rwr'
    })
    .expect(302)
  })

})
