/**
 *  We take care of the log in of an user.
 *  in case of log-in  we check if it's a valid user
 */

import { NextRequest, NextResponse } from 'next/server'
import { decodeCookie, signCookie } from '@lib/jwt'
import prisma from '@lib/prisma'
import { compare } from '@lib/crypt'

/**
 *
 * @param { NextRequest } request
 * @param { import("next").NextPageContext } context
 */
export async function POST(request) {
  /**
   * Check if exists session cookie
   */
  const payload = decodeCookie(request)
  /** if exists a valid cookie */
  console.log({ payload: payload })
  if (!payload?.error && payload?.id) {
    return new NextResponse(
      JSON.stringify({
        ok: 200,
        message: 'already logged in',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    )
  }

  if (payload?.error) {
    console.log(payload?.error)
    return new NextResponse(
      JSON.stringify({ status: '500', error: 'an error has occurred' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    )
  }

  /** else if not has cookie... validate body and return a cookie */

  const { username, password } = await request.json()

  /**
   * username can be email or nickname
   */
  const user = await prisma.user.findFirst({
    where: {
      email: { equals: username },
      nickname: { equals: username },
    },
    select: {
      id: true,
      password: true,
    },
  })

  const isSame = compare(password, user?.password)

  if (isSame) {
    console.log('pasamos a relogear a la gente...')
    return signCookie(
      NextResponse.json({
        ok: 200,
        message: 'successful login',
      }),
      { id: user.id }
    )
  }
}
