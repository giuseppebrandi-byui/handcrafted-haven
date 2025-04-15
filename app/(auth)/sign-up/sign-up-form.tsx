"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import { useSearchParams } from "next/navigation";
const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: ""
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => { 
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="w-full mt-6" variant="default">
        { pending ? "Submitting..." : "Sign Up" }
      </Button>
    )
  }

  return <form action={action}>
    <input type="hidden" name="callbackUrl" value={callbackUrl} />
    <div className="space-y-6">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          defaultValue={signUpDefaultValues.name}
        />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          defaultValue={signUpDefaultValues.email}
        />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="password"
          defaultValue={signUpDefaultValues.password}
        />
      </div>
      <div>
        <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="confirmPassword"
          defaultValue={signUpDefaultValues.confirmPassword}
        />
        </div>
        
        <div>
          <Label>Role</Label>
          <div className="flex space-x-4">
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="admin" required disabled />
              <span>Admin</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="user" required />
              <span>User</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="role" value="artisan" required />
              <span>Artisan</span>
            </label>
          </div>
          
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              name="username"
              type="text"
              required
              autoComplete="username"
              defaultValue={signUpDefaultValues.username}
            />
          </div>
        </div>

        <SignUpButton />
      </div>

      {data && !data.success && (
        <div className="text-center text-destructive">
          {data.message}
        </div>
      ) }

      <div className="text-sm text-center text-muted-foreground">
        Already have an account{" "}
        <Link href="/sign-in" target="_self" className="link">Sign In</Link>
      </div>
    </div>
  </form>;
}
 
export default SignUpForm;