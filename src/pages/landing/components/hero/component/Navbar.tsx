/* eslint-disable no-mixed-spaces-and-tabs */
import { useState } from 'react'
import { Transition } from "@headlessui/react";
// import  "./logo2.css";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom'
import Logo from '@/components-global/Logo';

const Navbar = () => {

    const navigate = useNavigate()
   
    
      const [isOpen, setIsOpen] = useState(false);
  return (<>
    
<motion.div initial={{opacity:0,y:-20}}
animate={{opacity:1,y:0}}
transition={{duration:1.2}}>
    <div className='md:fixed md:inset-x-0 z-[1000]'>
      <nav className="bg-lig_Blu ">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 ">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Logo />
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <a
                    href="#home"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </a>

                  <a
                    href="#about"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    About
                  </a>

                  <a
                    href="#clubs"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Clubs
                  </a>

                  <a
                    href='#artists'
                    className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Artists
                  </a>

                  
                  <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={() => {
            navigate('/events')
        }}>Events</a>
        <a className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        onClick={() => {
            navigate('/sponsors')
        }}>Sponsors</a>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <a
                  href="#home"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </a>

                <a
                  href="#about"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  About
                </a>

                <a
                  href="#clubs"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Clubs
                </a>

                <a
                  href="#artists"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Artists
                </a>

                <div
                  className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
                
                   onClick={() => {
            navigate('/events')
        }}>Events
                </div>
                <a
                  href="#Sponsors"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        onClick={() => {
            navigate('/sponsors')
        }}>Sponsors
                </a>
              </div>
            </div>
          )}
        </Transition>
      </nav>

     
    </div>
    </motion.div>
</>
  )
}

export default Navbar