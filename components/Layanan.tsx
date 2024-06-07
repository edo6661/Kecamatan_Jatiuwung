import React from 'react'
import { Heading } from './custom-ui/heading'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const layananItems = [
  "Domisili Usaha",
  "Tinggal Penduduk",
  "Kelahiran",
  "Kematian",
  "Tidak Mampu Sekolah",
  "Tidak Mampu Umum",
  "Pengantar SKCK",
  "Keterangan Belum Menikah",
  "Keterangan Suami Istri",
  "Keterangan Usaha",

]


const Layanan = () => {
  return (
    <section className="container py-4 space-y-8"
      id='layanan'
    >
      <Heading size="lg" className="text-center">
        Layanan
      </Heading>
      <Table className=' max-w-2xl mx-auto'>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Nama Layanan</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {layananItems.map((layanan, i) => (
            <TableRow key={layanan}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{layanan}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>

    </section>
  )
}

export default Layanan