"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function DownloadList() {
	const searchParams = useSearchParams();
	useEffect(() => {
		axios
			.get(
				`/api/admin/downloadList`,
				{
					withCredentials: true,
					responseType: "blob",
				}
			)
			.then((result) => {
				//Handle success
				const url = window.URL.createObjectURL(new Blob([result.data]));
				const link = document.createElement("a");
				link.href = url;
				const name = searchParams.get("listType") 
				link.setAttribute("download", name ? name + ".csv": "list.csv");
				document.body.appendChild(link);
				link.click();
				window.location.replace("/admin");
			})
			.catch((error) => {});
	}, []);
	return <></>;
}

