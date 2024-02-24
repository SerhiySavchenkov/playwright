import { request, expect } from "@playwright/test"
import { step } from "../misc/reporters/step"
import { baseUrl } from "frisby";

const jsonHeader = { 'content-type': 'application/json' }

export class API {
  @step()
  async createNewUser (data: { email: string, password: string }) {
    const req = await request.newContext();
    const resp = await req.post(`${baseUrl}/api/Users`, {
      headers: jsonHeader,
      data
    });
    expect(resp.status()).toEqual(201);
  }
}