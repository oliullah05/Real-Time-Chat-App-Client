import { CgLogOut } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";



import { useAppDispatch } from "../../../redux/hooks";
import { logOutAndResetApiState } from "../../../redux/features/auth/authSlice";


const Settings = () => {
const dispatch = useAppDispatch()



const handleLogout = ()=>{
dispatch(logOutAndResetApiState())
}

    return (
        <section className="bg-[#FFFFFF]  p-5">

            <div className="h-full flex flex-col justify-between items-center  pb-5">
                <div className=" w-full py-5">
              
                </div>


               <div className="flex flex-col gap-5">
               <CgProfile className="h-7 w-7 hover:text-[#20c996eb]" />
                <IoSettingsOutline className="h-7 w-7 hover:text-[#20c996eb]" />
                <CgLogOut onClick={handleLogout} className="h-7 w-7 hover:text-[#20c996eb]" />
               </div>
            </div>

          

        </section>
    );
};

export default Settings;