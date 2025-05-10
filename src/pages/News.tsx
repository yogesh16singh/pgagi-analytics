import React, { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import NewsWidget from "@/components/widgets/NewsWidget";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Newspaper } from "lucide-react";
import { motion } from "framer-motion";

const News = () => {
  const [isUsingMockData, setIsUsingMockData] = useState(false);

  return (
    <MainLayout>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-8"
      >
        <div className="flex items-center gap-3">
          <Newspaper className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            News Dashboard
          </h1>
        </div>
        
        {isUsingMockData && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Alert className="border-primary/20 bg-primary/5">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-primary/80">
                Using demo data. Live news feed is currently unavailable.
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
        
        <div className="grid grid-cols-1 gap-6">
          {/* Featured News */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="border-primary/10 bg-gradient-to-br from-background to-primary/5">
              <CardHeader className="border-b border-primary/10">
                <CardTitle className="text-xl font-semibold text-primary">
                  Featured Headlines
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <NewsWidget 
                  className="bg-transparent shadow-none border-0" 
                  category="general"
                  onMockDataStateChange={(isMockData) => setIsUsingMockData(isMockData)}
                />
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Categories Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['technology', 'business', 'science'].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full border-muted/30 hover:border-primary/20 transition-colors duration-300">
                  <CardHeader className="border-b border-muted/20">
                    <CardTitle className="text-lg font-medium capitalize">
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <NewsWidget 
                      className="bg-transparent shadow-none border-0" 
                      category={category}
                      onMockDataStateChange={(isMockData) => {
                        if (isMockData) setIsUsingMockData(true);
                      }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default News;
