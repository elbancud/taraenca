import React, {useState, useEffect, Fragment} from 'react'
import { push, ref, onValue, update as db_update, remove, getDatabase } from "firebase/database";
import { db } from './Firebase/firebase'
import { v4 as uuidv4 } from 'uuid';
import { Dialog, Transition } from '@headlessui/react'

function AdminSeatPlan() {
{/* variables function ==========================================================  */}

    const seatRow = ['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

    const [seatColumn, setSeatColumn] = useState([])
    const [seatArray, setSeatArray] = useState();
    const [groupNumber, setGroupNumber] = useState(0);
    const [columnNumber, setColumnNumber] = useState(0);
    const [rowNumber, setRowNumber] = useState(0);
    const [update, setUpdate] = useState(false);

    const [deleteModal, setDeleteModal] = useState(false)
    const [currentData, setCurrentData] = useState()
    const [loading, setLoading] = useState(false);

{/* seat Add function ==========================================================  */}

    function registerSeatAdd(getter, setter, variable) {
        setter(getter + 1);
        if (variable === "columnNumber") {
            seatColumn.push({ reserved: false });
        }
        setUpdate(!update)
    }
{/* registerSeatMinus function ==========================================================  */}

    function registerSeatMinus(getter, setter) {
        setUpdate(!update)
        if(getter > 0) {
                setter(getter - 1)
        }
        if (getter === rowNumber) {
            seatColumn.pop()
        }
        setUpdate(!update)

    }
    const saveServiceRequirement = (event) => {
       
            let group = parseInt(groupNumber -1, 10);
            while (group >= 0) {
                
                const pushedData = push(ref(db, "seat-arrangement"), )
                let rowNumberCounter = parseInt(rowNumber - 1, 10)

                while (rowNumberCounter >= 0) {
                    push(ref(db, "seat-arrangement/" + pushedData.key),
                        seatColumn
                    )
                 
                    rowNumberCounter--
                }
                    group--
                }
        setSeatColumn([])
        
        setUpdate(!update)
        setGroupNumber(0)
        setColumnNumber(0)
        setRowNumber(0)
    }
{/* Use Effect function ==========================================================  */}

    function deleteGroup() {
        setLoading(true)
        remove(ref(db, "seat-arrangement/" + currentData)).then(() => {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        })
      
        setUpdate(!update)
        setDeleteModal(false)
        
        
    }


{/* openDeleteModal function ==========================================================  */}

    const openDeleteModal = (data) => {
    setCurrentData(data)
  }

{/* Use Effect function ==========================================================  */}

    useEffect(() => {
        const db = getDatabase()
        const dbGrp = ref(db, "seat-arrangement")
        
        onValue(dbGrp, (snapshot) => {
            const snap = snapshot.val();
            const seatArray = [];

            for (let id in snap) {
                seatArray.push({id, ...snap[id]})
            }

            setSeatArray(seatArray);

        })
    
    }, [update])
  return (
      <div>
          <div className={!loading? "hidden":""}>
                <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full backdrop-blur-sm backdrop-brightness-10'>
                        <iframe className="" src="https://giphy.com/embed/cjhBClBwZAHs3TEzDH" width="280" height="260" frameBorder="0" className="giphy-embed" ><p><a href="https://giphy.com/gifs/playstation-wait-question-johnny-cage-cjhBClBwZAHs3TEzDH">Regestering your item...</a></p></iframe>
                </div>
            </div>
          <header className='w-full px-8 py-6 border-t border-b border-b-slate-200'>
                <div className='flex justify-between '>
                        <div>
                            <h2 className='text-xl font-semibold '>Register seat Plan</h2>
                        </div>
                        <div className=''>
                                <button
                                      onClick={saveServiceRequirement}
                                    type="submit"
                                    className="relative px-4 py-2 text-sm font-medium text-white bg-[#7a5041] border border-transparent rounded-md group hover:bg-[#5a3e34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#50382F]"
                                >
                                    
                                   + Save seat plan
                                </button>

                        </div>

                </div>
        </header>
        <section>
            
           <div className='w-full bg-[#e5f6fd] mt-2 flex p-3  text-[#663C00] items-center text-sm'>
                <div className='mr-3'> 
                   
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="teal" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div>
                    Press plus sign to increase groups, columns, and rows
                </div>
            </div>

          </section>
          <main className='flex justify-between max-w-lg px-8 py-6 text-[gray]'>
{/* Group div ==============================================================================================================================================================================  */}

                        <div className='mb-5 '>
                            <div className="mb-3 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 w-9 h-9 " fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                                </svg>
                                <h5 className="ml-1"><b>Groups</b></h5>

                            </div>
                            <div className="flex ">
                                <div >
                                        <button onClick={() => { registerSeatMinus(groupNumber, setGroupNumber) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                </div>
                                <div className='px-2'>
                                    {groupNumber}
                                </div>
                                <div >
                                        <button onClick={() => { registerSeatAdd(groupNumber, setGroupNumber, "groupNumber") }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                </div>
                            </div>

                         </div>
{/* column div ==============================================================================================================================================================================  */}
                         
                        <div className='mr-5'>
                            <div className="mb-3 ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="ml-3 w-9 h-9" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
                                </svg>  
                                <h5 className="ml-1"><b>Columns</b></h5>

                            </div>
                            <div className="flex mr-5">
                                <div >
                                        <button onClick={() => { registerSeatMinus(columnNumber, setColumnNumber) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                </div>
                                <div className='px-2'>
                                    {columnNumber}
                                </div>
                                <div >
                                        <button onClick={() => { registerSeatAdd(columnNumber, setColumnNumber, "columnNumber") }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                </div>
                            </div>

                         </div>
{/* Rows div ==============================================================================================================================================================================  */}
                         
                         <div className='mr-5'>
                            <div className="mb-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="gray" strokeWidth={1}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                                <h5 className="ml-1"><b>Rows</b></h5>

                            </div>
                            <div className="flex mr-5">
                                <div >
                                        <button onClick={() => { registerSeatMinus(rowNumber, setRowNumber) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                </div>
                                <div className='px-2'>
                                    {rowNumber}
                                </div>
                                <div >
                                        <button onClick={() => { registerSeatAdd(rowNumber, setRowNumber, "rowNumber") }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </button>

                                </div>
                            </div>

                         </div>
                        
          </main>
          <section className='p-8'>
            <div >
                    
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
                                    <div className="flex justify-center">
                                        <div className="">
                                                <button onClick={() => { openDeleteModal(data.id); setDeleteModal(true)}}>
                                                             <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                            </svg>
                                                </button>
                                        </div>
                                    </div>
                                </div>
                                
                            )

                            }) : "No registered rows, groups , and columns yet "}
                        </div>
                    </div>
                  
          </section>
          {/* Modal ============================================================================================ */}

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
                            Delete this group?
                          </Dialog.Title>
                          
                          <div className="px-6 mt-2 ">
                            <p className="text-sm text-gray-500">
                                Be mindful that upon confirmation the group will be permanently removed and no where could be retrieved.
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
                              onClick={deleteGroup}
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

export default AdminSeatPlan