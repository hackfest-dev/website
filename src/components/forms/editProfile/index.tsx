import { getServerSession } from 'next-auth';
import { authOptions } from '@/src/lib/auth';
import { prisma } from '@/src/lib/db';
import EditProfileForm from './editProfileForm';

export default async function EditProfile() {
  const session = await getServerSession(authOptions);
  // TODO: Please login Fallback UI
  if (!session) return <>Please login</>;

  const user = await prisma.user.findUnique({
    where: { email: session?.user.email! },
    include: { college: true },
  });

  const colleges = await prisma.college.findMany({
    select: {
      id: true,
      name: true,
    },
  });

  //TODO:get states and courses
  const states: string[] = [];
  const courses: string[] = [];

  return (
    <>
      <EditProfileForm
        user={user!}
        colleges={colleges}
        states={states}
        courses={courses}
      />
    </>
  );
}
