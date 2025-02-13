"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { mockDistricts, mockHouseTypes } from "@/data/mock/families"

interface FamilyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FamilyDialog({ open, onOpenChange }: FamilyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>添加家庭</DialogTitle>
          <DialogDescription>
            请填写家庭基本信息
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              家庭名称
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="district" className="text-right">
              所属区域
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择区域" />
              </SelectTrigger>
              <SelectContent>
                {mockDistricts.map(district => (
                  <SelectItem key={district.value} value={district.value}>
                    {district.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              详细地址
            </Label>
            <Input id="address" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="houseType" className="text-right">
              住房类型
            </Label>
            <Select>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="选择住房类型" />
              </SelectTrigger>
              <SelectContent>
                {mockHouseTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button 
            type="submit" 
            size="responsive" 
            className="w-full sm:w-auto"
          >
            保存
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 