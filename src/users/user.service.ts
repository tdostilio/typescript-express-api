import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
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

initializeApp(firebaseConfig)
const auth = getAuth()

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
