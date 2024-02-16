'use client';
import { College, TshirtSize, User } from '@prisma/client';
import { updateProfile } from '@/src/server/actions';
import { Dispatch, useContext, useState } from 'react';
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
import { ChevronDown, Loader2Icon, Save } from 'lucide-react';
import { Card, CardContent } from '../../ui/card';
import { Dropzone } from '../../ui/dropZone';
import { Popover, PopoverContent, PopoverTrigger } from '../../ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '../../ui/command';
import CreateCollege from '../../profile/createCollege';
import { ScrollArea } from '../../ui/scroll-area';
import { Courses } from '@prisma/client';

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
    state: string;
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

  const form = useForm<z.infer<typeof updateProfileZ>>({
    resolver: zodResolver(updateProfileZ),
    defaultValues: {
      name: user.name ?? '',
      phone: user.phone ?? '',
      college: user.collegeId ?? '',
      course: user.course ?? undefined,
      tshirtSize: user.tShirtSize ?? undefined,
    },
  });
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [clgFile, setClgFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>('');

  const [openCollegeList, setOpenCollegeList] = useState(false);
  const [collegevalue, setCollegevalue] = useState('');
  const [collegeId, setCollegeId] = useState(user.collegeId ?? '');

  if (currentState !== 0 && registerProp) {
    return <></>;
  }

  const onSubmit = async (data: z.infer<typeof updateProfileZ>) => {
    setLoading(true);
    // e.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone);
    formData.append('course', data.course || '');
    formData.append('college', collegeId || '');
    formData.append('tshirtSize', data.tshirtSize || '');
    formData.append('collegeIdFile', clgFile || '');
    formData.append('aadhaarFile', aadhaarFile || '');
    toast.loading('Saving Details...', {
      id: 'loadingToast',
      position: 'bottom-center',
    });

    const res = await updateProfile(formData);
    toast.dismiss('loadingToast');
    if (res.type !== 'error')
      toast.success('Profile Updated', {
        duration: 2000,
        position: 'bottom-center',
      });
    else
      toast.error(res.message, {
        duration: 2000,
        position: 'bottom-center',
      });
    setError(res.message);
    setLoading(false);
    res.type !== 'error' && registerProp && setCurrentState(1);
    res.type !== 'error' && maxState <= 1 && registerProp && setMaxState(1);
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
                <FormItem className="md:w-[45%] w-[80vw]">
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
                            : user.college?.name
                              ? user.college?.name +
                                ', ' +
                                user.college.state
                                  .replace(/_/g, ' ')
                                  .split(' ')
                                  .map(
                                    (word) =>
                                      word.charAt(0).toUpperCase() +
                                      word.slice(1).toLowerCase()
                                  )
                                  .join(' ')
                              : 'Select college'}
                          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="px-3">
                        <Command>
                          <CommandInput
                            placeholder="Search college here..."
                            className="h-9"
                          />
                          <CommandEmpty className="mt-3 flex justify-center items-center flex-col text-center">
                            No College with that name found.
                            <CreateCollege />
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="h-72">
                              {colleges.map((college) => (
                                <CommandItem
                                  key={college.id}
                                  value={college.name}
                                  onSelect={(currentValue) => {
                                    setCollegeId(college.id);
                                    form.setValue('college', college.id);
                                    setCollegevalue(
                                      currentValue === collegevalue
                                        ? collegevalue
                                        : college.name +
                                            ', ' +
                                            college.state
                                              .replace(/_/g, ' ')
                                              .split(' ')
                                              .map(
                                                (word) =>
                                                  word.charAt(0).toUpperCase() +
                                                  word.slice(1).toLowerCase()
                                              )
                                              .join(' ')
                                    );
                                    // setFormData({
                                    //   ...formData,
                                    //   collegeId: college.id,
                                    // });
                                    setOpenCollegeList(false);
                                  }}
                                >
                                  {college.name},{' '}
                                  {college.state
                                    .replace(/_/g, ' ')
                                    .split(' ')
                                    .map(
                                      (word) =>
                                        word.charAt(0).toUpperCase() +
                                        word.slice(1).toLowerCase()
                                    )
                                    .join(' ')}
                                </CommandItem>
                              ))}
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
            {/* T-Shirt Size */}
            <FormField
              control={form.control}
              name="tshirtSize"
              render={({ field, formState, fieldState }) => (
                <FormItem className="md:w-[45%] w-full">
                  <FormLabel className="flex items-center justify-between">
                    T-shirt Size
                    <a
                      href="/images/Size_Chart.jpeg"
                      download
                      className="text-xs underline cursor-pointer"
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
                            onChange={setAadhaarFile}
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
