import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const FloatingSelect: React.FC<FloatingSelectProps> = ({
  label,
  value,
  onChange,
  options,
  placeholder = "Select option...",
  disabled = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const hasValue = value.length > 0;
  const isFloating = isOpen || hasValue;

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div className={cn("relative", className)}>
      {/* Main Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "w-full px-4 py-4 text-base bg-input border-2 border-input-border rounded-2xl transition-smooth outline-none text-left relative",
          isOpen && "border-primary bg-background",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <span className={cn("text-foreground", !value && "opacity-0")}>
          {value || "Select option"}
        </span>
        
        <motion.div
          className="absolute right-4 top-1/2 transform -translate-y-1/2"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </motion.div>
      </button>

      {/* Floating Label */}
      <motion.label
        className={cn(
          "absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground transition-smooth pointer-events-none origin-left",
          isFloating && "scale-75 -translate-y-8 text-primary font-medium"
        )}
        animate={{
          scale: isFloating ? 0.75 : 1,
          y: isFloating ? -32 : -12,
          color: isFloating ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        {label}
      </motion.label>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full mt-2 w-full bg-card border border-border rounded-2xl shadow-elevated z-50 overflow-hidden"
          >
            {/* Search Input */}
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 text-sm bg-input border border-input-border rounded-xl outline-none focus:border-primary transition-smooth"
                />
              </div>
            </div>

            {/* Options */}
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <motion.button
                    key={option}
                    type="button"
                    onClick={() => handleSelect(option)}
                    className="w-full px-4 py-3 text-left text-sm hover:bg-muted transition-smooth border-0 outline-0"
                    whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {option}
                  </motion.button>
                ))
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                  No options found
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FloatingSelect;