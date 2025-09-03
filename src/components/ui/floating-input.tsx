import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface FloatingInputProps {
  type?: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  required?: boolean;
}

const FloatingInput: React.FC<FloatingInputProps> = ({
  type = "text",
  label,
  value,
  onChange,
  icon,
  endIcon,
  className,
  required = false,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const isFloating = isFocused || hasValue;

  return (
    <div className={cn("relative", className)}>
      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
            <div className="text-muted-foreground">{icon}</div>
          </div>
        )}
        
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={cn(
            "w-full px-4 py-4 text-base bg-input border-2 border-input-border rounded-2xl transition-smooth outline-none",
            "focus:border-primary focus:bg-background",
            icon && "pl-12",
            endIcon && "pr-12",
            "placeholder-transparent"
          )}
          placeholder=" "
          required={required}
        />

        {endIcon && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10">
            {endIcon}
          </div>
        )}

        <motion.label
          className={cn(
            "absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-smooth pointer-events-none origin-left",
            icon && "left-12",
            isFloating && "scale-75 -translate-y-10 text-primary font-medium bg-background px-1 rounded"
          )}
          animate={{
            scale: isFloating ? 0.75 : 1,
            y: isFloating ? -40 : -12,
            color: isFloating ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
          }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </motion.label>
      </div>
    </div>
  );
};

export default FloatingInput;