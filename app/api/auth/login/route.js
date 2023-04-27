/**
 *  We take care of the log in of an user.
 *  in case of log-in we check if it's a valid user
 */

import { NextRequest, NextResponse } from 'next/server'
import { decodeCookie, signCookie } from '@lib/jwt'
import prisma from '@lib/prisma'
import { compare } from '@lib/crypt'
import { alreadyLogged } from '@lib/http/ResponseHandler'
import { failedLogin, fatality } from '@lib/http/ErrorHandler'

/**
 *
 * @param { NextRequest } request
 */
export async function POST(request) {
  /**
   * Check if exists session cookie
   */
  const payload = decodeCookie(request)
  /** if exists a valid cookie */
  console.log({ payload: payload })
  if (!payload?.error && payload?.id) {
    return alreadyLogged()
  }

  if (payload?.error) {
    console.log(payload?.error)
    return fatality()
  }

  /** else if not has cookie... validate body and return a cookie */

  const { username, password } = await request.json()

  /**
   * username can be email or nickname
   */
  const user = await prisma.user.findFirst({
    where: {
      OR: [
        {
          email: username,
        },
        { nickname: username },
      ],
    },
    select: {
      id: true,
      password: true,
    },
  })

  const isSame = compare(password, user?.password)

  if (!isSame) return failedLogin()

  return signCookie(
    NextResponse.json({
      status: 200,
      message: 'successful login',
    }),
    { id: user.id }
  )
}
