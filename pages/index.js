import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
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
    <div className="flex justify-end">
      <div className="flex bg-blue-400 gap-1 text-white rounded-lg overflow-hidden">
        <img src={session?.user?.image} alt="" className="w-6 h-6"/>
        <span className="px-2">
          {session?.user?.name}
        </span>
      </div>
      </div>
    
  )
}