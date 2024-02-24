import { FullConfig, request, expect } from "@playwright/test"

//config: FullConfig<TestOptions>
//https://github.com/microsoft/playwright/issues/10524
//https://stackoverflow.com/questions/75994244/playwright-how-can-i-use-a-token-generated-by-an-api-to-be-used-across-all-test

const baseUrl = 'http://127.0.0.1:3000';
const jsonHeader = { 'content-type': 'application/json' }
let authHeader: { Authorization: string, 'content-type': string }

const address = {
  fullName: 'Serhiy',
  mobileNum: '987654321',
  zipCode: 'NX 101',
  streetAddress: 'Naukova Street',
  city: 'Lviv',
  state: 'Lviv',
  country: 'Ukraine'
}
const paymentCard = {
  fullName: 'Serhiy',
  cardNum: 1234567887654321,
  expMonth: 1,
  expYear: 2085
}

export interface AddressData {
    fullName: string;
    mobileNum: string;
    zipCode: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
}

export interface PaymentCardData {
    fullName: string;
    cardNum: number;
    expMonth: number;
    expYear: number;
}

export interface UserCreateRequest {
  email: string
  password: string
}

export async function createNewUser (data: UserCreateRequest) {
  const req = await request.newContext();
  const resp = await req.post(`${baseUrl}/api/Users`, {
    headers: jsonHeader,
    data
  });
  expect(resp.status()).toEqual(201);
  return await resp.json();
}

export async function loginUser (data: UserCreateRequest) {
  const req = await request.newContext();
  const resp = await req.post(`${baseUrl}/rest/user/login`, {
    headers: jsonHeader,
    data
  });
  expect(resp.status()).toEqual(200);
  const json = await resp.json();
  return { Authorization: 'Bearer ' + json.authentication.token, 'content-type': 'application/json' };
}

export async function addAddress(data: AddressData) {
  const req = await request.newContext();
  const resp = await req.post(`${baseUrl}/api/Addresss`, {
    headers: authHeader,
    data
  });
  expect(resp.status()).toEqual(201);
}

export async function addPaymentCard(data: PaymentCardData) {
  const req = await request.newContext();
  const resp = await req.post(`${baseUrl}/api/Cards`, {
    headers: authHeader,
    data
  });
  expect(resp.status()).toEqual(201);
}

export async function addAddressAndPaymentCard (data: UserCreateRequest ) {
  authHeader = await loginUser(data);
  await addAddress(address);
  await addPaymentCard(paymentCard);
}
