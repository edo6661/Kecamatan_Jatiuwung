import Header from '@/components/Header'
import React from 'react'

const UserLayout = (
  { children }: React.PropsWithChildren,
) => {
  return (
    <>
      {children}
    </>
  )
}

export default UserLayout