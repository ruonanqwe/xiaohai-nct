"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ProcessStep {
  id: string
  name: string
  description: string
  duration: string
  requiredDocs: string[]
  status: "active" | "inactive"
}

export default function SubsidyProcessPage() {
  const [steps, setSteps] = useState<ProcessStep[]>([
    {
      id: "1",
      name: "资格审查",
      description: "审核申请人是否满足基本申请条件",
      duration: "3个工作日",
      requiredDocs: ["身份证", "户口本", "收入证明"],
      status: "active",
    },
    {
      id: "2",
      name: "材料审核",
      description: "审核提交的证明材料是否完整有效",
      duration: "5个工作日",
      requiredDocs: ["补贴申请表", "相关证明文件"],
      status: "active",
    },
    {
      id: "3",
      name: "金额核算",
      description: "根据申请材料核算补贴金额",
      duration: "2个工作日",
      requiredDocs: ["银行账户信息"],
      status: "active",
    },
    {
      id: "4",
      name: "补贴发放",
      description: "将补贴金额转入申请人账户",
      duration: "3个工作日",
      requiredDocs: [],
      status: "active",
    },
  ])

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">补贴申请流程管理</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">流程步骤数</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{steps.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总处理时长</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {steps.reduce((sum, step) => sum + Number.parseInt(step.duration), 0)}个工作日
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Dialog>
          <DialogTrigger asChild>
            <Button>添加流程步骤</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新流程步骤</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">步骤名称</Label>
                <Input id="name" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">描述</Label>
                <Textarea id="description" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">处理时长</Label>
                <Input id="duration" placeholder="例：3个工作日" />
              </div>
            </div>
            <Button>添加</Button>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6">
        {steps.map((step, index) => (
          <Card key={step.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
                    {index + 1}
                  </div>
                  <CardTitle>{step.name}</CardTitle>
                </div>
                <Badge variant={step.status === "active" ? "default" : "secondary"}>
                  {step.status === "active" ? "启用" : "禁用"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">步骤描述</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">处理时长</h4>
                  <p className="text-sm text-muted-foreground">{step.duration}</p>
                </div>
                {step.requiredDocs.length > 0 && (
                  <div>
                    <h4 className="font-medium mb-2">所需材料</h4>
                    <div className="flex flex-wrap gap-2">
                      {step.requiredDocs.map((doc, i) => (
                        <Badge key={i} variant="secondary">
                          {doc}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">编辑</Button>
                  <Button variant="outline">删除</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

