import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { QRCodeSVG } from "qrcode.react";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { Input } from "../ui/input";
import { Dropzone } from "../ui/dropZone";
import { toast } from "sonner";
import { env } from "~/env";
import { Button } from "../ui/button";


export default function FinalSubmission({
    teamlength,
    teamId,
    
}: {
    teamlength: number;
    teamId: string;
    
}) {
    const [transactionId, setTransactionid] = useState<string>();
    const [paymentproof, setPaymentProof] = useState<string>();
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const submitPaymentMutation = api.finalSubmission.finalSubmission.useMutation({
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: () => {
            toast.dismiss('submitPayment');
            toast.success("Payment proof submitted"),
            setTransactionid(""),
            setPaymentProof(""),
            setScreenshot(null)
        }
    });

    if(submitPaymentMutation.isLoading) return toast.loading("Submitting payment proof",{id:'submitPayment'});



    const upload = async (file: File) => {
        const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!file) return toast.error("No file uploaded");
        if (file.size > 2 * 1000 * 1000) {
          return toast.error("Uploads must be less than 2MB");
        }
        if (!allowedTypes.includes(file.type))
          return toast.error("Only jpeg, jpg and png files are allowed");
        const formData = new FormData();
        formData.append("file", file);
        const response = await fetch(
          `${env.NEXT_PUBLIC_BASE_URL}/api/image/upload`,
          {
            method: "POST",
            body: formData,
          },
        );
        const data = (await response.json()) as { secure_url: string };
        if (!data.secure_url) {
          toast.error("Error uploading image");
          //toast.dismiss(loadingToast);
          return;
        }
        return data.secure_url;
      };
    async function submitPayment(){
        if(screenshot && transactionId){
            if(screenshot.size > 2*1000*1000) return toast.error("Uploads must be less than 2Mb")
        toast.loading("Uploading Payment Proof...", {
          id: "paymentProof",
        });
        const newFile = await upload(screenshot);
        setScreenshot(null);
        toast.dismiss("paymentProof");
        toast.success("Paymentproof uploaded");

        await submitPaymentMutation.mutateAsync({
            paymentId: transactionId,
            paymentProof: newFile as string,
            teamId: teamId
        })
      }else{
        toast.info('Fill both fields!')
      }
        }
    
    return(
        <>
            <Dialog>
                <DialogTrigger>
                    Pay
                </DialogTrigger>
                <DialogContent>
                    <div className="flex flex-col gap-5 justify-center items-center">
                        <div className="flex flex-col gap-5 w-fit items-center justify-center">
                            <QRCodeSVG value={`upi://pay?pa=nidheeshatbayari@oksbi&pn=Nidheesha%20T&am=${(teamlength*300)}&cu=INR`} size={130}
                  bgColor="transparent"
                  color="#ffffff"
                  fgColor="#ffffff"
                  className="h-32 w-32"/>
                            <Badge className="bg-green-500/20 border border-green-500 text-white">Scan this QR Code with any UPI app</Badge>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between items-center gap-5">
                        <Input value={transactionId} placeholder="Transaction ID" onChange={(e) => {setTransactionid(e.target.value)}}/>
                        <Dropzone
                            onChange={setScreenshot}
                            className="w-full"
                            fileExtension="images"
                            image={paymentproof}
                        />
                        <Button onClick={async () => {await submitPayment()}}>
                            Submit
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}