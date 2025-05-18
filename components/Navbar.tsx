'use client'

import { Button, ButtonGroup } from "@heroui/button"
import { useRouter } from "next/navigation"

export default function Navbar() {
  const router = useRouter();
  const changePage = (route: string) => {
    if (route !== window.location.pathname) {
      router.push(route);
    }
  };
  return (
    <nav className="fixed flex items-center w-full h-16 z-10">
      <img src="/images/EduLensTextNonBG.png" alt="Edulens Text" width={150} className="fixed"/>
      <div className="flex justify-center items-center w-full">
          <ButtonGroup color="primary" variant="shadow" radius="sm">
            <Button onPress={() => changePage('/rollcall')}>Roll Call</Button>
            <Button onPress={() => changePage('/live-attendance')}>Live Attandance</Button>
          </ButtonGroup>
      </div>
    </nav>
  )
}