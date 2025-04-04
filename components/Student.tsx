import {Checkbox} from "@heroui/checkbox";
import {Avatar, AvatarGroup, AvatarIcon} from "@heroui/avatar";
import { useState } from "react";

interface Props {
  avatar: string,
  name: string,
  number: number
}
const Student: React.FC<Props> = ({avatar, name, number}) => {
  return (
    <div className="flex items-center p-2 bg-bgTertiary rounded-xl select-none">
      <Checkbox size="lg" radius="sm" className="flex flex-row-reverse justify-between min-w-full min-h-full ">
        <div className="flex">
          <Avatar size="lg" showFallback  src={avatar}/>
          <div className="flex flex-col ms-3">
            <div className="text-textPrimary">{name}</div>
            <div className="text-textTertiary">{number}</div>
          </div>
        </div>
      </Checkbox>
    </div>
  )
}
export default Student;