import { NextResponse } from 'next/server'

/**
 * return an HTTP400 with message: some fields are missing
 * @param { object } options
 * @param { number } [options.status=400]
 * @param { string } [options.message='some fields are missing']
 * @returns {NextResponse}
 */
export function someFieldMissing({
  status = 400,
  message = 'some fields are missing',
} = {}) {
  console.log({ status })
  return new NextResponse(
    JSON.stringify({
      status: status,
      message: message,
    }),
    { status, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 * return an HTTP 401 with message: 'you are not allowed to '{entity}
 * @param { object } options
 * @param { number } [options.status=401]
 * @param { string } [options.entity=register users]
 * @returns {NextResponse}
 */
export function unauthorized({ status = 401, entity = 'register users' } = {}) {
  return new NextResponse(
    JSON.stringify({
      status,
      message: 'you are not allowed to ' + entity,
    }),
    { status, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 * return an Error Response with prisma error catched
 * @param { Error } error
 * @returns { NextResponse }
 */
export function someFieldUnique(error) {
  if (error?.code === 'P2002') {
    const {
      meta: { target },
    } = error
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: `${target.toLocaleString()} value exists`,
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
}

/**
 * error in server
 * @returns { NextResponse }
 */
export function fatality() {
  return new NextResponse(
    JSON.stringify({ status: 500, error: 'an error has occurred' }),
    { status: 500, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 *
 * @returns { NextResponse }
 */
export function failedLogin() {
  return new NextResponse(
    JSON.stringify({
      status: 403,
      message: 'failed login attempt',
    }),
    { status: 403, headers: { 'Content-Type': 'application/json' } }
  )
}
