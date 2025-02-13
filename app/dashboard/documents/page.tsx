"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { cn } from "@/lib/utils"
import { mockDocuments, documentTypes } from "@/data/mock/documents"
import { 
  FileText, Search, Plus, Calendar, Tag, Edit, Eye,
  Book, Files, Clock, FileUp, Settings, MoreVertical, Trash2
} from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PreviewDialog } from "@/components/dashboard/documents/preview-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Document as DocumentType } from "@/data/mock/documents"

export default function DocumentsPage() {
  const [documents, setDocuments] = useState(mockDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingDocument, setEditingDocument] = useState<DocumentType | null>(null)
  const [previewDocument, setPreviewDocument] = useState<DocumentType | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)

  const filteredDocuments = documents.filter(doc => 
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalDocs = documents.length
  const publishedDocs = documents.filter(d => d.status === "published").length
  const latestUpdate = documents.reduce((latest, doc) => 
    new Date(doc.lastUpdated) > new Date(latest) ? doc.lastUpdated : latest,
    documents[0].lastUpdated
  )

  const handleDelete = (id: string) => {
    setDocuments(docs => docs.filter(doc => doc.id !== id))
  }

  return (
    <div className="space-y-6 p-6 min-h-screen bg-gray-50">
      {/* 页面标题 */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            文档管理
          </h1>
          <p className="text-sm text-muted-foreground">
            管理和发布系统文档、使用手册和政策文件
          </p>
        </div>
        <Button 
          className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
          onClick={() => setDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          添加新文档
        </Button>
      </div>

      {/* 统计卡片 */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-blue-500/5 to-blue-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总文档数</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center">
                <Files className="h-4 w-4 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{totalDocs}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-green-500/5 to-green-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">已发布文档</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-50 flex items-center justify-center">
                <FileUp className="h-4 w-4 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{publishedDocs}</div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="relative overflow-hidden hover:shadow-lg transition-shadow">
            <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-purple-500/5 to-purple-500/10" />
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">最近更新</CardTitle>
              <div className="h-8 w-8 rounded-full bg-purple-50 flex items-center justify-center">
                <Clock className="h-4 w-4 text-purple-500" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-sm font-medium text-purple-600">
                {format(new Date(latestUpdate), 'PPP', { locale: zhCN })}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {documents.find(d => d.lastUpdated === latestUpdate)?.title}
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* 搜索栏 */}
      <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl bg-white shadow-sm border border-gray-100">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="搜索文档标题或描述..."
            className="pl-9 bg-gray-50/50 border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* 文档列表 */}
      <Card className="relative overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>文档标题</TableHead>
              <TableHead>类型</TableHead>
              <TableHead>版本</TableHead>
              <TableHead>最后更新</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="text-right">操作</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc) => (
              <TableRow key={doc.id} className="group">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    {doc.title}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className={cn(documentTypes[doc.type].badge)}>
                    {documentTypes[doc.type].label}
                  </Badge>
                </TableCell>
                <TableCell>{doc.version}</TableCell>
                <TableCell>{format(new Date(doc.lastUpdated), 'PPP', { locale: zhCN })}</TableCell>
                <TableCell>
                  <Badge variant={doc.status === "published" ? "success" : "secondary"}>
                    {doc.status === "published" ? "已发布" : "草稿"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2 hover:bg-gray-100"
                      onClick={() => {
                        setPreviewDocument(doc as DocumentType)
                        setPreviewOpen(true)
                      }}
                    >
                      <Eye className="h-4 w-4" />
                      预览
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="gap-2 hover:bg-blue-50 hover:text-blue-600"
                      onClick={() => {
                        setEditingDocument(doc as DocumentType)
                        setDialogOpen(true)
                      }}
                    >
                      <Edit className="h-4 w-4" />
                      编辑
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleDelete(doc.id)}>
                          <FileText className="h-4 w-4 mr-2" />
                          下载文档
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4 mr-2" />
                          删除文档
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* 新文档对话框 */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-[800px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold">
              {editingDocument ? "编辑文档" : "添加新文档"}
            </DialogTitle>
            <DialogDescription>
              在这里{editingDocument ? "修改" : "创建"}系统文档，填写完成后点击保存。
            </DialogDescription>
          </DialogHeader>

          <form className="grid gap-6 py-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">
                  文档标题
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="请输入文档标题"
                  defaultValue={editingDocument?.title}
                  className="bg-gray-50/50"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">
                  文档描述
                  <span className="text-red-500 ml-1">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="请输入文档描述"
                  rows={3}
                  defaultValue={editingDocument?.description}
                  className="bg-gray-50/50 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="type">
                    文档类型
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Select defaultValue={editingDocument?.type}>
                    <SelectTrigger className="bg-gray-50/50">
                      <SelectValue placeholder="选择文档类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(documentTypes).map(([key, value]) => (
                        <SelectItem key={key} value={key}>
                          <div className="flex items-center gap-2">
                            <div className={cn(
                              "w-2 h-2 rounded-full",
                              value.color
                            )} />
                            {value.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="version">
                    版本号
                    <span className="text-red-500 ml-1">*</span>
                  </Label>
                  <Input
                    id="version"
                    placeholder="例如: v1.0"
                    defaultValue={editingDocument?.version}
                    className="bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">发布状态</Label>
                <Select defaultValue={editingDocument?.status || "draft"}>
                  <SelectTrigger className="bg-gray-50/50">
                    <SelectValue placeholder="选择发布状态" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-gray-400" />
                        草稿
                      </div>
                    </SelectItem>
                    <SelectItem value="published">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        已发布
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>文档内容</Label>
                <Card className="bg-gray-50/50 p-4">
                  <div className="flex items-center justify-center border-2 border-dashed border-gray-200 rounded-lg h-32">
                    <div className="text-center">
                      <FileUp className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">
                        点击或拖拽文件上传
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        支持 .doc, .docx, .pdf 格式
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            </div>

            <DialogFooter className="gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                取消
              </Button>
              <Button
                type="submit"
                className="gap-2 bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500"
              >
                <FileText className="h-4 w-4" />
                {editingDocument ? "保存修改" : "创建文档"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* 添加预览对话框 */}
      <PreviewDialog
        document={previewDocument}
        open={previewOpen}
        onOpenChange={setPreviewOpen}
      />
    </div>
  )
}

