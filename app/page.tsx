"use client";
import { title, subtitle } from "@/components/primitives";

import { useAuthState } from "react-firebase-hooks/auth";

import { Button } from "@nextui-org/button";
import NextLink from "next/link";
import { auth, authApp } from "@/services/auth";
import { redirect } from "next/navigation";

export default function MainPage() {
  const [user] = useAuthState(authApp);

  if (user) {
    redirect("/projects");
  }

  const handleLoginWithGoogle = () => {
    auth.signInWithGoogle();
  };

  return (
    <section className="max-w-md mx-auto h-full p-2 grid place-items-center">
      <div className="flex flex-col items-center gap-8 justify-center bg-white p-2 md:p-4 rounded-2xl h-4/5">
        <div className="inline-block text-center justify-center">
          <h1 className={title({ color: "violet" })}>AgileChat</h1>
          <h2 className={subtitle()}>
            La comunicación eficiente que impulsa el éxito laboral.
          </h2>
        </div>

        <div className="w-full flex flex-col gap-4">
          <header className="w-full text-center">
            <h3 className="text-2xl font-bold ">Inicia sesión</h3>
          </header>
          {/*      <Input type="email" label="Email" />
          <Input type="password" label="Contraseña" /> */}
          <Button
            className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white"
            onPress={handleLoginWithGoogle}
          >
            Iniciar sesión
          </Button>

          <NextLink href="/home">Go home</NextLink>
        </div>
      </div>
    </section>
  );
}
