'use client'
import Student from '@/components/Student';
import { Button } from '@heroui/button';
import { addToast } from "@heroui/toast";
import { DatePicker } from "@heroui/date-picker";
import { Select, SelectItem } from '@heroui/select';
import { useEffect, useState } from 'react';
import { getClassId , getClassList, getBranchs, getClasses } from '@/utils/classes';
import { checkDate, getStudents, postStudentPresents, putStudentPresents } from '@/utils/students';
import { ListClassesProps, SelectProps, StudentProps, StudentStatusProps } from '@/types/class';

function page() {
  const [studentClassList, setStudentClassList] = useState<SelectProps[]>([]);
  const [branchList, setBranchList] = useState<SelectProps[]>([]);
  const [classList, setClassList] = useState<ListClassesProps>()
  const [studentClass, setStudentClass] = useState<number>()
  const [branch, setBranch] = useState<string>()
  const [date, setDate] = useState<number>()
  const [students, setStudents] = useState<StudentProps>()
  const [isDate, setIsDate] = useState<boolean>()
  const [attendanceID, setAttendanceID] = useState<string>()
  const [classID, setClassID] = useState<string>()
  const [handleSelectChange, setHandleSelectChange] = useState<boolean>()

  const fetchClassData = async () => {
    try {
      const data = await getClassList();
      setClassList(data);
    } catch (error) {
      console.error("Error fetching class data:", error);
    }
  };

  const saveStudent = async () => {
    console.log("save stıudents started");
    try {
      console.log("try started");
      if (!students) {
        console.error("Öğrenci verisi bulunamadı."); 
        addToast({
          title: "Error",
          description: "Öğrenci verisi bulunamadı.",
          color: "danger",
          variant: "flat",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        })
        return;
      }
      const statusList: StudentStatusProps[] = students.students.map(student => ({
        studentID: student.id,
        isPresent: student.isPresent,
      }));

      console.log("status list:", statusList);

      if (isDate) {
        await putStudentPresents(students.id, statusList);
      } else {
        await postStudentPresents(classID, statusList);
      }
      addToast({
        title: "Success",
        description: "Yoklama başarıyla kaydedildi.",
        color: "success",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    } catch (error) {
      console.error("Error saving student presents:", error);
      addToast({
        title: "Error",
        description: "Yoklama kaydı yapılırken bir hata oluştu.",
        color: "danger",
        variant: "flat",
        timeout: 3000,
        shouldShowTimeoutProgress: true,
      })
    }
  };

  const handlePresentChange = (status: StudentStatusProps) => {
    const updatedStudents = students?.students.map((student) =>
      student.id === status.studentID
        ? { ...student, isPresent: status.isPresent }
        : student
    );
  
    if (updatedStudents) {
      setStudents(prevState => ({
        id: prevState?.id ?? "",
        level: prevState?.level ?? 0,
        branch: prevState?.branch ?? "",
        createdAt: prevState?.createdAt ?? Date.now(),
        students: updatedStudents,
      }));
    }
  };
  

  useEffect(() => {fetchClassData();},[])

  useEffect(() => {if (studentClass && branch) setHandleSelectChange(!handleSelectChange)},[studentClass, branch])

  useEffect(() => {
    setStudentClassList(getClasses(classList));
  }, [classList]);

  useEffect(() => {
    setBranchList(getBranchs(studentClass, classList));
  }, [studentClass])

  useEffect(() => {
    const fetch = async () => {
      console.log("fetch started");
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      const unix = Math.floor(currentDate.getTime());
  
      console.log("getClassId çağrılıyor");
      const classID = await getClassId(studentClass, branch);
      console.log("getClassId döndü", classID);
      
      console.log("checkDate çağrılıyor");
      const check = await checkDate(classID, unix);
      console.log("checkDate döndü", check);
      
  
      setClassID(classID);
      setAttendanceID(attendanceID);
      setIsDate(check);
  
      let students: StudentProps | undefined;
  
      if (date == unix && check) students = await getStudents(classID, undefined);
      else students = await getStudents(classID, date);
      setStudents(students);
      console.log("-----------------------");
      console.log(students);
      console.log(date);
      console.log("AttendanceID", attendanceID);
      console.log("ClassID", classID);
      console.log("-----------------------");
    };
    fetch();
    
  }, [handleSelectChange, date]);
  
  return (
    <main className='h-screen w-screen flex justify-center items-center'>
      <div className='bg-primary-400 text-textSecondary w-[600px] h-2/4 rounded-3xl px-7 py-5 flex flex-col gap-4'>
        <div className="flex justify-between px-5">
          <div className='flex gap-5 *:transition-all *:duration-200 *:transform active:*:scale-[98%]'>
            <div>
              <Select className="w-24" onChange={(e) => setStudentClass(parseInt(e.target.value))} placeholder='Class' items={studentClassList}>
                {(classes) => <SelectItem>{classes.label}</SelectItem>}
              </Select>
            </div>
            <div>
              <Select className="w-24" onChange={(e) => setBranch(e.target.value)} placeholder='Branch' items={branchList}>
                {(branchs) => <SelectItem>{branchs.label}</SelectItem>}
              </Select>
            </div>
          </div>
          <div>
            <DatePicker
                id='date'
                onLoad={() => {}}
                onChange={(value) => {
                if (value && "toDate" in value) {
                    const timestamp = value.toDate("UTC").getTime();
                  setDate(timestamp);
                } else {
                  setDate(undefined);
                }
              }}
              className="w-32 transition duration-300 transform active:scale-[98%]"/>
          </div>
        </div>
        <div className="w-full h-full border-2 border-bgSecondary rounded-s-2xl flex flex-col gap-2 overflow-y-auto p-2 pr-3">
        {students && students.students && students.students.map((student) => (
          <Student
            key={student.id}
            id={student.id}
            avatar={student.studentImage}
            name={student.firstName + " " + student.lastName}
            number={student.schoolNumber}
            present={student.isPresent}
            onPresentChange={handlePresentChange}
          />
        ))}
        </div>
        <div className='px-5 '>
          <Button className='px-3 py-1 bg-white' onPress={() => saveStudent()} radius='sm'>Save</Button>
        </div>
      </div>
    </main>
  )
}

export default page