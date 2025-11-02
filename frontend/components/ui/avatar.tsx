"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"

import { cn } from "@/lib/utils"

const AvatarWithRings = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
    showRings?: boolean;
    ringColors?: string[];
  }
>(({ className, showRings = false, ringColors = ["border-cyan-500/50", "border-indigo-500/30", "border-purple-500/20"], ...props }, ref) => (
  <div className={cn(
    "relative inline-flex items-center justify-center",
    showRings && "p-4",
    className
  )}>
    {showRings && (
      <>
        <div className={cn(
          "absolute rounded-full border-2 animate-pulse-slow",
          ringColors[0] || "border-cyan-500/50",
          "h-[calc(100%-0.5rem)] w-[calc(100%-0.5rem)]"
        )} />
        <div 
          className={cn(
            "absolute rounded-full border-2 animate-pulse-slow",
            ringColors[1] || "border-indigo-500/30",
            "h-[calc(100%+0.5rem)] w-[calc(100%+0.5rem)]"
          )} 
          style={{ animationDelay: "0.5s" }}
        />
        <div 
          className={cn(
            "absolute rounded-full border-2 animate-pulse-slow",
            ringColors[2] || "border-purple-500/20",
            "h-[calc(100%+1rem)] w-[calc(100%+1rem)]"
          )}
          style={{ animationDelay: "1s" }}
        />
      </>
    )}
    <AvatarPrimitive.Root
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        showRings && "z-10"
      )}
      {...props}
    />
  </div>
))
AvatarWithRings.displayName = "AvatarWithRings"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
))
Avatar.displayName = AvatarPrimitive.Root.displayName

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = AvatarPrimitive.Image.displayName

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
))
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName

export { Avatar, AvatarWithRings, AvatarImage, AvatarFallback }
