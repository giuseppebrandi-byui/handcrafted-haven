// app/user/addProduct/page.tsx
import { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import {getProductsByUsername} from "@/lib/actions/product.actions";
import ProfileForm from "@/app/user/profile/profile-form"; // Import the AddProductForm component
import CreateStoryForm from "./CreateStoryForm"; // Import the new create story
import ProductForm from "@/components/admin/product-form";
import ProductList from "@/components/admin/product-list";

export const metadata: Metadata = {
    title: 'Add Product',
};

const AddProductPage = async (props: {
  searchParams: Promise<{
    page: string;
  }>
}) => {
    const session = await auth(); // Get the session using your custom auth method
    const searchParams = await props.searchParams;

    const page = Number(searchParams.page) || 1;

    const data = await getProductsByUsername(session!.user.username!);
    const products = { data, "totalPages": 1}

    return (
        <SessionProvider session={session}>
            <div className="space-y-8 max-w-5xl mx-auto">
                <h2 className="h2-bold">Profile</h2>
                <ProfileForm/>
            </div>

            {(session!.user?.role === 'artisan' || session!.user?.role === 'admin') &&

                <div className="space-y-8 max-w-5xl mx-auto">
                    <h2 className="h2-bold mt-11">Add New Product</h2>
                    <ProductForm type="Create" />
                    <ProductList products={products} page={page} />
                <h2 className="h2-bold">Your Stories</h2>
                <CreateStoryForm />

                </div>
            }


        </SessionProvider>
    );
};

export default AddProductPage;
