import React from 'react'

function ResetPassword() {
  return (
    <>
      <div className='py-20 sm:py-0'></div>
      
      <div className='flex items-center justify-center w-full max-w-2xl m-auto sm:h-screen '>
        
        <form className='w-full max-w-md'>
          <div className='flex justify-center'>
           
              <svg xmlns="http://www.w3.org/2000/svg"  className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="#7a5041" stroke-width="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
          </div>
          <div className='my-2'>
            <h2 className="mt-6 text-2xl font-bold text-center text-gray-900">Sign in to your admin account</h2>
          </div>
                <div className='py-1'></div>
                
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
                    className="relative block w-full px-3 py-2 text-gray-900 placeholder-gray-500 border border-gray-300 appearance-none rounded-b-md rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10"
                    placeholder="Email address"
                  />
                </div>
     
                <div>
                  <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#7a5041] border border-transparent rounded-md group hover:bg-[#5a3e34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#50382F]"
                  >
                    
                    Send password reset
                  </button>
              </div>
        </form>

        </div>
    </>
  )
}

export default ResetPassword