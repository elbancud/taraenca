import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import { db } from './Firebase/firebase'
import { Dialog, Transition } from '@headlessui/react'

import { push, ref, onValue, update as db_update, remove, getDatabase } from "firebase/database";
import Link from 'next/link';



function Order({selectedTab}) {

// Use effect ========================
const [update, setUpdate] = useState(false);
const [itemsArray, setItemsArray] = useState();
useEffect(() => {
  
      const db = getDatabase();
      const dbRef = ref(db, "items")
      
      onValue(dbRef, (snapshot) => {
        
        const snap = snapshot.val()
        const itemsArray = []

        for (let id in snap) {
          itemsArray.push({id, ...snap[id]})
        }

        setItemsArray(itemsArray);

      })
    }, [update])

  return (
    <div className='w-full h-screen pt-10'>
      <div className='px-7'>
          <h1 className='mb-2 ml-16 text-3xl font-bold'>Noodles</h1>
                                                        
      </div>
      <div className='flex flex-wrap justify-center py-5'>
                
                {
                    itemsArray ? itemsArray.map((data, element) => {
                          if(data.itemType === "Noodles") {
                            return (
                                    <div>
                                      
                                      <Link href={"order/"+data.key} key={data.key}>
                                        
                                        <div  className='cursor-pointer hover:shadow-2xl mb-5 sm:mr-5 relative w-96 pt-12  overflow-hidden text-center h-96 bg-[#fafafa]'>
                                                      <div className='px-7'>
                                                        <h1 className='mb-2 text-2xl font-bold'>{data.itemName}</h1>
                                                        
                                                      </div>
                                                      <h1 className='mb-2 text-xl font-semibold'>{data.itemType} / {data.mealCourse}</h1>
                                                      <h1 className='mb-2 text-xl text-[#af4242]'>???{data.itemPrice}</h1>
                                                      
                                                      <img  className="absolute " src={Object.values(data)[1].url} alt="logo" />
                                          </div>
                                      </Link> 
                                </div>
                              )
                          }
                            
                        }) : ""
                }
            
        </div>
        <div className='px-7'>
          <h1 className='mb-2 ml-16 text-3xl font-bold'>Beverages</h1>
                                                        
      </div>
      <div className='flex flex-wrap justify-center py-5'>
                
                {
                    itemsArray ? itemsArray.map((data, element) => {
                          if(data.itemType === "Beverage") {
                            return (
                                    <div>
                                      
                                      <Link href={"order/"+data.key} key={data.key}>
                                        
                                        <div  className='cursor-pointer hover:shadow-2xl mb-5 sm:mr-5 relative w-96 pt-12  overflow-hidden text-center h-96 bg-[#fafafa]'>
                                                      <div className='px-7'>
                                                        <h1 className='mb-2 text-2xl font-bold'>{data.itemName}</h1>
                                                        
                                                      </div>
                                                      <h1 className='mb-2 text-xl font-semibold'>{data.itemType} / {data.mealCourse}</h1>
                                                      <h1 className='mb-2 text-xl text-[#af4242]'>???{data.itemPrice}</h1>
                                                      
                                                      <img  className="absolute w-4/5 -right-16 top-28" src={Object.values(data)[1].url} alt="logo" />
                                          </div>
                                      </Link> 
                                </div>
                              )
                          }
                            
                        }) : ""
                }
            
        </div>
      <div className='px-7'>
          <h1 className='mb-2 ml-16 text-3xl font-bold'>Desserts</h1>
                                                        
      </div>
      <div className='flex flex-wrap justify-center py-5'>
                
                {
                    itemsArray ? itemsArray.map((data, element) => {
                          if(data.itemType === "Dessert") {
                            return (
                                    <div>
                                      
                                      <Link href={"order/"+data.key} key={data.key}>
                                        
                                        <div  className='cursor-pointer hover:shadow-2xl mb-5 sm:mr-5 relative w-96 pt-12  overflow-hidden text-center h-96 bg-[#fafafa]'>
                                                      <div className='px-7'>
                                                        <h1 className='mb-2 text-2xl font-bold'>{data.itemName}</h1>
                                                        
                                                      </div>
                                                      <h1 className='mb-2 text-xl font-semibold'>{data.itemType} / {data.mealCourse}</h1>
                                                      <h1 className='mb-2 text-xl text-[#af4242]'>???{data.itemPrice}</h1>
                                                      
                                                      <img  className="absolute " src={Object.values(data)[1].url} alt="logo" />
                                          </div>
                                      </Link> 
                                </div>
                              )
                          }
                            
                        }) : ""
                }
            
        </div>
      </div>
  )
}

export default Order