'use server';
import { prisma } from '@/src/lib/db';
import { uploadFile } from '@/src/lib/utils/cloudinary';
import { protectedAction } from './serverConfig';
import { updateUserZ, updateProfileZ } from '../lib/zod-schema';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '../lib/session';

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

// Update User Profile -- zod validation cannot be made using protectedAction utility
// For file uploads, we need to pass them as FormData
// Error: Only plain objects, and a few built-ins, can be passed to Server Actions. Classes or null prototypes are not supported.
const updateProfile = async (formData: FormData) => {
  const obj = Object.fromEntries(formData.entries());
  const result = updateProfileZ.safeParse({
    ...obj,
  });

  if (!result.success) {
    return {
      message: result.error.errors[0].message,
    };
  }

  const { data } = result;

  const session = await getCurrentUser();
  if (!session) {
    return {
      message: 'Not Authenticated',
    };
  }

  const user = await prisma.user.findUnique({
    where: { id: session?.id },
    include: {
      college: true,
    },
  });

  // upload files only if they exist otherwise set to existing url
  const adhaarUrl = obj.adhaar
    ? await uploadFile(obj.adhaar as File)
    : user?.adhaar;
  const collegeIdUrl = obj.collegeId
    ? await uploadFile(obj.collegeId as File)
    : user?.college_id;

  // code can be cleaned but it's ok to be lazy
  const hasNoChanges =
    user?.name === data.name &&
    user?.phone === data.phone &&
    adhaarUrl === user?.adhaar &&
    collegeIdUrl === user?.college_id &&
    user?.college?.id === data.college &&
    user?.state === data.state &&
    user?.course === data.course;

  if (hasNoChanges) {
    return { message: 'No changes made' };
  }

  await prisma.user.update({
    where: { id: session?.id },
    data: {
      name: data.name,
      phone: data.phone,
      adhaar: adhaarUrl,
      college_id: collegeIdUrl,
      college: { connect: { id: data.college } },
      state: data.state,
      course: data.course,
    },
  });

  revalidatePath('/');

  return { message: 'Profile updated successfully' };
};

// -------------Admin functions----------------

export { verifyUser, updateProfile };
