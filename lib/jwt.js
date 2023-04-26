import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

const { SECRET } = process.env

const jwtOption = {
  expiresIn: '7 days',
}

export const cookieOption = {
  httpOnly: true,
  name: 'session_cookie',
  path: '/',
  sameSite: 'strict', //Change to 'strict'
  secure: process.env.NODE_ENV === 'production',
  maxAge: 604800, // 7 days
}

/**
 * Parse arg to a jwt cookie in response
 * @param { NextResponse } res
 * @param { any } payload
 * @returns
 */
export function signCookie(res, payload) {
  const token = signJwt(payload)
  if (!token) {
    throw new Error('Error to create Cookie')
  }
  res.cookies.set({
    ...cookieOption,
    value: token,
  })
  return res
}

/**
 * parse payload to a json web token
 * @param { any } payload
 * @returns { string } jwt
 */
function signJwt(payload) {
  try {
    const token = jwt.sign(payload, SECRET, jwtOption)
    return token
  } catch (error) {
    return null
  }
}

/**
 * Looks at the session cookie and returns parsed payload
 * @param {NextRequest} req
 * @returns
 */
export function decodeCookie(req) {
  const cookie = req.cookies.get(cookieOption.name)
  if (!cookie) {
    return null
  }
  return verifyJwt(cookie.value)
}

/**
 * Check json web token and returns payload
 * @param { string } token
 * @returns
 */
export function verifyJwt(token) {
  try {
    return jwt.verify(token, SECRET, jwtOption)
  } catch (error) {
    return {
      error,
    }
  }
}
