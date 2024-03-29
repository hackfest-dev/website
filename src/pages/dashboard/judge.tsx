import DashboardLayout from "~/components/layout/dashboardLayout";
import { api } from "~/utils/api";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import Spinner from "~/components/spinner";
import { useSession } from "next-auth/react";
import NotFound from "~/components/not-found";

export default function Judge() {
 
  const { data, status } = useSession();

  if (status === "loading")
    return (
      <DashboardLayout>
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner />
        </div>
      </DashboardLayout>
    );

  if (
    !data ||
    !data.user ||
    (data.user.role !== "JUDGE")
  ) {
    return <NotFound />;
  }

  return (
    <DashboardLayout>
      <>
        
      </>
    </DashboardLayout>
  );
}
