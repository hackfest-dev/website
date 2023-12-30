'use server';

import prisma from '@/src/lib/db';
import { uploadFile } from '@/src/lib/utils/cloudinary';
import { auth } from '@/src/auth';
import os from 'os';
import { protectedAction } from './serverConfig';
import { getUserByEmailZ, updateUserZ } from '../lib/zod-schema';

// -----------------User functions-----------------
// Set user as verified on successful verification
const verifyUser = protectedAction(updateUserZ, async (value, { db }) => {
  try {
    await db.user.update({
      where: { id: value.userId },
      data: { isVerified: true },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error verifying user');
  }
});

// Get details of user by email
const getUserByEmail = protectedAction(
  getUserByEmailZ,
  async (value, { db }) => {
    try {
      return await db.user.findUnique({
        where: { email: value.email },
        include: { college: true },
      });
    } catch (error) {
      console.log(error);
      throw new Error('Error getting user by email');
    }
  }
);

// Update user profile
const updateProfile = async (data: FormData) => {
  try {
    const user = await auth();
    console.log(data.get('adhaar') as File);
    //get image from form data as file and upload it to cloudinary
    //get image url

    const adhaarUrl = await uploadFile(data.get('adhaar') as File);
    const collegeIdUrl = await uploadFile(data.get('collegeId') as File);
    console.log(adhaarUrl, collegeIdUrl);
    await prisma.user.update({
      where: {
        id: user?.user.id,
      },
      data: {
        name: data.get('name') as string,
        adhaar: adhaarUrl,
        college_id: collegeIdUrl,
        phone: data.get('phone') as string,
        college: {
          connect: {
            id: data.get('college') as string,
          },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
  return 'success';
};

// -----------------Form controls-----------------
// Get options(dropdown) data for profile form
const getOptionsData = async () => {
  const colleges = await prisma.college.findMany({
    select: {
      id: true,
      name: true,
    },
  });
  //TODO:get states and courses
  const states: string[] = [];
  const courses: string[] = [];
  return { colleges, states, courses };
};

// -------------Admin functions----------------
// Team functions
const getTeamsList = async () => {
  try {
    return await prisma.team.findMany({
      include: {
        members: {
          include: { college: true },
        },
      },
    });
  } catch (error) {
    console.log(error);
    throw new Error('Error getting teams list');
  }
};

// Download teams list as csv
const downloadList = async () => {
  try {
    // Get all teams
    const TeamsList = await prisma.team.findMany({
      include: {
        members: {
          include: {
            college: true,
          },
        },
      },
    });

    // Initialize csv string
    let csv = '';

    // Populate csv string with data
    TeamsList.map((team) => {
      const leader = team.members.find(
        (member) => member.isLeader === true
      )?.name;
      const college = team?.members[0].college?.name;
      csv += `${os.EOL}${team.name},${college ? college : 'Not Available'},${
        leader ? leader : 'Not Available'
      },${team.members.length},`;
      team.members.map((member) => {
        csv += `"Name:${member?.name}\nPhone:${
          member.phone ? member.phone : 'Not available'
        }\nEmail:${member.email ? member.email : 'Not available'}"${
          os.EOL
        },,,,`;
      });
    });

    // Return csv string
    return { message: 'success', csv };
  } catch (error) {
    console.log(error);
    return { message: 'An error occurred!' };
  }
};

export {
  verifyUser,
  getTeamsList,
  downloadList,
  updateProfile,
  getUserByEmail,
  getOptionsData,
};
