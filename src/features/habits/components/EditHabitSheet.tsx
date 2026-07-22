import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../../../components/ui/sheet";
import { Field, FieldError, FieldLabel } from "../../../components/ui/field";
import { Input } from "../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";

import { Button } from "../../../components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createHabitSchema } from "../../../types/schema";

import type { Habit, HabitInsert } from "../../../types/types";
import useUpdateHabit from "../../../hooks/useUpdateHabit";
type HabitFormData = Omit<HabitInsert, "order">;
type EditHabitSheetProps = {
  habit: Habit;

  open: boolean;

  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const data = {
  colors: [
    { label: "Select habit color", value: "" },

    { label: "Red", value: "#dc2626" },

    { label: "Orange", value: "#ea580c" },

    { label: "Amber", value: "#d97706" },

    { label: "Lime", value: "#65a30d" },

    { label: "Green", value: "#16a34a" },

    { label: "Teal", value: "#0d9488" },

    { label: "Cyan", value: "#0891b2" },

    { label: "Blue", value: "#2563eb" },

    { label: "Indigo", value: "#4f46e5" },

    { label: "Violet", value: "#7c3aed" },
  ],
};

function EditHabitSheet({ habit, open, setOpen }: EditHabitSheetProps) {
  const { mutate: update, isPending } = useUpdateHabit();
  const { handleSubmit, control, reset } = useForm<HabitFormData>({
    defaultValues: {
      color: habit.color,
      name: habit.name,
    },
    resolver: zodResolver(createHabitSchema),
  });
  const submitHandler = (data: HabitFormData) => {
    if (isPending) return;
    update(data);
    setOpen(false);
    reset();
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent>
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-semibold text-xl">
            Update habit
          </SheetTitle>
          <SheetDescription className={"text-sm"}>
            Update your habit details
          </SheetDescription>
        </SheetHeader>
        <form
          id="edit-habit-form"
          className="px-4 flex flex-col gap-6"
          onSubmit={handleSubmit(submitHandler)}
        >
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="habit-name-input">Habit name</FieldLabel>
                <Input
                  {...field}
                  type="text"
                  placeholder="Habit name"
                  id="habit-name-input"
                />
                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
          <Controller
            control={control}
            name="color"
            render={({ field, fieldState }) => (
              <Field>
                <FieldLabel htmlFor="habit-color-select">Color</FieldLabel>

                <Select
                  items={data.colors}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full" id="habit-color-select">
                    <SelectValue>
                      {(value) => {
                        const selectedColor = data.colors.find(
                          (color) => color.value === value,
                        );

                        if (!selectedColor) return "Select habit color";

                        return (
                          <div className="flex items-center gap-2">
                            {selectedColor.value && (
                              <div
                                style={{ backgroundColor: selectedColor.value }}
                                className="h-2 w-2 rounded-full"
                              />
                            )}

                            <span>{selectedColor.label}</span>
                          </div>
                        );
                      }}
                    </SelectValue>
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel className="text-muted-foreground">
                        Colors
                      </SelectLabel>

                      {data.colors.map((color) => (
                        <SelectItem value={color.value} key={color.value}>
                          <div className="flex items-center gap-1">
                            {color.value && (
                              <div
                                style={{ backgroundColor: color.value }}
                                className="h-2 w-2 rounded-full"
                              />
                            )}

                            <span className="text-foreground font-medium">
                              {color.label}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </form>
        <SheetFooter className="border-t border-border">
          <div className="flex gap-2 justify-end">
            <SheetClose render={<Button variant="outline">Cancel</Button>} />
            <Button type="submit" form="edit-habit-form">
              Save changes
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default EditHabitSheet;
