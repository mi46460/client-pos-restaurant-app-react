import { useContext } from "react"
import { AppPageContext, AppPageContextType } from "../Context/appPageContext"
import { HomeIcon } from "../Icons/HomeIcon";
import { LogoutIcon } from "../Icons/LogoutIcon";
import { PurchaseGraphIcon } from "../Icons/PurchaseGraphIcon";
import SettingIcon from "../Icons/SettingIcon";

export const SideBar = () => {
    const {appPage, setAppPage} = useContext(AppPageContext) as AppPageContextType;
    
    return(
        <div className="w-27 bg-base-dark-bg-2 items-center flex flex-col justify-around">
            <div className={` w-full p-3 ${appPage === "Dashboard" ? "bg-base-dark-bg-1 rounded-s-md" : ""}`}>
                <div className={`p-2 ${appPage === "Dashboard" ? "bg-icon-color-primary rounded-lg" : ""}
                `} onClick={() => setAppPage("Dashboard")}>
                <HomeIcon color={`${appPage === "Dashboard" ? "white" : '#EA7C69'}`}/>
                </div> 
            </div>
            <div className={`p-3 ${appPage === "PurchaseGraph" ? "bg-base-dark-bg-1 rounded-s-md" : ""}`}>
                <div className={`p-2
                    ${appPage === "PurchaseGraph" ? "bg-icon-color-primary rounded-lg" : ""}
                    `} onClick={() => setAppPage("PurchaseGraph")}>
                    <PurchaseGraphIcon color={`${appPage === "PurchaseGraph" ? "white" : '#EA7C69'}`}/>
                </div>
            </div>
            <div className={`p-3 ${appPage === "Setting" ? "bg-base-dark-bg-1 rounded-s-md" : ""}
            `}>
                <div className={`p-2 ${appPage === "Setting" ? "bg-icon-color-primary rounded-lg" : ""}
                `}
                onClick={() => setAppPage("Setting")}
                >
                <SettingIcon color={`${appPage === "Setting" ? "white" : '#EA7C69'}`}/></div>   
                </div>
                <div>
                    <LogoutIcon color="#EA7C69"/>
            </div>
        </div>
    )
}   