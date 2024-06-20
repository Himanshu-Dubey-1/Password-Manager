import React from 'react'

const navbar = () => {
  return (
    <nav className='bg-slate-700  '>
        <div className='mycontainer flex justify-between items-center
    px-4 py-5 h-14'>

        <div className='logo font-bold text-white text-2xl'>
            <span className='text-green-600'>&lt;</span>Pass
            <span className='text-green-600'>op/&gt;</span>
            </div>
        <ul>
            <li className='flex gap-4 '>
                <a className='hover:font-bold text-2xl text-white transition ease' href="#">Password Manager</a>
               
            </li>
        </ul>
        </div>
    </nav>
  )
}

export default navbar