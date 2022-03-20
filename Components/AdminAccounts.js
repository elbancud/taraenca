import React from 'react'



function AdminAccounts() {
  return (
    <div>

      
      <header className='w-full px-8 py-6 border-t border-b border-b-slate-200'>
            <div>
              <h2 className='text-xl font-semibold '>Admin Accounts</h2>
            </div>
      </header>


      <section className='px-8 py-6 ' >


  {/* ======================================== Personal info ==================================================== */}

                        <div className="mt-10 sm:mt-3">
                          <div className="md:grid md:grid-cols-3 md:gap-6">
                            <div className="md:col-span-1">
                                <div className=" sm:px-0">
                                  <h3 className="font-medium leading-6 text-gray-900 ">Personal Information</h3>
                                  <p className="mt-1 text-sm text-gray-600">Fill out the administration's information</p>
                                </div>
                            </div>
                              <div className="mt-5 md:mt-0 md:col-span-2">
                                  <form action="#" method="POST">
                                      <div className="overflow-hidden shadow sm:rounded-md">
                                          <div className="px-4 py-5 bg-white sm:p-6">
                                            <div className="grid grid-cols-6 gap-6">
                                                <div className="col-span-6 sm:col-span-3">
                                                  
  {/* Input First name ============================================================================================ */}
                                                  
                                                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                      First name
                                                  </label>
                                                  <input
                                                      type="text"
                                                      name="first-name"
                                                      id="first-name"
                                                      autoComplete="given-name"
                                                      className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                  />
                                                </div>
                                                
  {/* Input Last name ============================================================================================ */}

                                                <div className="col-span-6 sm:col-span-3">
                                                    <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                        Last name
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="last-name"
                                                        id="last-name"
                                                        autoComplete="family-name"
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
                                                </div>
                                                
  {/* Input Email ============================================================================================ */}

                                                <div className="col-span-6 sm:col-span-4">
                                                    <label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
                                                        Email address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email-address"
                                                        id="email-address"
                                                        autoComplete="email"
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
                                                </div>

  {/* Input Street address  ============================================================================================ */}

                                                <div className="col-span-6">
                                                    <label htmlFor="street-address" className="block text-sm font-medium text-gray-700">
                                                        Street address
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="street-address"
                                                        id="street-address"
                                                        autoComplete="street-address"
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
                                                </div>
  {/* Input City  ============================================================================================ */}

                                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                                    <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                                        City
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        autoComplete="address-level2"
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
                                                </div>
                                                
  {/* Input State  ============================================================================================ */}

                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label htmlFor="region" className="block text-sm font-medium text-gray-700">
                                                        State / Province
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="region"
                                                        id="region"
                                                        autoComplete="address-level1"
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                    />
                                                </div>
                                                
  {/* Input Zip  ============================================================================================ */}

                                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                                        ZIP / Postal code
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="postal-code"
                                                        id="postal-code"
                                                        autoComplete="postal-code"
                                                        className="relative block w-full px-3 py-1 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-orange-900 focus:border-orange-900 focus:z-10"
                                                        
                                                    />
                                                </div>
                                            </div>
                                          </div>
                                          
  {/* Buttom Register  ============================================================================================ */}
                                  
                                      </div>
                                  </form>
                              </div>
                            </div>
                            
                            <div className="" aria-hidden="true">
                              <div className="py-7">
                                <div className="border-t border-gray-200" />
                              </div>
                            </div>
                            
          

  {/* ======================================== Photo ==================================================== */}
                            <div className="md:grid md:grid-cols-3 md:gap-6">
                              <div className="md:col-span-1">
                                  <div className=" sm:px-0">
                                    <h3 className="font-medium leading-6 text-gray-900">Profile Photo</h3>
                                    <p className="mt-1 text-sm text-gray-600">Let's keep your profile photo up there.</p>
                                  </div>
                              </div>
                            
                              <div className="mt-5 md:mt-0 md:col-span-2">
                                  <form action="#" method="POST">
                                      <div className="overflow-hidden shadow sm:rounded-md">
                                          <div className="px-4 py-5 bg-white sm:p-6">
                                            <div>
                                              <label className="block text-sm font-medium text-gray-700">Cover photo</label>
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
                                                      <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">or drag and drop</p>
                                                  </div>
                                                  <p className="text-xs text-gray-500">PNG, JPG up to 25MB</p>
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

export default AdminAccounts