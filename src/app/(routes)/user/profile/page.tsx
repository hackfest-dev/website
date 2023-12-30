import EditProfile from '@/src/components/forms/editProfile';

export default async function Profile() {
  return (
    <>
      <div className="bg-white text-black min-h-screen flex self-center">
        <EditProfile />
      </div>
    </>
  );
}
