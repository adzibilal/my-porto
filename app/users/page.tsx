"use client"

import { useEffect, useState } from "react"
import { Metadata } from "next"
import Link from "next/link"
import { IUser } from "@/models/User"

import { parseRole } from "@/lib/utils"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Pagination from "@/components/pagination"
import { SiteHeader } from "@/components/site-header"
import TableUserSkeleton from "@/components/skeleton/table-user-skeleton"
import { UserNav } from "@/components/user-nav"

export const metadata: Metadata = {
  title: "Tasks",
  description: "A task and issue tracker build using Tanstack Table.",
}

interface IPagination {
  currentPage: number
  totalPages: number
  totalUsers: number
}

export default function TaskPage() {
  const [users, setUsers] = useState<IUser[]>([])
  const [pagination, setPagination] = useState<IPagination>({
    currentPage: 1,
    totalPages: 0,
    totalUsers: 0,
  })
  const [searchValue, setSearchValue] = useState("")
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    fetchData(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchData = async (page: number) => {
    try {
      let apiUrl = `/api/users?page=${page}&perPage=3`

      if (searchValue) {
        apiUrl += `&search=${searchValue}`
      }

      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()
        setUsers(data.data)
        setPagination({
          currentPage: data.currentPage,
          totalPages: data.totalPages,
          totalUsers: data.totalUsers,
        })
      } else {
        console.error("Failed to fetch users")
      }
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex h-full flex-1 flex-col space-y-8 p-8 md:flex">
        <SiteHeader />
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Data Pengguna</h2>
            <p className="text-muted-foreground">
              Berikut Data Pengguna My Porto
            </p>
          </div>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="text"
              placeholder="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button onClick={() => fetchData(1)}>Search</Button>

            <Button className="!w-[100px]">
              <Link href="/users/add">Tambah User</Link>
            </Button>
          </div>
        </div>
        {loading ? (
          <TableUserSkeleton />
        ) : (
          <Table className="!rounded-sm border">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Nama</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: IUser) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.fullname}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{parseRole(user.role)}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button>Button</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {!loading && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            onPageChange={(newPage) => fetchData(newPage)}
          />
        )}
      </div>
    </>
  )
}
