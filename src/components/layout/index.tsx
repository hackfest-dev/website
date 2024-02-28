import { Toaster } from "sonner";
import Navbar from "../navbar";
import Footer from "../footer";
import ProgressBarProvider from "../progressBarProvider";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <div className={`dark text-white`}>
      <ProgressBarProvider>
        <Toaster richColors expand={true} position="bottom-center" />
        <Navbar />
        {props.children}
        <Footer />
      </ProgressBarProvider>
    </div>
  );
}
