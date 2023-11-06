
import Image from "next/image";

interface EmptyProps {
    label: string;
    imagesource: string;
}


export const Empty = ({label, imagesource} : EmptyProps) => {
    return(
        <div className="h-full p-10 flex flex-col items-center justify-center">
            <div className="text-2xl font-bold">{label}</div>
            <div className="relative">
                <Image 
                    alt="Empty"
                    width={600}
                    height={600}
                    src={imagesource}
                    priority
                />
            </div>
        </div>
    )
}