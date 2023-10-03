import Nav from "@/components/Nav";
import { useSession, signIn, signOut } from "next-auth/react"

export default function Layout({children}) {
  const {data: session} = useSession();
  if (!session) {
    return (
      <div className="bg-blue-400 w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-black min-h-screen flex">
      <Nav />
      <div className="flex-grow bg-white mt-2 mr-2 rounded-lg">
        {children}
      </div>
      </div>
    
  )
}