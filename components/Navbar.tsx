'use client'

import { Button, ButtonGroup } from "@heroui/button"
import { usePathname, useRouter } from "next/navigation"



export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const changePage = () => {
    router.push(pathname == '/rollcall' ? '/camera' : '/rollcall')
  };
  return (
    <div className="fixed flex items-center w-full h-16">
      <div className="flex justify-center items-center w-full">
        <ButtonGroup color="primary" variant="shadow" radius="sm">
          <Button onPress={changePage}>Roll Call</Button>
          <Button onPress={changePage}>Camera</Button>
        </ButtonGroup>
      </div>
    </div>
  )
}