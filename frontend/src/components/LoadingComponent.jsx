import React from 'react'
import {ProgressSpinner} from 'primereact/progressspinner'

const LoadingComponent = () => {
  return (
      <div className='full-screen flex align-items-center justify-content-center'>
          <ProgressSpinner />
    </div>
  )
}

export default LoadingComponent