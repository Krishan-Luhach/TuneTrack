"use client";
import { useContext, useEffect } from "react";

import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import useAuthModal from "@/hooks/useAuthModal";
import { UserContext } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";

const AuthModal = () => {

  const supabaseClient = createClient();
  const userContext = useContext(UserContext)
  const { isOpen, onClose } = useAuthModal();
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  useEffect(()=>{
    if(userContext?.user){
        onClose();
    }
  },[userContext?.user])
  return (
    <Modal
      title="Welcome back"
      description="Login to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={["google"]}
        magicLink
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: "#404040",
                brandAccent: "#22c55e",
              },
            },
          },
        }}
      />
    </Modal>
  );
};

export default AuthModal;
