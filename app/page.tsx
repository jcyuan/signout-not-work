'use client'

import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation"

export default function Index() {
  const session = useSession()
  const router = useRouter();

  function gotoLogin() {
    router.push('/auth/signin')
  }
  function gotoBugPage() {
    router.push('/api-example')
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col rounded-md bg-gray-100">
        <div className="rounded-t-md bg-gray-200 p-4 font-bold">
          Current Session
        </div>
        <pre className="whitespace-pre-wrap break-all px-4 py-6">
          {JSON.stringify(session, null, 2)}
        </pre>
      </div>
      <Button type="button" onClick={() => gotoLogin()} >Login</Button>

      <p>when logged in, click this button to see the bug</p>
      <Button type="button" onClick={() => gotoBugPage()} >GoBug</Button>
    </div>
  )
}
