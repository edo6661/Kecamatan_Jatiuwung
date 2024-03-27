import { Heading } from "@/components/custom-ui/heading";
import Image from "next/image";

import { getGoods } from "@/services/good";

export default async function Home() {

  return (
    <>
      <section className="base-container">
        <Heading>Gedong memek</Heading>
        <p>homepage</p>

      </section>
    </>
  );
}
