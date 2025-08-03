"use client";
import { useRouter } from "next/navigation";
import { BiSearch } from "react-icons/bi";
import { HiHome } from "react-icons/hi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { twMerge } from "tailwind-merge";
import Button from "./Button";
import { useRef } from "react";
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/utils/supabase/client";
import { FaUserAlt } from "react-icons/fa";
import toast from "react-hot-toast";
import usePlayer from "@/hooks/usePlayer";
interface HeaderProps {
  children: React.ReactNode;
  className?: string;
}
const Header: React.FC<HeaderProps> = ({ children, className }) => {
  const router = useRouter();
  const ref = useRef<HTMLButtonElement | null>(null);
  const authModal = useAuthModal();

  const supabase = createClient();
  const { user } = useUser();
  const player = usePlayer();
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    player.reset(); 
    router.refresh();
    if (error) {
      toast.error(error.message);
    }
    else{
      toast.success("Logged out!");
    }
  };

  return (
    <div
      className={twMerge(
        `
    h-fit
   bg-gradient-to-b
   from-emerald-800
   p-6
    `,
        className
      )}
    >
      <div className="w-full mb-4 flex item-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center cursor-pointer justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft size={35} className="text-white" />
          </button>
          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center cursor-pointer justify-center hover:opacity-75 transition"
          >
            <RxCaretRight size={35} className="text-white" />
          </button>
        </div>
        <div className="flex md:hidden gap-x-2 items-center">
          <button
            className="
          flex
          rounded-full
          bg-white
          cursor-pointer
          hover:opacity-75
          p-2
          items-center
          justify-center
          transition
          "
          >
            <HiHome size={20} className="text-black" />
          </button>
          <button
            className="
          flex
          rounded-full
          bg-white
          hover:opacity-75
          p-2
          items-center
          justify-center
          transition
          "
          >
            <BiSearch size={20} className="text-black" />
          </button>
        </div>
        <div className="flex justify-between items-center gap-x-4">
          {user ? (
            <div
            className="flex gap-x-4 items-center"
            > 
            <Button onClick={handleLogout}
            className="bg-white px-6 py-2">
              Logout 
            </Button>
            <Button onClick={()=>router.push('/account')} className="bg-white">
              <FaUserAlt/>
            </Button>
            </div>
          ) : (
            <>
              <div>
                <Button
                  ref={ref}
                  onClick={authModal.onOpen}
                  className="bg-transparent text-neutral-300 font-medium"
                >
                  Sign Up
                </Button>
              </div>
              <div>
                <Button
                  ref={ref}
                  onClick={authModal.onOpen}
                  className="bg-white px-6 py-2"
                >
                  Login
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Header;
