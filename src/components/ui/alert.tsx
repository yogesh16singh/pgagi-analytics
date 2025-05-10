import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground transition-colors duration-200",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground border-border hover:bg-accent/50",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive bg-destructive/10 hover:bg-destructive/20",
        success: "border-green-500/50 text-green-600 dark:text-green-400 [&>svg]:text-green-600 bg-green-50 dark:bg-green-950/50 hover:bg-green-100 dark:hover:bg-green-900/50",
        warning: "border-yellow-500/50 text-yellow-600 dark:text-yellow-400 [&>svg]:text-yellow-600 bg-yellow-50 dark:bg-yellow-950/50 hover:bg-yellow-100 dark:hover:bg-yellow-900/50",
        info: "border-blue-500/50 text-blue-600 dark:text-blue-400 [&>svg]:text-blue-600 bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 dark:hover:bg-blue-900/50",
      },
      size: {
        default: "text-sm",
        sm: "text-xs p-3",
        lg: "text-base p-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, size, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant, size }), className)}
    {...props}
  />
))
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1.5 font-semibold leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed opacity-90", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }
