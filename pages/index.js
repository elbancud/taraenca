import { useState } from 'react';

//addons
import { Sling as Hamburger } from 'hamburger-react';
//utilities
import Head from 'next/head';
import Image from 'next/image';
//images
import Taraenca from './Assets/taraenca.png';
//components
import SideNav from '../Components/SideNav'
import AboutUs from '../Components/AboutUs';
import AdminLogin from '../Components/AdminLogin';
import ResetPassword from '../Components/ResetPassword';

export default function Home() {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
  const [tabSelectedfromChild, setTabSelectedFromChild] = useState("admin");
  
  return (
    <>
      <Head>
          <title>Taraenca</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      </Head>
        
      <div className=" md:flex">
        

        <div>
          <SideNav selectedTab={(tabName)=>{setTabSelectedFromChild(tabName)}}/>
        </div>
        
        <div className="flex items-center justify-between px-4 py-4 md:hidden">
          <div className="cursor-pointer">
            <Image src={Taraenca} alt="logo" />
          </div>
          
          <div className="cursor-pointer hover:bg-[#ebebeb] rounded-md">
            <Hamburger  toggled={isBurgerOpen} toggle={setBurgerOpen} size={19} color="#50382F" rounded/>
          </div>
        </div>
        
        <div className='container w-full max-w-4xl px-4 m-auto'>
            <div className={tabSelectedfromChild === "about" ? "block " : "hidden" }>
              <AboutUs/>
            </div>
            <div className={tabSelectedfromChild === "admin" ? "block " : "hidden" }>
              <AdminLogin setForgotPassword={(tabName)=>{setTabSelectedFromChild(tabName)}}/>
            </div>
            <div className={tabSelectedfromChild === "resetPass" ? "block " : "hidden" }>
              <ResetPassword/>
            </div>
        </div>
        
      </div>
    </>
    
  )
}