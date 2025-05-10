import React from "react";
import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { 
  LayoutDashboard, 
  Cloud, 
  Newspaper, 
  TrendingUp,
  Github,
  Settings,
  HelpCircle
} from "lucide-react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/" },
    { name: "Weather", icon: Cloud, href: "/weather" },
    { name: "News", icon: Newspaper, href: "/news" },
    { name: "Stocks", icon: TrendingUp, href: "/stocks" },
    { name: "GitHub", icon: Github, href: "/github" },
  ];

  const utilityItems = [
    { name: "Settings", icon: Settings, href: "/settings" },
    { name: "Help", icon: HelpCircle, href: "/help" },
  ];
  
  const mainNavActiveIndex = navItems.findIndex(item => item.href === location.pathname);
  const utilityActiveIndex = utilityItems.findIndex(item => item.href === location.pathname);

  return (
    <SidebarComponent className="bg-gradient-to-b from-background to-background/95 border-r border-border/50">
      <SidebarHeader className="px-6 py-4 bg-gradient-to-r from-primary/10 to-transparent">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="font-bold text-xl bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
            Analytics Dashboard
          </span>
        </motion.div>
      </SidebarHeader>
      
      <SidebarContent className="px-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <div className="relative">
              {mainNavActiveIndex >= 0 && (
                <motion.div 
                  className="absolute left-0 right-0 h-8 rounded-md bg-gradient-to-r from-primary/20 to-primary/5 border-l-2 border-primary"
                  initial={false}
                  animate={{ 
                    y: mainNavActiveIndex * 36,
                    opacity: 1
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              )}
              <SidebarMenu>
                {navItems.map((item, index) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.href}
                        className={({ isActive }) => 
                          `flex items-center gap-3 z-10 relative py-2.5 ${isActive ? 'text-primary font-semibold' : 'hover:text-primary/80 transition-colors'}`
                        }
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                        >
                          <item.icon className="h-5 w-5" />
                        </motion.div>
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3, delay: index * 0.05 + 0.1 }}
                          className="text-[15px]"
                        >
                          {item.name}
                        </motion.span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
        
       
      </SidebarContent>
      
      <SidebarFooter className="px-6 py-4 bg-gradient-to-t from-primary/5 to-transparent">
        <div 
          className="flex items-center gap-3 cursor-pointer hover:bg-primary/10 p-2 rounded-md transition-colors"
          onClick={() => navigate('/help')}
        >
          <Avatar className="h-9 w-9 ring-2 ring-primary/20">
            <AvatarImage src="/placeholder.svg" alt="User" />
            <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10">U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-[15px] font-semibold">Yogesh singh</span>
            <span className="text-sm text-muted-foreground/80">Administrator</span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="ml-auto hover:bg-primary/10"
            onClick={(e) => {
              e.stopPropagation();
              navigate('/help');
            }}
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
        </div>
      </SidebarFooter>
    </SidebarComponent>
  );
};

export default Sidebar;
