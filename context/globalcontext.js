"use client";

import { useContext, useState, createContext, useEffect } from "react";
import { getUnreadMessageCount } from "@/app/actions/getunreadmessagecount";
import { useSession } from "next-auth/react";

const GlobalContext = createContext();

export function GlobalContextProvider({ children }) {
  const [unreadCount, setunreadCount] = useState(0);

  const { data: session } = useSession();
  // Fetch unread message count when the session is available

  useEffect(() => {
    if (session && session.user) {
      getUnreadMessageCount().then((res) => {
        if (res.count) {
          setunreadCount(res.count);
        }
      });
    }
  }, [getUnreadMessageCount, session]);

  return (
    <GlobalContext.Provider
      value={{
        unreadCount,
        setunreadCount,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

//We created a custom hook useGlobalContext to simplify access to the context. Instead of calling useContext(GlobalContext) everywhere, we wrap it inside a reusable function for cleaner and more maintainable code.

export function useGlobalContext() {
  return useContext(GlobalContext);
}
