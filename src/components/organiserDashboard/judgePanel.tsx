import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "../ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addJudgeZ, addReferralCodeZ } from "~/server/schema/zod-schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import ReferralsTable from "./referralsTable";
import { toast } from "sonner";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import CreateCollege from "../profile/createCollege";
import { ScrollArea } from "../ui/scroll-area";
import JudgesTable from "./judgesTable";

export default function JudgePanel(){
  const {data: judgesData, refetch: judgesRefetch} = api.organiser.getJudgesList.useQuery();
  const addJudge = api.organiser.addJudge.useMutation({
    onSuccess: async() => {
      await judgesRefetch();
    }
  });
  const [collegeId, setCollegeId] = useState("");

  const [openCollegeList, setOpenCollegeList] = useState(false);
  const [collegevalue, setCollegevalue] = useState("");
  const user = api.user.getUserWithCollege.useQuery().data;
  const { data: users, refetch: refetchUsers } =
    api.user.getAllUsers.useQuery();

  

  const form = useForm<z.infer<typeof addJudgeZ>>({
    defaultValues: {
      userId: "",
      track: "ALL",
      type: "VALIDATOR",
    },
  });

  async function submitForm(data: z.infer<typeof addJudgeZ>) {
    toast.loading("Adding judge");

    await addJudge.mutateAsync({
      userId: data.userId,
      type: data.type,
      track: data.track,
    });
    await judgesRefetch();
    toast.dismiss();
    toast.success("Added judge successfully");
  }

  return (
    <>
      <div className="w-full border-b">
        <h1 className="py-10 text-center text-4xl font-bold">Referrals</h1>
      </div>
      <Dialog>
        <DialogTrigger className="my-5 flex w-full items-center justify-center">
          <button className="rounded-lg bg-white px-4 py-2 text-black">
            + Add Judge
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Add Judge</DialogHeader>
          <Form {...form}>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                await form.handleSubmit(submitForm)();
              }}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="userId"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>User Id</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter User ID"
                          className="text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

<FormField
                control={form.control}
                name="type"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Type"
                          className="text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="track"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel>Tracks</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Tracks"
                          className="text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              
              <Button type="submit">Add Judge</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <JudgesTable {...judgesData}/>
    </>
  );
}
