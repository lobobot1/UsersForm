import { NextResponse } from 'next/server'

/**
 * Return an HTTP 201 response with message like 'an {entity} has been created'
 * @param { object } options
 * @param { string } options.entity
 * @param { string } [options.message='a {entity} has been created']
 * @param { number } [options.id=undefined]
 * @returns { NextResponse }
 */
export function creationResponse({ entity, message, id }) {
  return new NextResponse(
    JSON.stringify({
      status: 201,
      message: message ?? `a ${entity} has been created`,
      data: id ? { id } : undefined,
    }),
    { status: 201, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 *
 * @returns
 */
export function alreadyLogged() {
  return new NextResponse(
    JSON.stringify({
      status: 200,
      message: 'already logged in',
    }),
    { status: 200, headers: { 'Content-Type': 'application/json' } }
  )
}

/**
 *  HTTP200 with collection of an entity {data[]}
 * @param { object } options
 * @param { array } [options.data=[]]
 * @param { object } [options.meta={}]
 * @returns { NextResponse }
 */
export function successListResponse({ data = [], meta } = {}) {
  return new NextResponse(
    JSON.stringify({
      data: data,
      count: data.length,
      timestamp: new Date(),
      status: 200,
      meta: meta,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

/**
 *  HTTP200 with an entity {data}
 * @param { object } options
 * @param { array } [options.data={}]
 * @returns { NextResponse }
 */
export function successRetrieveResponse({ data = {} } = {}) {
  return new NextResponse(
    JSON.stringify({
      data,
      timestamp: new Date(),
      status: 200,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

/**
 * Return an HTTP 200 response with message like 'an {entity} has been deleted'
 * @param { object } options
 * @param { string } options.entity
 * @param { string } [options.message='a {entity} has been deleted']
 * @returns { NextResponse }
 */
export function successDeleteResponse({ entity, message }) {
  return new NextResponse(
    JSON.stringify({
      message: message ?? `a ${entity} has been deleted`,
      status: 200,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

/**
 * Return an HTTP 200 response with message like 'an {entity} has been updated'
 * @param { object } options
 * @param { string } options.entity
 * @param { string } [options.message='a {entity} has been updated']
 * @returns { NextResponse }
 */
export function successUpdateResponse({ entity, message, data }) {
  return new NextResponse(
    JSON.stringify({
      message: message ?? `a ${entity} has been updated`,
      status: 200,
      data,
    }),
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )
}

/**
 * Return an HTTP 200 response with message like 'an {entity} has been updated'
 * @param { object } options
 * @param { string } options.entity
 * @param { string } [options.message='a {entity} has been updated']
 * @returns { NextResponse }
 */
export function successFileResponse({ data, filename }) {
  return new NextResponse(data, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment;filename="${filename}"`,
    },
    status: 200,
  })
}
