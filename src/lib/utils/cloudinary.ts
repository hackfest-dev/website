import { secrets } from "@/src/lib/secrets";
import { v2 as cloudinary } from "cloudinary";

const cloudinaryConfig = cloudinary.config({
  cloud_name: secrets.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: secrets.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: secrets.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

async function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
      folder: "next",
    },
    cloudinaryConfig.api_secret as string,
  );
  return { timestamp, signature };
}

async function uploadFile(params: { file: File; folder: "ids" | "ppts" }) {
  const { signature, timestamp } = await getSignature();
  const formData = new FormData();
  formData.append("file", params.file);
  formData.append("api_key", secrets.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);
  formData.append("signature", signature);
  formData.append("timestamp", timestamp.toString());
  //todo: fix upload folder issue (cannot upload to folder other than next)
  formData.append("folder", "next");
  console.log(signature, timestamp);
  console.log(params.file)

  const endpoint = `https://api.cloudinary.com/v1_1/${secrets.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });
    const data = (await res.json()) as {
      url: string;
      public_id: string;
    };
    //Return url and public id of uploaded file separated by
    return data.url + ";" + data.public_id;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

async function deleteFile(pid: string) {
  try {
    const result = await cloudinary.uploader.destroy(pid);
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export { cloudinaryConfig, getSignature, uploadFile, deleteFile };
