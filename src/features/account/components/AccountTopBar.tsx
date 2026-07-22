// type InsightsTopBarProps = {};

import { Separator } from "../../../components/ui/separator";
import { SidebarTrigger } from "../../../components/ui/sidebar";

function AccountTopBar() {
  return (
    <header className="sticky  top-0 flex justify-between h-16 shrink-0 items-center gap-2 border-b bg-background px-4 z-50">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
        <Separator orientation="vertical" className="h-4" />
        <span className="text-sm text-muted-foreground">Account</span>
      </div>
    </header>
  );
}

export default AccountTopBar;
