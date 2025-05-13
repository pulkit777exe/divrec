"use client";

import { UserDetailContext } from "@/context/UserDetailContext";
import { supabase } from "@/services/Supabase";
import { useUser } from "@clerk/nextjs";
import { useEffect, ReactNode, useState } from "react";

type ProviderProps = {
  children: ReactNode;
};

export default function Provider({ children }: ProviderProps) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState();

  const CreateNewUsers = async () => {
    if (!user?.primaryEmailAddress?.emailAddress) return;

    const email = user.primaryEmailAddress.emailAddress;

    const { data: existingUsers, error: selectError } = await supabase
      .from("users")
      .select("*")
      .eq("email", email);

    if (selectError) {
      console.error("Select error:", selectError);
      return;
    }

    if (existingUsers?.length === 0) {
      const { data, error: insertError } = await supabase
        .from("users")
        .insert([
          {
            name: user.fullName,
            email: email,
          },
        ])
        .select();

      if (insertError) {
        console.error("Insert error:", insertError);
      } else {
        console.log("User created:", data);
        setUserDetail(data[0]);
        return ;
      }
    } else {
      console.log("User already exists:", existingUsers);
    }
    setUserDetail(existingUsers[0]);
  };

  useEffect(() => {
    if (user) CreateNewUsers();
  }, [user]);

  return (
    <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
      <div className="w-full">{children}</div>;
    </UserDetailContext.Provider>
  )
}
