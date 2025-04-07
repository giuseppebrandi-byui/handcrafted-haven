import { Metadata } from "next";
import ProductForm from "@/components/admin/product-form";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { requireAdmin } from "@/lib/auth-guard";

export const metadata: Metadata = {
  title: "Create Product",
}

const CreateProductPage = async () => {
  await requireAdmin();
  const session = await auth(); // Get the session using your custom auth method
  return (
     <SessionProvider session={session}>
      <h2 className="h2-bold">Create Product</h2>
      <div className="my-8">
        <ProductForm type="Create"/>
      </div>
    </SessionProvider>
  );
}
 
export default CreateProductPage;