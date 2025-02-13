"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [faqs, setFaqs] = useState<FAQ[]>([
    {
      id: "1",
      question: "如何申请补贴？",
      answer: "您可以通过我们的在线平台或到当地服务中心提交申请。需要准备身份证、户口本等相关证明文件。",
      category: "申请流程",
    },
    {
      id: "2",
      question: "补贴审核需要多长时间？",
      answer: "一般情况下，审核时间为5-10个工作日。特殊情况可能需要更长时间。",
      category: "审核过程",
    },
    {
      id: "3",
      question: "如何查询申请进度？",
      answer: "登录您的账户，在&quot;我的申请&quot;页面可以查看所有申请的当前状态和进度。",
      category: "申请流程",
    },
  ])

  const [newFAQ, setNewFAQ] = useState({ question: "", answer: "", category: "" })

  const handleAddFAQ = () => {
    if (newFAQ.question && newFAQ.answer && newFAQ.category) {
      setFaqs([...faqs, { id: (faqs.length + 1).toString(), ...newFAQ }])
      setNewFAQ({ question: "", answer: "", category: "" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">常见问题管理</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>添加新问题</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>添加新的常见问题</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="question">问题</Label>
                <Input
                  id="question"
                  value={newFAQ.question}
                  onChange={(e) => setNewFAQ({ ...newFAQ, question: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="answer">答案</Label>
                <Textarea
                  id="answer"
                  value={newFAQ.answer}
                  onChange={(e) => setNewFAQ({ ...newFAQ, answer: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">分类</Label>
                <Input
                  id="category"
                  value={newFAQ.category}
                  onChange={(e) => setNewFAQ({ ...newFAQ, category: e.target.value })}
                />
              </div>
            </div>
            <Button onClick={handleAddFAQ}>添加</Button>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>搜索问题</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="输入关键词搜索..." />
        </CardContent>
      </Card>

      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>
              <p>{faq.answer}</p>
              <p className="mt-2 text-sm text-muted-foreground">分类: {faq.category}</p>
              <div className="mt-4 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  编辑
                </Button>
                <Button variant="outline" size="sm">
                  删除
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

