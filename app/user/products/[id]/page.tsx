
import ProductForm from "@/components/admin/product-form";
import { Metadata } from "next";
import { getProductById } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Update Product"
}

const UserProductUpdatePage = async (props: {
  params: Promise<{
    id: string
  }>
}) => {
  const { id } = await props.params;
  const product = await getProductById(id);
  
  if (!product) return notFound();
  
  const session = await auth();

  return (
    <SessionProvider session={ session }>
    <div className="space-y-8 max-w-5xl mx-auto">
    <h1 className="h2-bold">Update Product</h1>

    <ProductForm type="Update" product={product} productId={product.id} />
      </div>
    </SessionProvider>
  );
}
 
export default UserProductUpdatePage;