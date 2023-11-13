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
        <div className="h-full relative bg-gradient-to-t from-indigo-400 via-violet-900 to-purple-500">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 bg-gray-900">
                <div>
                    <Sidebar 
                        isPro={isPro}
                        apiLimitCount = {apiLimitCount} />
                </div>
                
            </div>
        

            <main className="md:pl-72">
                <Navbar />
                {children}
            </main>

        </div>
    )
}

export default DashboardLayout;