/**
 *  We take care of the register of an user.
 *  in case of register we check if it's a valid user
 *  and the registrant is an Admin user successfully logged in.
 */

import { NextRequest } from 'next/server'
import prisma from '@lib/prisma'
import { encryptToSaveDB } from '@lib/crypt'
import isAdminRequest from '@lib/auth/isAdminRequest'
import {
  fatality,
  someFieldMissing,
  somePrismaError,
  unauthorized,
} from '@lib/http/ErrorHandler'
import { creationResponse } from '@lib/http/ResponseHandler'
import emailCheck from '@/util/emailRegex'

/**
 *
 * @param {NextRequest} request
 */
export async function POST(request) {
  /**
   * Check if exists session cookie
   */

  /** if user is not an admin */
  if (!(await isAdminRequest(request))) return unauthorized()

  const body = await request.json()

  const { email, name, password, rePassword } = body
  if (
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
  const nickname =
    body?.nickname && body?.nickname !== '' ? body?.nickname : null
  /** validate unique nickname */
  if (nickname) {
    const nicknames = await prisma.user.count({
      where: { nickname },
    })

    if (nicknames > 0)
      return someFieldMissing({ message: 'nickname is already used' })
  }
  /** check if it's an valid email */
  const isEmail = emailCheck(email)

  if (!isEmail) {
    return someFieldMissing({ message: 'wrong email address' })
  }

  /** validate unique email */
  if (email) {
    const emails = await prisma.user.count({
      where: { email },
    })

    if (emails > 0)
      return someFieldMissing({ message: 'e-mail is already used' })
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
    isAdmin: body?.isAdmin ?? false,
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
    return somePrismaError(error)
  }
}
