import request from 'supertest'
import app from '../../app'
import { ISignIn } from './_.type'

const mochSignIn = (params: ISignIn) => {
  return request(app)
    .post(`${process.env.API_VERSION}/signin`)
    .set('Accept', 'application-json')
    .send(params)
}

describe('GET /api/v1/signin', () => {
  it('it should return invalid data', async () => {
    await mochSignIn({
      email: 'hichamomicmd.com',
      password: 'ddddd'
    })
    .expect(422)
  })

  it('it should return account not found', async () => {
    await mochSignIn({
      email: 'tar@omicmd.com',
      password: 'ddddd'
    })
    .expect(404)
  })

  it('it should return signin succeeded', async () => {
    const response = await mochSignIn({
      email: 'hicham@omicmd.com',
      password: 'ddddd'
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('modifiedCount')
    expect(response.body.modifiedCount).toBe(1)
  })

})
