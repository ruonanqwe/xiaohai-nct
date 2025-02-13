import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { zhCN } from "date-fns/locale"
import { type Document as DocumentType, documentTypes } from "@/data/mock/documents"
import { FileText, Calendar, User, Clock } from "lucide-react"
import ReactMarkdown from 'react-markdown'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

// 定义代码块的 Props 类型
interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
  [key: string]: any
}

interface PreviewDialogProps {
  document: DocumentType | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function PreviewDialog({ document, open, onOpenChange }: PreviewDialogProps) {
  if (!document) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                {document.title}
              </DialogTitle>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(document.lastUpdated), 'PPP', { locale: zhCN })}
                </div>
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  {document.author}
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  版本 {document.version}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={documentTypes[document.type].badge}>
                {documentTypes[document.type].label}
              </Badge>
              <Badge variant={document.status === "published" ? "success" : "secondary"}>
                {document.status === "published" ? "已发布" : "草稿"}
              </Badge>
            </div>
          </div>
        </DialogHeader>
        <div className="mt-6 space-y-4">
          <div className="text-sm text-muted-foreground">
            {document.description}
          </div>
          <div className="bg-gray-50 rounded-lg p-6">
            {document.content ? (
              <article className="prose prose-gray max-w-none">
                <ReactMarkdown
                  components={{
                    code: function CodeBlock({ className, children, ...props }: CodeBlockProps) {
                      const match = /language-(\w+)/.exec(className || '')
                      return match ? (
                        <SyntaxHighlighter
                          {...props}
                          style={oneDark}
                          language={match[1]}
                          PreTag="div"
                        >
                          {String(children || '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code {...props} className={className}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {document.content}
                </ReactMarkdown>
              </article>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <FileText className="h-12 w-12 text-gray-300 mb-4" />
                <p className="text-sm text-gray-500">
                  暂无文档内容
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
} 