import React, {useState, useEffect} from 'react'
import { db } from './Firebase/firebase'
import { push, ref, onValue, update as db_update, remove, getDatabase } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';

function AdminHome() {

const [update, setUpdate] = useState(false);
const [itemsArray, setItemsArray] = useState();
const [seatArray, setSeatArray] = useState();
const seatRow = ['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    
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
        const dbGrp = ref(db, "seat-arrangement")
        
        onValue(dbGrp, (snapshot) => {
            const snap = snapshot.val();
            const seatArray = [];

            for (let id in snap) {
                seatArray.push({id, ...snap[id]})
            }

            setSeatArray(seatArray);

        })
        
      })
    }, [update])

  return (
    <div className='h-full border-l border-b-slate-100'>
        <header className='px-8 py-6 border-t border-b border-b-slate-200'>
            <h2 className='text-xl font-semibold '>Dashboard</h2>
        </header>
        
        <section className='px-8 py-6 border-b border-b-slate-200'>
            <div className='mb-2'>
                <p className='text-sm font-semibold uppercase'>Seat Plan </p>
            </div>
            <div  className='inline-block mb-2 mr-2 '>
                <div className="flex flex-wrap justify-start">
                        {seatArray ? seatArray.map((data, parentIndex) => {
                             const id = uuidv4();

                            return(
                                <div className="m-1 max-w-fit" key={data.id}>
                                    <div className="flex justify-center">
                                         <div className="">
                                            <h5 className="primary-color-text-custom ">Group {parentIndex + 1}</h5>
                                        </div>
                                    </div>
                                    {
                                            Object.values(data).map((key, indexLvl1) => {
                                            
                                                const id1 = uuidv4();
                                                
                                                if (typeof (key) === "object") {
                                                    
                                                    return (
                                                        
                                                        <div className="flex items-center" key={id1}>
                                                             
                                                            <h6>{seatRow[indexLvl1 - 1]}</h6>
                                                            {Object.values(key).map((child, index) => {

                                                                    const id2 = uuidv4();

                                                                    if (child.reserved === true) {
                                                                         return (
                                                                             <div className="p-2 rounded-md" key={id2}>
                                                                                    
                                                                                    <span>
                                                                                        {/* <Tooltip title="Click for action"> */}
                                                                                                    <button variant="contained"  className='relative px-4 py-2 text-sm font-medium text-white bg-[gray] border border-transparent rounded-md group hover:bg-[#5a3e34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#50382F]' disableElevation>
                                                                                                        {index + 1}
                                                                                                    </button>
                                                                                            
                                                                                        {/* </Tooltip> */}
                                                                                    </span>
                                                                                </div> 
                                                                        )
                                                                    } else {
                                                                            const id3 = uuidv4();
                                                                        
                                                                            return (
                                                                                <div className="p-2 rounded-md" key = {id3}>
                                                                                    {/* <Tooltip title="Click for action"> */}
                                                                                                <button variant="contained"  className='relative px-4 py-2 text-sm font-medium text-white bg-[green] border border-transparent rounded-md group hover:bg-[#5a3e34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#50382F]' disableElevation>

                                                                                                    {index + 1}
                                                                                                </button>
                                                                                    {/* </Tooltip> */}
                                                                                </div> 
                                                                            )
                                                                    }
                                                                    
                                                                
                                                                })
                                                            }

                                                        </div>
                                                    )
                                                } 
                                                
                                        })
                                    }
                                 
                                </div>
                                
                            )

                            }) : "No registered rows, groups , and columns yet "}
                        </div>
            </div>
            
        </section>
<section>
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full ">
                        <thead className="bg-gray-100 border-b border-b-slate-200 bg-[#f0f0f0]">
                            <tr className='text-left'>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Product Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Item Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Meal course
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Images
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Order
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Price
                                </th>
                          
                            </tr>
                        </thead >
                        <tbody className='text-left'>
                            {
                              itemsArray ? itemsArray.map(data => {
                                    return(
                                      <tr className="bg-white border-b " key={data.id}>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              {data.itemName}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              {data.key}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                             { data.itemType}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                             { data.mealCourse}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              image
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              {data.itemDescription}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              Orders
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              {data.itemPrice}
                                          </td>
                                     
                                      </tr>)
                                
                              }) : ""
                            }
                        
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>                                 
      </section>
      
    </div>
  )
}

export default AdminHome