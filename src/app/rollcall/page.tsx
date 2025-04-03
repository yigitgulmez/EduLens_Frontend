'use client'
import Student from '@/components/Student';
import {Button} from "@heroui/react";

function page() {
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-bgPrimary text-textSecondary w-xl h-2/4 rounded-4xl px-7 py-5 flex flex-col gap-4'>
        <div className="flex justify-between px-5">
          <div className='flex gap-5'>
            <div><Button className='bg-bgSecondary px-3 py-1' radius="full">sınıf</Button></div>
            <div><Button className='bg-bgSecondary px-3 py-1' radius="full">şube</Button></div>
          </div>
          <div>
            ...date
          </div>
        </div>
        <div className="w-full h-full border-2 border-bgSecondary rounded-2xl flex flex-col overflow-y-scroll p-2">
        {/* {list.map((item) => (
            <Student img={item.img} name={item.name} number={item.number}/>
          ))} */}
        </div>
        <div className='px-5 '>
          <Button className=' px-3 py-1 ' color="danger" radius='full'>Save</Button>
        </div>
      </div>
    </main>
  )
}

export default page