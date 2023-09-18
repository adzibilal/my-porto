"use client"

import { ChangeEvent, FormEvent, useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"

interface FormData {
  fullname: string
  email: string
  phone: string
  role: string
  avatar: string
  password: string
  confirmPassword: string
}

export default function TambahUser() {
  const [formData, setFormData] = useState<FormData>({
    fullname: "",
    email: "",
    phone: "",
    role: "",
    avatar: "",
    password: "",
    confirmPassword: "",
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Anda dapat mengakses data formulir dalam objek formData di sini
    console.log(formData)

    // Tambahkan logika validasi dan pengiriman ke backend di sini
  }

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <SiteHeader />
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Tambah Data Pengguna
          </h2>
          <p className="text-muted-foreground">Isi Formulir dengan lengkap</p>
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit}>
          <div className="mb-3 grid w-full items-center gap-1.5">
            <Label htmlFor="fullname">Fullname</Label>
            <Input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Fullname"
              value={formData.fullname}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 grid w-full items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 grid w-full items-center gap-1.5">
            <Label htmlFor="phone">Phone</Label>
            <Input
              type="text"
              id="phone"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 grid w-full items-center gap-1.5">
            <Label htmlFor="role">Role</Label>
            <Input
              type="number"
              id="role"
              name="role"
              placeholder="Role"
              value={formData.role}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 grid w-full items-center gap-1.5">
            <Label htmlFor="avatar">Avatar</Label>
            <Input
              type="text"
              id="avatar"
              name="avatar"
              placeholder="Avatar URL"
              value={formData.avatar}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 grid w-full items-center gap-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-3 grid w-full items-center gap-1.5">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}
