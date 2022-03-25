import React, {useState, useEffect} from 'react'
import { useRouter } from "next/router"

import { db } from '../../Components/Firebase/firebase'; 

import { push, ref, onValue, update as db_update, remove, getDatabase } from "firebase/database";

function FoodSpecific() {
    
    const router = useRouter();
    const {id} = router.query
    
    const [update, setUpdate] = useState(false);
    
    const [itemsArray, setItemsArray] = useState();
    const [quantity, setQuantity] = useState(0)
    const [size, setSize] = useState("")

    const bgColorOn = "px-4 py-2 mt-3 text-base font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 hover:text-[black] bg-orange-700 text-[white]"
    const bgColorOff = "px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:text-[white]"

//  add to caart ================================================================================================

    function handleAddToCart(mealKey) {
        alert(JSON.parse(localStorage.getItem("currentUser")))
    }


//  fetch ================================================================================================
    
    useEffect(() => {
    
        const db = getDatabase();
        const dbRef = ref(db, "items/"+id)
        
        onValue(dbRef, (snapshot) => {
            
            const snap = snapshot.val()
            const itemsArray = []

            itemsArray.push(snap)            
            setItemsArray(itemsArray);
          
        })
    }, [])

//  minus ================================================================================================
    
    function registerSeatMinus(getter, setter) {
        if(getter > 0) {
                setter(getter - 1)
        }
  
    }

//  add ================================================================================================

    function registerSeatAdd(getter, setter) {
        setter(getter + 1);
    
    }
  return (
    <div>
        <div className='w-full h-screen px-10 pt-20'>
                    {
                        itemsArray ? Object.values(itemsArray).map((data, element) => {
                        
                            return (
                                    <div className='flex flex-wrap items-center justify-center'>
                                            
                                            <div >
                                                <h1 className='mb-2 font-semibold text-md'>{data.itemType} / {data.mealCourse}</h1>
                                                <h1 className='max-w-md mb-2 text-5xl font-bold sm:max-w-xl'>{data.itemName}</h1>
                                                <div className='flex items-center'>
                                                        <h1 className='text-xl text-[#942640] font-semibold '>₱{data.itemPrice}</h1>
                                                        <div className='mx-4'>
                                                            |
                                                        </div>
                                                        <div className='flex items-center'>
                                                            <h1 className='mr-2 font-bold'>5.0</h1>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                            </svg>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                                            </svg>

                                                        </div>
                                                </div>
                                                
                                                <div className='max-w-md py-5 sm:max-w-lg'>
                                                        <h1 className='mb-2 font-semibold text-md'>Description</h1>
                                                        <h1 className='mb-2 text-sm text-gray-500'>{data.itemDescription}</h1>
                                                    
                                                </div>
                                                <div className='max-w-md'>
                                                        <div className='flex ' >
                                                            <div className='' >
                                                                <div>
                                                                        <h1 className='font-semibold text-md'>Size</h1>
                                                                </div>
                                                                <div className='flex'>
                                                                    <button onClick={()=>{setSize("S")}} className={size === "S" ? bgColorOn : bgColorOff} >S</button>
                                                                    <button onClick={()=>{setSize("M")}} className={size === "M" ? bgColorOn + " mx-3" : bgColorOff + " mx-3"} >M</button>
                                                                    <button onClick={()=>{setSize("L")}} className={size === "L" ? bgColorOn : bgColorOff} >L</button>
                                                                    
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                            <div className='ml-20'>
                                                                <div>
                                                                        <h1 className='font-semibold text-md'>Quantity</h1>
                                                                </div>
                                                                <div className='flex items-center'>
                                                                    <button onClick={() => { registerSeatMinus(quantity, setQuantity) }} className='px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:bg-gray-900 focus:text-[white]'>-</button>
                                                                    <div className='mx-3 mt-4'>
                                                                            {quantity}
                                                                        
                                                                    </div>
                                                                    <button onClick={() => { registerSeatAdd(quantity, setQuantity) }} className='px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:bg-gray-900 focus:text-[white]'>+</button>
                                                                    
                                                                </div>
                                                                
                                                            </div>

                                                        </div>
                                                    <div className='py-5'>
                                                            <button onClick={handleAddToCart} className='w-full px-4 py-2 mt-3 text-base font-medium text-gray-50 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-900 bg-gray-800 focus:text-[white]'>Add to cart</button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='max-w-2xl px-5 pt-10'>
                                                <img  className="" src={Object.values(data)[0].url} alt="logo" />
                                            </div>
                                </div>
                                
                                )
                            
                                
                            }) : ""
                    }
                
    
      
      </div>
    </div>

  )
    

}


export default FoodSpecific