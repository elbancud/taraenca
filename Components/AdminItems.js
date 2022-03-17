import React from 'react'

function AdminItems() {
  return (
   <div className='h-screen border-l border-b-slate-100'>
       <header className='flex justify-between w-full px-8 py-6 border-t border-b border-b-slate-200'>
            <div>
              <h2 className='text-xl font-semibold '>Item Registration</h2>
            </div>
            <div>
              <button
                    type="submit"
                    className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-[#41457a] border border-transparent rounded-md group hover:bg-[#1b1f52] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-[#1b1f52]"
                  >
                    + Add Item 
                  </button>
            </div>
            
        </header>
        
       
      
    </div>
  )
}

export default AdminItems