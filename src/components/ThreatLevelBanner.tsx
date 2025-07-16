import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle, Shield, ShieldAlert } from "lucide-react"

export type ThreatLevel = "low" | "elevated" | "critical"

interface ThreatLevelBannerProps {
  onThreatLevelChange: (level: ThreatLevel) => void
}

export function ThreatLevelBanner({ onThreatLevelChange }: ThreatLevelBannerProps) {
  const [threatLevel, setThreatLevel] = useState<ThreatLevel>("low")

  const handleLevelChange = (level: ThreatLevel) => {
    setThreatLevel(level)
    onThreatLevelChange(level)
  }

  const getThreatIcon = (level: ThreatLevel) => {
    switch (level) {
      case "low": return Shield
      case "elevated": return ShieldAlert
      case "critical": return AlertTriangle
    }
  }

  const getThreatColor = (level: ThreatLevel) => {
    switch (level) {
      case "low": return "text-threat-low"
      case "elevated": return "text-threat-elevated"
      case "critical": return "text-threat-critical"
    }
  }

  const getThreatBg = (level: ThreatLevel) => {
    switch (level) {
      case "low": return "bg-threat-low/10 border-threat-low/20"
      case "elevated": return "bg-threat-elevated/10 border-threat-elevated/20"
      case "critical": return "bg-threat-critical/10 border-threat-critical/20"
    }
  }

  const getThreatAnimation = (level: ThreatLevel) => {
    return level === "critical" ? "animate-pulse" : ""
  }

  const Icon = getThreatIcon(threatLevel)

  return (
    <div className={`w-full border-b border-border/50 bg-card/30 backdrop-blur-sm ${getThreatBg(threatLevel)} ${getThreatAnimation(threatLevel)}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-12">
          <div className="flex items-center gap-3">
            <Icon className={`h-4 w-4 ${getThreatColor(threatLevel)}`} />
            <span className="text-sm font-medium text-foreground">
              ELECTION THREAT LEVEL:
            </span>
            <span className={`text-sm font-bold uppercase ${getThreatColor(threatLevel)}`}>
              LEVEL {threatLevel === "low" ? "1" : threatLevel === "elevated" ? "2" : "3"}: {threatLevel}
            </span>
          </div>
          
          <Select value={threatLevel} onValueChange={handleLevelChange}>
            <SelectTrigger className="w-48 h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Level 1: LOW (Normal Operations)</SelectItem>
              <SelectItem value="elevated">Level 2: ELEVATED (Increased Risk)</SelectItem>
              <SelectItem value="critical">Level 3: CRITICAL (Direct Threat)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}