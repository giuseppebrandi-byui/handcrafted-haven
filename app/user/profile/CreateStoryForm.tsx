'use client'

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CreateStoryForm = () => {
    const { data: session } = useSession();
    const username = session?.user?.username  // Get username from session

    const [storyData, setStoryData] = useState({
        title: '',
        description: '',
        username: username, // Pre-fill author with the session username
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setStoryData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!session) {
            toast.error("You must be logged in to create a story.");
            return;
        }

        const res = {success: 'yay', message: 'yay'}
        alert('call prisma')
        if (!res.success) {
            toast.error(res.message);
            return;
        }

        toast.success("Story created successfully!");
        setStoryData({ title: '', description: '', username: username }); // Reset form, keep author
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-lg font-semibold">Create a Story</h3>

            <Input
                name="title"
                value={storyData.title}
                onChange={handleChange}
                placeholder="Story Title"
                required
            />

            <Input
                name="description"
                value={storyData.description}
                onChange={handleChange}
                placeholder="Short Description"
                required
            />

            <Input
                name="author"
                defaultValue={storyData.username || "anonymus"}
                disabled={session?.user.role !== "admin"} // User's name should not be editable
                className="mt-1"
            />

            <Button type="submit">Submit Story</Button>
        </form>
    );
};

export default CreateStoryForm;
