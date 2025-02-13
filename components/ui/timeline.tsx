interface TimelineItemProps {
  title: string
  description: string
  date: string
}

export function TimelineItem({ title, description, date }: TimelineItemProps) {
  return (
    <div className="relative pb-8">
      <div className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200" />
      <div className="relative flex items-start space-x-3">
        <div>
          <div className="relative px-1">
            <div className="h-8 w-8 bg-blue-100 rounded-full ring-8 ring-white flex items-center justify-center">
              <div className="h-2.5 w-2.5 bg-blue-600 rounded-full" />
            </div>
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <div>
            <div className="text-sm font-medium text-gray-900">{title}</div>
            <p className="mt-0.5 text-sm text-gray-500">{date}</p>
          </div>
          <div className="mt-2 text-sm text-gray-700">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="flow-root">{children}</div>
} 