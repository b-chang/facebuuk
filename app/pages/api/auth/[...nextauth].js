import axios from 'axios';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { API_BASE_URL } from '../../../config';
const jwt_decode = require('jwt-decode');

const providers = [
  Providers.Credentials({
    name: 'Credentials',
    authorize: async (credentials) => {
      try {
        const userCreds = {
          email: credentials.email,
          password: credentials.password
        }
        
        const res = await axios.get(`${API_BASE_URL}/posts`)
        const response = await axios.post(`${API_BASE_URL}/login`, userCreds, 
        {
          withCredentials: true,
          credentials: 'include',
        })

        const id = jwt_decode(response.headers['set-cookie'][0])
        const { name } = response.data.user
        const user = {
          ...id,
          name
        }
        if (response) {
          return user
        } 
      } catch (e) {
        const errorMessage = e.response.data.message
        // Redirecting to the login page with error message in the URL
        throw new Error(errorMessage)
      }

    }
  })
]
const callbacks = {}

callbacks.jwt = async function jwt(token, user) {
  if (user) token.user = user

  return Promise.resolve(token)
}

callbacks.session = async function session(session, token) {
    session.user = token.user
    session.accessToken = token.accessToken
    return session
}

const options = {
  providers,
  callbacks,
  pages: {
    error: '/login' // Changing the error redirect page to our custom login page
  }
}

export default (req, res) => NextAuth(req, res, options)
