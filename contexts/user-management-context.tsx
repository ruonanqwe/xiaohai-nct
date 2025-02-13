"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { User } from "@/types/user"
import { mockUsers } from "@/data/mock/users"

interface UserManagementContextType {
  users: User[]
  setUsers: (users: User[]) => void
  addUser: (user: Partial<User>) => void
  updateUser: (id: string, data: Partial<User>) => void
  deleteUser: (id: string) => void
  toggleUserStatus: (id: string) => void
}

const UserManagementContext = createContext<UserManagementContextType | undefined>(undefined)

export function UserManagementProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(mockUsers)

  const addUser = useCallback((userData: Partial<User>) => {
    const newUser: User = {
      id: String(Date.now()),
      name: userData.name || "",
      email: userData.email || "",
      role: userData.role || "普通用户",
      status: userData.status || "活跃",
      department: userData.department || "",
      lastLogin: "-",
      registrationDate: new Date().toISOString().split('T')[0]
    }
    setUsers(prev => [...prev, newUser])
  }, [])

  const updateUser = useCallback((id: string, data: Partial<User>) => {
    setUsers(prev => prev.map(user => 
      user.id === id ? { ...user, ...data } : user
    ))
  }, [])

  const deleteUser = useCallback((id: string) => {
    setUsers(prev => prev.filter(user => user.id !== id))
  }, [])

  const toggleUserStatus = useCallback((id: string) => {
    setUsers(prev => prev.map(user => 
      user.id === id 
        ? { ...user, status: user.status === "活跃" ? "禁用" : "活跃" }
        : user
    ))
  }, [])

  return (
    <UserManagementContext.Provider value={{
      users,
      setUsers,
      addUser,
      updateUser,
      deleteUser,
      toggleUserStatus
    }}>
      {children}
    </UserManagementContext.Provider>
  )
}

export function useUserManagement() {
  const context = useContext(UserManagementContext)
  if (context === undefined) {
    throw new Error("useUserManagement must be used within a UserManagementProvider")
  }
  return context
} 