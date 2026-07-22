import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
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
import { useState } from "react";
import useCreateHabit from "../../../hooks/useCreateHabit";
import { Plus } from "lucide-react";
import type { HabitInsert } from "../../../types/types";
type HabitFormData = Omit<HabitInsert, "order">;
const data = {
  colors: [
    { label: "Select habit color", value: "" },

    { label: "Blue", value: "#3B82F6" },

    { label: "Indigo", value: "#6366F1" },

    { label: "Green", value: "#22C55E" },

    { label: "Teal", value: "#14B8A6" },

    { label: "Orange", value: "#F97316" },

    { label: "Red", value: "#EF4444" },
  ],
};

function HabitsCreateHabitSheet() {
  const { mutate: create, isPending } = useCreateHabit();
  const [open, setOpen] = useState(false);
  const { handleSubmit, control, reset } = useForm<HabitFormData>({
    defaultValues: {
      color: "",
      name: "",
    },
    resolver: zodResolver(createHabitSchema),
  });

  const submitHandler = (data: HabitFormData) => {
    if (isPending) return;
    create(data);
    setOpen(false);
    reset();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button>
            <Plus />
            New
          </Button>
        }
      />
      <SheetContent>
        <SheetHeader className="border-b border-border">
          <SheetTitle className="font-semibold text-xl">
            Create new habit
          </SheetTitle>
          <SheetDescription className={"text-sm"}>
            Track a daily habit to build consistency over time.
          </SheetDescription>
        </SheetHeader>
        <form
          id="create-habit-form"
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
            <Button type="submit" form="create-habit-form">
              Create habit
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

export default HabitsCreateHabitSheet;
