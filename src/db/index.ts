import mongoose, { ConnectOptions } from 'mongoose'

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      'mongodb://localhost:27017/mydatabase',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions
    )
    console.log('MongoDB Connected:', connection.connection.host)
  } catch (error) {
    console.error('MongoDB Connection Error:', error)
    process.exit(1) // Exit process with failure
  }
}

export default connectDB
