import { useState } from "react"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"
import { ThreatLevelBanner, ThreatLevel } from "@/components/ThreatLevelBanner"

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>("low")

  const getThreatStyles = (level: ThreatLevel) => {
    switch (level) {
      case "low": return ""
      case "elevated": return "border-threat-elevated/50"
      case "critical": return "border-threat-critical/50 animate-pulse"
    }
  }

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex flex-col w-full bg-background">
        {/* Threat Level Banner */}
        <ThreatLevelBanner onThreatLevelChange={setThreatLevel} />
        
        <div className="flex flex-1 w-full">
          <AppSidebar threatLevel={threatLevel} />
          
          <main className="flex-1 flex flex-col min-w-0">
            {/* Top Header */}
            <header className={`h-16 border-b border-border bg-card flex items-center px-3 md:px-6 gap-4 ${getThreatStyles(threatLevel)}`}>
              <SidebarTrigger className="h-8 w-8 md:hidden" />
              <div className="flex-1 min-w-0">
                <h2 className="text-base md:text-lg font-semibold text-foreground truncate">
                  DW Kioo - Election Investigation Hub
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
                <span className="hidden sm:inline text-sm text-muted-foreground">Secure Connection</span>
              </div>
            </header>
            
            {/* Main Content */}
            <div className="flex-1 p-3 md:p-6 overflow-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}