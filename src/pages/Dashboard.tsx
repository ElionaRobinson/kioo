import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  AlertTriangle, 
  Shield, 
  Search, 
  Edit3,
  Activity,
  Users,
  FileText,
  Clock
} from "lucide-react"

const Dashboard = () => {
  const stats = [
    {
      title: "Active Investigations",
      value: "7",
      change: "+2 this week",
      icon: Search,
      color: "text-accent"
    },
    {
      title: "Censorship Events",
      value: "23",
      change: "+5 today",
      icon: AlertTriangle,
      color: "text-warning"
    },
    {
      title: "Verified Stories",
      value: "41",
      change: "+3 this week", 
      icon: Shield,
      color: "text-success"
    },
    {
      title: "Scripts in Review",
      value: "4",
      change: "2 pending legal",
      icon: Edit3,
      color: "text-info"
    }
  ]

  const recentActivity = [
    {
      type: "censorship",
      title: "New censorship event detected",
      description: "Social media platform blocking election coverage",
      time: "2 minutes ago",
      severity: "high"
    },
    {
      type: "verification",
      title: "Story corroboration completed",
      description: "Election fraud allegations - Case #2025-001",
      time: "15 minutes ago",
      severity: "medium"
    },
    {
      type: "script",
      title: "Script submitted for legal review",
      description: "Investigation into ballot irregularities",
      time: "1 hour ago",
      severity: "low"
    },
    {
      type: "lead",
      title: "New OSINT lead assigned",
      description: "Financial transactions investigation",
      time: "2 hours ago",
      severity: "medium"
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high": return "bg-destructive/10 text-destructive border-destructive/20"
      case "medium": return "bg-warning/10 text-warning border-warning/20"
      case "low": return "bg-success/10 text-success border-success/20"
      default: return "bg-muted/10 text-muted-foreground border-muted/20"
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "censorship": return AlertTriangle
      case "verification": return Shield
      case "script": return Edit3
      case "lead": return Search
      default: return Activity
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-foreground">Investigation Dashboard</h1>
        <p className="text-muted-foreground">
          Real-time overview of election investigation activities across DW Swahili
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="bg-card/50 backdrop-blur-sm border-border/50 hover:bg-card/80 transition-all duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Investigation Progress */}
        <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-accent" />
              Active Investigations Progress
            </CardTitle>
            <CardDescription>
              Current status of ongoing election investigations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: "Election Fraud Case #2025-001", progress: 75, status: "Legal Review" },
              { name: "Media Censorship Investigation", progress: 60, status: "Evidence Collection" },
              { name: "Vote Buying Allegations", progress: 40, status: "Source Verification" },
              { name: "Ballot Irregularities Report", progress: 85, status: "Final Review" }
            ].map((investigation, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{investigation.name}</p>
                    <p className="text-xs text-muted-foreground">{investigation.status}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {investigation.progress}%
                  </Badge>
                </div>
                <Progress value={investigation.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-accent" />
              Recent Activity
            </CardTitle>
            <CardDescription>
              Latest updates across all investigation tools
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = getTypeIcon(activity.type)
              return (
                <div key={index} className={`p-3 rounded-lg border ${getSeverityColor(activity.severity)}`}>
                  <div className="flex items-start gap-3">
                    <Icon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                    <div className="space-y-1 flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <p className="text-xs opacity-80 truncate">{activity.description}</p>
                      <div className="flex items-center gap-1 text-xs opacity-60">
                        <Clock className="h-3 w-3" />
                        {activity.time}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Fast access to common investigation workflows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { 
                title: "Monitor Censorship", 
                description: "Track new censorship events",
                icon: AlertTriangle,
                href: "/censorship",
                color: "hover:bg-warning/10"
              },
              { 
                title: "Verify Story", 
                description: "Start story corroboration",
                icon: Shield,
                href: "/corroborator",
                color: "hover:bg-success/10"
              },
              { 
                title: "Plan Investigation", 
                description: "Create investigation plan",
                icon: Search,
                href: "/planner",
                color: "hover:bg-info/10"
              },
              { 
                title: "Write Script", 
                description: "Draft evidence-based script",
                icon: Edit3,
                href: "/script-editor",
                color: "hover:bg-accent/10"
              }
            ].map((action, index) => {
              const Icon = action.icon
              return (
                <a
                  key={index}
                  href={action.href}
                  className={`p-4 rounded-lg border border-border/50 ${action.color} transition-all duration-200 group cursor-pointer`}
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <Icon className="h-8 w-8 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <div>
                      <p className="font-medium text-foreground">{action.title}</p>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </div>
                </a>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Dashboard