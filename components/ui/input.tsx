import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-8 w-full rounded-md border border-input outline-none  px-2 py-1 text-sm  file:border-0  file:text-sm ",
          className
        
        )}
        ref={ref}
        {...props}
        style={{ background: '#212224CC',borderColor:'#333333' }} 
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
