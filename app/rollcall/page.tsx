'use client'
import Student from '@/components/Student';
import { Button } from '@heroui/button';
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from '@heroui/select';


export const branchs = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];

export const studentClasses = [
  {key: "cat", label: "Cat"},
  {key: "dog", label: "Dog"},
  {key: "elephant", label: "Elephant"},
  {key: "lion", label: "Lion"},
  {key: "tiger", label: "Tiger"},
  {key: "giraffe", label: "Giraffe"},
  {key: "dolphin", label: "Dolphin"},
  {key: "penguin", label: "Penguin"},
  {key: "zebra", label: "Zebra"},
  {key: "shark", label: "Shark"},
  {key: "whale", label: "Whale"},
  {key: "otter", label: "Otter"},
  {key: "crocodile", label: "Crocodile"},
];

function page() {
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-primary-400 text-textSecondary w-[600px] h-2/4 rounded-3xl px-7 py-5 flex flex-col gap-4'>
        <div className="flex justify-between px-5">
          <div className='flex gap-5'>
            <div>
              <Select className="w-24" label='Class' items={studentClasses}>
                {(studentClass) => <SelectItem>{studentClass.label}</SelectItem>}
              </Select>
            </div>
            <div>
              <Select className="w-24" label='Branch' items={branchs}>
                {(branch) => <SelectItem>{branch.label}</SelectItem>}
              </Select>
            </div>
          </div>
          <div>
          <DatePicker className="w-32" label="Date"/>
          
          </div>
        </div>
        <div className="w-full h-full border-2 border-bgSecondary rounded-2xl flex flex-col overflow-y-scroll p-2">
        {/* {students.map((item) => (
            <Student img={item.img} name={item.name} number={item.number}/>
          ))} */}
        </div>
        <div className='px-5 '>
          <Button className='px-3 py-1 bg-white' radius='sm'>Save</Button>
        </div>
      </div>
    </main>
  )
}

export default page