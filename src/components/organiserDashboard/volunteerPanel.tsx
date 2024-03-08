import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
  } from "../ui/dialog";
  import { FunctionComponent, useEffect, useState } from "react";
  import { Button } from "../ui/button";
  import { api } from "~/utils/api";
  import { Input } from "../ui/input";
  import { useForm } from "react-hook-form";
  import { z } from "zod";
  import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "../ui/form";
  import { toast } from "sonner";
  import VolunteersTable from "./volunteerTable";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../ui/select";
  import { JudgeType, Tracks, User } from "@prisma/client";
  import { ScrollArea } from "../ui/scroll-area";
  import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
  import { ChevronDown } from "lucide-react";
  
  interface Props {
    users: User[] | undefined;
  }
  
  const VolunteerPanel: FunctionComponent<Props> = ({ users }) => {
    const [userQuery, setUserQuery] = useState<string>("");
    const [openUserList, setOpenUserList] = useState<boolean>(false);
  
    const [selectedUsers, setSelectedUsers] = useState(users);
    const [userName, setUserName] = useState<string | null>(null);
    const [userId, setUserId] = useState<string | null>(null);
  
    const { data: volunteersData, refetch: volunteersRefetch } =
      api.organiser.getVolunteerList.useQuery();
  
    const addVolunteer = api.organiser.addVolunteer.useMutation({
      onSuccess: async () => {
        toast.dismiss("addingVolunteer")
        toast.success("Added Volunteer")

        await volunteersRefetch();
      },
      onError: async () => {
        toast.dismiss();
        toast.error("Error adding volunteer");
      },
    });
  
    
  if(addVolunteer.isLoading){
    toast.loading("Adding Volunteer",{id:"addingVolunteer"});

  }
    
  
    useEffect(() => {
      if (!users) return;
      setSelectedUsers(() => {
        return users.filter(
          (user) =>
            user.id.toLowerCase().includes(userQuery.toLocaleLowerCase()) ||
            user.name?.toLowerCase().includes(userQuery.toLowerCase()),
        );
      });
    }, [users, userQuery]);
  
    return (
      <>
        <div className="w-full border-b">
          <h1 className="py-10 text-center text-4xl font-bold">Volunteers</h1>
        </div>
        <Dialog>
          <DialogTrigger className="my-5 flex w-full items-center justify-center">
            <button className="rounded-lg bg-white px-4 py-2 text-black">
              + Add Volunteer
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>Add Volunteer</DialogHeader>
            <Popover
                            open={openUserList}
                            onOpenChange={setOpenUserList}
                          >
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={openUserList}
                                className="w-full justify-between overflow-hidden truncate dark:text-white"
                              >
                                {userName ? userName : "Select user"}
                                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="px-3">
                              <Input
                                placeholder="Enter User ID/Name"
                                className="text-white"
                                value={userQuery}
                                onChange={(e) => {
                                  setUserQuery(e.target.value);
                                }}
                              />
                              <ScrollArea className="h-72 pt-5">
                                <div className="group">
                                  {selectedUsers?.length === 0 && (
                                    <div className="text-center text-gray-500">
                                      No users found
                                    </div>
                                  )}
                                  {selectedUsers?.map((user) => (
                                    <Button
                                      variant="ghost"
                                      className={`h-max w-full justify-start text-wrap text-start font-normal ${userId === user.id ? "bg-accent text-accent-foreground group-hover:bg-inherit group-hover:text-inherit group-hover:hover:bg-accent group-hover:hover:text-accent-foreground" : ""}`}
                                      key={user.id}
                                      onClick={(e) => {
                                        setUserId(user.id);
                                        setUserName(user.name);
                                        setOpenUserList(false);
                                        setUserQuery("");
                                      }}
                                    >
                                      {user.name}
                                    </Button>
                                  ))}
                                </div>
                              </ScrollArea>
                            </PopoverContent>
                          </Popover>
                          <Button onClick={async () => {await addVolunteer.mutateAsync({
                            id: userId ? userId : ''
                          })}} >
                            Submit
                          </Button>
          </DialogContent>
        </Dialog>
        <VolunteersTable data={volunteersData} refetch={volunteersRefetch} />
      </>
    );
  };
  
  export default VolunteerPanel;
  