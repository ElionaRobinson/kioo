import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Shield, 
  Plus, 
  FileText, 
  Users, 
  Image, 
  Link,
  AlertTriangle,
  CheckCircle,
  Network,
  Gavel,
  BarChart3,
  Clock
} from "lucide-react"

interface Evidence {
  id: string
  title: string
  type: "document" | "interview" | "photo" | "video" | "audio"
  source: string
  credibility: "high" | "medium" | "low"
  dateAdded: string
  addedBy?: string
  date?: string
}

interface Case {
  id: string
  title: string
  status: "active" | "review" | "completed"
  evidenceCount: number
  lastUpdated: string
}

const StoryCorroborator = () => {
  const [cases, setCases] = useState<Case[]>([
    {
      id: "2025-001",
      title: "Election Fraud Allegations - Eastern Region",
      status: "active",
      evidenceCount: 12,
      lastUpdated: "2 hours ago"
    },
    {
      id: "2025-002", 
      title: "Vote Buying Investigation",
      status: "review",
      evidenceCount: 8,
      lastUpdated: "1 day ago"
    }
  ])

  // Check for new case from Censorship Monitor
  useEffect(() => {
    const newCaseData = sessionStorage.getItem('newCase')
    if (newCaseData) {
      const caseInfo = JSON.parse(newCaseData)
      const newCase: Case = {
        id: caseInfo.id,
        title: caseInfo.title,
        status: "active" as const,
        evidenceCount: 1,
        lastUpdated: "Just now"
      }
      
      setCases(prev => [newCase, ...prev])
      setSelectedCase(newCase)
      
      // Add the initial evidence from the censorship event
      if (caseInfo.evidence) {
        const initialEvidence: Evidence = {
          id: "E-001",
          title: caseInfo.evidence.title,
          type: "document",
          source: caseInfo.evidence.source,
          credibility: "high",
          dateAdded: "Just now",
          addedBy: "System",
          date: "2025-01-15"
        }
        setEvidence([initialEvidence])
      }
      
      sessionStorage.removeItem('newCase')
    }
  }, [])

  const [selectedCase, setSelectedCase] = useState<Case | null>(null)
  const [evidence, setEvidence] = useState<Evidence[]>([
    {
      id: "E-001",
      title: "Leaked Document #1",
      type: "document",
      source: "Anonymous Source Alpha",
      credibility: "high",
      dateAdded: "2 days ago",
      addedBy: "Robinson",
      date: "2025-01-10"
    },
    {
      id: "E-002",
      title: "Interview with Source Alpha",
      type: "interview", 
      source: "Field Reporter",
      credibility: "high",
      dateAdded: "1 day ago",
      addedBy: "Asha",
      date: "2025-01-12"
    },
    {
      id: "E-003",
      title: "Shipping Manifest #SM789",
      type: "document",
      source: "Whistleblower",
      credibility: "medium",
      dateAdded: "3 hours ago",
      addedBy: "Robinson",
      date: "2025-01-14"
    }
  ])

  // Set initial selected case
  useEffect(() => {
    if (!selectedCase && cases.length > 0) {
      setSelectedCase(cases[0])
    }
  }, [cases, selectedCase])

  const [aiDetectedLinks, setAiDetectedLinks] = useState([
    {
      from: "Leaked Document #1",
      to: "Interview with Source Alpha", 
      relationship: "Corroborates timeline of events",
      confidence: "95%",
      type: "confirmation"
    },
    {
      from: "ABC Consulting Ltd.",
      to: "Leaked Document #1",
      relationship: "Mentioned 7 times in document",
      confidence: "100%", 
      type: "reference"
    }
  ])

  const [hasContradiction, setHasContradiction] = useState(false)
  const [isAddEvidenceOpen, setIsAddEvidenceOpen] = useState(false)
  const [isLegalReviewOpen, setIsLegalReviewOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"graph" | "timeline">("graph")
  const [newEvidence, setNewEvidence] = useState({
    title: "",
    type: "document" as const,
    source: "",
    credibility: "medium" as const
  })

  const handleAddEvidence = () => {
    if (newEvidence.title && newEvidence.source) {
      const newEvidenceItem: Evidence = {
        id: `E-${String(evidence.length + 1).padStart(3, '0')}`,
        title: newEvidence.title,
        type: newEvidence.type,
        source: newEvidence.source,
        credibility: newEvidence.credibility,
        dateAdded: "Just now",
        addedBy: "Robinson",
        date: "2025-01-15"
      }
      
      setEvidence([...evidence, newEvidenceItem])
      
      // Simulate AI contradiction detection
      if (newEvidence.title.toLowerCase().includes("interview with source beta")) {
        setHasContradiction(true)
        setAiDetectedLinks([
          ...aiDetectedLinks,
          {
            from: "Interview with Source Beta",
            to: "Anonymous Source Alpha",
            relationship: "CRITICAL CONTRADICTION: Claims secret meeting occurred on Tuesday vs Wednesday",
            confidence: "98%",
            type: "contradiction"
          }
        ])
      }
      
      setNewEvidence({ title: "", type: "document", source: "", credibility: "medium" })
      setIsAddEvidenceOpen(false)
    }
  }

  const getEvidenceIcon = (type: string) => {
    switch (type) {
      case "document": return FileText
      case "interview": return Users
      case "photo": return Image
      case "video": return Image
      case "audio": return Users
      default: return FileText
    }
  }

  const getCredibilityColor = (credibility: string) => {
    switch (credibility) {
      case "high": return "bg-success/10 text-success border-success/20"
      case "medium": return "bg-warning/10 text-warning border-warning/20"
      case "low": return "bg-destructive/10 text-destructive border-destructive/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getLinkTypeColor = (type: string) => {
    switch (type) {
      case "confirmation": return "text-success"
      case "contradiction": return "text-destructive"
      case "reference": return "text-info"
      default: return "text-muted-foreground"
    }
  }

  // Timeline events for Timeline View
  const timelineEvents = [
    { date: "July 10", title: "Interview with Source Alpha logged", type: "evidence", color: "text-success" },
    { date: "July 12", title: "Leaked Document #1 added", type: "evidence", color: "text-info" },
    { date: "July 14", title: "AI Detected Contradiction", type: "alert", color: "text-destructive" },
    { date: "July 15", title: "Case Submitted for Legal Review", type: "action", color: "text-warning" }
  ]

  if (!selectedCase) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Story Corroborator</h1>
        <p className="text-muted-foreground">
          AI-powered evidence analysis and contradiction detection for investigative stories
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Case Files Sidebar */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Active Cases</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {cases.map((caseItem) => (
              <div 
                key={caseItem.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  selectedCase?.id === caseItem.id 
                    ? "bg-primary/10 border-primary/20" 
                    : "border-border/50 hover:bg-secondary/20"
                }`}
                onClick={() => setSelectedCase(caseItem)}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm">Case #{caseItem.id}</h3>
                    <Badge variant="outline" className={
                      caseItem.status === "active" ? "text-accent" : 
                      caseItem.status === "review" ? "text-warning" : "text-success"
                    }>
                      {caseItem.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{caseItem.title}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{caseItem.evidenceCount} evidence items</span>
                    <span>{caseItem.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Case Header with View Toggle */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Case #{selectedCase.id}
                  </CardTitle>
                  <CardDescription>{selectedCase.title}</CardDescription>
                </div>
                <div className="flex items-center gap-3">
                  {/* View Toggle */}
                  <div className="flex rounded-lg border border-border/50 p-1">
                    <Button
                      variant={currentView === "graph" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentView("graph")}
                      className="text-xs"
                    >
                      <Network className="h-3 w-3 mr-1" />
                      Knowledge Graph
                    </Button>
                    <Button
                      variant={currentView === "timeline" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setCurrentView("timeline")}
                      className="text-xs"
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      Timeline View
                    </Button>
                  </div>
                  
                  <Dialog open={isAddEvidenceOpen} onOpenChange={setIsAddEvidenceOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Evidence
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-card border-border">
                      <DialogHeader>
                        <DialogTitle>Add New Evidence</DialogTitle>
                        <DialogDescription>
                          Add a new piece of evidence to Case #{selectedCase.id}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="title">Evidence Title</Label>
                          <Input 
                            id="title"
                            value={newEvidence.title}
                            onChange={(e) => setNewEvidence({...newEvidence, title: e.target.value})}
                            placeholder="e.g., Interview with Source Beta"
                          />
                        </div>
                        <div>
                          <Label htmlFor="type">Evidence Type</Label>
                          <Select value={newEvidence.type} onValueChange={(value: any) => setNewEvidence({...newEvidence, type: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="document">Document</SelectItem>
                              <SelectItem value="interview">Interview</SelectItem>
                              <SelectItem value="photo">Photo</SelectItem>
                              <SelectItem value="video">Video</SelectItem>
                              <SelectItem value="audio">Audio</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="source">Source</Label>
                          <Input 
                            id="source"
                            value={newEvidence.source}
                            onChange={(e) => setNewEvidence({...newEvidence, source: e.target.value})}
                            placeholder="e.g., Field Reporter, Whistleblower"
                          />
                        </div>
                        <div>
                          <Label htmlFor="credibility">Credibility Assessment</Label>
                          <Select value={newEvidence.credibility} onValueChange={(value: any) => setNewEvidence({...newEvidence, credibility: value})}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddEvidence} className="w-full">
                          Log Evidence
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  <Dialog open={isLegalReviewOpen} onOpenChange={setIsLegalReviewOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Gavel className="h-4 w-4 mr-2" />
                        Finalize & Submit for Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl bg-card border-border">
                      <DialogHeader>
                        <DialogTitle>Legal Review Summary - Case #{selectedCase.id}</DialogTitle>
                        <DialogDescription>
                          Review all evidence and AI-detected links before submitting to DW Legal Department
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-6">
                        <div>
                          <h3 className="font-medium mb-3">Evidence Summary</h3>
                          <div className="space-y-2">
                            {evidence.map((item) => (
                              <div key={item.id} className="flex items-center gap-3 p-2 rounded border border-border/50">
                                <Badge className={getCredibilityColor(item.credibility)}>{item.credibility}</Badge>
                                <span className="text-sm">{item.title} ({item.id})</span>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="font-medium mb-3">AI-Detected Links</h3>
                          <div className="space-y-2">
                            {aiDetectedLinks.map((link, index) => (
                              <div key={index} className={`p-3 rounded border ${
                                link.type === "contradiction" ? "border-destructive/20 bg-destructive/5" : "border-border/50"
                              }`}>
                                <p className={`text-sm font-medium ${getLinkTypeColor(link.type)}`}>
                                  {link.relationship}
                                </p>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {link.from} ↔ {link.to} (Confidence: {link.confidence})
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="legal-notes">Notes to Legal</Label>
                          <Textarea 
                            id="legal-notes"
                            placeholder="Additional context for legal review..."
                            className="min-h-[100px]"
                          />
                        </div>
                        
                        <Button className="w-full">
                          Submit to DW Legal Department
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content Area - Graph or Timeline */}
          {currentView === "timeline" ? (
            <Card className="bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-accent" />
                  Investigation Timeline
                </CardTitle>
                <CardDescription>
                  Chronological view of all evidence and actions for Case #{selectedCase.id}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {/* Timeline Line */}
                  <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>
                  
                  <div className="space-y-6">
                    {timelineEvents.map((event, index) => (
                      <div key={index} className="relative flex items-start gap-4">
                        <div className={`relative z-10 w-4 h-4 rounded-full border-2 border-card ${
                          event.type === "evidence" ? "bg-info" :
                          event.type === "alert" ? "bg-destructive" : "bg-warning"
                        }`}></div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className={`font-medium ${event.color}`}>{event.title}</p>
                              <p className="text-sm text-muted-foreground flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {event.date}
                              </p>
                            </div>
                            <Badge variant="outline" className={
                              event.type === "evidence" ? "text-info border-info/20" :
                              event.type === "alert" ? "text-destructive border-destructive/20" : 
                              "text-warning border-warning/20"
                            }>
                              {event.type.toUpperCase()}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {/* AI-Detected Links Widget - Graph View */}
              <Card className={`bg-card/50 backdrop-blur-sm border-border/50 ${hasContradiction ? 'border-destructive/50 bg-destructive/5' : ''}`}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${hasContradiction ? 'text-destructive' : 'text-accent'}`}>
                    {hasContradiction ? <AlertTriangle className="h-5 w-5" /> : <Network className="h-5 w-5" />}
                    AI-DETECTED LINKS
                  </CardTitle>
                  {hasContradiction && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                      <p className="text-destructive font-medium">
                        CRITICAL CONTRADICTION DETECTED: 'Interview with Source Beta' claims the secret meeting occurred on a Tuesday. 
                        This contradicts 'Anonymous Source Alpha' who stated the meeting was on a Wednesday. 
                        This discrepancy must be resolved before publication.
                      </p>
                    </div>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {aiDetectedLinks.map((link, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-lg border cursor-pointer hover:bg-secondary/20 transition-colors ${
                          link.type === "contradiction" ? "border-destructive/20" : "border-border/50"
                        }`}
                        onClick={() => {
                          // Simulate showing relationship details
                          if (link.from === "ABC Consulting Ltd." && link.to === "Leaked Document #1") {
                            alert("Relationship: 'ABC Consulting Ltd.' is mentioned 7 times in 'Leaked Document #1'")
                          }
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <p className={`text-sm font-medium ${getLinkTypeColor(link.type)}`}>
                              {link.from} ↔ {link.to}
                            </p>
                            <p className="text-xs text-muted-foreground">{link.relationship}</p>
                          </div>
                          <Badge variant="outline">
                            {link.confidence}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Evidence List */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle>Evidence Items</CardTitle>
              <CardDescription>
                All evidence collected for this case
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {evidence.map((item) => {
                  const Icon = getEvidenceIcon(item.type)
                  return (
                    <div key={item.id} className="p-3 rounded-lg border border-border/50 hover:bg-secondary/20 transition-colors">
                      <div className="flex items-start gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="space-y-1">
                              <h3 className="font-medium text-sm">{item.title}</h3>
                              <p className="text-xs text-muted-foreground">{item.source}</p>
                              {item.addedBy && (
                                <p className="text-xs text-muted-foreground">
                                  Added by: <span className="text-accent">{item.addedBy}</span>
                                </p>
                              )}
                            </div>
                            <Badge className={getCredibilityColor(item.credibility)}>
                              {item.credibility}
                            </Badge>
                          </div>
                          <div className="flex justify-between text-xs text-muted-foreground mt-2">
                            <span>{item.dateAdded}</span>
                            <span>{item.type.toUpperCase()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default StoryCorroborator