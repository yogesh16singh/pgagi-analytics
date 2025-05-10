
import React from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Help = () => {
  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Help & Information</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>About This Dashboard</CardTitle>
            <CardDescription>Analytics Dashboard is a demo application showcasing various data visualization capabilities.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
            This is a demo application showcasing advanced React development with multiple data integrations
            and interactive features. The dashboard displays real-time data from various sources and allows
            for customization of the display preferences. This project has been developed for submission as part of the PGAGI assignment.
            </p>
            <h3 className="font-medium">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Weather data visualization with customizable units</li>
              <li>Real-time stock monitoring and historical data</li>
              <li>News aggregation from multiple sources</li>
              <li>GitHub repository information and statistics</li>
              <li>Responsive design for all device sizes</li>
              <li>Dark/light theme support</li>
            </ul>
            <p className="text-sm text-muted-foreground mt-4">
              Note: This application uses free API tiers which may have request limitations. 
              In case of API errors, the application will fall back to demo data.
            </p>
          </CardContent>
        </Card>
        
      
      </div>
    </MainLayout>
  );
};

export default Help;
