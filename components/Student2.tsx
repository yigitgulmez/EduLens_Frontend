import { StudentComponentProps2 } from "@/types/class";
import { Avatar } from "@heroui/react";

export const Student: React.FC<StudentComponentProps2> = ({id, avatar, name, number, studentClass, branch}) => {
  return (
    <div id={id} className="flex w-full items-center p-2  bg-bgTertiary hover:bg-white/80 transition-all duration-300 rounded-xl select-none animate">
      <Avatar size="lg" showFallback src={avatar}/>
      <div className="flex flex-col ms-3">
        <div className="text-textPrimary drop-shad">{name}</div>
        <div className="text-textTertiary">{number + studentClass + "-" + branch}</div>
      </div>
    </div>
  )
}