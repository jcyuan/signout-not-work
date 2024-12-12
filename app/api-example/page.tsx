"use client"
import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [loading, setLoading] = useState(true);
  const session = useSession();
  useEffect(() => {
    async function test() {
      await signOut({redirect: false});
      setLoading(false);
    }
    test();
  }, [])

  const router = useRouter();
  function goBack() {
    router.push("/")
  }
  return (
    <div>
      {(loading ? 
      <p>signing out</p> : 
      <div className="max-w-[700px]">
        <p>
        ~~done, and session: {JSON.stringify(session)}
        </p>
        <p className="mt-4">
          you can probably see the session is cleared, but it's actually not, 
          click Goback to home page and <b>refresh</b>, or inspect cookies in the F12 panel you will see the session cookie <b>`authjs.session-token`</b> is still there, 
          if the cookie was successfully cleared, repeat the process again.
          </p>
          <p  className="mt-4"><b>Because when the page finishes loading, the SessionProvider fetches the session via getSession/useSession, while this component is also requesting signOut at the same time. The cookies returned by the two requests are processed by the browser in an uncertain order. Sometimes the cookies are successfully cleared, and other times they are not. This is determined by the unpredictable request order.</b>
          <Button type="button" className="block mt-4" onClick={() => goBack()}>Go Back</Button>
        </p>
        </div>
      )}
    </div>
  )
}
