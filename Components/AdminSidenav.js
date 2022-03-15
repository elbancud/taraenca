import { useState } from 'react';


import taraenca from '../pages/Assets/taraenca.png'


//util
import Image from 'next/image';

function AdminSidenav({ selectedTab }) {
  const [isBurgerOpen, setBurgerOpen] = useState(false)
    
  return (
    <div className='w-full overflow-hidden'>
         <div className='relative hidden h-screen overflow-hidden md:block bg-[#f3f4f6]'>
            <div className="relative h-screen px-4 py-10 w-72 md:flex md:flex-col ">
                <div className="flex justify-center w-full cursor-pointer ">
                    <Image src={taraenca} alt="logo" />
                </div>
                
                <div className="">
                    <div className='flex items-center px-1 my-7'>
                                <div class="relative inline-block">
                                    <img class="inline-block object-cover w-12 h-12 rounded-full" src="https://i.pinimg.com/736x/d5/7c/eb/d57ceb9546385b8d5c224c34502ddcf6.jpg" alt="Profile image"/>
                                    <span class="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full"></span>
                                </div>
                                <div className='mx-5'>
                                    <h2 className='font-semibold'>Admin Taraenca</h2>
                                    <p className='-my-1 text-sm'>admin@taraenca</p>
                                </div>
                        
                    </div>
                    <ul className="text-[gray]">
                         
                          <li className='my-3'>
                              <div className='my-5 '>
                              
                                <input
                                    name="Search"
                                    autoComplete="email"
                                    required
                                    className="relative block w-full px-3 py-2 text-sm text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                    placeholder="Search"
                                />
                                </div>
                          </li>

                          <li className="rounded mb-1 flex items-center py-1 px-1  cursor-pointer hover:bg-[#dfdfdf]" onClick={() => { selectedTab("adminHome") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <div className='mx-4 font-semibold'>
                                Dashboard
                            </div>
                          </li>

                          <li className="rounded mb-1 flex items-center py-1  px-1 cursor-pointer hover:bg-[#dfdfdf]" onClick={() => { selectedTab("order") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <div className='mx-4 font-semibold'>
                                Items
                            </div>
                          </li>
                          
                          <li className="rounded mb-1 flex items-center py-1 px-1  cursor-pointer hover:bg-[#dfdfdf]" onClick={() => { selectedTab("order") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                            </svg>
                            <div className='mx-4 font-semibold'>
                                Accounts
                            </div>
                          </li>
                        
                    </ul>
                </div>
                
           
                
            </div>
          
        </div>
    </div>
  )
}

export default AdminSidenav