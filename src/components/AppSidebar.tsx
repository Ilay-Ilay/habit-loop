import SidebarAccount from "./SidebarAccount";
import SidebarNav from "./SidebarNav";
import SidebarVisible from "./SidebarVisible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarSeparator,
} from "./ui/sidebar";

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarAccount />
      </SidebarHeader>
      <SidebarSeparator className="mx-0" />
      <SidebarContent>
        <SidebarNav />
        <SidebarVisible />
      </SidebarContent>
      <SidebarSeparator className="mx-0" />
      <SidebarFooter></SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;
