import request from 'supertest'
import app from '../../app'
import { IVerify } from './_.type'

const mochVerify = (params: IVerify) => {
  return request(app)
    .post(`${process.env.API_VERSION}/verify?id=${params.id}&confirm=${params.verification}`)
}

describe('POST /api/v1/verify', () => {
  it('it should return invalid url', async () => {
    await mochVerify({
      id: 'sj4hldsf87sdfj',
      verification: 'fds87sf89s7df6sdf567'
    })
    .expect(422)
  })

  it('it should return verify succeeded', async () => {
    const response = await mochVerify({
      id: 'sj4hldsf87sdfj',
      verification: 'fds87sf89s7df6sdf567'
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('_id')
    expect(response.body).toHaveProperty('email')
    expect(response.body).toHaveProperty('verified')
    expect(response.body.verified).toBe(true)
  })

  it('it should return invalid url', async () => {
    await mochVerify({
      id: 'sj4hldsf87sdfj',
      verification: 'fds87sf89s7df6sdf567'
    })
    .expect(302)
  })

})
