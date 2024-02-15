"use client"
import { FC, useEffect, useState, } from "react"
import { signOut } from "next-auth/react"
import { Button } from "../ui/button"
import { College, Courses, User } from "@prisma/client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { BookText, Building2, CheckIcon, ChevronDown, Globe, Mail, Phone, SortAscIcon } from "lucide-react";
import { LogoutButton } from "./logout"
import { Dropzone } from "../ui/dropZone";
import { prisma } from "@/src/lib/db"
import { updateProfile } from "@/src/server/actions";
import { updateProfileZ } from "@/src/lib/zod-schema";
import { z } from "zod";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../ui/popover"


export const EditProfileForm: React.FC<{
  user: User & {
    college: College | null;
  }, colleges: { id: string, name: string, state: string }[], states: string[]
}> = ({ user, colleges, states }) => {


  const [formData, setFormData] = useState({
    email: user.email ?? '',
    phone: user.phone ?? '',
    state: user.college?.state ?? '',
    course: user.course ?? '',
    collegeName: user.college?.name ?? '',
    aadhaarImg: user.aadhaar ?? '',
    collegeIdImg:user.college_id??'',
    collegeId: user.college?.id ?? ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [clgFile, setClgFile] = useState<File | null>(null);

  const [openCollegeList, setOpenCollegeList] = useState(false)
  const [openCourseList, setOpenCourseList] = useState(false)
  const [collegevalue, setCollegevalue] = useState("")
  const [coursevalue, setCoursevalue] = useState("")

  const courses: string[] = Object.entries(Courses).map(([, value]) => value);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // setLoading(true);
    e.preventDefault();

    console.log("Hereeee")
    console.log(aadhaarFile)
    console.log(clgFile)
    const form = new FormData();
    form.append("name", "Keerthan NS");
    form.append("phone", formData.phone || "0");
    form.append("course", formData.course || "");
    form.append("college", formData.collegeId || "");
    if(clgFile)
      form.append("collegeId", clgFile);
    if(aadhaarFile)
      form.append("adhaar", aadhaarFile);
    console.log(formData)
    const res = await updateProfile(form);
    console.log(res.message)
  };
  useEffect(() => {
    console.log(user)
  },)

  return (
    <>
      <Card className="w-full" suppressHydrationWarning >
        <CardContent className="p-4">
          <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Personal Email :</p>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <Mail size={20} />
            </span>
            <input readOnly id="email" value={formData.email}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              } type="text" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email not found" />
          </div>
          <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Phone number :</p>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <Phone size={20} />
            </span>
            <input id="phone" value={formData.phone}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              } type="number" className="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Phone number not provided" />
          </div>

          <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">Course :</p>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <BookText size={20} />
            </span>
            <Popover open={openCourseList} onOpenChange={setOpenCourseList}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCourseList}
                className="w-full justify-between rounded-none rounded-r-lg"
              >
                  {coursevalue ? coursevalue
                  : (formData.course?(formData.course):"Select course")}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full px-3">
              <Command>
                <CommandInput placeholder="Search course here..." className="h-9" />
                <CommandEmpty>No course found.</CommandEmpty>
                <CommandGroup>
                  {courses.map((course) => (
                    <CommandItem
                      key={course}
                      value={course}
                      onSelect={(currentValue) => {
                        setCoursevalue(currentValue === coursevalue ? "" : course)
                        setFormData({
                          ...formData,
                          course: course
                        })
                        setOpenCourseList(false)
                      }}
                    >
                      {course}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          </div>
          <p className="block mt-2 text-sm font-medium text-gray-900 dark:text-white">College :</p>
          <div className="flex">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <Building2 size={20} />
            </span>
            <Popover open={openCollegeList} onOpenChange={setOpenCollegeList}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openCollegeList}
                className="w-full justify-between rounded-none rounded-r-lg"
              >
                  {collegevalue
                    ? collegevalue
                  : (formData.collegeName?(formData.collegeName+", "+formData.state):"Select college")}
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full px-3">
              <Command>
                <CommandInput placeholder="Search college here..." className="h-9" />
                <CommandEmpty>No college found. Add new college below</CommandEmpty>
                <CommandGroup>
                  {colleges.map((college) => (
                    <CommandItem
                      key={college.id}
                      value={college.name}
                      onSelect={(currentValue) => {
                        setCollegevalue(currentValue === collegevalue ? "" : college.name + ", " + college.state)
                        setFormData({
                          ...formData,
                          collegeId: college.id
                        })
                        setOpenCollegeList(false)
                      }}
                    >
                      {college.name}, {college.state}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full">
        <CardContent className="p-4 grid md:grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="sm:py-2">
            <p className="block my-2 text-sm font-medium text-gray-900 dark:text-white">Aadhaar :</p>
            <Dropzone
              onChange={setAadhaarFile}
              className="w-full"
              fileExtension="images"
              image={formData.aadhaarImg.split(";")[0]}
            />
          </div>
          <div className="sm:py-2">
            <p className="block my-2 text-sm font-medium text-gray-900 dark:text-white">College ID :</p>
            <Dropzone
              onChange={setClgFile}
              className="w-full"
              fileExtension="images"
              image={formData.collegeIdImg.split(";")[0]}
            />
          </div>
        </CardContent>
      </Card>
      <div className="w-full flex gap-2 items-center justify-center">
        <Button onClick={(e) => onSubmit(e)} variant="outline" className="bg-green-500">
          Save profile
        </Button>
        <LogoutButton />
      </div>
    </>
  )
}