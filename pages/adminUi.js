import { useState } from 'react';



import { Sling as Hamburger } from 'hamburger-react';

//util
import Image from 'next/image';

//components
import AdminSidenav from '../Components/AdminSidenav';

//image
import taraenca from '../pages/Assets/taraenca.png'
import AdminHome from '../Components/AdminHome';

function adminUi() {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  const [tabSelectedfromChild, setTabSelectedFromChild] = useState();

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
          
        </div>
        
      </div>
  )
}

export default adminUi