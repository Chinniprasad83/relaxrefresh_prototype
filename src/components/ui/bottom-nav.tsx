import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Home, 
  Heart, 
  MessageSquare 
} from "lucide-react";

type NavItem = {
  id: string
  label: string
  path?: string
  icon: React.ElementType
}

type Props = {
  items?: NavItem[]
}

export default function BottomNav({ items }: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  const defaultItems: NavItem[] = [
    { id: 'home', label: 'Home', path: '/stall-search', icon: Home },
    { id: 'interest', label: 'Interest', path: '/interest', icon: Heart },
    { id: 'queries', label: 'Queries', path: '/queries', icon: MessageSquare },
  ]

  const navItems = items && items.length > 0 ? items : defaultItems

  return (
    <nav className="bg-card border-t shadow-elegant" role="navigation" aria-label="Primary">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path || (item.id === 'home' && location.pathname === '/stall-search');
          
          return (
            <button
              key={item.id}
              className={`flex flex-col items-center py-3 px-4 min-w-0 flex-1 transition-all duration-300 ${
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              onClick={() => navigate(item.path ?? '/stall-search')}
            >
              <Icon 
                className={`w-5 h-5 mb-1 transition-all duration-300 ${
                  isActive ? "text-primary scale-110" : ""
                }`} 
              />
              <span className={`text-xs transition-all duration-300 ${
                isActive ? "font-medium" : ""
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-4 h-0.5 bg-primary rounded-full mt-1 transition-all duration-300" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  )
}