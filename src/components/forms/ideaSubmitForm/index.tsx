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
import { Textarea } from "../../ui/textarea";
import { Dropzone } from "../../ui/dropZone";
import { SessionProvider, useSession } from "next-auth/react";

export function Component() {
  const { currentState, maxState, setCurrentState, setMaxState } =
    useContext(ProgressContext);
  const form = useForm<z.infer<typeof submitIdeaZ>>({
    resolver: zodResolver(submitIdeaZ),
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [wordLimit, setWordLimit] = useState(0);

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

  const user = useSession();

  useEffect(() => {
    if (error) setTimeout(() => setError(""), 2000);
  }, [error]);

  if (currentState !== 2) return <></>;

  return (
    <div
      className={`max-h-max w-full ${
        !user.data?.user.isLeader ? "pointer-events-none opacity-50" : ""
      }`}
    >
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
                  <FormItem className="w-[92%]">
                    <FormLabel className="flex items-center justify-between">
                      Problem Statement
                      <span
                        className={`${
                          wordLimit > 100 ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        {wordLimit} / 100 characters
                      </span>
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Write your problem statement"
                        onChange={(e) => {
                          field.value = e.target.value;
                          field.onChange(e.target.value);
                          setWordLimit(e.target.value.length);
                        }}
                        value={field.value}
                      />
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
                  <FormLabel className="">Referral Code (Optional)</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Referral Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>

            {/* list of tracks*/}
            <FormField
              control={form.control}
              name="track"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
                  <FormLabel className="">Track</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Track" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {Object.values(Tracks).map((name, key) => (
                            <SelectItem
                              value={name}
                              key={key}
                              className="capitalize"
                            >
                              {name.replaceAll("_", " ").toLowerCase()}
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

            <div className="flex flex-col gap-5 w-full justify-center items-center">
              <FormField
                control={form.control}
                name="ppt"
                render={({ field, formState, fieldState }) => (
                  <FormItem className="w-[92%] mx-auto">
                    <FormLabel className="flex items-center justify-between">
                      Idea PPT
                      <a
                        href="/idea_template.pptx"
                        download
                        className="text-xs underline cursor-pointer"
                      >
                        Download PPT Template
                      </a>
                    </FormLabel>
                    <FormControl>
                      <Dropzone
                        pdf
                        onChange={setPdf}
                        className="w-full"
                        fileExtension="images"
                        // image={formData.aadhaarImg.split(';')[0]}
                      />
                      {/* <Input
                      type="file"
                      accept="pdf/*"
                      onChange={(e) => {
                        if (
                          e.target.files?.[0] &&
                          e.target.files?.[0].type === 'application/pdf'
                        ) {
                          field.value = e.target.files?.[0];
                          setPdf(e.target.files?.[0]!);
                        } else {
                          setError('Please upload a pdf file');
                        }

                        console.log(e.target.files?.[0], field.value);
                      }}
                    /> */}
                    </FormControl>
                  </FormItem>
                )}
              ></FormField>

              <Button type="submit" className="w-fit">
                {loading ? "Submitting.." : "Submit"}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default function IdeaSubmitForm() {
  return (
    <SessionProvider>
      <Component />
    </SessionProvider>
  );
}
