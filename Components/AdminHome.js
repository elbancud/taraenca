import React from 'react'

function AdminHome() {

  return (
    <div className='h-screen border-l border-b-slate-100'>
        <header className='px-8 py-6 border-t border-b border-b-slate-200'>
            <h2 className='text-xl font-semibold '>Dashboard</h2>
        </header>
        
        <section className='px-8 py-6 border-b border-b-slate-200'>
            <div className='mb-2'>
                <p className='text-sm font-semibold uppercase'>Admin </p>
            </div>
            <div  className='inline-block mb-2 mr-2 border rounded border-b-slate-200'>
                <div className='bg-[#b43333] rounded flex items-center'>
                    <div className='py-2 px-7 text-[#fff]'>
                        A1
                    </div>
                    <div className=' bg-[white] py-2 px-2'>
                                <div className='mx-7'>
                                    <h2 className='font-semibold'>Admin 1</h2>
                                    <p className='-mt-1 text-sm'>3 activities</p>
                                </div>
                    </div>
                </div>
            </div>
            <div  className='inline-block mb-2 mr-2 border rounded border-b-slate-200'>
                <div className='bg-[#9cb433] rounded flex items-center'>
                    <div className='py-2 px-7 text-[#fff]'>
                        A2
                    </div>
                    <div className=' bg-[white] py-2 px-2'>
                                <div className='mx-7'>
                                    <h2 className='font-semibold'>Admin 2</h2>
                                    <p className='-mt-1 text-sm'>3 activities</p>
                                </div>
                    </div>
                </div>
            </div>
            <div  className='inline-block mb-2 mr-2 border rounded border-b-slate-200'>
                <div className='bg-[#33b489] rounded flex items-center'>
                    <div className='py-2 px-7 text-[#fff]'>
                        A3
                    </div>
                    <div className=' bg-[white] py-2 px-2'>
                                <div className='mx-7'>
                                    <h2 className='font-semibold'>Admin 3</h2>
                                    <p className='-mt-1 text-sm'>3 activities</p>
                                </div>
                    </div>
                </div>
            </div>
            <div  className='inline-block mb-2 mr-2 border rounded border-b-slate-200'>
                <div className='bg-[#4b33b4] rounded flex items-center'>
                    <div className='py-2 px-7 text-[#fff]'>
                        A4
                    </div>
                    <div className=' bg-[white] py-2 px-2'>
                                <div className='mx-7'>
                                    <h2 className='font-semibold'>Admin 4</h2>
                                    <p className='-mt-1 text-sm'>3 activities</p>
                                </div>
                    </div>
                </div>
            </div>
        </section>
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
                                    Category
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Images
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Order
                                </th>
                                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-3">
                                    Price
                                </th>
                            </tr>
                        </thead >
                        <tbody className='text-left'>
                            <tr class="bg-white border-b ">
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    Lomi
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    21332131
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    Noodles
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    wewew
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    123
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    120php
                                </td>
                            </tr>
                            <tr class="bg-white border-b ">
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    Lomi
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    21332131
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    Noodles
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    wewew
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    123
                                </td>
                                <td class="text-sm text-gray-900 font-light px-6  py-3 whitespace-nowrap">
                                    120php
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                </div>
            </div>
        </div>
        
      
    </div>
  )
}

export default AdminHome