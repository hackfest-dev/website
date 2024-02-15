"use client"
import { FC, } from "react"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import { Button } from "../ui/button"


export const LogoutButton:FC=()=>{
    return (
        <Button variant="outline" className="bg-red-600" onClick={() => signOut()}>
            <LogOut className="h-5" />Logout
        </Button>
    )
}