import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import LineChartWidget from "@/components/widgets/LineChartWidget";
import WeatherWidget from "@/components/widgets/WeatherWidget";
import NewsWidget from "@/components/widgets/NewsWidget";
import StockWidget from "@/components/widgets/StockWidget";
import StockChartWidget from "@/components/widgets/StockChartWidget";
import GitHubWidget from "@/components/widgets/GitHubWidget";
import { RefreshCw, ArrowRight, TrendingUp, Eye, Users, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useMediaQuery } from "@/hooks/use-media-query";
import { toast } from "sonner";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { cn } from "@/lib/utils";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Animated widget container component
const AnimatedWidget = ({ 
  children, 
  index, 
  onClick = undefined 
}: { 
  children: React.ReactNode; 
  index: number; 
  onClick?: () => void 
}) => {
  return (
    <motion.div
      custom={index}
      initial="hidden"
      animate="visible"
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: (i) => ({
          opacity: 1,
          y: 0,
          transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut"
          }
        })
      }}
      className={cn(
        "h-full flex flex-col transition-shadow duration-200",
        onClick && "cursor-pointer",
        "hover:shadow-lg hover:border-primary/50"
      )}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

const Index = () => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [weatherUnit] = useLocalStorage<"imperial" | "metric">("weatherUnit", "imperial");
  const [newsCategory] = useLocalStorage<string>("newsCategory", "technology");
  const [selectedStock] = useLocalStorage<string>("selectedStock", null);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsRefreshing(true);
    toast.info("Refreshing dashboard data...");
    
    // Simulate data refresh
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard data refreshed");
    }, 1500);
  };

  return (
    <MainLayout>
      <div className="flex flex-col gap-4 p-4 bg-gradient-to-br from-background to-background/80">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Analytics Overview
          </h1>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleRefresh}
              className="bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10"
            >
              <RefreshCw className={cn("mr-2 h-4 w-4", isRefreshing && "animate-spin")} />
              Refresh Data
            </Button>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="bg-gradient-to-br from-primary/5 to-background hover:from-primary/10 hover:to-background/90 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">12,345</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500/5 to-background hover:from-blue-500/10 hover:to-background/90 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-500/60 bg-clip-text text-transparent">2,345</div>
              <p className="text-xs text-muted-foreground">
                +15.3% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-500/5 to-background hover:from-green-500/10 hover:to-background/90 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-500 to-green-500/60 bg-clip-text text-transparent">89.2%</div>
              <p className="text-xs text-muted-foreground">
                +4.2% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-purple-500/5 to-background hover:from-purple-500/10 hover:to-background/90 transition-all duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-purple-500/60 bg-clip-text text-transparent">3.2%</div>
              <p className="text-xs text-muted-foreground">
                +1.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4 bg-gradient-to-br from-background to-background/95">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <ChartContainer
                config={{
                  views: {
                    label: "Views",
                    theme: {
                      light: "hsl(222.2 84% 4.9%)",
                      dark: "hsl(210 40% 98%)"
                    }
                  },
                  users: {
                    label: "Users",
                    theme: {
                      light: "hsl(221.2 83.2% 53.3%)",
                      dark: "hsl(217.2 91.2% 59.8%)"
                    }
                  }
                }}
              >
                <LineChart data={[
                  { name: "Jan", views: 4000, users: 2400 },
                  { name: "Feb", views: 3000, users: 1398 },
                  { name: "Mar", views: 2000, users: 9800 },
                  { name: "Apr", views: 2780, users: 3908 },
                  { name: "May", views: 1890, users: 4800 },
                  { name: "Jun", views: 2390, users: 3800 }
                ]}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis dataKey="name" className="text-muted-foreground" />
                  <YAxis className="text-muted-foreground" />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'hsl(var(--background))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="views" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="users" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--primary))' }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>
          
          <Card className="col-span-3 bg-gradient-to-br from-background to-background/95">
            <CardHeader>
              <CardTitle className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div className="flex items-center group">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">New User Registration</p>
                    <p className="text-sm text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">Content Update</p>
                    <p className="text-sm text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
                <div className="flex items-center group">
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none group-hover:text-primary transition-colors">System Maintenance</p>
                    <p className="text-sm text-muted-foreground">3 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Index;
