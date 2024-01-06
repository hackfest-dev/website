"use client"
import { FC, } from "react"
import { signOut } from "next-auth/react"


export const LogoutButton:FC=()=>{
    return (
        <button onClick={()=>signOut()}>Logout</button>
    )
}