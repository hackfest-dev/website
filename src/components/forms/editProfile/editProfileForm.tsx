"use client";
import { College, User } from "@prisma/client";
import { updateProfile } from "@/src/server/actions";
import { useState } from "react";
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

const EditProfileForm = ({
    user,
    colleges,
    states,
    courses,
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
}) => {
    const [collegeId, setCollegeId] = useState<{
        url: string;
        file: File | undefined;
    }>();
    const [aadhaar, setAadhaar] = useState<{
        url: string;
        file: File | undefined;
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
        formData.append("name", data.name);
        formData.append("phone", data.phone);
        formData.append("course", data.course || "");
        formData.append("college", data.college || "");
        formData.append("collegeIdFile", collegeId?.file || "");
        formData.append("aadhaarFile", aadhaar?.file || "");
        const res = await updateProfile(formData);
        setError(res.message);
        setLoading(false);
    };

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="border sm:p-4 rounded grid sm:max-w-xl m-auto"
            >
                <h1 className="text-center text-xl text-white">
                    Update Profile
                </h1>
                <p
                    className={`text-center ${
                        error.includes("updated")
                            ? "text-green-500"
                            : "text-red-500"
                    }`}
                >
                    {error}
                </p>
                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field, formState, fieldState }) => {
                        return (
                            <FormItem>
                                <FormLabel className="text-white">
                                    Name
                                </FormLabel>
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
                        <FormItem>
                            <FormLabel className="text-white">Phone</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    placeholder="8939269292"
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
                    render={({ field, formState, fieldState }) => (
                        <FormItem>
                            <FormLabel className="text-white">
                                College
                            </FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-[180px] text-black">
                                        <SelectValue placeholder="Select your college" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {colleges.map(
                                                ({ id, name }, key) => (
                                                    <SelectItem
                                                        value={id}
                                                        key={key}
                                                    >
                                                        {name}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                ></FormField>

                {/* Course */}
                <FormField
                    control={form.control}
                    name="course"
                    render={({ field, formState, fieldState }) => (
                        <FormItem>
                            <FormLabel className="text-white">Degree</FormLabel>
                            <FormControl>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                >
                                    <SelectTrigger className="w-[180px] text-black">
                                        <SelectValue placeholder="Select your Degree" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {courses.map((course, key) => (
                                                <SelectItem
                                                    value={course}
                                                    key={key}
                                                >
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
                    name="collegeIdFile"
                    render={({ field, formState, fieldState }) => {
                        // console.log(field)
                        return(
                        <FormItem>
                            <FormLabel className="text-white">
                                College ID Card
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e)=>{
                                        if (e.target.files?.[0])
                                            field.value = e.target.files?.[0]
                                    
                                            console.log(e.target.files?.[0],field.value)
                                        previewCollegeId(e)}}
                                />
                            </FormControl>
                            {(collegeId?.url || user?.college_id) && (
                                <span>
                                    <Image
                                        src={
                                            collegeId?.url ||
                                            getUrlAndId(user?.college_id??"").url ||
                                            ""
                                        }
                                        alt="collegeID"
                                        width={100}
                                        height={100}
                                        unoptimized
                                    />
                                    {user.college_id &&
                                        !collegeId?.url &&
                                        "Uploaded File"}
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
                                            className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
                                            type="button"
                                        >
                                            Close Preview
                                        </Button>
                                    )}
                                </span>
                            )}
                            <FormMessage />
                        </FormItem>
                    )}}
                ></FormField>

                <FormField
                    control={form.control}
                    name="aadhaarFile"
                    render={({ field, formState, fieldState }) => (
                        <FormItem>
                            <FormLabel className="text-white">
                                Aadhar Card
                            </FormLabel>
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
                                        src={aadhaar?.url || getUrlAndId(user?.aadhaar??"").url || ""}
                                        alt="Adhaar"
                                        width={100}
                                        height={100}
                                        unoptimized
                                    />{" "}
                                    {user?.aadhaar &&
                                        !aadhaar?.url &&
                                        "Uploaded File"}
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
                                            className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
                                            type="button"
                                        >
                                            Close Preview
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
                    className=" border rounded p-2 mt-6 hover:bg-blue-700 hover:text-white font-semibold"
                >
                    {loading ? "Updating..." : "Update"}
                </Button>
            </form>
        </Form>
    );
};

export default EditProfileForm;
