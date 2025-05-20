'use client'

import Camera from '@/components/Camera';
import { Student } from '@/components/Student2';
import { StudentComponentProps2 } from '@/types/class';
import { addToast } from '@heroui/react'
import { useEffect, useState } from 'react'

export default function page() {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [student, setStudent] = useState<StudentComponentProps2 | null>(null);

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
        setStudent({
          id: response.data.id,
          avatar: response.data.studentImage,
          name: response.data.firstName + " " + response.data.lastName,
          info: response.data.schollNumber + " " + response.data.level + " - " + response.data.branch,
        });
        addToast({
          title: "Success",
          description: "Öğrenci bulundu.",
          color: "success",
          variant: "flat",
          timeout: 1500,
          shouldShowTimeoutProgress: true,
        });
      } else if (response.success === 404) {
        setStudent(null);
        addToast({
          title: "Error",
          description: "Öğrenci bulunamadı.",
          color: "danger",
          variant: "flat",
          timeout: 1500,
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
      <div className='w-2/3 rounded-xl overflow-hidden'>
        <Camera ws={ws}/>
      </div>
      <div className='bg-primary-400 text-textSecondary w-[600px] h-2/4 rounded-3xl p-5'>
        <div className='w-full h-full overflow-hidden'>
          {student && (
            <Student
              id={student.id}
              avatar={student.avatar}
              name={student.name}
              info={student.info}
            />
          )}
        </div>
      </div>
    </main>
  )
}
