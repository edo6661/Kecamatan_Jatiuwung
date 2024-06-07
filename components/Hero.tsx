import Image from 'next/image'
import React from 'react'
import { Heading } from './custom-ui/heading'

const Hero = () => {
  return (
    <section className="py-4 min-h-screen relative bg-cover bg-no-repeat bg-fixed"
      style={{
        backgroundImage: "url('/bg-main.png')"
      }}
      id='hero'
    >
      <div className="inset-0 bg-black opacity-50 absolute h-full " />

      <article className="container z-10 text-white relative lg:fl-ic hero-responsive lg:gap-24 gap-12  min-h-[80vh]">
        <Image
          src="/logo.png"
          alt="Logo"
          width={420}
          height={420}
        />
        <div className=" ">
          <Heading className="lg:text-7xl text-5xl">
            E-Surat
          </Heading>
          <p className="lg:text-4xl text-2xl">
            Kecamatan Jatiuwung Kota Tangerang
          </p>
          <p className="lg:text-2xl text-lg">
            Meningkatkan Pelayanan Masyarakat & Memanfaatkan Teknologi Informasi
          </p>
        </div>
      </article>
    </section>
  )
}

export default Hero