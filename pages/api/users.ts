import { NextApiRequest, NextApiResponse } from "next"
import User, { IUser } from "@/models/User"
import connectToDB from "@/utils/database"

connectToDB()

const ApiUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method, query } = req
  const { userId, page, perPage, search } = query
  //@ts-ignore
  const pageNumber = parseInt(page) || 1
  //@ts-ignore
  const itemsPerPage = parseInt(perPage) || 10 // Ubah sesuai kebutuhan

  if (req.method === "GET") {
    try {
      if (userId) {
        // If userId is provided, find user by userId
        const user = await User.findById(userId)

        if (!user) {
          return res.status(404).json({ error: "User not found" })
        }

        res.status(200).json(user)
      } else if (search) {
        // If there's a search parameter, perform a search based on username or email
        const totalUsers = await User.countDocuments({
          $or: [
            { username: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        })
        const totalPages = Math.ceil(totalUsers / itemsPerPage)

        const users = await User.find({
          $or: [
            { username: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } },
          ],
        })
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage)

        res.status(200).json({
          success: true,
          data: users,
          totalUsers,
          totalPages,
          currentPage: pageNumber,
        })
      } else {
        // If userId is not provided, fetch users with pagination
        const totalUsers = await User.countDocuments()
        const totalPages = Math.ceil(totalUsers / itemsPerPage)

        const users = await User.find()
          .skip((pageNumber - 1) * itemsPerPage)
          .limit(itemsPerPage)

        res.status(200).json({
          success: true,
          data: users,
          totalUsers,
          totalPages,
          currentPage: pageNumber,
        })
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" })
    }
  } else if (req.method === "POST") {
    const { username, email, password, fullname, phone, role, avatar } =
      req.body

    try {
      const newUser = new User({
        username,
        email,
        password,
        fullname,
        phone,
        role,
        avatar,
      })

      await newUser.save()
      res.status(201).json({ success: true, data: newUser })
    } catch (error) {
      res.status(400).json({ success: false, error: "Bad Request" })
    }
  } else if (req.method === "PUT") {
    const { id, username, email, password, fullname, phone, role, avatar } =
      req.body

    try {
      const updatedUser = await User.findByIdAndUpdate(id, {
        username,
        email,
        password,
        fullname,
        phone,
        role,
        avatar,
      })

      if (!updatedUser) {
        return res.status(404).json({ error: "User not found" })
      }

      res.status(200).json(updatedUser)
    } catch (error) {
      res.status(500).json({ error: "Server error" })
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body

    try {
      const deletedUser = await User.findByIdAndRemove(id)

      if (!deletedUser) {
        return res.status(404).json({ error: "User not found" })
      }

      res.status(200).json({ message: "User deleted successfully" })
    } catch (error) {
      res.status(500).json({ error: "Server error" })
    }
  } else {
    res.status(405).json({ error: "Method not allowed" })
  }
}

export default ApiUsers
