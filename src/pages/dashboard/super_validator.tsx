import {
    TableHeader,
    TableRow,
    Table,
    TableHead,
    TableBody,
    TableCell,
  } from "~/components/ui/table";
  import { api } from "~/utils/api";
  import DashboardLayout from "~/components/layout/dashboardLayout";
  import { useSession } from "next-auth/react";
  import { toast } from "sonner";
  import PDFModal from "~/components/validatorDashboard/pdfModal";
  import Spinner from "~/components/spinner";
  import NotFound from "../404";
  
  
  
  
  export default function Validator() {
    
    const { data, status } = useSession();
  
    if (status === "loading")
      return (
        <DashboardLayout>
          <div className="flex h-screen w-screen items-center justify-center">
            <Spinner />
          </div>
        </DashboardLayout>
      );
  
  
    if (!data || !data.user || data.user.role !== "SUPER_VALIDATOR") {
      return <NotFound />;
    }
    
  
    return (
      <DashboardLayout>
        <>
            Super Validator
        </>
      </DashboardLayout>
    );
  }
  