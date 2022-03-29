import React,{useState, useEffect, Fragment} from 'react'
import { db } from './Firebase/firebase'
import { push, ref, onValue, update as db_update, remove, getDatabase } from "firebase/database";

import { Dialog, Transition } from '@headlessui/react'

function AdminOrders() {
  const [orderArray, setOrderArray] = useState();
  const [loading, setLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  const [currentData, setCurrentData] = useState()
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    onValue((ref(db, "userAccounts")), snapshot => {
      let orderArray = []
      let snap = snapshot.val()
      for (let id in snap) {
        orderArray.push({id, ...snap[id]})
      }
      setOrderArray(orderArray)

    })

  },[update])
  const editCancel = () => {
          formReset()
          setEdit(false);
          
  }
  const openDeleteModal = (data) => {
    setCurrentData(data)
  }
  const confirmDelete = () => {
    const db = getDatabase();
    
    setLoading(true)
    setDeleteModal(false)

            remove(ref(db, "userAccounts/" + currentData)).then(() => {
                    
                      setTimeout(() => {
                          setLoading(false)
                      }, 1500)
                      setCurrentData("")
                      setUpdate(!update)
                })
    

  }
  return (
    <div>
          
        <header className='w-full px-8 py-6 border-t border-b border-b-slate-200'>
                <div>
                <h2 className='text-xl font-semibold '>Orders History</h2>
                </div>
        </header>
        <section>
           <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full ">
                        <thead className="bg-gray-100 border-b border-b-slate-200 bg-[#f0f0f0]">
                            <tr className='text-left'>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    User Name
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Orders
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    pax
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Seat area
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Time
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Total
                                </th>
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    QR Order
                                </th>
                               
                                <th scope="col" className="px-6 py-3 text-sm font-medium text-gray-900">
                                    Actions
                                </th>
                            </tr>
                        </thead >
                        <tbody className='text-left'>
                            {
                              orderArray ? orderArray.map(data => {
                                    return(
                                      <tr className="bg-white border-b " key={data.id}>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              {data.email}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                             2
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                             { data.pax}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                             { data.seat}
                                          </td>
                                          
                                          <td className="max-w-xs px-6 py-3 overflow-hidden text-sm font-light text-gray-900 whitespace-nowrap">
                                              {data.selectedHour}
                                          </td>
                                          
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                              {data.total}
                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                                        <img src={data.qrLink} className="w-20 "></img>

                                          </td>
                                          <td className="px-6 py-3 text-sm font-light text-gray-900 whitespace-nowrap">
                                            <div className='flex'>
                                                    <div className='cursor-pointer rounded-full hover:bg-[#f0f0f0] p-2' onClick={() => { openDeleteModal(data.id); setDeleteModal(true) }}>
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 " fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth={1}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                           </svg>
                                                    </div>
                                                  
                                            </div>   
                                          
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
          <Transition appear show={deleteModal} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={()=>{setDeleteModal(false)}}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-40 backdrop-blur-sm" />
            </Transition.Child>

                  {/* This element is to trick the browser into centering the modal contents. */}
                  <span
                    className="inline-block h-screen align-middle"
                    aria-hidden="true"
                  >
                    &#8203;
                  </span>
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                        <div className="inline-block w-full max-w-lg my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-xl">
                          <Dialog.Title
                            as="h3"
                            className="px-6 pt-6 text-lg font-medium leading-6 text-gray-900"
                          >
                            <div className=''>
                                
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="pink" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>  
                              
                            </div>
                            Delete this Item?
                          </Dialog.Title>
                          
                          <div className="px-6 mt-2 ">
                            <p className="text-sm text-gray-500">
                                Be mindful that upon confirmation the item will be permanently removed and no where could be retrieved.
                            </p>
                          </div>

                          <div className="flex justify-end w-full px-6 py-3 mt-4 bg-gray-50">
                            <div className="mx-2">
                                <button
                                    type='button'
                                    className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={()=> {setDeleteModal(false)}}
                                >
                                    Cancel
                                </button>
                            </div>
                            <button
                              type="button"
                              className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                              onClick={confirmDelete}
                            >
                              Confirm Delete
                            </button>
                          </div>
                          
                        </div>
                  </Transition.Child>
                </div>
        </Dialog>
      </Transition>
    </div>
  )
}

export default AdminOrders