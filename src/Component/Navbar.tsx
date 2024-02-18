import { useContext } from "react"
import { AppPageContext, AppPageContextType } from "../Context/appPageContext"
import CloseIcon from '@mui/icons-material/Close';

export interface NavbarProps {
    handleOpen: () => void,
    state: boolean
}

export const Navbar = (props: NavbarProps) => {
    const {appPage, setAppPage} = useContext(AppPageContext) as AppPageContextType;
    const {navbarState, setNavbarState} = useContext(AppPageContext) as AppPageContextType;

    return(
        <div className={`bg-base-dark-bg-2 absolute w-full h-full hover:cursor-pointer ${navbarState ? '' : 'hidden'}`}>
            <div className="flex justify-end" onClick={() => setNavbarState()}>
                <CloseIcon style={{color: 'white', margin: '4px 4px 0 0'}}/>
            </div>
            
            <ul className="text-center gap-5">
                <li className={`hover:cursor-pointer font-barlow ${appPage === "Dashboard" ? "text-icon-color-primary" : "text-white"}`}
                onClick={() => setAppPage('Dashboard')}
                >
                    Home
                </li>
                <li className={`hover:cursor-pointer font-barlow ${appPage === "PurchaseGraph" ? "text-icon-color-primary" : "text-white"}`}
                onClick={() => setAppPage('PurchaseGraph')}
                >
                    Grafik
                </li>
                <li className={`hover:cursor-pointer font-barlow ${appPage === "Setting" ? "text-icon-color-primary" : "text-white"}`}
                onClick={() => setAppPage('Setting')}
                >
                    Setting
                </li>
                <li className={`hover:cursor-pointer font-barlow text-white`}
                >
                    logout
                </li>
            </ul>
        </div>
    )
}