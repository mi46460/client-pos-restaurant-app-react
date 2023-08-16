import { createContext, useState } from "react";

export type AppPage = "Dashboard" | "Setting" | "Log in" | "Register" | "PurchaseGraph";

export type AppPageContextType = {
    appPage: AppPage;
    setAppPage: (appPage: AppPage) => void;
}

type Props = {
  children: JSX.Element | JSX.Element[];
}

export const AppPageContext = createContext<AppPageContextType | null>(null);

export const AppPageProvider = ({children}: Props) => {
    const [appPage, setAppPage] = useState<AppPage>("Dashboard");

    const changeAppPage = (appPage: AppPage) => {
        setAppPage(appPage);
    }

    return( 
        <AppPageContext.Provider value={{appPage, setAppPage: changeAppPage}}>
            {children}
        </AppPageContext.Provider>
    );
} 