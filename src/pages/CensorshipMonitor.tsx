import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  AlertTriangle, 
  Eye, 
  Clock, 
  Globe, 
  MessageSquare,
  Share,
  CheckCircle,
  XCircle,
  Filter,
  Plus,
  FolderOpen
} from "lucide-react"

interface CensorshipEvent {
  id: string
  title: string
  platform: string
  description: string
  timestamp: string
  severity: "high" | "medium" | "low"
  status: "new" | "verified" | "dismissed"
  source: string
}

const CensorshipMonitor = () => {
  const navigate = useNavigate()
  const [events, setEvents] = useState<CensorshipEvent[]>([
    {
      id: "CE-001",
      title: "Election coverage blocked on social media",
      platform: "Facebook",
      description: "Multiple posts about election irregularities being removed or shadow-banned",
      timestamp: "2 minutes ago",
      severity: "high",
      status: "new",
      source: "Automated monitoring"
    },
    {
      id: "CE-002", 
      title: "News website accessibility blocked",
      platform: "ISP Network",
      description: "Independent news site reporting ballot issues unreachable from certain regions",
      timestamp: "15 minutes ago",
      severity: "high",
      status: "new",
      source: "Field reporter"
    },
    {
      id: "CE-003",
      title: "Search results manipulation detected",
      platform: "Google",
      description: "Election fraud queries returning limited or biased results",
      timestamp: "1 hour ago", 
      severity: "medium",
      status: "verified",
      source: "Digital forensics"
    },
    {
      id: "CE-004",
      title: "WhatsApp message forwarding restricted",
      platform: "WhatsApp",
      description: "Election-related messages cannot be forwarded in certain regions",
      timestamp: "2 hours ago",
      severity: "medium", 
      status: "verified",
      source: "Source network"
    },
    {
      id: "CE-005",
      title: "Confirmed Journalist Arrest",
      platform: "Ground Operations",
      description: "Local journalist detained while covering election irregularities in Eastern District",
      timestamp: "Just now",
      severity: "high",
      status: "new",
      source: "Field reporter"
    }
  ])

  const [selectedEvent, setSelectedEvent] = useState<CensorshipEvent | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [showCaseButton, setShowCaseButton] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const handleEventAction = (eventId: string, action: "verify" | "dismiss") => {
    setEvents(events.map(event => 
      event.id === eventId 
        ? { ...event, status: action === "verify" ? "verified" : "dismissed" }
        : event
    ))
    
    if (action === "verify") {
      setShowCaseButton(true)
    }
    setIsDialogOpen(false)
  }

  const getEventType = (title: string) => {
    if (title.toLowerCase().includes("arrest") || title.toLowerCase().includes("journalist")) return "Journalist Arrest"
    if (title.toLowerCase().includes("block") || title.toLowerCase().includes("website")) return "Website Block"
    if (title.toLowerCase().includes("throttling") || title.toLowerCase().includes("internet")) return "Internet Throttling"
    return "Other"
  }

  const filteredEvents = events.filter(event => {
    const statusMatch = statusFilter === "all" || event.status === statusFilter
    const typeMatch = typeFilter === "all" || getEventType(event.title) === typeFilter
    return statusMatch && typeMatch
  })

  const handleCreateCase = () => {
    // Create case data and navigate to Story Corroborator
    const caseData = {
      id: "2025-004",
      title: "Unlawful Detention of Journalist",
      evidence: selectedEvent ? {
        title: selectedEvent.title,
        description: selectedEvent.description,
        source: selectedEvent.source,
        timestamp: selectedEvent.timestamp
      } : null
    }
    
    // Store case data in sessionStorage for Story Corroborator to pick up
    sessionStorage.setItem('newCase', JSON.stringify(caseData))
    
    // Navigate to Story Corroborator
    navigate('/corroborator')
    setIsDialogOpen(false)
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium": return "bg-warning/10 text-warning border-warning/20"
      case "low": return "bg-info/10 text-info border-info/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-accent/10 text-accent border-accent/20"
      case "verified": return "bg-success/10 text-success border-success/20"
      case "dismissed": return "bg-muted/10 text-muted-foreground border-muted/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case "facebook": return MessageSquare
      case "whatsapp": return MessageSquare
      case "google": return Globe
      default: return Share
    }
  }

  const newEvents = events.filter(e => e.status === "new")
  const verifiedEvents = events.filter(e => e.status === "verified")
  const dismissedEvents = events.filter(e => e.status === "dismissed")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Censorship Monitor</h1>
        <p className="text-muted-foreground">
          Real-time detection and triage of election-related censorship events
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "New Events", value: newEvents.length, color: "text-accent", icon: AlertTriangle },
          { title: "Verified", value: verifiedEvents.length, color: "text-success", icon: CheckCircle },
          { title: "Dismissed", value: dismissedEvents.length, color: "text-muted-foreground", icon: XCircle },
          { title: "Total Today", value: events.length, color: "text-foreground", icon: Eye }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                  <Icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Event Table */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5 text-accent" />
                Censorship Events Triage
              </CardTitle>
              <CardDescription>
                Click on an event to open detailed triage workflow
              </CardDescription>
            </div>
            <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter Events
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card border-border" onClick={(e) => e.stopPropagation()}>
                <DialogHeader>
                  <DialogTitle>Filter Events</DialogTitle>
                  <DialogDescription>
                    Filter events by status and type
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="status-filter">Filter by Status</Label>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="verified">Verified</SelectItem>
                        <SelectItem value="dismissed">Dismissed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="type-filter">Filter by Event Type</Label>
                    <Select value={typeFilter} onValueChange={setTypeFilter}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Internet Throttling">Internet Throttling</SelectItem>
                        <SelectItem value="Journalist Arrest">Journalist Arrest</SelectItem>
                        <SelectItem value="Website Block">Website Block</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button onClick={() => setIsFilterOpen(false)} className="w-full">
                    Apply Filters
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 overflow-x-auto">
            {filteredEvents.map((event) => {
              const PlatformIcon = getPlatformIcon(event.platform)
              return (
                <Dialog key={event.id} open={isDialogOpen && selectedEvent?.id === event.id} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <div 
                      className="p-4 rounded-lg border border-border/50 hover:bg-secondary/20 cursor-pointer transition-all duration-200"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 flex-1">
                          <PlatformIcon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="space-y-2 flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="font-medium text-foreground">{event.title}</h3>
                              <Badge variant="outline" className={getSeverityColor(event.severity)}>
                                {event.severity.toUpperCase()}
                              </Badge>
                              <Badge variant="outline" className={getStatusColor(event.status)}>
                                {event.status.toUpperCase()}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{event.description}</p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.timestamp}
                              </span>
                              <span>{event.platform}</span>
                              <span>Source: {event.source}</span>
                            </div>
                          </div>
                        </div>
                        <AlertTriangle className={`h-5 w-5 flex-shrink-0 ${
                          event.severity === "high" ? "text-destructive" :
                          event.severity === "medium" ? "text-warning" : "text-info"
                        }`} />
                      </div>
                    </div>
                  </DialogTrigger>
                  
                  <DialogContent className="max-w-2xl bg-card border-border sm:max-w-[90vw] max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-accent" />
                        Event Triage - {selectedEvent?.id}
                      </DialogTitle>
                      <DialogDescription>
                        Review and take action on this censorship event
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedEvent && (
                      <div className="space-y-6">
                        {/* Event Details */}
                        <div className="space-y-4">
                          <div>
                            <Label className="text-sm font-medium">Event Title</Label>
                            <p className="text-foreground mt-1">{selectedEvent.title}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium">Platform</Label>
                              <p className="text-foreground mt-1">{selectedEvent.platform}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium">Severity</Label>
                              <Badge className={`mt-1 ${getSeverityColor(selectedEvent.severity)}`}>
                                {selectedEvent.severity.toUpperCase()}
                              </Badge>
                            </div>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Description</Label>
                            <p className="text-foreground mt-1">{selectedEvent.description}</p>
                          </div>
                          
                          <div>
                            <Label className="text-sm font-medium">Source</Label>
                            <p className="text-foreground mt-1">{selectedEvent.source}</p>
                          </div>
                        </div>

                        {/* Investigation Notes */}
                        <div className="space-y-2">
                          <Label htmlFor="notes">Investigation Notes</Label>
                          <Textarea 
                            id="notes"
                            placeholder="Add notes about verification process, additional sources, or investigation findings..."
                            className="min-h-[100px]"
                          />
                        </div>

                        {/* Action Buttons */}
                        {selectedEvent.status === "new" && (
                          <div className="flex gap-3 pt-4 border-t border-border">
                            <Button 
                              onClick={() => handleEventAction(selectedEvent.id, "verify")}
                              className="flex-1"
                            >
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Verify Event
                            </Button>
                            <Button 
                              variant="outline"
                              onClick={() => handleEventAction(selectedEvent.id, "dismiss")}
                              className="flex-1"
                            >
                              <XCircle className="h-4 w-4 mr-2" />
                              Dismiss Event
                            </Button>
                          </div>
                        )}

                        {/* Case Creation Button - appears after verification */}
                        {selectedEvent.status === "verified" && showCaseButton && (
                          <div className="pt-4 border-t border-border">
                            <Button 
                              onClick={handleCreateCase}
                              className="w-full bg-accent hover:bg-accent/80"
                            >
                              <Plus className="h-4 w-4 mr-2" />
                              Open Investigative Case File
                            </Button>
                          </div>
                        )}
                        
                        {selectedEvent.status !== "new" && (
                          <div className="p-3 rounded-lg bg-muted/20 border border-border">
                            <p className="text-sm text-muted-foreground">
                              This event has been <strong>{selectedEvent.status}</strong> and is no longer pending review.
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CensorshipMonitor