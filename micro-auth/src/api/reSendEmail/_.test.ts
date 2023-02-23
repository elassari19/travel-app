import request from 'supertest'
import app from '../../app'
import { IReSend } from './_.type'

const mochReSendEmail = (params: IReSend) => {
  return request(app)
    .post(`${process.env.API_VERSION}/sendemail`)
    .set('Accept', 'application-json')
    .send(params)
}

describe('POST /api/v1/sendemail', () => {
  it('it should return invalid email', async () => {
    await mochReSendEmail({
      email: 'hichamomid.com'
    })
    .expect(422)
  })

  it('it should return user email not exist', async () => {
    await mochReSendEmail({
      email: 'hicham@omid.com'
    })
    .expect(404)
  })

  it('it should return send email verification succeeded', async () => {
    const response = await mochReSendEmail({
      email: 'hicham@omicmd.com'
    })
    expect(response.statusCode).toBe(200)
  })

  it('it should return send account already verified', async () => {
    const response = await mochReSendEmail({
      email: 'elassari@omicmd.com'
    })
    expect(response.statusCode).toBe(302)
  })

})
