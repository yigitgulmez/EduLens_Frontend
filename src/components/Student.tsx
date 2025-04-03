import Image from "next/image"

interface Props {
  img: string,
  name: string,
  number: number
}
const Student: React.FC<Props> = ({img, name, number}) => {
  return (
    <div className="flex justify-between">
      <div>
        <Image src={img} alt={name} width={50} height={50}/>
        <div className="flex ms-3">
          <div className="text-textPrimary">{name}</div>
          <div className="text-textTertiary">{number}</div>
        </div>
      </div>
      <div>
        ...checkbox
      </div>
    </div>
  )
}
export default Student;