import Image from "next/image"

export const Loader = () => {
    return (
        <div className="h-full flex flex-col gap-y-4 items-center justify-center">
            <div className="w-14 h-14 relative animate-bounce">
                <Image 
                    className="rounded-full p-1"
                    alt="logo"
                    width={500}
                    height={500}
                    src='/logored.png'
                />
            </div>
            <p className="text-sm text-muted-foreground">
                AI Tree is dropping some fruits...
            </p>
        </div>
    )
}