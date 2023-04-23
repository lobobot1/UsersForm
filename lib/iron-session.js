import { IronSessionOptions } from 'iron-session'
import { withIronSessionApiRoute } from 'iron-session/next';

/**
 *  Define ironSession options with password and secure mode when it's necessary
 *  @type { IronSessionOptions }
 */
export const sessionOption = {
	cookieName: 'user_form_session_cookie',
	password: process.env.SESSION_PASSWORD,
	cookieOptions: {
		secure: process.env.NODE_ENV === 'production'
	}
}

/**
 * 
 * @param {import('next').NextApiHandler} handler 
 * @returns { withIronSessionApiRoute }
 */
export function withSessionRoute(handler) {
  return withIronSessionApiRoute(handler, sessionOption);
}