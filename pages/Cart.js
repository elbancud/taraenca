import React, {useState, useEffect, Fragment} from 'react'
import { db } from '../Components/Firebase/firebase';
import { push, ref, onValue, update as db_update, remove, getDatabase, update } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { Menu } from '@headlessui/react'

import { useRouter } from "next/router";

import { Dialog, Listbox, Transition } from '@headlessui/react'
// import { CheckIcon, SelectorIcon } from '@heroicons/react/solid'

const time = [
  { hour: '9:00 am' },
  { hour: '10:00 am' },
  { hour: '11:00 am' },
  { hour: '1:00 pm' },
  { hour: '2:00 pm' },
  { hour: '3:00 pm' },
  { hour: '4:00 pm' },
  { hour: '5:00 pm' },
  
  
]
function Cart() {
    const router = useRouter();
    const seatRow = ['A','B','C','D','E','F','G','H','I','J','K','L','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
    const [cartArray, setCartArray] = useState();
    const [quantity, setQuantity] = useState(0)
    const [size, setSize] = useState("")
    const [itemPrice, setItemPrice] = useState(0);
    const [total, setTotal] = useState(0)
    const [updateUE, setUpdateUE] = useState(false);
    const [checkoutDiv, setCheckoutDiv] = useState(false);

    const bgColorOn = "px-4 py-2 mt-3 text-base font-medium text-gray-700 border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 hover:text-[black] bg-orange-700 text-[white]"
    const bgColorOff = "px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:text-[white]"
    
    const [selectedHour, setSelectedHour] = useState()

    const [loading, setLoading] = useState(false)
    const [seatArray, setSeatArray] = useState();
    const [pax, setPax] = useState();

    const [completed, setCompleted] = useState(true);
    const [update, setUpdate] = useState(false);
    const [newData, setNewData] = useState();


    useEffect(() => {

        const db = getDatabase()
        const dbRef = ref(db, "userAccounts/" + localStorage.getItem("accountKey") + "/cart");
        
        onValue(dbRef, (snapshot) => {

            
            const snap = snapshot.val()
            const cartArray = []
            let totalVar = 0
            
            for (let id in snap) {
                cartArray.push({ id, ...snap[id] })
                const quantity = snap[id].quantity;
                const price = snap[id].price;
                
                    totalVar += parseInt(quantity * price, 10) 
                
            }
            setTotal(totalVar)
            setCartArray(cartArray)
        })
        const dbRefNew = ref(db, "userAccounts/" + localStorage.getItem("accountKey") );
        
        onValue(dbRefNew, (snapshot) => {

            const snap = snapshot.val()
            const newData = []
            
            for (let id in snap) {
                newData.push({ id, ...snap[id] })
            }
            setNewData(newData)
        })
    
    }, [update])
    const [dbSeat, setDbSeat] = useState("");

    function reserveSeat(group, rowTitle, colSeat, parentIndex, parent, row, col) {

        const parentId = seatArray[parentIndex].id;
        const rowId = Object.keys(seatArray[parentIndex])[row]
        const dbSeat = parentId + "/" + rowId + "/" + col
        setDbSeat(dbSeat);
        setLoading(true)
        
        let seat =  " Group : " + group + " " + rowTitle+colSeat 
        let data = "Name: " + localStorage.getItem("currentUser")

        const qrLink = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" +pax+"pax"+ data + " " + seat

        db_update(ref(db, "seat-arrangement/" + dbSeat), {
            reserved: true
        }).then(() => {
            db_update(ref(db, "userAccounts/" + localStorage.getItem("accountKey")), {
                qrLink,
                seat,
                pax,
                selectedHour
            })
            setTimeout(() => {
                setLoading(false)
            },1500)
        })
        setCompleted(true)
        setUpdate(!update)
        setCheckoutDiv(true)
    } 
  //  minus ================================================================================================

    function registerSeatMinus(getter, setter, currentQuantity, id) {
        
        if (currentQuantity > 0) {

            const db = getDatabase()
            const dbRef = ref(db, "userAccounts/" + localStorage.getItem("accountKey") + "/cart/" + id);
            
            db_update(dbRef, {
                quantity: parseInt(currentQuantity - 1,10)
            }).then(() => {
                setUpdateUE(!updateUE)
            })
        }

    }

    //  add ================================================================================================

    function registerSeatAdd(getter, setter, currentQuantity, id) {
          
            
            const db = getDatabase()
            const dbRef = ref(db, "userAccounts/" + localStorage.getItem("accountKey") + "/cart/" +id);
            
            db_update(dbRef, {
                quantity: parseInt(currentQuantity + 1,10)
            }).then(() => {
                setUpdateUE(!updateUE)
            })
    }
    // functin remove

    function removeItem(id) {
        const dbRef = ref(db, "userAccounts/" + localStorage.getItem("accountKey") + "/cart/" + id);
        
        setLoading(true)

        const removeItem = remove(dbRef).then(()=> {
                      setTimeout(() => {
                          setLoading(false)
                      }, 1500)
            
                      setUpdateUE(!updateUE)
                    })
    }
    // functin size
    function sizeUpdate(id, size) {
            const db = getDatabase()
            const dbRef = ref(db, "userAccounts/" + localStorage.getItem("accountKey") + "/cart/" +id);
            
            db_update(dbRef, {
                size
            }).then(() => {
                setUpdateUE(!updateUE)
            })
    }
    //select time
    function selectTime(event) {
        let time = event.target.value
        setSelectedHour(event.target.value)
        // if (time == "10") {
        //     update(ref(db, "seat-arrangement/-Mz71kAjlHOFKFuM9Qnw/-Mz71kAkbx-o-17TSqrc/1"), {
        //         reserved:true
        //     })
        // } else if (time == "11") {
        //     update(ref(db, "seat-arrangement/-Mz7dp6Rl2Q6ww4ZxJlj/-Mz7dp6TXrkFpRuGuupp/2"), {
        //         reserved:true
        //     })
        // } else if (time == "1") {
        //     update(ref(db, "seat-arrangement/-Mz7dp6W_hFyFPuVtR4T/-Mz7dp6X3YDhqvv6ufpX/1"), {
        //         reserved:true
        //     })
        // } else {
        //     update(ref(db, "seat-arrangement/-Mz7TQTujgjaZ8ZitANF/-Mz7TQU-_81vs6AFsLYJ/1"), {
        //         reserved:true
        //     })
        // }
        const dbGrp = ref(db, "seat-arrangement")
        onValue(dbGrp, (snapshot) => {
            const snap = snapshot.val();
            const seatArray = [];

            for (let id in snap) {
                seatArray.push({id, ...snap[id]})
            }

            setSeatArray(seatArray);
        
        })
    }
  return (
    <div>
        <div className={!loading? "hidden":""}>
            <div className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full backdrop-blur-sm backdrop-brightness-10 '>
                <div className=''>
                    <iframe src="https://giphy.com/embed/Oarp36ygIEw6c" width="280" height="260" frameBorder="0" class="giphy-embed" allowFullScreen></iframe><p><a href="https://giphy.com/gifs/finally-atlast-itsover-Oarp36ygIEw6c"></a></p>
                </div>
                
            </div>
        </div>
        <div className='flex flex-wrap '>
            
                    
                    <div className=' w-full sm:w-1/2 bg-[#fff] h-screen'>
                        <div className='px-5 py-20 sm:p-20 '>
                                    
                                <h1 className='max-w-md mb-2 text-lg font-medium text-gray-900 sm:max-w-xl '>My Orders</h1>
                                <div className='pt-5'>
                                    {cartArray ? cartArray.map((data, index) => {
                                        return (
                                            <div className={index == (cartArray.length -1 )? "" : "border-b border-b-slate-200"}>

                                                    <div className='flex justify-between py-5 '>
                                                        <div className='pt-2 w-28'>
                                                            <img className = "w-14" src={data.imageUrl}/>
                                                        </div>
                                                        <div className='w-80'>
                                                            <h1 className='max-w-xs text-lg font-semibold'>{data.itemName}</h1>
                                                            <div className='flex items-center' >
                                                                        <div>
                                                                            <p className="mt-1 text-sm text-gray-500 mr-14">Size</p>
                                                                        </div>
                                                                        <div className='flex'>
                                                                        
                                                                            <button onClick={() => { sizeUpdate(data.id,"S") }} className={data.size === "S" ? bgColorOn : bgColorOff} >S</button>
                                                                            <button onClick={() => { sizeUpdate(data.id,"M")}} className={data.size === "M" ? bgColorOn + " mx-3" : bgColorOff + " mx-3"} >M</button>
                                                                            <button onClick={() => { sizeUpdate(data.id,"L") }} className={data.size === "L" ? bgColorOn : bgColorOff} >L</button>


                                                                        </div>

                                                            </div>
                                                            <div className='flex items-center'>
                                                                        <div>
                                                                            <p className='w-20 mt-1 text-sm text-gray-500'>Quantity</p>
                                                                        </div>
                                                                        <div className='flex items-center '>
                                                                            <button onClick={() => { registerSeatMinus(quantity, setQuantity,data.quantity, data.id) }} className='px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:bg-gray-900 focus:text-[white]'>-</button>
                                                                            <div className='px-1 mx-7'>
                                                                                {data.quantity }
                                                                            </div>
                                                                            <button onClick={() => { registerSeatAdd(quantity, setQuantity,data.quantity, data.id) }} className='px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm cursor-pointer hover:bg-gray-200 focus:bg-gray-900 focus:text-[white]'>+</button>

                                                                        </div>

                                                            </div>
                                                            
                                                        </div>
                                                        <div className='flex flex-col justify-between '>
                                                                <div>
                                                                        <h1 className='text-xl text-[#942640] font-semibold '>₱ {parseInt(data.price * data.quantity,10)}</h1>
                                                                        <p className='text-sm text-gray-400 mr-14'>₱ {data.price} x {data.quantity}</p>
                                                                    
                                                                </div>
                                                                <div>
                                                                    <div className=' inline-block cursor-pointer rounded-full hover:text-[#1b1b74] hover:font-semibold mt-2 py-2 ' onClick={()=> {removeItem(data.id)}}>
                                                                        Remove
                                                                    </div>
                                                                </div>
                                                        </div>
                                                    </div>
                                            </div>
                                            
                                        )
                                    })
                                        : "No items yet"
                                        
                                    }
                            </div>
                        </div>
                      
                        <div className='py-3 border-t border-t-slate-200'>
                            <div className='px-20 pt-10 '>
                                <div className='flex justify-between'>
                                    <div>
                                        <h1 className='font-semibold text-gray-900 text-md'>Order Summary</h1>
                                    </div>
                                    <div className='w-1/2 '>
                                        <div className="flex justify-between pb-2 text-base font-medium text-gray-900 border-b border-b-slate-200">
                                            <p>Subtotal</p>
                                            <div>
                                                ₱ {total}
                                            </div>
                                        </div>
                                       <div className="flex justify-between pb-2 mt-4 text-base font-medium text-gray-900 border-b border-b-slate-200">
                                            <p>Value added tax</p>
                                            <div>
                                                ₱ 50
                                            </div>
                                        </div>
                                        <div className="flex justify-between pb-2 mt-4 text-lg font-semibold text-gray-900">
                                            <h1>Total</h1>
                                                <div className='text-[green]'>
                                               ₱ {total + 50}
                                            </div>
                                        </div>
                                        <div className="mt-6 cursor-pointer" onClick={()=>{setCheckoutDiv(true)}}>
                                            <a
                                                className="flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700"
                                            >
                                                Checkout 
                                            </a>
                                        </div>
                                        <div className="flex justify-center mt-6 text-sm text-center text-gray-500">
                                            <p>
                                                or{' '}
                                                <button
                                                type="button"
                                                className="font-medium text-indigo-600 cursor-pointer hover:text-indigo-500"
                                                onClick={() => {router.push("/")}}
                                                >
                                                Continue Shopping<span aria-hidden="true"> &rarr;</span>
                                                </button>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div>
             
                    <div className={!checkoutDiv ? "blur-sm bg-[#f5f7fb] w-full sm:w-1/2 h-screen px-10 py-20 " : " w-full sm:w-1/2 bg-[#f5f7fb] h-screen px-10 py-20 "}>
                        <div className='max-w-xl m-auto '>
                            
                                <div className='mb-10'>
                                        <h1 className='max-w-md mb-2 text-2xl font-medium text-gray-900 sm:max-w-xl '>Finalize Customer Details</h1>
                                        <p className='max-w-md mb-2 text-gray-500 text-md sm:max-w-xl '>Please complete each details</p>
                                        
                                </div>
                                <label htmlFor="time" className="block text-lg font-medium text-gray-700 text-md">
                                        Select time
                                </label>
                                    <select value={selectedHour} onChange={(e) => { selectTime(e) }} className='relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10'>
                                        <option  >Click to view timeslots</option>
                                        <option value="9" >9:00 am</option>
                                        <option value="10">10:00 am</option>
                                        <option value="11">11:00 am</option>
                                        <option value="1">1:00 pm</option>
                                        <option value="2">2:00 pm</option>
                                        
                                    </select>
                    
                                <div className='mt-5'>
                                    <label htmlFor="time" className="block mb-3 text-lg font-medium text-gray-700 text-md">
                                            Input pax
                                    </label>
                                    <input
                                        value={pax}
                                        onChange={(event)=>{setPax(event.target.value)}}
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                        placeholder="How many are you coming?"
                                    />
                                </div>
                                <div className='mt-5'>
                                        <label htmlFor="seat" className="block text-lg font-medium text-gray-700 text-md">
                                                Select Seat
                                        </label>
                                        <div className='my-5'>
                                            Legends
                                            <div className='flex'>
                                                <button variant="contained"  className='relative px-4 py-2 text-sm font-medium text-white bg-[#b4b4b4] border border-transparent rounded-md group ' disableElevation>
                                                    Reserved
                                                </button>
                                                <button variant="contained"  className='mx-5 relative px-4 py-2 text-sm font-medium text-white bg-[green] border border-transparent rounded-md group hover:bg-[#0e380e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#50382F]' disableElevation>

                                                    Available
                                                </button>
                                            </div>
                                        </div>
                                        <div className={pax && selectedHour ? "block": "hidden"}>
                                                    
                                                <div name="seat" className="flex flex-wrap justify-start">
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
                                                                                                                                    <button variant="contained"  className='relative px-4 py-2 text-sm font-medium text-white bg-[#b4b4b4] border border-transparent rounded-md group ' disableElevation>
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
                                                                                                                                <button onClick={() => {reserveSeat(parentIndex + 1, seatRow[indexLvl1 - 1] , index + 1, parentIndex, data.id, indexLvl1, index)}} variant="contained"  className='relative px-4 py-2 text-sm font-medium text-white bg-[green] border border-transparent rounded-md group hover:bg-[#0e380e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#50382F]' disableElevation>

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
                                        
                                </div>
                        </div>
                            
                        {/* <div className={completed ? "block" : "hidden"}> */}
                  {
                      
                                newData ? newData.map((data) => {
                                    return(
                                        <div className='flex'>
                                                    {data.qrLink}
                                                    <img src={data.qrLink}></img>
                                            
                                        </div>
                                        )
                                    
                                }) 
                                : ""
                            }
                        {/* </div> */}
                    </div>
            
        </div>
    </div>
  )
}

export default Cart