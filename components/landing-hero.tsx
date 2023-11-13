'use client'

import { useAuth } from "@clerk/nextjs"
import TypewriterComponent from 'typewriter-effect'
import Link from "next/link"
import { Button } from "./ui/button"

export const LandingHero = () => {
    const { isSignedIn } = useAuth();
    return(
        <div className="text-white font-bold py-36 text-center space-y-5">
            <div className="text-4l sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
                <h1>The Best AI Tool for</h1>
                <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                    <TypewriterComponent 
                        options={{
                            strings: [
                                'Chatbot.',
                                'Photo Generation.',
                                'Code Generation.',
                            ],
                            autoStart: true,
                            loop: true,
                            
                        }}
                    />
                </div>
                <div className="text-sm md:text-xl font-light text-zinc-400">
                    Create content using AI 10x faster.
                </div>
                <div>
                    <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
                       <Button variant='premium' className="md:text-lg p-4 md:p-6 rounded-full font-semibold  hover:scale-105 hover:shadow-md transition ease-in-out animate-bounce active:animate-ping">
                            Start Generating For Free
                       </Button>
                    </Link>
                </div>
                <div className="text-zinc-400 text-xs md:text-sm font-normal">
                    No credit card required.
                </div>
            </div>
        </div>
    )
}