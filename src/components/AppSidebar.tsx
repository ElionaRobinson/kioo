import { useState } from "react"
import { 
  LayoutDashboard, 
  Eye, 
  Shield, 
  Search, 
  Edit3, 
  User,
  ChevronLeft,
  ChevronRight
} from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { ThreatLevel } from "./ThreatLevelBanner"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"

const items = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Censorship Monitor", url: "/censorship", icon: Eye },
  { title: "Story Corroborator", url: "/corroborator", icon: Shield },
  { title: "Deep Dive Planner", url: "/planner", icon: Search },
  { title: "Script Editor", url: "/script-editor", icon: Edit3 },
]

interface AppSidebarProps {
  threatLevel: ThreatLevel
}

export function AppSidebar({ threatLevel }: AppSidebarProps) {
  const { state } = useSidebar()
  const location = useLocation()
  const currentPath = location.pathname
  const collapsed = state === "collapsed"

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/"
    return currentPath.startsWith(path)
  }
  
  const getThreatAccent = (level: ThreatLevel) => {
    switch (level) {
      case "low": return "primary"
      case "elevated": return "threat-elevated"
      case "critical": return "threat-critical"
    }
  }

  const getNavCls = ({ isActive }: { isActive: boolean }) => {
    const accentColor = getThreatAccent(threatLevel)
    return isActive 
      ? `bg-${accentColor}/20 text-${accentColor} border-r-2 border-${accentColor} font-medium` 
      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
  }

  const getSidebarBorder = () => {
    switch (threatLevel) {
      case "elevated": return "border-threat-elevated/30"
      case "critical": return "border-threat-critical/30 animate-pulse"
      default: return "border-border"
    }
  }

  return (
    <Sidebar className={`border-r ${getSidebarBorder()} bg-card transition-all duration-300`} collapsible="icon">
      <SidebarContent className="p-0">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">K</span>
            </div>
            {!collapsed && (
              <div>
                <h1 className="font-bold text-foreground">DW Kioo</h1>
                <p className="text-xs text-muted-foreground">Election Focus Hub</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup className="px-4 py-6">
          <SidebarGroupLabel className={`${collapsed ? "hidden" : "block"} text-muted-foreground font-medium mb-4`}>
            Investigation Tools
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="h-11">
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className={({ isActive }) => `${getNavCls({ isActive })} flex items-center px-3 py-2 rounded-lg transition-all`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3 truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Profile */}
        <div className="mt-auto p-4 border-t border-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
              <User className="h-4 w-4 text-primary-foreground" />
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  Investigative Journalist
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  DW Swahili
                </p>
              </div>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  )
}