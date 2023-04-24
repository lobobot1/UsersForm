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
import {
  fatality,
  someFieldMissing,
  someFieldUnique,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { creationResponse } from '@lib/http/ResponseHandler'

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
    return unauthorized()
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
    return someFieldMissing()
  }
  /** if there is a lastname or not, we assign it */
  const lastname =
    body?.lastname && body?.lastname !== '' ? body?.lastname : null

  /** check if it's an valid email */
  const isEmail = emailRegex.test(email)

  if (!isEmail) {
    return someFieldMissing({ message: 'wrong email address' })
  }

  /** check if password matches */
  if (!(password === rePassword)) {
    return someFieldMissing({ message: 'passwords do not match' })
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
      return fatality()
    }

    return creationResponse({
      entity: 'user',
      message: 'an user has been created',
    })
  } catch (error) {
    return someFieldUnique(error)
  }
}
