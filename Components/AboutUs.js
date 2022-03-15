import React from 'react'
//image
import ReserveImage from '../pages/Assets/ReserveSeatGraphics.jpg'
import taraenca from '../pages/Assets/taraenca.png'

//util
import Image from 'next/image'

function AboutUs() {
  return (
      <div className='flex items-center h-screen'>
          <div >
            
            {/* texts */}
            <div>
              <div className="cursor-pointer">
                      <Image className="w-24 h-24 " src={taraenca} alt="logo" />
              </div>
            
              <h1 className='mt-5 text-2xl font-extrabold text-slate-900 font__primary sm:text-2xl lg:text-5xl'>
                  Who on earth are we?
              </h1>
              
              <p className='max-w-3xl mt-5 font__primary'>
                  We are TARAENCA a restaurant offering variety of meals. We present our system with seat reservation and pre-order which will be verified upon walking in our physical store. 
                  QR confirmation should be achieved at the end of your interaction with the website.
              </p>

            </div>

            {/* image */}
            <div className='py-10 mt-8'>
                <Image
                    src={ReserveImage}
                    alt="Reservation Graphics"
                />
                
            </div>
          </div>
          
    </div>
  )
}

export default AboutUs