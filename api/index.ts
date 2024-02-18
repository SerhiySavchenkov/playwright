import { request, expect } from "@playwright/test"
import { step } from "../misc/reporters/step"

const API_URL = 'http://localhost:3000/api'
const REST_URL = 'http://localhost:3000/rest'

const jsonHeader = { 'content-type': 'application/json' }

export class API {
  @step()
  async createNewUser (data: { email: string, password: string }) {
    const req = await request.newContext();
    const resp = await req.post(`${API_URL}/Users`, {
      headers: jsonHeader,
      data
    })
    expect(resp.status()).toEqual(201);
    return await resp.json()
  }
}
