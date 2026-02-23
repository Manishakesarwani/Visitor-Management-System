import React from 'react'
import GetAllPasses from '../Components/GetAllPasses'
import PassForm from '../Components/PassForm'

const Pass = () => {
  return (
    <div className='pass_page'>
        <div className='Passes_list'>
            <GetAllPasses />
        </div>
        <div className='Pass_Form'>
            <PassForm />
        </div>
    </div>
  )
}

export default Pass