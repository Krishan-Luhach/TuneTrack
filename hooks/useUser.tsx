import { Subscription, UserDetails } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";

type UserContextType = {
  user: User | null;
  userDetails: UserDetails | null;
  isLoading: boolean;
  subscription: Subscription | null;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export interface Props {
  [propName: string]: any;
}
export const MyUserContextProvider = (props: Props) => {
  const supabase = createClient();
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const getUserDetails = async () =>
    (await supabase.from("users").select("*").single()) ?? null;
  const getSubscription = async () =>
    (await supabase
      .from("subscriptions")
      .select("*,prices(*,products(*))")
      .in("status", ["trialing", "active"])
      .single()) ?? null;
  useEffect(() => {
    async function initialize() {
      try {
        setIsLoadingData(true);

        const results = await Promise.allSettled([
          getUserDetails(),
          getSubscription(),
          supabase.auth.getUser(),
        ]);
        const userDetailsPromise = results[0];
        const subscriptionPromise = results[1];
        const userResponse = results[2];
        if (userDetailsPromise.status === "fulfilled") {
          setUserDetails(userDetailsPromise.value.data as UserDetails);
        }
        if (subscriptionPromise.status === "fulfilled") {
          console.log("Subscription: ",subscriptionPromise.value.data)
          setSubscription(subscriptionPromise.value.data as Subscription);
        }
        if (userResponse.status === "fulfilled") {
          setUser(()=>userResponse.value.data.user);
        }

        const {
          data: { subscription },
        } =  supabase.auth.onAuthStateChange((_event, session) => {
          setUser(()=>session?.user ?? null);
        });
        setIsLoadingData(false);

        return () => subscription.unsubscribe();
      } catch (error) {
        setUserDetails(null);
        setSubscription(null);
        console.error("Error fetching info:: ", error);
        setIsLoadingData(false);
      }
    }
    initialize();
  }, [supabase]);
  const value = {
    user,
    userDetails,
    isLoading: isLoadingData,
    subscription,
  };

  return <UserContext.Provider value={value} {...props} />;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("useUser must be used within a MyUserContextProvider");
  return context;
};
