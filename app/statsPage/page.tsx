import React from 'react'
import StatsCard from '../components/statsCard'

const statsPage = () => {
  return (
    <div>statsPage
        <StatsCard 
            title="Download Speed"
            value={850.5} />
    </div>
  )
}

export default statsPage