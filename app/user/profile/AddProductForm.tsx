// app/user/addProduct/AddProductForm.tsx
'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

const AddProductForm = () => {
    const { data: session, status } = useSession(); // Fetch session data using useSession
    const router = useRouter();
    const username = session?.user?.username  // Get username from session

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        username: username
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProductData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session) {
            toast.error("You must be logged in to add a product.");
            return;
        }
        // Add your form submission logic here
        toast.success("Product added successfully!");
        router.push('/artisan/'+username); // Redirect to product list page after success
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Add Product</h3>

            <div>
                <label htmlFor="name" className="block text-sm font-medium">Product Name</label>
                <Input
                    id="name"
                    name="name"
                    value={productData.name}
                    onChange={handleChange}
                    required
                    className="mt-1"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium">Description</label>
                <textarea
                    id="description"
                    name="description"
                    value={productData.description}
                    onChange={handleChange}
                    required
                    className="mt-1 p-2 border rounded"
                />
            </div>

            <div>
                <label htmlFor="price" className="block text-sm font-medium">Price</label>
                <Input
                    id="price"
                    name="price"
                    type="number"
                    value={productData.price}
                    onChange={handleChange}
                    required
                    className="mt-1"
                />
            </div>

            <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium">Image URL</label>
                <Input
                    id="imageUrl"
                    name="imageUrl"
                    value={productData.imageUrl}
                    onChange={handleChange}
                    className="mt-1"
                />
            </div>

               <Input
                name="author"
                defaultValue={productData.username!}
                disabled= {session!.user?.role !== "admin"} // User's name should not be editable
                className="mt-1"
            />

            <Button type="submit" className="mt-4" disabled={status === 'loading'}>
                {status === 'loading' ? 'Submitting...' : 'Add Product'}
            </Button>
        </form>
    );
};

export default AddProductForm;
