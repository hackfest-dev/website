'use server';
import { prisma } from '@/src/lib/db';
import { uploadFile } from '@/src/lib/utils/cloudinary';
import os from 'os';
import { protectedAction } from './serverConfig';
import { updateUserZ, updateProfileZ } from '../lib/zod-schema';
import { revalidatePath } from 'next/cache';

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

// Update User Profile
const updateProfile = protectedAction(
  updateProfileZ,
  async (data, { db, session }) => {
    // upload to cloudinary
    const adhaarUrl = await uploadFile(data.aadharFile as File);
    const collegeIdUrl = await uploadFile(data.collegeIdFile as File);

    await db.user.update({
      where: { id: session?.id },
      data: {
        name: data.name,
        phone: data.phone,
        college: {
          connect: {
            id: data.college,
          },
        },
        adhaar: adhaarUrl,
        college_id: collegeIdUrl,
      },
    });

    revalidatePath('/user/profile');
    return {
      message: 'Profile Updated',
    };
  }
);

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

export { verifyUser, getTeamsList, downloadList, updateProfile };
