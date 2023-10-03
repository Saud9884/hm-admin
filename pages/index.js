import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";

export default function Home() {
  const {data: session} = useSession();
return(
  <Layout>
  <div className="text-black flex justify-between">
    Hello, {session?.user?.name}
  
  <div className="flex bg-black text-white gap-1 rounded-lg overflow-hidden">
    <img src={session?.user?.image} alt="dp" className="w-6 h-6"/>
   <span className="px-2">
   {session?.user?.name}
   </span> 
  
  </div>
  </div>
  </Layout>
)
}