import React, { useState} from 'react'

//db input
import { db } from './Firebase/firebase'
import { push, ref, onValue, update, remove, getDatabase } from "firebase/database";


function AdminItems() {

  //variables
  const [itemName, setItemName] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemType, setItemType] = useState("")
  const [mealCourse, setMealCourse] = useState("")
  const [uploadedFileNames, setUploadedFileNames] = useState([]);

{/* ======================================== submit ==================================================== */}
  
  //function for submit items
  const  submitItems = async (event) => {
    
    //mo refresh
    event.preventDefault();

    //format = push (reference(db, "name of the field"))
    const dataSubmit = push(ref(db, "items"), {
        itemName,
        itemDescription,
        itemType,
        mealCourse,
        
        
    }).then(() => {
      
      setItemName("")
      setItemDescription("")

      alert("item successfully registered")
    })
  }
{/* ======================================== Upload function ==================================================== */}

  function readUpload(event) {

          const file = event.target.files[0] ? event.target.files[0] : ""
          if (event.target.files[0]) {
              setUploadedFileNames(uploadedFileNames => [...uploadedFileNames, file]);
          }

  }
    
{/* ======================================== Remove Item==================================================== */}
    
  function removeItem(row) {
        const list = uploadedFileNames.filter((items, index) => index !== row)
        setUploadedFileNames(list)
    }
  return (
    
   <div>

      
      <header className='w-full px-8 py-6 border-t border-b border-b-slate-200'>
            <div>
              <h2 className='text-xl font-semibold '>Item Registration</h2>
            </div>
      </header>


      <section className='w-full px-8 py-6' >

  {/* ======================================== Start info ==================================================== */}

                        <div className="max-w-6xl">
                          <div className="">
                          
                              <div className="mt-5 md:mt-0 md:col-span-2">
                                  <form action="#" method="POST" onSubmit={submitItems} >
                                      <div className="w-full overflow-hidden sm:rounded-md">
                                          
                                          <div className="px-5 py-5 bg-white sm:p-6">
                                            
                                          
                                            <div className="grid grid-cols-6 gap-6">
                                             <div className="col-span-6">
                                                  <div className=" sm:px-0">
                                                    <h3 className="font-medium leading-6 text-gray-900 ">Fill out the item's information</h3>
                                                  </div>
                                              </div>
                                              <div className='col-span-6 w-full bg-[#fff4e5]  flex p-3  text-[#663C00] items-center text-sm'>
                                              <div className='mr-3'> 
                                                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="#ffa117" strokeWidth={2}>
                                                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                              </div>
                                              <div>
                                                Complete every fields plzz ty 
                                              </div>
                                            </div>
 {/* Item name ==========================================================  */}
                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Item Name
                                                    </label>
                                                    <input
                                                        value={itemName}
                                                        onChange={(event) => { setItemName(event.target.value) }}
                                                        type="text"
                                                        name="itemName"
                                                        id="item-name"
                                                        required
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
                                                </div>
  {/* Item category ============================================================================================ */}
                                                
                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Item Category
                                                    </label>
                                                    <div class="flex justify-center">
                                                      <div class=" w-full">
                                                        <select required value={itemType} onChange={(event) => {setItemType(event.target.value)}} className="w-full px-4 py-1 m-0 mt-2 font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded appearance-none form-select form-select-lg bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-orange-900 focus:outline-none" aria-label=".form-select-lg example">
                                                            <option selected>Open item type</option>
                                                            <option value="1">Beverage</option>
                                                            <option value="2">Noodles</option>
                                                            <option value="4">Steak</option>
                                                            
                                                        </select>
                                                    </div>
                                                  </div>
                                                </div>
  {/* Meal Course ============================================================================================ */}
                                                
                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Meal Course Category
                                                    </label>
                                                    <div class="flex justify-center">
                                                      <div class=" w-full">
                                                        <select value = {mealCourse} onChange={(event) => {setMealCourse(event.target.value)}} required className="w-full px-4 py-1 m-0 mt-2 font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded appearance-none form-select form-select-lg bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-orange-900 focus:outline-none" aria-label=".form-select-lg example">
                                                            <option selected>Open course meals category</option>
                                                            <option value="1">Appetizer</option>
                                                            <option value="2">Main course</option>
                                                            <option value="3">Salad</option>
                                                            
                                                            
                                                        </select>
                                                    </div>
                                                  </div>
                                                </div>
                                                
  {/* Input Description ============================================================================================ */}

                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Description
                                                    </label>
                                                    <textarea
                                                        required
                                                        type="text"
                                                        value={itemDescription}
                                                        onChange={(event) => { setItemDescription(event.target.value) }}
                                                        name="itemDescription"
                                                        id="item-description"
                                                        autoComplete="item-description"
                                                        className="relative block w-full h-32 px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
                                                </div>
 
                                                
 
  {/* Input Image  ============================================================================================ */}
                                                <div className="col-span-6">
                                                        <div className="">
                                                            <div className="bg-white ">
                                                              <div>
                                                                <label className="block text-sm font-medium text-gray-700">Item photo</label>
                                                                <div className="flex justify-center px-6 pt-5 pb-6 mt-1 border-2 border-gray-300 border-dashed rounded-md">
                                                                  
                                                                  <div className="space-y-1 text-center">
                                                                    <svg
                                                                      className="w-12 h-12 mx-auto text-gray-400"
                                                                      stroke="currentColor"
                                                                      fill="none"
                                                                      viewBox="0 0 48 48"
                                                                      aria-hidden="true"
                                                                    >
                                                                      <path
                                                                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                                        strokeWidth={2}
                                                                        strokeLinecap="round"
                                                                        strokeLinejoin="round"
                                                                      />
                                                                    </svg>
                                                                    
                                                                    <div className="flex text-sm text-gray-600">
                                                                      <label
                                                                        htmlFor="file-upload"
                                                                        className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                                      >
                                                                        <span>Upload a file</span>
                                                                        <input required id="file-upload" name="file-upload" type="file" accept="image/*" multiple onChange={readUpload} className="sr-only" />
                                                                      </label>
                                                                      <p className="pl-1">or drag and drop</p>
                                                                    </div>
                                                                    
                                                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                            
  
                                                        </div>
                                                </div>
  {/* Image  ============================================================================================ */}
                                                
                                                <div className="col-span-6">
                                                     <div >
                                                       
                                                        { uploadedFileNames? 
                                                            Object.values(uploadedFileNames).map((data,row) => {
                                                                return (
                                                                    <div className='flex items-center' key ={data.name}>
                                                                        <div className='w-auto mr-4'>
                                                                            <p className='pad-x-sm'>File:  {data.name} / {data.size } kb</p>

                                                                        </div>
                                                                        
                                                                        <div className='rounded-full hover:bg-[#f0f0f0] p-2' onClick={() => { removeItem(row) }}>
                                                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth={1}>
                                                                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                                            </svg>
                                                                      </div>
                                                                    </div>
                                                                )
                                                            })
                                                      
                                                        : ""
                                                        }
                                                        
                                                          
                                                    </div> 
                                                </div>
                                            </div>
                                          </div>
                                         
                                            {/* Button Register Photo  ============================================================================================ */}
                                                            
                                                            <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                                                              <button
                                                                  type="submit"
                                                                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                              >
                                                                  Register
                                                              </button>
                                                          </div>
                                  
                                      </div>
                                      
                                  </form>
                              </div>
                              
                            </div>
                            
                        
          

                        </div>

      </section>
    </div>
  )
}

export default AdminItems