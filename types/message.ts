export interface Message {
  id?: string
  name: string
  email: string
  content: string
  createdAt?: string
  status?: 'pending' | 'approved' | 'rejected'
}

export interface MessageResponse {
  code: number
  data?: Message
  message: string
  error?: string
} 