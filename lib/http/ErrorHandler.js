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
 * return an HTTP400 with message: 'invalid url field'
 * @param { object } options
 * @param { number } [options.status=400]
 * @param { string } [options.message='invalid url param']
 * @returns {NextResponse}
 */
export function invalidUrlParam({
  status = 400,
  message = 'invalid url param',
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
export function somePrismaError(error) {
  if (error?.code === 'P2002') {
    const {
      meta: { target },
    } = error
    return responseFormatter(`${target.toLocaleString()} value exists`, 400)
  }

  if (error?.code === 'P2025') {
    const {
      meta: { cause },
    } = error
    return responseFormatter(cause, 404)
  }

  console.log({ prismaError: error.message })
  return responseFormatter('Internal Server Error', 500)
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

export function notFoundResponse({ entity }) {
  return new NextResponse(
    JSON.stringify({
      status: 404,
      message: 'not found ' + entity,
    }),
    { status: 404, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 *
 * @param { object } options
 * @param { string } options.entity
 * @param { 'create' | 'update' | 'delete'  } options.action
 * @returns
 */
export function cantDoThatResponse({ entity, action }) {
  return new NextResponse(
    JSON.stringify({
      status: 409,
      message: `can't ${action} this ${entity}`,
    }),
    { status: 409, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 *
 * @param { string } message
 * @param { number } status
 * @param { Headers } headers
 * @returns { NextResponse }
 */
function responseFormatter(
  message,
  status = 500,
  headers = { 'Content-Type': 'application/json' }
) {
  return new NextResponse(
    JSON.stringify({
      status,
      message,
    }),
    { status, headers }
  )
}
