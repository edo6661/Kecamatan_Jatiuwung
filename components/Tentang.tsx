import React from 'react'
import { Heading } from './custom-ui/heading'
import Image from 'next/image'
import CollapsibleItem from './custom-ui/CollapsibleItem'
import { tentangItems } from '@/constants'

const Tentang = () => {
  return (
    <section className="container py-4 space-y-8"
      id='tentang'
    >
      <Heading size="lg" className="text-center">
        Tentang
      </Heading>
      <Image
        src="/bg-main.png"
        alt="Bg-main"
        width={720}
        height={720}
        className="mx-auto"
      />
      <div className="space-y-4 max-w-2xl mx-auto">
        <Heading size="md">
          Tentang E-Surat :
        </Heading>
        <div className=" space-y-2">
          {tentangItems.map((item) =>
            <CollapsibleItem
              key={item.title}
              title={item.title}
              description={item.description}
            />

          )}
        </div>
      </div>
    </section>
  )
}

export default Tentang