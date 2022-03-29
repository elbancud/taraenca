import React, { useEffect, useState } from 'react'
import Image from "next/image"
import taraenca from '../pages/Assets/taraenca.png'
import { useRouter } from "next/router";
import { db } from '../Components/Firebase/firebase';
import { push, ref, onValue, update as db_update, remove, getDatabase, update } from "firebase/database";

function HeaderCart() {
  const router = useRouter();
  
  const [cartCount, setCartCount] = useState(0);
  
  useEffect(() => {
      const dbRefNew = ref(db, "userAccounts/" + localStorage.getItem("accountKey") +"/cart");
          
          onValue(dbRefNew, (snapshot) => {
              const snapArray = []
              const snap = snapshot.val()
              for(let id in snap) {
                snapArray.push({id, ...snap[id]})
                
              }
              
              setCartCount(snapArray.length)
          })
  },[])
  return (
    <div>
        <header className='relative w-full p-3 border-b border-b-slate-100'>
                <div className='flex items-center justify-between max-w-6xl m-auto'>
                    <div className='flex items-center cursor-pointer' onClick={() => { router.push("/") }} >
                        <div className={router.pathname === "/" ? "hidden" : "block"}>
                          <Image width={50} height={30} src={taraenca} />
                          
                        </div>
                    </div>
                    <div onClick={()=> {router.push("/Cart")}} className="flex items-center px-5 py-3 rounded-full cursor-pointer hover:bg-gray-200">
                        <h1 className='mr-2 text-lg font-semibold'>My Cart</h1>
                        <span className="relative inline-block cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {/* <svg className="w-6 h-6 text-gray-700 fill-current" viewBox="0 0 20 20"><path d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clip-rule="evenodd" fill-rule="evenodd"></path></svg> */}
                            <span className="absolute right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full top-1">{cartCount}</span>
                        </span>
                    </div>
                </div>

            </header>

    </div>
  )
}

export default HeaderCart