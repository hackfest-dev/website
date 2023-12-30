import { secrets } from '@/lib/secrets';
import { v2 as cloudinary } from 'cloudinary';

type CloudinaryResponse = {
	signature: string;
	timestamp: string;
};

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
      folder: 'next',
    },
    cloudinaryConfig.api_secret as string
  );
  return { timestamp, signature };
}
async function uploadFile(file: File) {
	const  { signature, timestamp } = await getSignature();
	const formData = new FormData();
	formData.append("file", file);
	formData.append("api_key", secrets.NEXT_PUBLIC_CLOUDINARY_API_KEY as string);
	formData.append("signature", signature);
	formData.append("timestamp", timestamp.toString());
	formData.append("folder", "next");
	console.log(signature, timestamp);

	const endpoint = `https://api.cloudinary.com/v1_1/${secrets.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

	const data = (await fetch(endpoint, {
		method: "POST",
		body: formData,
	}).then((res) => res.json())) as {
		url: string;
	};
	return data.url;
}

export { cloudinaryConfig, getSignature , uploadFile};
