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
        <div class="flex flex-col">
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class=" inline-block min-w-full sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <table class="min-w-full ">
                        <thead class="bg-gray-100 border-b border-b-slate-200 bg-[#f0f0f0]">
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
        {/* <section className='w-full'>
                        
            <div class="">
                <div class="overflow-x-auto  ">
                    <div class="inline-block  align-middle">
                        <div class="overflow-hidden ">
                            <table class="">
                                <thead class="bg-gray-100 border-b border-b-slate-200 bg-[#f9fafb]">
                                    <tr>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Product Name
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            ID
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Category
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Images
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Order
                                        </th>
                                        <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                            Price
                                        </th>
                                        <th scope="col" class="p-4">
                                            <span class="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody class="">
                                    <tr class="border-b border-b-slate-100">
                                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">Lomi</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">213545345</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">Noodles</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">$1999</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">100</td>
                                        <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                            <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                    <tr class="border-b border-b-slate-100">
                                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">Apple Imac 27"</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">213545345</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap ">Desktop PC</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">$1999</td>
                                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap ">$1999</td>
                                        <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                                        <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

               
        </section> */}
    </div>
  )
}

export default AdminHome