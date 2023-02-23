import request from 'supertest'
import app from '../../app'
import { IVerify } from './_.type'

const mochVerify = (params: IVerify) => {
  return request(app)
    .get(`${process.env.API_VERSION}/verify?id=${params.id}&confirm=${params.verification}`)
}

describe('GET /api/v1/verify', () => {
  it('it should return invalid url', async () => {
    await mochVerify({
      id: '63f6a88b797eedd158e3141b',
      verification: 'fds87sf89s7df6sdf567'
    })
    .expect(422)
  })

  it('it should return verify succeeded', async () => {
    const response = await mochVerify({
      id: '63f6a88b797eedd158e3141b',
      verification: '75cc25fc2855fb54d36c6bb096b7412b646f75c14f952be7654e09219547ad6800b552b3c335b5d771efa91f74695bb9706068669a4f1bf994fceb2be8e2db34'
    })
    expect(response.statusCode).toBe(201)
    expect(response.body).toHaveProperty('modifiedCount')
    expect(response.body.modifiedCount).toBe(1)
  })

  it('it should return already verified', async () => {
    await mochVerify({
      id: '63f6a88b797eedd158e3141b',
      verification: '75cc25fc2855fb54d36c6bb096b7412b646f75c14f952be7654e09219547ad6800b552b3c335b5d771efa91f74695bb9706068669a4f1bf994fceb2be8e2db34'
    })
    .expect(302)
  })

})
