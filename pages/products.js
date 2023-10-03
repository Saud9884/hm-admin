import Layout from "@/components/Layout";
import Link from "next/link";


export default function Products() {
  return (
    <Layout>
        <Link className="bg-black rounded-md text-white py-1 px-2" href={'/products/new'}>Add New Products</Link>
    </Layout>
  )
}
