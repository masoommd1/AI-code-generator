import React from 'react'
import { FaUser } from 'react-icons/fa'
import { HiSun } from 'react-icons/hi'
import { RiSettings3Fill } from 'react-icons/ri'

const NavBar = () => {
  return (
    <div className='flex items-center justify-between border-b border-slate-900 px-24 h-20'>
      <div className="nav">
        <h3 className='text-3xl font-extrabold sp-text cursor-pointer '>GenAI</h3>
      </div>
      <div className="icons flex items-center gap-[15px]">
        <div className='icon'><HiSun/></div>
        <div className='icon'><RiSettings3Fill /></div>
        <div className='icon'><FaUser/></div>
      </div>
    </div>
  )
}

export default NavBar