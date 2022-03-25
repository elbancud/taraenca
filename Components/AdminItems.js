import React, { useState, useEffect, Fragment} from 'react'

//db input
import { db } from './Firebase/firebase'
import { push, ref, onValue, update as db_update , remove, getDatabase} from "firebase/database";
import { getStorage, ref as ref_storage, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

import { Dialog, Transition } from '@headlessui/react'

import { v4 as uuidv4 } from 'uuid';



function AdminItems() {

  //variables
  const [itemName, setItemName] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [itemType, setItemType] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [mealCourse, setMealCourse] = useState("")
  const [uploadedFileNames, setUploadedFileNames] = useState([]);

  const storage = getStorage();
  
  
  
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false)
  
  const [currentData, setCurrentData] = useState()
  
  
  {/* ======================================== Fetch ==================================================== */}
  
  
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

{/* ======================================== submit ==================================================== */}
  
  //function for submit items
  const  submitItems = async (event) => {
    
    //mo refresh
    event.preventDefault();
    setLoading(true);
    //format = push (reference(db, "name of the field"))
    let id = uuidv4();

    const dataSubmit = push(ref(db, "items"), {
        itemName,
        itemDescription,
        itemType,
        itemPrice,
        mealCourse,
    })
    
    for (let i in uploadedFileNames) {
              let id = uuidv4();

                const storageRef = ref_storage(storage, id);
                                         
                uploadBytes(storageRef, uploadedFileNames[i]).then((snapshot) => {
                                             
                    getDownloadURL(storageRef).then((url) => {
                                                 
                        urlNameStorage(url, dataSubmit.key, id)
                                              
                                                 
                    })
                });
                                        
    }
  }
{/* ======================================== Upload function ==================================================== */}
function urlNameStorage(url, key,id) {
        db_update(ref(db,"items/" + key), {
            key
        })
        const pushedData = push(ref(db, "items/"+key), {
                                        url: url,
                                        imageId: id
                            }).then(()=> {
                                 
                                  setLoading(false);

                                  formReset()
                                  setUpdate(!update);
                                  window.location.reload()
                                  
                            })
                                        
  }
    
{/* ======================================== Upload f unction ==================================================== */}

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
{/* ======================================== Number only==================================================== */}

  
  function handleChangeNumOnly(event, variable) {
        const re = /^[0-9\b]+$/;
        if (event.target.value === '' || re.test(event.target.value)) {
            variable(event.target.value)
        }
  }
  {/* ======================================== Edit btn ==================================================== */}

  
  function editItems(data, id) {

          setCurrentData(id)          
          setItemName(data.itemName)
          setItemDescription(data.itemDescription)
          setItemType(data.itemType)
          setMealCourse(data.mealCourse)
          setItemPrice(data.itemPrice)
          
          setEdit(true);
  }
  {/* ======================================== edit Cancel ==================================================== */}

  const editCancel = () => {
          formReset()
          setEdit(false);
          
  }
  {/* ======================================== form Reset ==================================================== */}

  const formReset = () => {
          setItemName("")
          setItemDescription("")
          setItemType("")
          setMealCourse("")
          setUploadedFileNames([])
          setItemPrice("")
  }

  {/* ======================================== opem delete modal function ==================================================== */}
  const openDeleteModal = (data) => {
    setCurrentData(data)
  }

  {/* ======================================== delete data function ==================================================== */}
  const confirmDelete = () => {
    const db = getDatabase();

    const currentImageId = "" 
    const currentId = currentData.id
    
    setLoading(true)

    Object.values(currentData).map(data => {
      if (typeof (data) === "object") {
        currentImageId = data.imageId
      }
    })
    setDeleteModal(false)

            remove(ref(db, "items/" + currentId)).then(() => {
                    const storage = getStorage();
                    const desertRef = ref_storage(storage, currentImageId);
                    
                    deleteObject(desertRef).then(()=> {
                      setTimeout(() => {
                          setLoading(false)
                      }, 1000)
                      setCurrentData("")
                      setUpdate(!update)
                    })
                })
    

  }
   {/* ======================================== Save changes function ==================================================== */}
  
  const saveChanges = () => {
    setLoading(true)
    db_update(ref(db, "items/" + currentData), {
        itemName,
        itemDescription,
        itemType,
        itemPrice,
        mealCourse,
    }).then(() => {
                    setTimeout(() => {
                          setLoading(false)
                      }, 1000)
      setUpdate(!update)
      formReset()
      setCurrentData("")
      setEdit(false)
    })
  }

  return (
    
   <div className=''>
     
      <div className={!loading? "hidden":""}>
        <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full backdrop-blur-sm backdrop-brightness-10 '>
              <div className=''>
                  <iframe className="" src="https://giphy.com/embed/XBXBWRWbSmM6HnjErP" width="280" height="260" frameBorder="0" class="giphy-embed" ><p><a href="https://giphy.com/gifs/beastieboys-beastie-boys-body-movin-XBXBWRWbSmM6HnjErP">Regestering your item...</a></p></iframe>
                
              </div>
              
        </div>
      </div>
      
      <header className='w-full px-8 py-6 border-t border-b border-b-slate-200 '>
            <div>
              <h2 className='text-xl font-semibold '>Item Registration</h2>
            </div>
      </header>
     

      <section className='w-full px-8 py-6 ' >

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
                                                            <option defaultValue>Open item type</option>
                                                            <option value="Beverage">Beverage</option>
                                                            <option value="Noodles">Noodles</option>
                                                            <option value="Steak">Steak</option>
                                                            
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
                                                        <select required value = {mealCourse} onChange={(event) => {setMealCourse(event.target.value)}} required className="w-full px-4 py-1 m-0 mt-2 font-normal text-gray-700 transition ease-in-out bg-white bg-no-repeat border border-gray-300 border-solid rounded appearance-none form-select form-select-lg bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-orange-900 focus:outline-none" aria-label=".form-select-lg example">
                                                            <option defaultValue>Open course meals category</option>
                                                            <option value="Appetizer">Appetizer</option>
                                                            <option value="Main course">Main course</option>
                                                            <option value="Salad">Salad</option>
                                                            
                                                            
                                                        </select>
                                                    </div>
                                                  </div>
                                                </div>
       {/* Item price ==========================================================  */}
                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Price
                                                    </label>
                                                    <input
                                                        value={itemPrice}
                                                        onChange={(event) => { handleChangeNumOnly(event, setItemPrice) }}
                                                        type="text"
                                                        name="itemName"
                                                        id="item-name"
                                                        required
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
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
                                                            <div className={edit? "hidden": ""}>
                                                                <div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
                                                                    <button
                                                                        type="submit"
                                                                        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                                    >
                                                                        Register
                                                                    </button>
                                                                </div>
                                                              
                                                            </div>
                                                          <div className={edit? "": "hidden"}>
                                                                <div className='flex justify-end px-4 py-3 text-right bg-gray-50 sm:px-6'>
                                                                    <div className="mx-2">
                                                                        <button
                                                                            type='button'
                                                                            className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"

                                                                            onClick={editCancel}
                                                                        >
                                                                            Cancel
                                                                        </button>
                                                                    </div>
                                                                    <div className="">
                                                                        <button
                                                                            type="button"
                                                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                                                                            onClick={saveChanges}
                                                                        >
                                                                            Save changes
                                                                        </button>
                                                                    </div>
                                                                    
                                                                </div>
                                                                
                                                            </div>
                                                          
                                  
                                      </div>
                                      
                                  </form>
                              </div>
                              
                            </div>
                            
                        
          

                        </div>

      </section>

{/* table for actions ============================================================================================ */}

      <section>
          <div className="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                    <table className="min-w-full ">
                        <thead className="bg-gray-100 border-b border-b-slate-200 bg-[#f0f0f0]">
                            <tr className='text-left'>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Product Name
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Item Category
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Meal course
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Images
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Description
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Order
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Price
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead >
                        <tbody className='text-left'>
                            {
                              itemsArray ? itemsArray.map(data => {
                                    return(
                                      <tr class="bg-white border-b " key={data.id}>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                              {data.itemName}
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                              {data.key}
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                             { data.itemType}
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                             { data.mealCourse}
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                              image
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap max-w-xs overflow-hidden">
                                              {data.itemDescription}
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                              Orders
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                              {data.itemPrice}
                                          </td>
                                          <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                            <div className='flex'>
                                                    <div className='cursor-pointer rounded-full hover:bg-[#f0f0f0] p-2' onClick={() => { openDeleteModal(data); setDeleteModal(true) }}>
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 " fill="none" viewBox="0 0 24 24" stroke="red" strokeWidth={1}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                           </svg>
                                                    </div>
                                                    <div className='cursor-pointer rounded-full hover:bg-[#f0f0f0] p-2' onClick={() => { editItems(data, data.id) }}>
                                                          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="blue" strokeWidth={1}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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

export default AdminItems