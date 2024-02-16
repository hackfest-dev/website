"use client";
import { submitIdea } from "@/src/server/actions";
import { Modal } from "../../ui/modal";
import { Tracks } from "@prisma/client";
import { domains } from "@/src/constants";

import { use, useContext, useEffect, useState } from "react";
import { ProgressContext } from "../../progressProvider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { submitIdeaZ } from "@/src/lib/zod-schema";
import { z } from "zod";

import Image from "next/image";
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

export default function IdeaSubmitForm() {
  const tracks = domains.map((domain) => domain.name);
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);
  const form = useForm<z.infer<typeof submitIdeaZ>>({
    resolver: zodResolver(submitIdeaZ),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [pdf, setPdf] = useState<File | null>(null);

  const onSubmit = async (data: z.infer<typeof submitIdeaZ>) => {
    setLoading(true);
    // e.preventDefault();
    const formData = new FormData();
    formData.append("ppt", pdf!);
    formData.append("track", data.track);
    formData.append("problemStatement", data.problemStatement);
    formData.append("referralCode", data.referralCode);
    const res = await submitIdea(formData);
    setError(res.message);
    setLoading(false);
  };

  useEffect(() => {
    if (error) setTimeout(() => setError(""), 2000);
  }, [error]);

  if (currentState !== 2) return <></>;

  return (
    <div className="max-h-max w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:gap-4"
        >
          <h1 className="text-center lg:text-2xl text-xl ">Submit Idea</h1>
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
              name="problemStatement"
              render={({ field, formState, fieldState }) => {
                return (
                  <FormItem className="md:w-[45%] w-full">
                    <FormLabel className="">Problem Statement</FormLabel>
                    <FormControl>
                      <Input placeholder="Super Idea" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            ></FormField>

            {/* Phone */}
            <FormField
              control={form.control}
              name="referralCode"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
                  <FormLabel className="">Referral Code</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Referral Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* list of colleges*/}
            <FormField
              control={form.control}
              name="track"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
                  <FormLabel className="">Track</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select your college" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.values(Tracks).map((name, key) => (
                            <SelectItem value={name} key={key}>
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

            <FormField
              control={form.control}
              name="ppt"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[calc(90%+1.5rem)] w-full">
                  <FormLabel className="">PPT</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="pdf/*"
                      onChange={(e) => {
                        if (
                          e.target.files?.[0] &&
                          e.target.files?.[0].type === "application/pdf"
                        ) {
                          field.value = e.target.files?.[0];
                          setPdf(e.target.files?.[0]!);
                        } else {
                          setError("Please upload a pdf file");
                        }

                        console.log(e.target.files?.[0], field.value);
                      }}
                    />
                  </FormControl>
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
}
