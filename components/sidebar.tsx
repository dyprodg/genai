'use client'

import Image from "next/image";
import Link from "next/link";
import { Montserrat } from "next/font/google";

import { cn } from "@/lib/utils";
import { sidebaritems } from "./sidebaritems";
import { usePathname } from "next/navigation";
import { FreeCounter } from "./free-counter";


//imported Navitems from sidebaritems.tsx
const routes = sidebaritems

//setting cn monserrat for extra font
const monserrat = Montserrat({weight: '600', subsets:['latin']})

interface SidebarProps {
    apiLimitCount: number;

}

const Sidebar = ({apiLimitCount = 0}:SidebarProps) => {

    const pathname = usePathname()

    return(
        <div className="space-y-4 py-4 flex flex-col min-h-screen bg-[#111827] text-white">
            <div className="px-3 py-2 flex-1">
            <Link href={'/dashboard'} className="flex items-center pl-3 mb-14">
                <div className="relative w-8 h-8 mr-4">
                    <Image 
                        width={500}
                        height={500}
                        alt="Logo"
                        src='/logo.png'
                    />
                </div>
                <h1  className={cn ("text-2xl font-bold", monserrat.className)}>
                    AIOrchard
                </h1>
            </Link>

            {/* Sidebar Items */}
            <div className="space-y-1">
                {routes.map((route) => (
                    <Link
                    className={cn("text-sm group flex p-3 w-full justify-start font-medium curser-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                    pathname === route.href ? "text-white bg-white/10" : 'text-zinc-400')}
                    href={route.href}
                    key={route.href}
                    >
                        <div className="flex items-center flex-1">
                            <route.icon className={cn("h-5 w-5 mr-3", route.color)}/>
                            {route.label}
                        </div>
                    </Link>
                ))}
            </div>
            
            </div>
            
            <div className="mt-auto">
                <FreeCounter
                    apiLimitCount={apiLimitCount}
                />
            </div>
        </div>
        
    )
}

export default Sidebar;