"use client"
import { User } from "@prisma/client";
import Image from "next/image";
import { LogoutButton } from "./logout";
// import { ButtonModalComponent } from "../ui/modal/button";

export const Profile: React.FC<{ user: User }> = ({ user }) => {
    return (
        <>
            <div className="flex flex-col gap-4 justify-center items-left text-white bg-black shadow-md shadow-tertiary-700 rounded-lg p-5">
                <div className="flex justify-between">
                    <div className="from-secondary-300 w-fit h-fit to-secondary-600 bg-gradient-to-b rounded-full">
                        <Image
                            src={user.image ?? ""}
                            alt="Profile Picture"
                            width={100}
                            height={100}
                            className="mix-blend-lighten rounded-full"
                        ></Image>
                    </div>
                    {/* <ButtonModalComponent buttonContent={"Edit Profile"}>
                        <div className="flex flex-col items-center">
                            sjdfk
                        </div>
                    </ButtonModalComponent> */}
                    <LogoutButton/>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">Name</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.name}</b>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">Email</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.email}</b>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">Phone</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.phone ?? "N/A"}</b>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">State</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.state ?? "N/A"}</b>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">Course</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.course ?? "N/A"}</b>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">College</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.course ?? "N/A"}</b>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">Aadhar Card</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.adhaar ?? "N/A"}</b>
                </div>
                <div>
                    <span className="w-20 md:w-24 inline-block">College ID</span>
                    <span className="px-1 md:pr-3">:</span> <b>{user.college_id ?? "N/A"}</b>
                </div>
            </div>
        </>
    );
};
