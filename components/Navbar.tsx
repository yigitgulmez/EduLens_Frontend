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
    <div className="fixed flex items-center w-full h-16">
      <div className="flex justify-center items-center w-full">
        <ButtonGroup color="primary" variant="shadow" radius="sm">
          <Button onPress={() => changePage('/rollcall')}>Roll Call</Button>
          <Button onPress={() => changePage('/camera')}>Camera</Button>
          <Button onPress={() => changePage('/live-attendance')}>Live Attandance</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}