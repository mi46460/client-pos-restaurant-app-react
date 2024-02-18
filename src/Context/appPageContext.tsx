import { createContext, useState } from "react";

export type AppPage = "Dashboard" | "Setting" | "Log in" | "Register" | "PurchaseGraph";

export type AppPageContextType = {
    appPage: AppPage;
    setAppPage: (appPage: AppPage) => void;
    navbarState: false | true,
    setNavbarState: () => void
}

type Props = {
  children: JSX.Element | JSX.Element[];
}

export const AppPageContext = createContext<AppPageContextType | null>(null);

export const AppPageProvider = ({children}: Props) => {
    const [appPage, setAppPage] = useState<AppPage>("Setting");
    const [navbarState, setNavbarState] = useState(false);

    const changeAppPage = (appPage: AppPage) => {
        setAppPage(appPage);
    }

    const handleNavbarState = () => {
        setNavbarState(!navbarState);
    }

    return( 
        <AppPageContext.Provider value={{appPage, setAppPage: changeAppPage, navbarState, setNavbarState: handleNavbarState}}>
            {children}
        </AppPageContext.Provider>
    );
} 