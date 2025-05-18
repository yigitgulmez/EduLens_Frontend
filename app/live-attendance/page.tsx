'use client'

import Camera from '@/components/Camera';
import { Avatar } from '@heroui/react'
import { useEffect } from 'react'

export default function page() {

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080/ws');
  
    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
  
        console.log("Gelen veri:", data);
  
        console.log(data.userImage);
        console.log(data.firstName);
        console.log(data.lastName);
        console.log(data.class);
        console.log(data.branch);
        console.log(data.number);
      } catch (err) {
        console.error("Geçersiz JSON:", err);
      }
    };
  
    return () => socket.close();
  }, []);
  return (
    <main className='h-screen w-screen flex gap-5 px-5 justify-center items-center'>
      <div className='w-2/3'>
        <Camera/>
      </div>
        <div className='bg-primary-400 text-textSecondary w-[600px] h-2/4 rounded-3xl px-7 py-7 flex flex-col gap-4'>
          <div className='w-full h-full border-2 border-bgSecondary rounded-s-2xl flex flex-col gap overflow-y-auto'>
            <div className="flex flex-wrap p-2 gap-2 pr-4">
              <div className="flex w-full items-center p-2 bg-bgTertiary hover:bg-white/80 transition-all duration-300 rounded-xl select-none animate">
                <Avatar size="lg" showFallback />
                <div className="flex flex-col ms-3">
                  <div className="text-textPrimary drop-shad">NAME</div>
                  <div className="text-textTertiary">NUMBER CLASS</div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </main>
  )
}
