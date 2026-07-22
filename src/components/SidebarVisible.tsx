import { useState } from "react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { ChevronDownIcon } from "lucide-react";
import SidebarHabitButton from "./SidebarHabitButton";
import useHabits from "../hooks/useHabits";

const HabitSkeleton = () => (
  <SidebarMenuItem>
    <SidebarMenuButton>
      <Skeleton className="h-4 w-4 rounded-md" />

      <Skeleton className="h-3 w-32" />
    </SidebarMenuButton>
  </SidebarMenuItem>
);
function SidebarVisible() {
  const { data: habits, isLoading } = useHabits();
  const [open, setOpen] = useState(true);
  return (
    <SidebarGroup>
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="flex flex-col gap-2"
      >
        <CollapsibleTrigger
          render={
            <SidebarMenuButton className="group">
              Visible
              <ChevronDownIcon className="ml-auto transition-transform duration-200 group-data-panel-open:rotate-180" />
            </SidebarMenuButton>
          }
        />

        <CollapsibleContent>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {isLoading ? (
                <>
                  <HabitSkeleton />

                  <HabitSkeleton />

                  <HabitSkeleton />
                </>
              ) : (
                habits?.map((habit) => (
                  <SidebarHabitButton key={habit.id} habit={habit} />
                ))
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </CollapsibleContent>
      </Collapsible>
    </SidebarGroup>
  );
}

export default SidebarVisible;
