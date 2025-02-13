"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Upload, FileText, Trash2 } from "lucide-react"

interface FileItem {
  id: string
  name: string
  size: number
  type: string
  uploadDate: string
}

export default function FileManagementPage() {
  const [files, setFiles] = useState<FileItem[]>([
    { id: "1", name: "report.pdf", size: 1024000, type: "application/pdf", uploadDate: "2023-06-15" },
    {
      id: "2",
      name: "data.xlsx",
      size: 512000,
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      uploadDate: "2023-06-14",
    },
    { id: "3", name: "image.jpg", size: 2048000, type: "image/jpeg", uploadDate: "2023-06-13" },
  ])

  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (selectedFile) {
      const newFile: FileItem = {
        id: Date.now().toString(),
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type,
        uploadDate: new Date().toISOString().split("T")[0],
      }
      setFiles([...files, newFile])
      setSelectedFile(null)
    }
  }

  const handleDelete = (id: string) => {
    setFiles(files.filter((file) => file.id !== id))
  }

  const totalSize = files.reduce((acc, file) => acc + file.size, 0)
  const averageSize = files.length > 0 ? totalSize / files.length : 0

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">文件管理</h2>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总文件数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{files.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总文件大小</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(totalSize / 1024 / 1024).toFixed(2)} MB</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均文件大小</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(averageSize / 1024 / 1024).toFixed(2)} MB</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center space-x-2">
        <Input type="file" onChange={handleFileChange} />
        <Button onClick={handleUpload} disabled={!selectedFile}>
          上传
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>文件名</TableHead>
            <TableHead>类型</TableHead>
            <TableHead>大小</TableHead>
            <TableHead>上传日期</TableHead>
            <TableHead>操作</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {files.map((file) => (
            <TableRow key={file.id}>
              <TableCell className="font-medium">{file.name}</TableCell>
              <TableCell>
                <Badge variant="secondary">{file.type.split("/")[1].toUpperCase()}</Badge>
              </TableCell>
              <TableCell>{(file.size / 1024 / 1024).toFixed(2)} MB</TableCell>
              <TableCell>{file.uploadDate}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(file.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

