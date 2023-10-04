import Layout from "@/components/Layout";
import Link from "next/link";


export default function Products() {
  return (
    <Layout>
        <Link className="btn-black" href={'/products/new'}>Add New Products</Link>
    </Layout>
  )
}
