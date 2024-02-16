"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Loader2Icon, Plus } from "lucide-react";
import { createCollege } from "@/src/server/actions";
import { useState } from "react";
import { States } from "@prisma/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { useForm } from "react-hook-form";
import { createCollegeZ } from "@/src/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

const CreateCollege = () => {
  const states = Object.entries(States).map(([, value]) => value);

  const form = useForm<z.infer<typeof createCollegeZ>>({
    resolver: zodResolver(createCollegeZ),
    defaultValues: {
      name: "",
      state: States.KARNATAKA,
    },
  });

  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    const res = await createCollege({
      name: form.getValues("name"),
      state: form.getValues("state"),
    });
    toast.success("College Added", {
      position: "bottom-center",
    });
    setLoading(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2 mt-3">
          <Plus size={16} /> Add College
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm md:w-full w-[90%]">
        <DialogHeader>
          <DialogTitle>Add College</DialogTitle>
          <DialogDescription>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-3 mt-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field, formState, fieldState }) => {
                    return (
                      <FormItem className="w-full">
                        <FormLabel className="">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="College Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                ></FormField>
                <FormField
                  control={form.control}
                  name="state"
                  render={({ field, formState, fieldState }) => (
                    <FormItem className="w-full">
                      <FormLabel className="">State</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select state" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <ScrollArea className="h-72">
                                {states.map((state, key) => (
                                  <SelectItem value={state} key={key}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                ></FormField>
                <Button type="submit" className="flex items-center gap-2 w-fit">
                  {loading ? (
                    <Loader2Icon className="animate-spin" />
                  ) : (
                    <>
                      <Plus size={16} /> Create College
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCollege;
