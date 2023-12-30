'use client';

import { College, User } from '@prisma/client';
import { updateProfile } from '@/src/server/actions';
import { useState } from 'react';
import Image from 'next/image';

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
  const [form, setForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    college: user?.college?.id || '',
    state: user?.college?.state || '',
    course: user?.course || '',
    CollegeIdUrl: '',
    AdhaarUrl: '',
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string>('');

  const previewCollegeId = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setForm({ ...form, CollegeIdUrl: url });
    }
  };

  const previewAdhaar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const url = URL.createObjectURL(files[0]);
      setForm({ ...form, AdhaarUrl: url });
    }
  };

  return (
    <form
      onSubmit={async (e) => {
        setLoading(true);
        e.preventDefault();
        const res = await updateProfile({
          name: form.name,
          phone: form.phone,
          college: form.college,
          state: form.state,
          course: form.course,
          aadharFile: form.AdhaarUrl,
          collegeIdFile: form.CollegeIdUrl,
        });
        setError(res.message);
        setLoading(false);
      }}
      className="border sm:p-4 rounded grid sm:max-w-xl m-auto"
    >
      <h1 className="text-center text-xl">Update Profile</h1>
      <p
        className={`text-center ${
          error.includes('Updated') ? 'text-green-500' : 'text-red-500'
        }`}
      >
        {error}
      </p>
      <input
        className="border rounded p-1 m-2"
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        className="border rounded p-1 m-2"
        type="number"
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={(e) => setForm({ ...form, phone: e.target.value })}
      />

      {/* list of colleges*/}
      <select
        name="college"
        className="bg-white border shadow-gray-50 rounded m-2 p-2"
        onChange={(e) => {
          setForm({ ...form, college: e.target.value });
        }}
        value={form.college}
      >
        <option value="" disabled defaultValue={''}>
          Select College
        </option>
        {colleges.map((college) => {
          return (
            <option key={college.id} value={college.id}>
              {college.name}
            </option>
          );
        })}
      </select>

      {/* list of states*/}
      <select
        name="state"
        className=" bg-white border shadow-gray-50 rounded m-2 p-2"
        onChange={(e) => {
          setForm({ ...form, state: e.target.value });
        }}
        value={form.state}
      >
        <option value="" disabled defaultValue={''}>
          Select State
        </option>
        {states.map((state, index) => {
          return (
            <option key={index} value={state}>
              {state}
            </option>
          );
        })}
      </select>

      {/* list of courses*/}
      <select
        name="course"
        className=" bg-white border shadow-gray-50 rounded m-2 p-2"
        onChange={(e) => {
          setForm({ ...form, course: e.target.value });
        }}
        value={form.course}
      >
        <option value="" disabled defaultValue={''}>
          Select Course
        </option>
        {courses.map((course, index) => {
          return (
            <option
              key={index}
              value={course}
              selected={course === user?.course ? true : false}
            >
              {course}
            </option>
          );
        })}
      </select>

      {/*ID's*/}
      <div className="flex flex-col ">
        <h2 className="text-center mt-4">Upload College ID</h2>
        <input
          className=" bg-white border rounded m-2 p-2"
          type="file"
          name="collegeId"
          placeholder="College ID"
          onChange={previewCollegeId}
          id="collegeId"
        />
        {(form.CollegeIdUrl || user?.collegeId) && (
          <span>
            <Image
              src={form.CollegeIdUrl || user?.college_id || ''}
              alt="collegeID"
              width={100}
              height={100}
              unoptimized
            />
            <button
              onClick={() => {
                setForm({ ...form, CollegeIdUrl: '' });
                (
                  document.getElementById('collegeId') as HTMLInputElement
                ).value = '';
              }}
              className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
            >
              x
            </button>
          </span>
        )}
      </div>

      <div>
        <h2 className="text-center mt-4">Upload Adhaar ID</h2>
        <input
          className=" bg-white border rounded m-2 p-2"
          type="file"
          name="adhaar"
          placeholder="Adhaar img"
          onChange={previewAdhaar}
          id="adhaar"
        />
        {(form.AdhaarUrl || user?.adhaar) && (
          <span>
            <Image
              src={form.AdhaarUrl || user?.adhaar || ''}
              alt="Adhaar"
              width={100}
              height={100}
              unoptimized
            />{' '}
            <button
              onClick={() => {
                setForm({ ...form, AdhaarUrl: '' });
                (document.getElementById('adhaar') as HTMLInputElement).value =
                  '';
              }}
              className="bg-red-500 text-white text-center w-fit p-1 rounded cursor-pointer"
            >
              x
            </button>
          </span>
        )}
      </div>

      <button
        className="border rounded p-2 mt-6 hover:bg-cyan-500"
        type="submit"
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  );
};

export default EditProfileForm;
