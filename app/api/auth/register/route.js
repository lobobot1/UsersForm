/**
 *  We take care of the register of an user.
 *  in case of register we check if it's a valid user
 *  and the registrant is an Admin user successfully logged in.
 */

import { NextRequest, NextResponse } from 'next/server'
import prisma from '@lib/prisma'
import { encryptToSaveDB } from '@lib/crypt'
import isAdminRequest from '@lib/auth/isAdminRequest'
import emailRegex from '@/util/emailRegex'

/**
 *
 * @param {NextRequest} request
 */
export async function POST(request) {
  /**
   * Check if exists session cookie
   */
  const isAdmin = await isAdminRequest(request)

  console.log({ cookie: request.cookies.get('session_cookie') })
  /** if user is not an admin */
  if (!isAdmin) {
    return new NextResponse(
      JSON.stringify({
        status: 401,
        message: 'you are not allowed to register users',
      }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    )
  }

  const body = await request.json()

  const { nickname, email, name, password, rePassword } = body
  if (
    !nickname ||
    nickname == '' ||
    !name ||
    name == '' ||
    !password ||
    password == '' ||
    !rePassword ||
    rePassword == ''
  ) {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: 'some fields are missing',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }
  /** if there is a lastname or not, we assign it */
  const lastname =
    body?.lastname && body?.lastname !== '' ? body?.lastname : null

  /** check if it's an valid email */
  const isEmail = emailRegex.test(email)

  if (!isEmail) {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: 'wrong email address',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  /** check if password matches */
  if (!(password === rePassword)) {
    return new NextResponse(
      JSON.stringify({
        status: 400,
        message: 'passwords do not match',
      }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    )
  }

  /** Prepare data from db */
  const encryptedPassword = encryptToSaveDB(password)
  const newUser = {
    email,
    name,
    lastname,
    nickname,
    password: encryptedPassword,
    isAdmin: false,
  }
  try {
    const resultCreated = await prisma.user.create({ data: newUser })

    if (!resultCreated) {
      return new NextResponse(
        JSON.stringify({ status: 500, error: 'an error has occurred' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      )
    }

    return new NextResponse(
      JSON.stringify({ status: 201, message: 'an user has created' }),
      { status: 201, headers: { 'Content-Type': 'application/json' } }
    )
  } catch (error) {
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
}
