"use client";
import { TshirtSize } from "@prisma/client";
import { type Dispatch, useContext, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { getUrlAndId } from "~/utils/helper";
import { ProgressContext } from "../../progressProvider";
import { toast } from "sonner";
import { ChevronDown, Loader2Icon, Save } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Dropzone } from "../../ui/dropZone";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../../ui/command";
import CreateCollege from "../../profile/createCollege";
import { ScrollArea } from "../../ui/scroll-area";
import { useRouter } from "next/navigation";
import { updateProfileZ } from "~/server/schema/zod-schema";
import { api } from "~/utils/api";
import { type inferRouterOutputs } from "@trpc/server";
import { type userRouter } from "~/server/api/routers/user";
import { type collegeRouter } from "~/server/api/routers/college";

const ProfileForm = ({
  user,
  colleges,
  courses,
  registerProp,
}: {
  user:
    | inferRouterOutputs<typeof userRouter>["getUserWithCollege"]
    | null
    | undefined;
  colleges:
    | inferRouterOutputs<typeof collegeRouter>["getColleges"]
    | undefined
    | null;
  courses: string[];
  registerProp?: {
    currentState: number;
    maxState: number;
    setCurrentState: Dispatch<number>;
    setMaxState: Dispatch<number>;
  };
}) => {
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);

  const form = useForm<z.infer<typeof updateProfileZ>>({
    resolver: zodResolver(updateProfileZ),
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      college: user?.collegeId ?? "",
      course: user?.course ?? undefined,
      tshirtSize: user?.tShirtSize ?? undefined,
    },
  });
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [clgFile, setClgFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string>("");
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pending, startTransition] = useTransition();

  const [openCollegeList, setOpenCollegeList] = useState(false);
  const [collegevalue, setCollegevalue] = useState("");
  const [collegeId, setCollegeId] = useState(user?.collegeId ?? "");
  const updateProfile = api.user.updateProfile.useMutation();

  if (currentState !== 0 && registerProp) {
    return <></>;
  }

  const onSubmit = async (data: z.infer<typeof updateProfileZ>) => {
    setLoading(true);
    // e.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone);
    formData.append("course", data.course || "");
    formData.append("college", collegeId || "");
    formData.append("tshirtSize", data.tshirtSize || "");
    formData.append("collegeIdFile", clgFile ?? "");
    formData.append("aadhaarFile", aadhaarFile ?? "");
    toast.loading("Saving Details...", {
      id: "loadingToast",
      position: "bottom-center",
    });

    const res = await updateProfile.mutateAsync({
      name: data.name,
      phone: data.phone,
      course: data.course,
      college: data.college,
      tshirtSize: data.tshirtSize,
      collegeIdFile: data.collegeIdFile,
      aadhaarFile: data.aadhaarFile,
    });

    toast.dismiss("loadingToast");
    if (res.status !== "error")
      toast.success("Profile Updated", {
        duration: 2000,
        position: "bottom-center",
      });
    else
      toast.error(res.message, {
        duration: 2000,
        position: "bottom-center",
      });
    setError(res.message);
    setLoading(false);
    startTransition(() => {
      router.refresh();
    });
    res.status !== "error" && registerProp && setCurrentState(1);
    res.status !== "error" && maxState <= 1 && registerProp && setMaxState(1);
  };

  return (
    <div className="max-h-max w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:gap-4"
        >
          <h1 className="text-center text-xl lg:text-2xl ">
            Fill your Details
          </h1>
          <div className="mx-auto flex flex-col flex-wrap items-center justify-center gap-4 md:flex-row">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem className="w-full md:w-[45%]">
                    <FormLabel className="">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>
            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full md:w-[45%]">
                  <FormLabel className="">Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      inputMode="decimal"
                      placeholder="Enter Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {/* list of colleges*/}
            <FormField
              control={form.control}
              name="college"
              render={({}) => (
                <FormItem className="w-[80vw] md:w-[45%]">
                  <FormLabel className="">College</FormLabel>
                  <FormControl>
                    <Popover
                      open={openCollegeList}
                      onOpenChange={setOpenCollegeList}
                    >
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCollegeList}
                          className="w-full justify-between overflow-hidden truncate"
                        >
                          {collegevalue
                            ? collegevalue
                            : user?.college?.name
                              ? user?.college?.name +
                                ", " +
                                user?.college.state
                                  .replace(/_/g, " ")
                                  .split(" ")
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1).toLowerCase(),
                                  )
                                  .join(" ")
                              : "Select college"}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="px-3">
                        <Command>
                          <CommandInput
                            placeholder="Search college here..."
                            className="h-9"
                          />
                          <CommandEmpty className="mt-3 flex flex-col items-center justify-center text-center">
                            No College with that name found.
                            <CreateCollege />
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-72">
                              {colleges?.map((college) => (
                                <CommandItem
                                  key={college.id}
                                  value={college.name}
                                  onSelect={(currentValue) => {
                                    setCollegeId(college.id);
                                    form.setValue("college", college.id);
                                    setCollegevalue(
                                      currentValue === collegevalue
                                        ? collegevalue
                                        : college.name +
                                            ", " +
                                            college.state
                                              .replace(/_/g, " ")
                                              .split(" ")
                                              .map(
                                                (word) =>
                                                  word.charAt(0).toUpperCase() +
                                                  word.slice(1).toLowerCase(),
                                              )
                                              .join(" "),
                                    );
                                    // setFormData({
                                    //   ...formData,
                                    //   collegeId: college.id,
                                    // });
                                    setOpenCollegeList(false);
                                  }}
                                >
                                  {college.name},{" "}
                                  {college.state
                                    .replace(/_/g, " ")
                                    .split(" ")
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase(),
                                    )
                                    .join(" ")}
                                </CommandItem>
                              ))}
                              <CreateCollege />
                            </ScrollArea>
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {/* Course */}
            <FormField
              control={form.control}
              name="course"
              render={({ field }) => (
                <FormItem className="w-full md:w-[45%]">
                  <FormLabel className="">Degree</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {courses.map((course, key) => (
                            <SelectItem value={course} key={key}>
                              {course}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {/* T-Shirt Size */}
            <FormField
              control={form.control}
              name="tshirtSize"
              render={({ field }) => (
                <FormItem className="w-full md:w-[45%]">
                  <FormLabel className="flex items-center justify-between">
                    T-shirt Size
                    <a
                      href="/images/Size_Chart.jpeg"
                      download
                      className="cursor-pointer text-xs underline"
                    >
                      Download Size Chart
                    </a>
                  </FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your T-shirt size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.values(TshirtSize).map((size, key) => (
                            <SelectItem value={size} key={key}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            {/* files */}
            <Card className="w-full">
              <CardContent className="grid gap-2 p-4 md:grid-cols-1 lg:grid-cols-2">
                <FormField
                  control={form.control}
                  name="aadhaarFile"
                  render={({}) => (
                    <FormItem className="w-full md:w-[calc(90%+1.5rem)]">
                      <FormLabel className="">Aadhar Card</FormLabel>
                      <FormControl>
                        <div className="sm:py-2">
                          <Dropzone
                            onChange={setAadhaarFile}
                            className="w-full"
                            fileExtension="images"
                            image={getUrlAndId(user?.aadhaar ?? "").url || ""}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="collegeIdFile"
                  render={({}) => {
                    // console.log(field)
                    return (
                      <FormItem>
                        <FormLabel>College ID Card</FormLabel>
                        <FormControl>
                          <div className="sm:py-2">
                            <Dropzone
                              onChange={setClgFile}
                              className="w-full"
                              fileExtension="images"
                              image={
                                getUrlAndId(user?.college_id ?? "").url || ""
                              }
                            />
                          </div>
                        </FormControl>
                      </FormItem>
                    );
                  }}
                ></FormField>
              </CardContent>
            </Card>
            <Button
              type="submit"
              disabled={loading}
              className={`mt-5 ${
                loading ? "cursor-not-allowed" : ""
              } flex items-center gap-2`}
            >
              {loading ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save changes
            </Button>{" "}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
