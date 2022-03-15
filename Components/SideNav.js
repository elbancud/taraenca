import taraenca from '../pages/Assets/taraenca.png'
//image
import SideGraphics from '../pages/Assets/SideNavGraphics.png'

//util
import Image from 'next/image'

//selected = deconstructed
//was props = props.selectTab
//deconstructed erasesd
function sideNav({selectedTab}) {
    
  return (
    <div>
         <div className='relative hidden h-screen overflow-hidden md:block bg-[#50382F]'>
            <div className="relative h-screen px-4 py-10 w-96 md:flex md:flex-col md:justify-between">
                <div className="flex justify-center w-full cursor-pointer">
                    <Image src={taraenca} alt="logo" />
                </div>
                
                <div className="relative z-10 flex justify-center w-full font__secondary">
                    <ul className="text-center text-white">
                        <li className="my-4 cursor-pointer hover:underline" onClick={()=>{selectedTab("about")}}><a>About Us</a></li>
                          <li className="my-4 cursor-pointer hover:underline" onClick={() => { selectedTab("contact") }}><a>Contact Us</a></li>
                        <li className="my-4 cursor-pointer hover:underline" onClick={() => { selectedTab("order") }}><a>Order</a></li>
                        <li className="my-4 cursor-pointer hover:underline" onClick={() => { selectedTab("support") }}><a>User Support</a></li>
                        
                    </ul>
                </div>
                
                <div className="z-10 flex justify-end text-white">
                    <ul>
                          <li className="cursor-pointer " onClick={() => { selectedTab("admin") }}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z" clipRule="evenodd" />
                            </svg>
                          </li>
                    </ul>
                </div>
                
            </div>
            
            <div className="div__gradient-accent"></div>
              
            <div className='div__accent-bottom'>
                <Image 
                    alt='Chicken graphics'
                    src={SideGraphics}
                />
            </div>
        </div>
    </div>
  )
}

export default sideNav