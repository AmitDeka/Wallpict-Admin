"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ArrowRightIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginNext = () => {
    setIsLoginVisible(true);
  };

  const handleLogin = () => {
    setIsLoading(true);
    setTimeout(() => {
      router.replace("/dashboard");
    }, 2000);
  };

  return (
    <div className="lg:grid lg:grid-cols-2 w-full h-full">
      <div className="flex items-center justify-center h-full py-12">
        {!isLoginVisible ? (
          // Welcome Container
          <div className="mx-auto grid w-[350px]" id="welcomeContainer">
            <Card className="border-0 shadow-none">
              <CardHeader className="flex items-center w-full">
                <Image
                  src="/images/logo.svg"
                  width={80}
                  alt="Logo"
                  height={80}
                  className="object-cover"
                />
              </CardHeader>
              <CardContent className="pb-4">
                <CardTitle className="text-3xl text-center">
                  Welcome To <span className="text-primary">WallPict</span>
                  <br />
                  admin Panel
                </CardTitle>
              </CardContent>
              <CardFooter className="flex justify-center w-full">
                <Button
                  variant="default"
                  size="lg"
                  className="px-10"
                  onClick={handleLoginNext}>
                  Go to Login
                  <ArrowRightIcon className="w-4 h-4 ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          // Login Container
          <div className="mx-auto w-[350px] gap-6" id="loginContainer">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Login</h1>
              <p className="text-balance text-muted-foreground">
                Enter your email below to login to your account
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="/"
                    className="inline-block ml-auto text-sm underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
              {isLoading ? (
                <Button disabled>
                  <ReloadIcon className="animate-spin w-4 h-4 mr-2" />
                  Logging in ...
                </Button>
              ) : (
                <Button type="submit" className="w-full" onClick={handleLogin}>
                  Login
                </Button>
              )}

              {/* <Button type="submit" className="w-full" onClick={handleLogin}>
                {isLoading ? (
                  <svg
                    className="animate-spin w-5 h-5 mr-3 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.963 7.963 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  "Login"
                )}
              </Button> */}
            </div>
          </div>
        )}
      </div>
      <div className="bg-muted lg:block -z-1 hidden">
        <div className="bg-rhoene bg-cover bg-center bg-no-repeat h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"></div>
      </div>
    </div>
  );
}
