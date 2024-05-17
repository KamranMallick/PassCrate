import React from 'react'

const Navbar = () => {
  return (
    <nav>
        <div className='flex justify-around items-center p-4 bg-slate-500'>
          <div className="logo font-bold text-lg cursor-pointer">
              <span className='text-green-400'>&lt;</span>
              Pass
              <span className='text-green-400'>Crate/&gt;</span>
              
          </div>
          {/* <ul className='flex gap-2'>
              <li>Home</li>
              <li>About</li>
              <li>Contact</li>
          </ul> */}
          <div className='gitHub flex justify-center items-center gap-1 border outline-white bg-green-500 rounded-full px-2 py-1 font-bold'>
            <img width={30} src="/icons/github.svg" alt="github img" />
            <button>GitHub</button>
          </div>
        </div>
    </nav>
  )
}

export default Navbar
