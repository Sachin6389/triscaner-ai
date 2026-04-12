import React from 'react'
import { assets } from '../assets/assets.js'

function Logo() {
    return (
        <div className='cursor-pointer w-70  p-2 rounded-lg'>
        <img className="h-24 w-auto rounded-2xl"  src={assets.logo} alt="TriScan Logo" />
      </div>)
}

export default Logo
