import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Edit3, 
  FileText, 
  Users, 
  Image, 
  Database,
  LinkIcon,
  Scroll,
  Download,
  Send
} from "lucide-react"

interface Evidence {
  id: string
  title: string
  type: "document" | "interview" | "photo" | "video" | "audio"
  description: string
}

const ScriptEditor = () => {
  const [selectedCase, setSelectedCase] = useState("2025-001")
  const [scriptContent, setScriptContent] = useState(`Election Investigation Report - Draft

Opening Statement:
The DW Swahili investigation team has uncovered significant irregularities in the recent election process. Our comprehensive analysis reveals multiple instances of systematic fraud.

Key Findings:
1. Financial Irregularities
`)

  const [draggedEvidence, setDraggedEvidence] = useState<Evidence | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  const cases = [
    { id: "2025-001", title: "Election Fraud Allegations - Eastern Region" },
    { id: "2025-002", title: "Vote Buying Investigation" }
  ]

  const evidence: Evidence[] = [
    {
      id: "E-001",
      title: "Leaked Document #1",
      type: "document",
      description: "Internal communications revealing coordination"
    },
    {
      id: "E-002", 
      title: "Interview with Source Alpha",
      type: "interview",
      description: "Testimony regarding irregular vote counting"
    },
    {
      id: "E-003",
      title: "Shipping Manifest #SM789",
      type: "document", 
      description: "Evidence of ballot paper irregularities"
    },
    {
      id: "E-004",
      title: "Interview with Source Beta",
      type: "interview",
      description: "Witness account of vote buying activities"
    },
    {
      id: "E-005",
      title: "Financial Records - ABC Consulting",
      type: "document",
      description: "Banking records showing suspicious transfers"
    }
  ]

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

  const getEvidenceColor = (type: string) => {
    switch (type) {
      case "document": return "bg-info/10 text-info border-info/20"
      case "interview": return "bg-success/10 text-success border-success/20"
      case "photo": return "bg-warning/10 text-warning border-warning/20"
      case "video": return "bg-accent/10 text-accent border-accent/20"
      case "audio": return "bg-muted/10 text-muted-foreground border-muted/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const handleDragStart = (evidence: Evidence) => {
    setDraggedEvidence(evidence)
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setDraggedEvidence(null)
    setIsDragging(false)
  }

  const handleTextAreaDrop = (e: React.DragEvent) => {
    e.preventDefault()
    if (draggedEvidence) {
      const textarea = e.currentTarget as HTMLTextAreaElement
      const cursorPosition = textarea.selectionStart
      const textBefore = scriptContent.substring(0, cursorPosition)
      const textAfter = scriptContent.substring(cursorPosition)
      
      // Find the current sentence by looking for the last period or start of text
      const lastSentenceStart = Math.max(
        textBefore.lastIndexOf('.'),
        textBefore.lastIndexOf('\n'),
        0
      )
      const nextSentenceEnd = textAfter.indexOf('.')
      
      let updatedText = ""
      if (nextSentenceEnd !== -1) {
        // We're in the middle of a sentence
        const sentenceStart = lastSentenceStart === 0 ? 0 : lastSentenceStart + 1
        const sentenceEnd = cursorPosition + nextSentenceEnd + 1
        const sentence = scriptContent.substring(sentenceStart, sentenceEnd)
        const citation = ` [${draggedEvidence.id}]`
        
        updatedText = 
          scriptContent.substring(0, sentenceEnd) + 
          citation + 
          scriptContent.substring(sentenceEnd)
      } else {
        // We're at the end of text or paragraph
        const citation = ` [${draggedEvidence.id}]`
        updatedText = textBefore + citation + textAfter
      }
      
      setScriptContent(updatedText)
    }
    setDraggedEvidence(null)
    setIsDragging(false)
  }

  const handleTextAreaDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  // Extract citations from script content
  const citations = [...scriptContent.matchAll(/\[([^\]]+)\]/g)].map(match => match[1])
  const citedEvidence = evidence.filter(e => citations.includes(e.id))
  const unusedEvidence = evidence.filter(e => !citations.includes(e.id))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Script Editor</h1>
        <p className="text-muted-foreground">
          Evidence-based script writing with drag-and-drop citation system
        </p>
      </div>

      {/* Case Selection */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Edit3 className="h-5 w-5 text-accent" />
                Active Case
              </CardTitle>
              <CardDescription>
                Select the case you're writing a script for
              </CardDescription>
            </div>
              <div className="flex items-center gap-4">
                {/* Live Collaboration Indicators */}
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-accent text-accent-foreground text-xs font-medium flex items-center justify-center border-2 border-background">
                      RJ
                    </div>
                    <div className="w-8 h-8 rounded-full bg-success text-success-foreground text-xs font-medium flex items-center justify-center border-2 border-background animate-pulse shadow-lg shadow-success/50">
                      A
                    </div>
                  </div>
                  <span className="text-xs text-success font-medium">Asha is also viewing this document</span>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([scriptContent], { type: 'text/plain' });
                      element.href = URL.createObjectURL(file);
                      element.download = `script-case-${selectedCase}.txt`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => {
                      if (scriptContent.trim()) {
                        alert(`Script for Case #${selectedCase} has been submitted for legal review. The editorial team will be notified.`);
                      } else {
                        alert('Please write content in the script before submitting for review.');
                      }
                    }}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    Submit for Review
                  </Button>
                </div>
              </div>
          </div>
        </CardHeader>
        <CardContent>
          <Select value={selectedCase} onValueChange={setSelectedCase}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {cases.map((caseItem) => (
                <SelectItem key={caseItem.id} value={caseItem.id}>
                  Case #{caseItem.id} - {caseItem.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Main Editor Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Script Writing Area */}
        <div className="lg:col-span-2">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Scroll className="h-5 w-5 text-accent" />
                Script Content
              </CardTitle>
              <CardDescription>
                Drag evidence from the right panel to add citations to your script
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea
                  value={scriptContent}
                  onChange={(e) => setScriptContent(e.target.value)}
                  onDrop={handleTextAreaDrop}
                  onDragOver={handleTextAreaDragOver}
                  className={`min-h-[500px] font-mono text-sm resize-none ${
                    isDragging ? 'border-accent border-2 bg-accent/5' : ''
                  }`}
                  placeholder="Start writing your investigation script here. Drag evidence items from the Evidence Locker to add citations."
                />
                
                {/* Citation Summary */}
                {citedEvidence.length > 0 && (
                  <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                    <h4 className="font-medium text-accent mb-2 flex items-center gap-2">
                      <LinkIcon className="h-4 w-4" />
                      Script Citations ({citedEvidence.length})
                    </h4>
                    <div className="space-y-1">
                      {citedEvidence.map((item) => (
                        <p key={item.id} className="text-sm text-foreground">
                          <span className="font-mono text-accent">[{item.id}]</span> - {item.title}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Evidence Locker */}
        <div className="space-y-4">
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-accent" />
                Evidence Locker
              </CardTitle>
              <CardDescription>
                Case #{selectedCase} evidence items
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {evidence.map((item) => {
                  const Icon = getEvidenceIcon(item.type)
                  const isUsed = citations.includes(item.id)
                  
                  return (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={() => handleDragStart(item)}
                      onDragEnd={handleDragEnd}
                      className={`p-3 rounded-lg border cursor-grab active:cursor-grabbing transition-all ${
                        isUsed 
                          ? 'border-success/50 bg-success/5 opacity-60' 
                          : 'border-border/50 hover:border-accent/50 hover:bg-accent/5'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-foreground text-sm">
                              {item.title}
                            </span>
                            <Badge variant="outline" className="text-xs">
                              {item.id}
                            </Badge>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {item.description}
                          </p>
                          <Badge className={`text-xs ${getEvidenceColor(item.type)}`}>
                            {item.type.toUpperCase()}
                          </Badge>
                          {isUsed && (
                            <div className="flex items-center gap-1 text-xs text-success">
                              <LinkIcon className="h-3 w-3" />
                              Cited in script
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Usage Statistics */}
          <Card className="bg-card/50 backdrop-blur-sm border-border/50">
            <CardHeader>
              <CardTitle className="text-lg">Citation Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-success">{citedEvidence.length}</p>
                  <p className="text-sm text-muted-foreground">Evidence Cited</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-warning">{unusedEvidence.length}</p>
                  <p className="text-sm text-muted-foreground">Unused Evidence</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Citation Coverage:</span>
                  <span className="text-foreground font-medium">
                    {Math.round((citedEvidence.length / evidence.length) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-success to-accent h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(citedEvidence.length / evidence.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="p-3 rounded-lg bg-info/10 border border-info/20">
                <p className="text-xs text-info">
                  💡 Drag evidence items from above directly onto sentences in your script to add citations automatically.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ScriptEditor