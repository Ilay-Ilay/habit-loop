import { Ellipsis, SquarePen, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import type { Habit } from "../../../types/types";
import useDeleteHabit from "../../../hooks/useDeleteHabits";

import EditHabitSheet from "./EditHabitSheet";
import { Button } from "../../../components/ui/button";

type HabitActionsMenuProps = {
  habit: Habit;
};

function HabitActionsMenu({ habit }: HabitActionsMenuProps) {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: deleteHabit } = useDeleteHabit();
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          nativeButton={true}
          render={
            <Button size="icon-sm" variant="ghost">
              <Ellipsis />
            </Button>
          }
        />

        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuItem
              onClick={(event) => {
                event.preventDefault();

                setSheetOpen(true);
              }}
            >
              <SquarePen />
              Edit
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              onClick={() => setDialogOpen(true)}
            >
              <Trash />
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      {/* EDIT HABIT SHEET */}
      <EditHabitSheet open={sheetOpen} setOpen={setSheetOpen} habit={habit} />
      {/* DIALOG FOR DELETION */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. Deleting this habit will permanently
              remove it and all of its associated data.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant={"destructive"}
              onClick={() => {
                console.log("DELETE");
                deleteHabit(habit.id);
                setDialogOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default HabitActionsMenu;
