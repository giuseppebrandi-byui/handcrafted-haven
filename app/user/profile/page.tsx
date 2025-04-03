// app/user/addProduct/page.tsx
import { Metadata } from "next";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import AddProductForm from "./AddProductForm";
import ProfileForm from "@/app/user/profile/profile-form"; // Import the AddProductForm component
import CreateStoryForm from "./CreateStoryForm"; // Import the new create story

export const metadata: Metadata = {
    title: 'Add Product',
};

const AddProductPage = async () => {
    const session = await auth(); // Get the session using your custom auth method

    return (
        <SessionProvider session={session}>
            <div className="max-w-md mx-auto space-y-4">
                <h2 className="h2-bold">Profile</h2>
                <ProfileForm/>
            </div>

            {session!.user?.role === 'artisan' || session!.user?.role === 'admin' &&

                <div className="max-w-md mx-auto space-y-4">
                    <h2 className="h2-bold">Add New Product</h2>
                    <AddProductForm/>

                <h2 className="h2-bold">Your Stories</h2>
                <CreateStoryForm />

                </div>
            }


        </SessionProvider>
    );
};

export default AddProductPage;
