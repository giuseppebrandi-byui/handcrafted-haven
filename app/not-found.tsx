"use client";
import { APP_NAME } from "@/lib/constants";
import Image from "next/image";
import { Button } from "@/components/ui/button";
const NotFoundPage = () => { 
  return <div className="flex flex-col items-center justify-center min-h-screen">
    <Image src="/images/logo.png" width={48} height={48} alt={`${APP_NAME}`} priority={true} />
    <div className="p-6 w-1/3 rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-4">Not Found</h1>
      <p className="text-destructive">Sorry, we could not find the requested page</p>
      <Button variant="outline" className="mt-4 ml-2" onClick={ () => (window.location.href = "/")} >back to Home</Button>
    </div>
  </div>;
}

export default NotFoundPage;