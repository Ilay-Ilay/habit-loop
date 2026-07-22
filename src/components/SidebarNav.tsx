import { ChartLine, Target } from "lucide-react";
import { NavLink } from "react-router-dom";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const data = {
  tabs: [
    {
      label: "Habits",
      url: "/habits",
      icon: Target,
    },
    {
      label: "Insights",
      url: "/insights",
      icon: ChartLine,
    },
  ],
};

export default function SidebarNav() {
  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu className="gap-1">
          {data.tabs.map((tab) => (
            <SidebarMenuItem key={tab.label}>
              <NavLink to={tab.url}>
                {({ isActive }) => (
                  <SidebarMenuButton
                    isActive={isActive}
                    className={!isActive ? "text-muted-foreground" : ""}
                  >
                    <tab.icon strokeWidth={2} />

                    {tab.label}
                  </SidebarMenuButton>
                )}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
