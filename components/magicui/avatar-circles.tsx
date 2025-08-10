"use client"

import { cn } from "@/lib/utils"

interface AvatarCirclesProps {
  className?: string
  numPeople: number
  avatarUrls: Array<{
    imageUrl: string
    profileUrl: string
  }>
}

export function AvatarCircles({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((avatar, index) => (
        <a
          key={index}
          href={avatar.profileUrl}
          className="relative block"
        >
          <img
            className="h-10 w-10 rounded-full border-2 border-background hover:scale-110 transition-transform"
            src={avatar.imageUrl || "/placeholder.svg"}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-background bg-primary text-xs font-medium text-primary-foreground hover:scale-110 transition-transform">
        +{numPeople}
      </div>
    </div>
  )
}
