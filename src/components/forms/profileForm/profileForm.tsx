"use client";
import { College, User } from "@prisma/client";
import { updateProfile } from "@/src/server/actions";
import { Dispatch, useContext, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateProfileZ } from "@/src/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
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
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { getUrlAndId } from "@/src/lib/utils/helper";
import { ProgressContext } from "../../progressProvider";

const ProfileForm = ({
  user,
  colleges,
  states,
  courses,
  registerProp,
}: {
  user: User & {
    college: College | null;
  };
  colleges: {
    id: string;
    name: string;
  }[];
  states: string[];
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
  const [collegeId, setCollegeId] = useState<{
    url: string;
    file: File;
  }>();
  const [aadhaar, setAadhaar] = useState<{
    url: string;
    file: File;
  }>();
  const form = useForm<z.infer<typeof updateProfileZ>>({
    resolver: zodResolver(updateProfileZ),
    defaultValues: {
      name: user.name ?? "",
      phone: user.phone ?? "",
      college: user.collegeId ?? "",
      course: user.course ?? undefined,
    },
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>("");

  const previewCollegeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setCollegeId({ url, file: files[0] });
    }
  };

  if (currentState !== 0 && registerProp) {
    return <></>;
  }

  const previewAdhaar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setAadhaar({ url, file: files[0] });
    }
  };
  // console.log(user.college_id)
  const onSubmit = async (data: z.infer<typeof updateProfileZ>) => {
    setLoading(true);
    // e.preventDefault();
    const formData = new FormData();
    let res;
    if (collegeId?.file) {
      res = await updateProfile({
        ...data,
        collegeIdFile: collegeId?.file,
      });
    } else if (aadhaar?.file) {
      res = await updateProfile({
        ...data,
        aadhaarFile: aadhaar?.file,
      });
    } else {
      res = await updateProfile({
        ...data,
      });
    }
    setError(res.message);
    setLoading(false);
  };

  return (
    <div className="max-h-max w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:gap-4"
        >
          <h1 className="text-center lg:text-2xl text-xl ">Update Profile</h1>
          <p
            className={`text-center ${
              error.includes("updated") ? "text-green-500" : "text-red-500"
            }`}
          >
            {error}
          </p>
          <div className="flex flex-wrap flex-col md:flex-row justify-center items-center mx-auto gap-4">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field, formState, fieldState }) => {
                return (
                  <FormItem className="md:w-[45%] w-full">
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
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
                  <FormLabel className="">Phone</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="8939269292" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* list of colleges*/}
            <FormField
              control={form.control}
              name="college"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
                  <FormLabel className="">College</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value={"other"}>Other</SelectItem>
                          {colleges.map(({ id, name }, key) => (
                            <SelectItem value={id} key={key}>
                              {name}
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

            {form.watch("college") === "other" && (
              <>
                <FormField
                  control={form.control}
                  name="otherCollege"
                  render={({ field, formState, fieldState }) => {
                    return (
                      <FormItem className="md:w-[45%] w-full">
                        <FormLabel className="">Name</FormLabel>
                        <FormControl>
                          <Input placeholder="My College" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                ></FormField>
                <FormField
                  control={form.control}
                  name="otherCollegeState"
                  render={({ field, formState, fieldState }) => (
                    <FormItem className="md:w-[45%] w-full">
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
                              {states.map((state, key) => (
                                <SelectItem value={state} key={key}>
                                  {state}
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
              </>
            )}

            {/* Course */}
            <FormField
              control={form.control}
              name="course"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
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

            <FormField
              control={form.control}
              name="tshirtSize"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
                  <FormLabel className="">T-shirt Size</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your Degree" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {["S", "M", "L", "XL", "XXL"].map((size, key) => (
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
            {/* College ID */}
            <FormField
              control={form.control}
              name="collegeIdFile"
              render={({ field, formState, fieldState }) => {
                // console.log(field)
                return (
                  <FormItem className="md:w-[calc(90%+1.5rem)] w-full">
                    <FormLabel className="">College ID Card</FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files?.[0])
                            field.value = e.target.files?.[0];

                          console.log(e.target.files?.[0], field.value);
                          previewCollegeId(e);
                        }}
                      />
                    </FormControl>
                    {(collegeId?.url || user?.college_id) && (
                      <span>
                        <Image
                          src={
                            collegeId?.url ||
                            getUrlAndId(user?.college_id ?? "").url ||
                            ""
                          }
                          alt="collegeID"
                          width={100}
                          height={100}
                          unoptimized
                        />
                        {user.college_id && !collegeId?.url && "Uploaded File"}
                        {collegeId?.url && (
                          <Button
                            onClick={() => {
                              setCollegeId({
                                url: "",
                                file: undefined,
                              });
                              (
                                document.getElementById(
                                  "collegeId"
                                ) as HTMLInputElement
                              ).value = "";
                            }}
                            className="bg-red-500  text-center w-fit p-1 rounded cursor-pointer"
                            type="button"
                          >
                            Remove
                          </Button>
                        )}
                      </span>
                    )}
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

            {/* Aadhaar */}
            <FormField
              control={form.control}
              name="aadhaarFile"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[calc(90%+1.5rem)] w-full">
                  <FormLabel className="">Aadhar Card</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={previewAdhaar}
                    />
                  </FormControl>
                  {(aadhaar?.url || user?.aadhaar) && (
                    <span>
                      <Image
                        src={
                          aadhaar?.url ||
                          getUrlAndId(user?.aadhaar ?? "").url ||
                          ""
                        }
                        alt="Adhaar"
                        width={100}
                        height={100}
                        unoptimized
                      />{" "}
                      {user?.aadhaar && !aadhaar?.url && "Uploaded File"}
                      {aadhaar?.url && (
                        <button
                          onClick={() => {
                            setAadhaar({
                              url: "",
                              file: undefined,
                            });
                            (
                              document.getElementById(
                                "aadhaar"
                              ) as HTMLInputElement
                            ).value = "";
                          }}
                          className="bg-red-500  text-center w-fit p-1 rounded cursor-pointer"
                          type="button"
                        >
                          Remove
                        </button>
                      )}
                    </span>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <Button
              type="submit"
              className=" md:w-[calc(90%+1.5rem)] w-full border rounded-md p-2 mt-6 hover:bg-blue-700 font-semibold"
            >
              {loading ? "Updating..." : "Update"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
