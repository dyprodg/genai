import Image from "next/image"

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-14 h-14 relative animate-spin border rounded-full">
                <Image 
                    className="bg-gray-300 rounded-full p-1"
                    alt="logo"
                    layout="fill"
                    src='/logo.png'
                />
            </div>
            <p className="text-sm text-muted-foreground">
                AIOrchard is dropping some fruites...
            </p>
        </div>
    )
}