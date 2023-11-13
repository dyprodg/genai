import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { getApiLimitCount } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({
    children
}: {
    children: React.ReactNode;
}) => {

    const apiLimitCount = await getApiLimitCount();
    const isPro = await checkSubscription();

    return (
        <>
            {/* Fester Hintergrund, der den ganzen Bildschirm ausfüllt */}
            <div className="fixed w-screen h-screen bg-gradient-to-t from-indigo-400 via-violet-900 to-purple-500 z-0" />

            {/* Hauptinhalt über dem festen Hintergrund */}
            <div className="relative z-10 min-h-screen">
                {/* Sidebar-Container */}
                <div className="hidden md:flex md:w-72 md:flex-col md:fixed md:inset-y-0">
                    <Sidebar 
                        isPro={isPro}
                        apiLimitCount={apiLimitCount}
                    />
                </div>
                
                {/* Main-Content-Container, der unabhängig von der Sidebar scrollt */}
                <main className="md:pl-72 flex-1">
                    <Navbar />
                    {/* Scrollbarer Inhalt */}
                    <div className="overflow-auto h-screen">
                        {children}
                    </div>
                </main>
            </div>
        </>
    )
}

export default DashboardLayout;
