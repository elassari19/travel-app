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
  it('sould return invalid data', async () => {
    await mochSignup({
      email: 'elassari19',
      password: 'fds',
      confirm: 'fdsfjklj4r'
    })
    .expect(422)
  })

  it('sould return signup succeeded', async () => {
    const response = await mochSignup({
      email: 'elassari19',
      password: 'fdsfjklj4r',
      confirm: 'fdsfjklj4r'
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('password')
    expect(response.body).toHaveProperty('confirm')
  })

  it('sould return already exist', async () => {
    await mochSignup({
      email: 'elassari19',
      password: 'fdsfjklj4r',
      confirm: 'fdsfjklj4r'
    })
    .expect(422)
  })

})
