import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail, Info, Cloud, LineChart, Newspaper, Code, Smartphone, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto space-y-8 py-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Help & Information
          </h1>
          <p className="text-muted-foreground">Everything you need to know about the Analytics Dashboard</p>
        </div>
        
        <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-t-lg">
            <div className="flex items-center gap-2">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <CardTitle className="text-2xl">About This Dashboard</CardTitle>
            </div>
            <CardDescription className="text-base">Analytics Dashboard is a demo application showcasing various data visualization capabilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            <p className="text-lg leading-relaxed">
              This is a demo application showcasing advanced React development with multiple data integrations
              and interactive features. The dashboard displays real-time data from various sources and allows
              for customization of the display preferences. This project has been developed for submission as part of the PGAGI assignment.
            </p>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                  <Code className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </span>
                Key Features
              </h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <Cloud className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Weather data visualization with customizable units</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <LineChart className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Real-time stock monitoring and historical data</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <Newspaper className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>News aggregation from multiple sources</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <Github className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>GitHub repository information and statistics</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Responsive design for all device sizes</span>
                </li>
                <li className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 dark:bg-blue-950/50">
                  <Sun className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Dark/light theme support</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 p-4 rounded-lg bg-yellow-50 dark:bg-yellow-950/50 border border-yellow-200 dark:border-yellow-900">
              <p className="text-sm text-yellow-800 dark:text-yellow-200 flex items-center gap-2">
                <Info className="w-4 h-4" />
                Note: This application uses free API tiers which may have request limitations. 
                In case of API errors, the application will fall back to demo data.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Help;
