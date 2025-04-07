'use client'
import Student from '@/components/Student';
import { Button } from '@heroui/button';
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from '@heroui/select';
import { useEffect, useState } from 'react';
import {getLocalTimeZone, today} from "@internationalized/date";
import { getId, getClasses } from '@/utils/classes';


function page() {
  const [studentClass, setStudentClass] = useState<String | undefined>()
  const [branch, setBranch] = useState<String | undefined>()
  const [date, setDate] = useState<number | undefined>()
  
  useEffect(() => {
    const studentClass getClasses()
  
  }, [studentClass, branch, date])
  
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-primary-400 text-textSecondary w-[600px] h-2/4 rounded-3xl px-7 py-5 flex flex-col gap-4'>
        <div className="flex justify-between px-5">
          <div className='flex gap-5 *:transition-all *:duration-200 *:transform active:*:scale-[98%]'>
            <div>
              <Select className="w-24" onChange={(e) => setStudentClass(e.target.value)} placeholder='Class' items={studentClasses}>
                {(studentClass) => <SelectItem>{studentClass.label}</SelectItem>}
              </Select>
            </div>
            <div>
              <Select className="w-24" onChange={(e) => setBranch(e.target.value)} placeholder='Branch' items={branchs}>
                {(branch) => <SelectItem>{branch.label}</SelectItem>}
              </Select>
            </div>
          </div>
          <div>
            <DatePicker 
                onChange={(value) => {
                if (value && "toDate" in value) {
                  const timestamp = value.toDate("UTC").getTime();
                  setDate(timestamp);
                } else {
                  setDate(undefined);
                }
              }}
              //TODO minValue={}
              maxValue={today(getLocalTimeZone())}
              className="w-32 transition duration-300 transform active:scale-[98%]"/>
          </div>
        </div>
        <div className="w-full h-full border-2 border-bgSecondary rounded-s-2xl flex flex-col gap-2 overflow-y-auto p-2 pr-3">
        {/* {students.map((item) => (
            <Student avatar={item.avatar} name={item.name} number={item.number}/>
          ))} */}
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
          <Student avatar={"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"} name={"Name"} number={101}/>
        </div>
        <div className='px-5 '>
          <Button className='px-3 py-1 bg-white' radius='sm'>Save</Button>
        </div>
      </div>
    </main>
  )
}

export default page