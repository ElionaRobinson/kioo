import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { 
  Search, 
  Users, 
  Globe, 
  Database, 
  UserCheck,
  ChevronDown,
  ChevronRight,
  MapPin,
  Calendar,
  Target
} from "lucide-react"

interface Lead {
  id: string
  title: string
  description: string
  priority: "high" | "medium" | "low"
  assignee: string | null
  status: "unassigned" | "assigned" | "in-progress" | "completed"
  estimatedHours: number
}

interface OSINTCluster {
  id: string
  title: string
  description: string
  leadCount: number
  isExpanded: boolean
  leads: Lead[]
}

const DeepDivePlanner = () => {
  const journalists = [
    "Sarah Kim - Digital Forensics",
    "Michael Chen - Financial Investigation", 
    "Amara Ibrahim - Field Reporter",
    "David Rodriguez - Social Media Analysis",
    "Fatima Al-Zahra - Document Analysis"
  ]

  const [osintClusters, setOsintClusters] = useState<OSINTCluster[]>([
    {
      id: "cluster-1",
      title: "Financial Transactions Investigation",
      description: "Banking records and suspicious financial flows related to election funding",
      leadCount: 4,
      isExpanded: false,
      leads: [
        {
          id: "lead-1",
          title: "Analyze suspicious bank transfers",
          description: "Review large cash movements in the weeks leading up to election",
          priority: "high",
          assignee: null,
          status: "unassigned",
          estimatedHours: 8
        },
        {
          id: "lead-2", 
          title: "Cross-reference shell companies",
          description: "Investigate corporate registrations linked to campaign funding",
          priority: "high",
          assignee: null,
          status: "unassigned", 
          estimatedHours: 12
        },
        {
          id: "lead-3",
          title: "Interview banking sources",
          description: "Speak with bank employees who flagged transactions",
          priority: "medium",
          assignee: null,
          status: "unassigned",
          estimatedHours: 6
        },
        {
          id: "lead-4",
          title: "Document cryptocurrency transactions",
          description: "Trace digital currency movements related to campaign",
          priority: "medium", 
          assignee: null,
          status: "unassigned",
          estimatedHours: 10
        }
      ]
    },
    {
      id: "cluster-2",
      title: "Social Media Disinformation Campaign",
      description: "Coordinated networks spreading false election information",
      leadCount: 3,
      isExpanded: false,
      leads: [
        {
          id: "lead-5",
          title: "Map bot network activity",
          description: "Identify coordinated inauthentic behavior patterns",
          priority: "high",
          assignee: "David Rodriguez - Social Media Analysis",
          status: "assigned",
          estimatedHours: 15
        },
        {
          id: "lead-6",
          title: "Trace funding sources",
          description: "Follow money trail behind disinformation campaigns",
          priority: "medium",
          assignee: null,
          status: "unassigned",
          estimatedHours: 8
        },
        {
          id: "lead-7",
          title: "Interview platform sources", 
          description: "Speak with social media company insiders",
          priority: "low",
          assignee: null,
          status: "unassigned",
          estimatedHours: 4
        }
      ]
    },
    {
      id: "cluster-3",
      title: "Vote Buying Evidence Collection",
      description: "On-ground evidence of vote purchasing and voter intimidation",
      leadCount: 5,
      isExpanded: false,
      leads: [
        {
          id: "lead-8",
          title: "Document cash-for-votes schemes",
          description: "Gather photographic and video evidence of vote buying",
          priority: "high",
          assignee: null,
          status: "unassigned",
          estimatedHours: 20
        },
        {
          id: "lead-9",
          title: "Interview affected voters",
          description: "Record testimonies from voters who were approached",
          priority: "high",
          assignee: null,
          status: "unassigned",
          estimatedHours: 16
        },
        {
          id: "lead-10",
          title: "Map geographical patterns",
          description: "Identify regions with highest vote buying activity",
          priority: "medium",
          assignee: null,
          status: "unassigned",
          estimatedHours: 6
        },
        {
          id: "lead-11",
          title: "Coordinate with election observers",
          description: "Work with international observers to gather evidence",
          priority: "medium",
          assignee: null,
          status: "unassigned",
          estimatedHours: 8
        },
        {
          id: "lead-12",
          title: "Secure digital evidence",
          description: "Collect and preserve digital proof of vote buying",
          priority: "low",
          assignee: null,
          status: "unassigned",
          estimatedHours: 4
        }
      ]
    }
  ])

  const toggleCluster = (clusterId: string) => {
    setOsintClusters(clusters => 
      clusters.map(cluster => 
        cluster.id === clusterId 
          ? { ...cluster, isExpanded: !cluster.isExpanded }
          : cluster
      )
    )
  }

  const assignLead = (clusterId: string, leadId: string, assignee: string) => {
    setOsintClusters(clusters =>
      clusters.map(cluster =>
        cluster.id === clusterId
          ? {
              ...cluster,
              leads: cluster.leads.map(lead =>
                lead.id === leadId
                  ? { ...lead, assignee, status: "assigned" as const }
                  : lead
              )
            }
          : cluster
      )
    )
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium": return "bg-warning/10 text-warning border-warning/20" 
      case "low": return "bg-info/10 text-info border-info/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unassigned": return "bg-muted/10 text-muted-foreground border-muted/20"
      case "assigned": return "bg-accent/10 text-accent border-accent/20"
      case "in-progress": return "bg-warning/10 text-warning border-warning/20"
      case "completed": return "bg-success/10 text-success border-success/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const totalLeads = osintClusters.reduce((sum, cluster) => sum + cluster.leadCount, 0)
  const assignedLeads = osintClusters.reduce((sum, cluster) => 
    sum + cluster.leads.filter(lead => lead.status !== "unassigned").length, 0)
  const unassignedLeads = totalLeads - assignedLeads

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Deep Dive Planner</h1>
        <p className="text-muted-foreground">
          OSINT investigation planning and journalist assignment for election coverage
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total OSINT Leads", value: totalLeads, icon: Target, color: "text-accent" },
          { title: "Assigned", value: assignedLeads, icon: UserCheck, color: "text-success" },
          { title: "Unassigned", value: unassignedLeads, icon: Users, color: "text-warning" },
          { title: "Active Clusters", value: osintClusters.length, icon: Database, color: "text-info" }
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

      {/* Investigation Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5 text-accent" />
            Election Investigation - OSINT Clusters
          </CardTitle>
          <CardDescription>
            Organize investigation leads by topic and assign to specialized journalists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {osintClusters.map((cluster) => (
              <div key={cluster.id} className="border border-border/50 rounded-lg overflow-hidden">
                {/* Cluster Header */}
                <div 
                  className="p-4 bg-secondary/20 cursor-pointer hover:bg-secondary/30 transition-colors"
                  onClick={() => toggleCluster(cluster.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {cluster.isExpanded ? (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      )}
                      <div className="space-y-1">
                        <h3 className="font-medium text-foreground">{cluster.title}</h3>
                        <p className="text-sm text-muted-foreground">{cluster.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-accent">
                        {cluster.leadCount} leads
                      </Badge>
                      <Badge variant="outline" className={
                        cluster.leads.filter(l => l.status === "unassigned").length > 0 
                          ? "text-warning" 
                          : "text-success"
                      }>
                        {cluster.leads.filter(l => l.status !== "unassigned").length}/{cluster.leadCount} assigned
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Expanded Leads */}
                {cluster.isExpanded && (
                  <div className="p-4 space-y-3 bg-card/30">
                    {cluster.leads.map((lead) => (
                      <div key={lead.id} className="p-4 rounded-lg border border-border/50 bg-card/50">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-4">
                            <div className="space-y-2 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-medium text-foreground">{lead.title}</h4>
                                <Badge className={getPriorityColor(lead.priority)}>
                                  {lead.priority.toUpperCase()}
                                </Badge>
                                <Badge className={getStatusColor(lead.status)}>
                                  {lead.status.replace("-", " ").toUpperCase()}
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">{lead.description}</p>
                              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <Calendar className="h-3 w-3" />
                                  Est. {lead.estimatedHours} hours
                                </span>
                                {lead.assignee && (
                                  <span className="flex items-center gap-1">
                                    <UserCheck className="h-3 w-3" />
                                    {lead.assignee}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Assignment Controls */}
                          {lead.status === "unassigned" && (
                            <div className="flex items-center gap-3 pt-2 border-t border-border/50">
                              <span className="text-sm text-muted-foreground">Assign to:</span>
                              <Select 
                                onValueChange={(value) => assignLead(cluster.id, lead.id, value)}
                              >
                                <SelectTrigger className="w-64">
                                  <SelectValue placeholder="Select journalist..." />
                                </SelectTrigger>
                                <SelectContent>
                                  {journalists.map((journalist) => (
                                    <SelectItem key={journalist} value={journalist}>
                                      {journalist}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}

                          {lead.assignee && lead.status === "assigned" && (
                            <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                              <p className="text-sm text-accent">
                                ✓ Assigned to {lead.assignee}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Team Overview */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-accent" />
            Investigation Team
          </CardTitle>
          <CardDescription>
            Current workload distribution across DW Swahili journalists
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {journalists.map((journalist) => {
              const assignedToJournalist = osintClusters
                .flatMap(cluster => cluster.leads)
                .filter(lead => lead.assignee === journalist)
              
              const totalHours = assignedToJournalist.reduce((sum, lead) => sum + lead.estimatedHours, 0)
              
              return (
                <div key={journalist} className="p-4 rounded-lg border border-border/50 bg-card/30">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                        <span className="text-xs font-bold text-primary-foreground">
                          {journalist.split(" ")[0][0]}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{journalist}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Assigned Leads:</span>
                        <span className="text-foreground font-medium">{assignedToJournalist.length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Est. Hours:</span>
                        <span className="text-foreground font-medium">{totalHours}h</span>
                      </div>
                    </div>

                    {assignedToJournalist.length > 0 && (
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Current assignments:</p>
                        {assignedToJournalist.slice(0, 2).map((lead) => (
                          <p key={lead.id} className="text-xs text-foreground truncate">
                            • {lead.title}
                          </p>
                        ))}
                        {assignedToJournalist.length > 2 && (
                          <p className="text-xs text-muted-foreground">
                            +{assignedToJournalist.length - 2} more...
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default DeepDivePlanner