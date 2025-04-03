'use client'
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function page() {
  const router = useRouter();
  useEffect(() => {
    router.push('/rollcall')
  }, [router])
  return (
    <main className='h-screen w-screen flex justify-center items-center'>Please wait...</main>
  )
}

export default page