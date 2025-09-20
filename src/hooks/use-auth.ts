import { useAuthActions } from "@convex-dev/auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

const signUpSchema = z.object({
  firstname: z.string().min(2, "firstname must be at least two letters"),
  lastname: z.string().min(2, "firstname must be at least two letters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type SignInData = z.infer<typeof signInSchema>;
type SignUpData = z.infer<typeof signUpSchema>;

export const useAuth = () => {
  const { signIn, signOut } = useAuthActions();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const signInForm = useForm<SignInData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signUpForm = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const handleSignIn = async (data: SignInData) => {
    setLoading(true);
    try {
      await signIn("password", {
        email: data.email,
        password: data.password,
        flow: "signIn",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      signInForm.setError("password", { message: "Invalid email or password" });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (data: SignUpData) => {
    setLoading(true);
    try {
      await signIn("password", {
        email: data.email,
        password: data.password,
        name: `${data.firstname} ${data.lastname}`,
        flow: "signUp",
      });
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      signUpForm.setError("root", {
        message: "Error creating account. Email may already exist.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignout = async () => {
    try {
      await signOut();
      router.push("/auth/sign-in");
    } catch (error) {
      setError("Error signing out. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    signInForm,
    signUpForm,
    handleSignIn,
    handleSignUp,
    handleSignout,
    loading,
    error,
  };
};
