import Image from "next/image";

interface EmptyProps {
    label: string;
}


export const Empty = ({label} : EmptyProps) => {
    return(
        <div className="h-full p-20 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{label}</div>
            <div className="relative h-72 w-72">
                <Image 
                    alt="Empty"
                    layout="fill"
                    src='/empty.png'
                />
            </div>
        </div>
    )
}