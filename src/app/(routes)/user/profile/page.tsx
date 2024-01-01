import EditProfile from '@/src/components/forms/editProfile';

export default async function Profile() {
  return (
    <>
      <div className="pb-20 pt-32 bg-white text-black h-full flex self-center">
        <EditProfile />
      </div>
    </>
  );
}
