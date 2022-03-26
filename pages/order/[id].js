import React, { useState, useEffect, Fragment } from 'react'
import { useRouter } from "next/router"

import { auth, db, provider } from '../../Components/Firebase/firebase';

import { push, ref, onValue, update as db_update, remove, getDatabase } from "firebase/database";
import { Dialog, Transition } from '@headlessui/react'
import taraenca from '../Assets/taraenca.png'

import Image from 'next/image'


import { signInWithPopup } from 'firebase/auth';

function FoodSpecific() {

    const router = useRouter();
    const { id } = router.query

    const [update, setUpdate] = useState(false);

    const [itemsArray, setItemsArray] = useState();
    const [quantity, setQuantity] = useState(0)
    const [size, setSize] = useState("")
    const [itemPrice, setItemPrice] = useState(0);


    const [modalEnable, setModalEnable] = useState(false)
    const [currentMealKey, setCurrentMealKey] = useState("")
    const [currentImageUrl, setCurrentImageUrl ] = useState("")
    
    const [loading, setLoading] = useState(false);


    const bgColorOn = "px-4 py-2 mt-3 text-base font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 hover:text-[black] bg-orange-700 text-[white]"
    const bgColorOff = "px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:text-[white]"

    //  add to caart ================================================================================================

    function handleAddToCart(mealKey,imageUrl, price) {

        setCurrentMealKey(mealKey)  
        setCurrentImageUrl(imageUrl)
        setItemPrice(price)

        const currentUser = localStorage.getItem("currentUser")

        if (currentUser) {
            setLoading(true)
            const pushMealToCart = push(ref(db, "userAccounts/" + localStorage.getItem("accountKey" ) +"/cart"), {
                quantity,
                size,
                mealKey,
                price,
                imageUrl
            }).then(() => {
                    setTimeout(() => {
                        setLoading(false)
                    }, 1500)
                    router.push("/")
                    
            })
        } else {
           setModalEnable(true)
        }
    }

    //  google auth ================================================================================================
    
    function handleGoogleSignin() {
        try {
            signInWithPopup(auth, provider).then((userDetails) => {
                //email fetch
                const currentUserEmail = userDetails.user.email
                const currentUser = localStorage.setItem("currentUser", currentUserEmail)
                setLoading(true)

                //account push 
                const currentUserDbPush = push(ref(db, "userAccounts"), {
                    email: currentUserEmail,
                 
                    
                })
                    localStorage.setItem("accountKey",currentUserDbPush.key)
                    
                    setTimeout(() => {
                        push(ref(db, "userAccounts/" + localStorage.getItem("accountKey") + "/cart"),{
                                quantity,
                                size,
                                mealKey:currentMealKey,
                                imageUrl: currentImageUrl,
                                price:itemPrice,
                            })
                        setLoading(false)
                    }, 2000)
                    setModalEnable(false)
                    router.push("/")

            }).catch((error) => {
                alert(error)
            })
        } catch(error) {
                alert(error)
        }
    }

    //  fetch ================================================================================================

    useEffect(() => {

        const db = getDatabase();
        const dbRef = ref(db, "items/" + id)

        onValue(dbRef, (snapshot) => {

            const snap = snapshot.val()
            const itemsArray = []

            itemsArray.push(snap)
            setItemsArray(itemsArray);

        })
    }, [])

    //  minus ================================================================================================

    function registerSeatMinus(getter, setter) {
        if (getter > 0) {
            setter(getter - 1)
        }

    }

    //  add ================================================================================================

    function registerSeatAdd(getter, setter) {
        setter(getter + 1);

    }

    //  login function ================================================================================================

    function handlePlainLogin() {
        event.preventDefault()
        if (event.target.email.value === "user@gmail.com" && event.target.password.value === "userPassword") {
            setModalEnable(false)
            localStorage.setItem("currentUser", event.target.email.value)

            alert("Item addded to your cart")
            
        } else {
            alert("Invalid user")
        }
    }
    return (
        <div>
            <div className={!loading? "hidden":""}>
                <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full backdrop-blur-sm backdrop-brightness-10 '>
                    <div className=''>
                        <iframe className="" src="https://giphy.com/embed/XBXBWRWbSmM6HnjErP" width="280" height="260" frameBorder="0" className="giphy-embed" ><p><a href="https://giphy.com/gifs/beastieboys-beastie-boys-body-movin-XBXBWRWbSmM6HnjErP">Regestering your item...</a></p></iframe>
                        
                    </div>
                    
                </div>
            </div>
            <div className='w-full h-screen px-10 pt-20'>
                
                {
                    itemsArray ? Object.values(itemsArray).map((data, element) => {

                        return (
                            <div className='flex flex-wrap items-center justify-center' key={data.key}>

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
                                                    <button onClick={() => { setSize("S") }} className={size === "S" ? bgColorOn : bgColorOff} >S</button>
                                                    <button onClick={() => { setSize("M") }} className={size === "M" ? bgColorOn + " mx-3" : bgColorOff + " mx-3"} >M</button>
                                                    <button onClick={() => { setSize("L") }} className={size === "L" ? bgColorOn : bgColorOff} >L</button>


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
                                        <div className={size && quantity > 0? "block" : "hidden"}>
                                            <div className='py-5'>
                                                <button onClick={() => { handleAddToCart(data.key, Object.values(data)[0].url, data.itemPrice)}} className='w-full px-4 py-2 mt-3 text-base font-medium text-gray-50 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-900 bg-gray-800 focus:text-[white]'>Add to cart</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='max-w-2xl px-5 pt-10'>
                                    <img className="" src={Object.values(data)[0].url} alt="logo" />
                                </div>
                            </div>

                        )


                    }) : ""
                }



            </div>
             <Transition appear show={modalEnable} as={Fragment}>
                <Dialog
                    as="div"
                    className="fixed inset-0 z-10 overflow-y-auto "
                    onClose={()=> {setModalEnable(false)}}
                >
                <div className="min-h-screen text-center ">
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
                                <div className="inline-block w-full max-w-md px-10 pb-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl pt-14 sm:max-w-lg sm:p-10 rounded-xl">
                                    <div className='flex justify-center w-full'>
                                        <Image
                                            src={taraenca}
                                            alt="Reservation Graphics"
                                        />
                                    </div>
                                    <div className='text-center'>
                                        <h1 className='font-bold '>Already have an account? Sign in</h1>
                                    </div>
                                    <div className="mt-2 ">
                                        <form onSubmit={handlePlainLogin}>
                                            <div className='my-5 '>
                                                <label htmlFor="email-address" className="sr-only">
                                                    Email address
                                                </label>
                                                <input
                                                    id="email-address"
                                                    name="email"
                                                    type="email"
                                                    autoComplete="email"
                                                    required
                                                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    placeholder="Email address"
                                                />
                                                </div>
                                                
                                                <div className='my-5 '>
                                                    <div className='flex justify-end '>
                                                        {/* <p className=' font-semibold cursor-pointer text-[#924426]'   onClick={() => { setForgotPassword("resetPass") }}>Forgot password?</p> */}
                                                    </div>
                                                    
                                                    <label htmlFor="password" className="sr-only">
                                                        Password
                                                    </label>
                                                    <input
                                                        id="password"
                                                        name="password"
                                                        type="password"
                                                        autoComplete="current-password"
                                                        required
                                                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-t-md rounded-b-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10 "
                                                        placeholder="Password"
                                                    />
                                                </div>
                                                
                                                <div>
                                                    <button
                                                        type="submit"
                                                        className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#7a5041] border border-transparent rounded-md group hover:bg-[#5a3e34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#50382F]"
                                                    >
                                                        
                                                        Sign in
                                                    </button>
                                                </div>
                                                <div className='py-5 text-center'>
                                                    <h1 className='mt-4 text-sm text-gray-500 line-mid'>Or sign in using</h1>
                                                    <div>
                                                         <button
                                                            onClick={handleGoogleSignin}
                                                            type="button"
                                                            className="flex mt-4 relative  border border-gray-500 justify-center w-full px-4 py-2 text-sm font-medium text-gray-900 bg-[#fff] rounded-md group hover:bg-gray-800 hover:text-white focus:ring-2 focus:ring-offset-2 "
                                                        >
                                                            <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" className='w-5 h-5 mr-3'/>   
                                                            Google account
                                                        </button>
                                                    </div>
                                                </div>
                                        </form>
                                        
                                    </div>

                                
                                </div>
                        </Transition.Child>
                        </div>
                </Dialog>
            </Transition>
        </div>

    )


}


export default FoodSpecific