import { Badge } from "@/components/ui/badge"
import { mockRecentApplications } from "@/data/mock/families"

export function RecentApplications() {
  return (
    <div className="space-y-4">
      {mockRecentApplications.map((application) => (
        <div key={application.id} className="flex items-center justify-between">
          <div>
            <p className="font-medium">{application.familyName}</p>
            <p className="text-sm text-muted-foreground">
              {application.type} - ¥{application.amount}
            </p>
          </div>
          <Badge>{application.status}</Badge>
        </div>
      ))}
    </div>
  )
}

