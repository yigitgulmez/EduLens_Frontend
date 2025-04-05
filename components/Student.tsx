import {Checkbox} from "@heroui/checkbox";
import {Avatar} from "@heroui/avatar";

interface Props {
  avatar: string,
  name: string,
  number: number
}
const Student: React.FC<Props> = ({avatar, name, number}) => {
  return (
    <div className="flex items-center p-2 bg-bgTertiary hover:bg-white/80 transition-all duration-300 rounded-xl select-none animate">
      <Checkbox size="lg" radius="sm" className="flex flex-row-reverse justify-between min-w-full min-h-full">
        <div className="flex">
          <Avatar size="lg" showFallback src={avatar}/>
          <div className="flex flex-col ms-3">
            <div className="text-textPrimary drop-shad">{name}</div>
            <div className="text-textTertiary">{number}</div>
          </div>
        </div>
      </Checkbox>
    </div>
  )
}
export default Student;