
import Image from "next/image";

interface EmptyProps {
    label: string;
    imagesource: string;
}


export const Empty = ({label, imagesource} : EmptyProps) => {
    return (
        <div className="h-full p-10 flex flex-col text-white items-center justify-center">
          <div className="text-2xl font-bold">{label}</div>
          <div className="relative drop-shadow-[0_35px_10px_rgba(0,0,0,0.25)] animate-custom-spin">
            <Image 
              alt="Empty"
              width={600}
              height={600}
              src={imagesource}
              priority
            />
          </div>
        </div>
      );
}