import { StudentComponentProps2 } from "@/types/class";
import { Avatar } from "@heroui/react";

export const Student: React.FC<StudentComponentProps2> = ({id, avatar, name, info,}) => {
  return (
    <div id={id} className="flex flex-col justify-around w-full h-full items-center p-5 px-5 bg-bgTertiary hover:bg-white/80 transition-all duration-300 rounded-xl select-none">
        <Avatar showFallback src={avatar} className="w-[min(25vw,25vh)] h-[min(25vw,25vh)]"/>
      <div className="flex flex-col text-center">
        <div className="text-textPrimary text-2xl sm:text-3xl md:text-4xl">{name}</div>
        <div className="text-textPrimary text-xl  sm:text-2xl md:text-3xl">{info}</div>
      </div>
    </div>
  )
}