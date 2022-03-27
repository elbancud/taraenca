import React, { useEffect, useState } from 'react'
import Image from "next/image"
import taraenca from '../pages/Assets/taraenca.png'
import { useRouter } from "next/router";

function HeaderCart() {
  const router = useRouter();
  
  return (
    <div>
        <header className='relative w-full p-3 border-b border-b-slate-200'>
                <div className='flex items-center justify-between max-w-6xl m-auto'>
                    <div className='flex items-center cursor-pointer' onClick={() => { router.push("/") }} >
                        <div className={router.pathname === "/" ? "hidden" : "block"}>
                          <Image width={50} height={30} src={taraenca} />
                          
                        </div>
                    </div>
                    <div onClick={()=> {router.push("/Cart")}}>
                        <span className="relative inline-block cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="text-gray-700 w-7 h-7" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z" clipRule="evenodd" />
                            </svg>
                            {/* <svg className="w-6 h-6 text-gray-700 fill-current" viewBox="0 0 20 20"><path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" fill-rule="evenodd"></path></svg> */}
                            <span className="absolute right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full top-1">0</span>
                        </span>
                    </div>
                </div>

            </header>

    </div>
  )
}

export default HeaderCart