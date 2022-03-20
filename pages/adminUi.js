import { useState } from 'react';
//icons
import { Sling as Hamburger } from 'hamburger-react';
//util
import Image from 'next/image';
//image
//components
import AdminSidenav from '../Components/AdminSidenav';
import AdminHome from '../Components/AdminHome';
import AdminItems from '../Components/AdminItems';
import AdminAccounts from '../Components/AdminAccounts';
import taraenca from '../pages/Assets/taraenca.png'
import AdminOrders from '../Components/AdminOrders';

function adminUi() {
  
  //variables
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  const [tabSelectedfromChild, setTabSelectedFromChild] = useState("adminHome");

  return (
    <div className=" md:flex">
        

        <div>
          <AdminSidenav selectedTab={(tabName)=>{setTabSelectedFromChild(tabName)}}/>
        </div>
        
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
          <div className="cursor-pointer">
            <Image src={taraenca} alt="logo" />
          </div>
          
          <div className="cursor-pointer hover:bg-[#ebebeb] rounded-md">
            <Hamburger  toggled={isBurgerOpen} toggle={setBurgerOpen} size={19} color="#50382F" rounded/>
          </div>
        </div>
        
        <div className='w-full overflow-hidden'>
            <div className={tabSelectedfromChild === "adminHome" ? "block " : "hidden" }>
              <AdminHome/>
            </div>
            <div className={tabSelectedfromChild === "adminItems" ? "block " : "hidden" }>
              <AdminItems/>
            </div>
            <div className={tabSelectedfromChild === "adminAccounts" ? "block " : "hidden" }>
              <AdminAccounts/>
            </div>
            <div className={tabSelectedfromChild === "adminOrders" ? "block " : "hidden" }>
              <AdminOrders/>
            </div>
        </div>
        
      </div>
  )
}

export default adminUi