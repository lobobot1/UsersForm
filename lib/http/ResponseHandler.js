import { NextResponse } from 'next/server'

/**
 * Return an HTTP 201 response with message like 'an {entity} has created'
 * @param { object } options
 * @param { string } options.entity
 * @param { string } [options.message='a {entity} has been created']
 * @returns { NextResponse }
 */
export function creationResponse({ entity, message }) {
  return new NextResponse(
    JSON.stringify({
      status: 201,
      message: message ?? `a ${entity} has been created`,
    }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  )
}

export function alreadyLogged() {
  return new NextResponse(
    JSON.stringify({
      status: 200,
      message: 'already logged in',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}
