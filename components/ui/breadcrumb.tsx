import * as React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronRight } from "lucide-react"

interface BreadcrumbProps extends React.ComponentPropsWithoutRef<"nav"> {
  children: React.ReactNode
}

interface BreadcrumbItemProps extends React.ComponentPropsWithoutRef<"li"> {
  children: React.ReactNode
  isCurrentPage?: boolean
}

interface BreadcrumbLinkProps extends React.ComponentPropsWithoutRef<"a"> {
  children: React.ReactNode
  href?: string
  asChild?: boolean
}

export function Breadcrumb({ children, className, ...props }: BreadcrumbProps) {
  return (
    <nav
      aria-label="breadcrumb"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      <ol className="flex items-center space-x-2">{children}</ol>
    </nav>
  )
}

export function BreadcrumbItem({
  children,
  isCurrentPage,
  className,
  ...props
}: BreadcrumbItemProps) {
  return (
    <li
      className={cn("flex items-center space-x-2", className)}
      aria-current={isCurrentPage ? "page" : undefined}
      {...props}
    >
      {children}
      {!isCurrentPage && <ChevronRight className="h-4 w-4" />}
    </li>
  )
}

export function BreadcrumbLink({
  children,
  href,
  className,
  ...props
}: BreadcrumbLinkProps) {
  if (!href) {
    return (
      <span className={cn("text-foreground font-medium", className)} {...props}>
        {children}
      </span>
    )
  }

  return (
    <Link
      href={href}
      className={cn(
        "hover:text-foreground transition-colors duration-200",
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
