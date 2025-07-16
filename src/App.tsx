import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import Dashboard from "./pages/Dashboard";
import CensorshipMonitor from "./pages/CensorshipMonitor";
import StoryCorroborator from "./pages/StoryCorroborator";
import DeepDivePlanner from "./pages/DeepDivePlanner";
import ScriptEditor from "./pages/ScriptEditor";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/censorship" element={<CensorshipMonitor />} />
            <Route path="/corroborator" element={<StoryCorroborator />} />
            <Route path="/planner" element={<DeepDivePlanner />} />
            <Route path="/script-editor" element={<ScriptEditor />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
