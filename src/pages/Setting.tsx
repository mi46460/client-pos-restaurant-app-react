import { useContext } from "react";
import { AppPageContext, AppPageContextType } from "../Context/appPageContext";
import MenuIcon from '@mui/icons-material/Menu';

export default function Setting () {
    const {appPage, setNavbarState} = useContext(AppPageContext) as AppPageContextType;

    return(
        <div className={`w-full h-full bg-base-dark-bg-1 ${appPage === 'Setting' ? '' : 'hidden'}`}>
            <div className="w-full flex justify-end md:hidden text-white pr-2 pt-2"
            onClick={setNavbarState}
            >
                <MenuIcon />
            </div>
            <div className="w-full p-5">
                <div className="text-white font-barlow font-semibold text-2xl ">
                    Settings
                </div>
                <div className="w-full flex mt-2">
                    <div className="flex-1">
                        first section
                    </div>
                    <div className="flex-1">
                        second section
                    </div>
                </div>
            </div>
        </div>
    )
}