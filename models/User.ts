import mongoose, { Document, Model, Schema } from "mongoose"

export interface IUser extends Document {
  username: string
  email: string
  password: string
  fullname: string
  phone: string
  role: number
  avatar?: string
}

let User: Model<IUser>

try {
  User = mongoose.model<IUser>("User")
} catch (error) {
  const userSchema = new Schema<IUser>(
    {
      username: { type: String, required: true },
      email: { type: String, required: true },
      password: { type: String, required: true },
      fullname: { type: String, required: true },
      phone: { type: String, required: true },
      role: { type: Number, required: true },
      avatar: { type: String, required: false },
    },
    { timestamps: true }
  )

  User = mongoose.model<IUser>("User", userSchema)
}

export default User
