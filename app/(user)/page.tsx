import Hero from "@/components/Hero";
import Layanan from "@/components/Layanan";
import Tentang from "@/components/Tentang";
import CollapsibleItem from "@/components/custom-ui/CollapsibleItem";
import { Heading } from "@/components/custom-ui/heading";
import { tentangItems } from "@/constants";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <Hero />
      <Tentang />
      <Layanan />
      <section id="struktur" className="py-4 container">
        <Image
          src="/struktur.png"
          alt="struktur"
          width={1280}
          height={1280}
          className="mx-auto"
        />
      </section>
    </>
  );
}
