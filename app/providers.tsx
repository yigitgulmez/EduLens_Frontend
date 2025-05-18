'use client'
import {HeroUIProvider} from '@heroui/react'
import {ToastProvider} from "@heroui/toast";

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {return (
    <HeroUIProvider>
      <ToastProvider/>
      {children}
    </HeroUIProvider>
  )
}