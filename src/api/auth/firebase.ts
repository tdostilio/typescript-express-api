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

const auth = getAuth()
initializeApp(firebaseConfig)

export interface User {
  uid: string
  email: string
  displayName?: string
  photoURL?: string
  // Include additional properties if needed
}

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  let userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  )
  const user = userCredential.user
  return user
}

export const signIn = async (
  email: string,
  password: string
): Promise<User> => {
  let userCredential = await signInWithEmailAndPassword(auth, email, password)
  const user = userCredential.user
  return user
}

// named logout to avoid name collision w/ firebase
export const logOut = async (): Promise<void> => {
  await signOut(auth)
}
