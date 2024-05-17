import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-500 flex flex-col w-full items-center justify-center p-2 '>
            <div className="logo font-bold text-lg cursor-pointer">
                <span className='text-green-400'>&lt;</span>
                Pass
                <span className='text-green-400'>Crate/&gt;</span>
            </div>
            <div>Created w/ passion by Kamran Majid</div>
        </div>
    )
}

export default Footer
