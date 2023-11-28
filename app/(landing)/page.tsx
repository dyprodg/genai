import { LandingContent } from "@/components/landing-content";
import { LandingHero } from "@/components/landing-hero";
import { LandingNavbar } from "@/components/landing-navbar";
import { auth } from '@clerk/nextjs';
import { redirect } from "next/navigation";


const LandingPage = () => {

    const { userId } = auth();
    if(userId) {
        redirect('/dashboard')
    }

    return(
        <div className="h-full">
            <LandingNavbar />
            
            <LandingHero />
            
            <LandingContent />
            

        </div>
    );
}

export default LandingPage;
