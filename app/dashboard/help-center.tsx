"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqItems = [
  {
    question: "如何添加新的家庭账户？",
    answer: '在家庭账户管理页面，点击"添加新家庭"按钮，填写相关信息后提交即可。',
  },
  {
    question: "如何审核补贴申请？",
    answer: '在申请审核页面，您可以查看所有待审核的申请。点击"查看详情"可以查看具体信息，然后选择"批准"或"拒绝"。',
  },
  {
    question: "如何修改系统设置？",
    answer: '在系统设置页面，您可以修改网站名称、描述、维护模式等基本设置。修改后点击"保存设置"即可生效。',
  },
  {
    question: "如何管理API接口？",
    answer: "在API管理页面，您可以查看所有API接口，添加新接口，或修改现有接口的配置。",
  },
]

export default function HelpCenter() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <HelpCircle className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>帮助中心</DialogTitle>
          <DialogDescription>常见问题解答和使用指南</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Accordion type="single" collapsible>
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger>{item.question}</AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-6 text-sm text-muted-foreground">
            <p>如果您需要更多帮助，请联系系统管理员：</p>
            <p className="mt-2">电话：17318132503</p>
            <p>邮箱：1963876196@qq.com</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

