'use client';
import { College, User } from '@prisma/client';
import { updateProfile } from '@/src/server/actions';
import { Dispatch, useContext, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { updateProfileZ } from '@/src/lib/zod-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../../ui/form';
import { Input } from '../../ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../ui/select';
import { Button } from '../../ui/button';
import { getUrlAndId } from '@/src/lib/utils/helper';
import { ProgressContext } from '../../progressProvider';
import { toast } from 'sonner';
import { Loader2Icon, Save } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Dropzone } from '../../ui/dropZone';

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
  // const [collegeId, setCollegeId] = useState<{
  //   url: string;
  //   file: File | undefined;
  // }>();
  // const [aadhaar, setAadhaar] = useState<{
  //   url: string;
  //   file: File | undefined;
  // }>();
  const form = useForm<z.infer<typeof updateProfileZ>>({
    resolver: zodResolver(updateProfileZ),
    defaultValues: {
      name: user.name ?? '',
      phone: user.phone ?? '',
      college: user.collegeId ?? '',
      course: user.course ?? undefined,
    },
  });
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [clgFile, setClgFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>('');

  // const previewCollegeId = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const url = URL.createObjectURL(files[0]);
  //     setCollegeId({ url, file: files[0] });
  //   }
  // };

  if (currentState !== 0 && registerProp) {
    return <></>;
  }

  // const previewAdhaar = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const files = e.target.files;
  //   if (files) {
  //     const url = URL.createObjectURL(files[0]);
  //     setAadhaar({ url, file: files[0] });
  //   }
  // };
  // console.log(user.college_id)
  const onSubmit = async (data: z.infer<typeof updateProfileZ>) => {
    setLoading(true);
    // e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('course', data.course || '');
    formData.append('college', data.college || '');
    formData.append('otherCollege', data.otherCollege || '');
    formData.append('otherCollegeState', data.otherCollegeState || '');
    formData.append('tshirtSize', data.tshirtSize || '');
    formData.append('collegeIdFile', clgFile || '');
    formData.append('aadhaarFile', aadhaarFile || '');
    toast.loading('Saving Details...', {
      id: 'loadingToast',
    });
    const res = await updateProfile(formData);
    toast.dismiss('loadingToast');
    toast.success('Profile Updated', {
      duration: 2000,
    });
    setError(res.message);
    setLoading(false);
    registerProp && setCurrentState(1);
    maxState <= 1 && registerProp && setMaxState(1);
  };

  return (
    <div className="max-h-max w-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-2 md:gap-4"
        >
          <h1 className="text-center lg:text-2xl text-xl ">
            Fill your Details
          </h1>
          <p
            className={`text-center ${
              error.includes('updated') ? 'text-green-500' : 'text-red-500'
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
                          <SelectItem value={'other'}>Other</SelectItem>
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
            {form.watch('college') === 'other' && (
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
<<<<<<< HEAD
                        <SelectValue placeholder="Select T-Shirt Size" />
=======
                        <SelectValue placeholder="Select your T-shirt size" />
>>>>>>> 20545d3f6eca7b6617a21948cae53109de20ca1e
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {['S', 'M', 'L', 'XL', 'XXL'].map((size, key) => (
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
<<<<<<< HEAD

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
                            getUrlAndId(user?.college_id ?? '').url ||
                            ''
                          }
                          alt="collegeID"
                          width={100}
                          height={100}
                          unoptimized
                        />
                        {user.college_id && !collegeId?.url && 'Uploaded File'}
                        {collegeId?.url && (
                          <Button
                            onClick={() => {
                              setCollegeId({
                                url: '',
                                file: undefined,
                              });
                              (
                                document.getElementById(
                                  'collegeId'
                                ) as HTMLInputElement
                              ).value = '';
=======
            {/* files */}
            <Card className="w-full">
              <CardContent className="p-4 grid md:grid-cols-1 lg:grid-cols-2 gap-2">
                <FormField
                  control={form.control}
                  name="aadhaarFile"
                  render={({ field, formState, fieldState }) => (
                    <FormItem className="md:w-[calc(90%+1.5rem)] w-full">
                      <FormLabel className="">Aadhar Card</FormLabel>
                      <FormControl>
                        <div className="sm:py-2">
                          <Dropzone
                            onChange={() => {
                              setAadhaarFile;
>>>>>>> 20545d3f6eca7b6617a21948cae53109de20ca1e
                            }}
                            className="w-full"
                            fileExtension="images"
                            image={getUrlAndId(user?.aadhaar ?? '').url || ''}
                          />
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                ></FormField>

                <FormField
                  control={form.control}
                  name="collegeIdFile"
                  render={({ field, formState, fieldState }) => {
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
                                getUrlAndId(user?.college_id ?? '').url || ''
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
                loading ? 'cursor-not-allowed' : ''
              } flex items-center gap-2`}
            >
              {loading ? (
                <Loader2Icon size={16} className="animate-spin" />
              ) : (
                <Save size={16} />
              )}
              Save changes
            </Button>{' '}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProfileForm;
