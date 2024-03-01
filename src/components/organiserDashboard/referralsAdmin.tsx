import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
} from "../ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "../ui/button";
import { api } from "~/utils/api";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addReferralCodeZ } from "~/server/schema/zod-schema";
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

export default function ReferralsAdmin() {
  const addReferral = api.referrals.addReferralCode.useMutation();
  const [collegeId, setCollegeId] = useState("");
  const form = useForm<z.infer<typeof addReferralCodeZ>>({
    defaultValues: {
      code: "HF2024_000",
      collegeId: "",
      contact: "",
      name: "",
      referrer: "",
    },
  });

  async function submitForm(data: z.infer<typeof addReferralCodeZ>) {
    try {
      await addReferral.mutateAsync({
        code: data.code,
        collegeId: data.collegeId,
        contact: data.contact,
        name: data.name,
        referrer: data.referrer,
      });
      toast.success("Added referral successfully");
    } catch (e) {
      toast.error("Couldn't add referral code");
    }
  }
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <button className="rounded-lg bg-white px-4 py-2 text-black">
            + Add Referral Code
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Add Referral Code</DialogHeader>

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
                name="referrer"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="">Club Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Club Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="collegeId"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="">College ID</FormLabel>
                      <FormControl>
                        <Input placeholder="asdfsadcasd" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="">Referrer Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>

              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => {
                  return (
                    <FormItem className="w-full">
                      <FormLabel className="">Contact</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter contact" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              ></FormField>
              <Button type="submit">Add Referrer</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <ReferralsTable data={api.referrals.getAllReferrals.useQuery().data} />
    </>
  );
}
