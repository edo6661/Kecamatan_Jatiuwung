"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const HeaderItems = () => {
  const items = [
    {
      name: "Home",
      href: "#hero",
    },
    {
      name: "Tentang",
      href: "#tentang",
    },
    {
      name: "Layanan",
      href: "#layanan",
    },
    {
      name: "Struktur Organisasi",
      href: "#struktur",
    },
  ]
  const route = usePathname()
  return (
    <div className=" lg:fl-ic hidden justify-between gap-6">
      {
        route === "/" && (
          <ul className="fl-ic gap-4 text-lg">
            {items.map((item) => (
              <li key={item.name}>
                <Link href={item.href}
                  className="hover:text-tertiaryBg transition-colors duration-300 ease-in-out"
                >{item.name}</Link>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default HeaderItems