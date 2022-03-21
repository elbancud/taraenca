import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import { db } from './Firebase/firebase'

import { push, ref, onValue, update as db_update, remove, getDatabase } from "firebase/database";



function Order() {

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
      <div className='h-screen '>
        <div className='flex'>
                {
                    itemsArray ? itemsArray.map(data => {
                        return (
                            <div className='relative max-w-md overflow-hidden bg-[green] m-2'>
                        
                                <Image  width={"450"} height = {"400"} src={Object.values(data)[1].url} alt="logo" />

                            </div>
                        )
                            
                        }) : ""
                }
            
        </div>
    
      
      </div>
  )
}

export default Order