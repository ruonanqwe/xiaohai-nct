"use client"

import { createContext, useContext, useState, useCallback } from "react"
import { mockFamilies } from "@/data/mock/families"

interface Family {
  id: string
  name: string
  members: number
  address: string
  monthlyIncome: number
  subsidyStatus: string
  lastUpdate: string
  district: string
  houseType: string
  registrationDate: string
  members_detail: {
    id: string
    name: string
    relation: string
    age: number
    occupation: string
    income: number
  }[]
}

interface FamilyManagementContextType {
  families: Family[]
  setFamilies: (families: Family[]) => void
  addFamily: (family: Partial<Family>) => void
  updateFamily: (id: string, data: Partial<Family>) => void
  deleteFamily: (id: string) => void
}

const FamilyManagementContext = createContext<FamilyManagementContextType | undefined>(undefined)

export function FamilyManagementProvider({ children }: { children: React.ReactNode }) {
  const [families, setFamilies] = useState<Family[]>(mockFamilies)

  const addFamily = useCallback((familyData: Partial<Family>) => {
    const newFamily: Family = {
      id: String(Date.now()),
      name: familyData.name || "",
      members: familyData.members || 0,
      address: familyData.address || "",
      monthlyIncome: familyData.monthlyIncome || 0,
      subsidyStatus: "未申请",
      lastUpdate: new Date().toISOString().split('T')[0],
      district: familyData.district || "",
      houseType: familyData.houseType || "",
      registrationDate: new Date().toISOString().split('T')[0],
      members_detail: familyData.members_detail || []
    }
    setFamilies(prev => [...prev, newFamily])
  }, [])

  const updateFamily = useCallback((id: string, data: Partial<Family>) => {
    setFamilies(prev => prev.map(family => 
      family.id === id ? { ...family, ...data } : family
    ))
  }, [])

  const deleteFamily = useCallback((id: string) => {
    setFamilies(prev => prev.filter(family => family.id !== id))
  }, [])

  return (
    <FamilyManagementContext.Provider value={{
      families,
      setFamilies,
      addFamily,
      updateFamily,
      deleteFamily
    }}>
      {children}
    </FamilyManagementContext.Provider>
  )
}

export function useFamilyManagement() {
  const context = useContext(FamilyManagementContext)
  if (context === undefined) {
    throw new Error("useFamilyManagement must be used within a FamilyManagementProvider")
  }
  return context
} 