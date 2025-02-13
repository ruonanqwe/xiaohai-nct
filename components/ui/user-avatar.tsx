import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface UserAvatarProps {
  name: string
  image?: string | null
  fallback?: string
  className?: string
}

export function UserAvatar({ name, image, fallback, className }: UserAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage
        src={image || `/avatars/default.png`}
        alt={name}
        onError={(e) => {
          e.currentTarget.src = "/avatars/default.png"
        }}
      />
      <AvatarFallback>
        {fallback || name.slice(0, 2).toUpperCase()}
      </AvatarFallback>
    </Avatar>
  )
} 