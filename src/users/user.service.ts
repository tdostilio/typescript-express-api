import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { initializeApp } from 'firebase/app'
import * as dotenv from 'dotenv'

dotenv.config()
const firebaseConfig = {
  apiKey: process.env.FIREBASEAPIKEY,
  authDomain: process.env.FIREBASEAUTHDOMAIN,
  projectId: process.env.FIREBASEPROJECTID,
  storageBucket: process.env.FIREBASESTORAGEBUCKET,
  messagingSenderId: process.env.FIREBASEMESSAGINGSENDERID,
  appId: process.env.FIREBASEAPPID,
  measurementId: process.env.FIREBASEMEASUREMENTID,
}

export interface IdToken {
  token: string
}

initializeApp(firebaseConfig)
const auth = getAuth()

export const createUser = async (
  email: string,
  password: string
): Promise<IdToken> => {
  let userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
  const token = auth.currentUser && (await auth.currentUser.getIdToken())
  return { token }
}

export const signIn = async (
  email: string,
  password: string
): Promise<IdToken> => {
  await signInWithEmailAndPassword(auth, email, password)
  const token = auth.currentUser && (await auth.currentUser.getIdToken())
  return { token }
}

// named logout to avoid name collision w/ firebase
export const logOut = async (): Promise<void> => {
  await signOut(auth)
}
