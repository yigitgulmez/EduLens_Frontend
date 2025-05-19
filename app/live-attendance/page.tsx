'use client'

import Camera from '@/components/Camera';
import { Student } from '@/components/Student2';
import { StudentComponentProps2 } from '@/types/class';
import { addToast, Avatar } from '@heroui/react'
import { useEffect, useState } from 'react'

export default function page() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [students, setStudents] = useState<StudentComponentProps2[]>([]);
  const [isData, setIsData] = useState<boolean>(false);

  useEffect(() => {
    const socket = new WebSocket('wss://dpdfk76v-8001.euw.devtunnels.ms/ws/rollcall');

    socket.onopen = () => {
      console.log("WebSocket bağlantısı kuruldu");
      setWs(socket);
    };

    socket.onmessage = (event) => {
      console.log("Sunucudan veri alındı:", event.data);
      const response = JSON.parse(event.data);
      if (response.success === 200) {
        setStudents(prev => {
          if (prev.find(s => s.id === response.data.id)) return prev;
          return [
            ...prev,
            {
              id: response.data.id,
              avatar: response.data.studentImage,
              name: response.data.firstName + " " + response.data.lastName,
              info: response.data.schollNumber + " " + response.data.level + " - " + response.data.branch,
            },
          ];
        });
        setIsData(true);
        addToast({
          title: "Success",
          description: "Öğrenci bulundu.",
          color: "success",
          variant: "flat",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      } else if (response.success === 404) {
        setIsData(false);
        addToast({
          title: "Error",
          description: "Öğrenci bulunamadı.",
          color: "danger",
          variant: "flat",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      } else {
        addToast({
          title: "Error",
          description: "Sunucudan veri alınamadı",
          color: "danger",
          variant: "flat",
          timeout: 3000,
          shouldShowTimeoutProgress: true,
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket hata:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket bağlantısı kapandı");
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  return (
    <main className='h-screen w-screen flex gap-5 px-5 justify-center items-center'>
      <div className='w-2/3'>
        <Camera ws={ws}/>
      </div>
        <div className='bg-primary-400 text-textSecondary w-[600px] h-2/4 rounded-3xl px-7 py-7 flex flex-col gap-4'>
          <div className='w-full h-full border-2 border-bgSecondary rounded-s-2xl flex flex-col gap overflow-y-auto'>
            <div className="flex flex-wrap p-2 gap-2 pr-4">
              {students && students.map(student => (
              <Student
                id={student.id}
                avatar={student.avatar}
                name={student.name}
                info={student.info}
              />
              ))}
            </div>
          </div>
        </div>
    </main>
  )
}
