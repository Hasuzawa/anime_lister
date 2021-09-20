import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

import Test from "~/components/Test";
import { useState } from "react";
import { motion } from "framer-motion";

import Feeds from "~/components/Feeds";

import SideLogoBar from "~/components/SideLogoBar";

const Home: NextPage = () => {
  const [ isCollapsed, setCollapsed] = useState<boolean>(false);
  const toggleCollapsed = () => setCollapsed(!isCollapsed);


  return (
    <div className="w-screen h-screen flex" >
      <Head>
        <title>Anime Lister</title>
      </Head>
      <div className="absolute top-0 right-0 bg-yellow-300 z-10">
        <span>collapse state is {isCollapsed.toString()}</span>
      </div>
      
      <motion.div id="side-bar" className={"bg-blue-300 flex relative" + (isCollapsed ? " w-12" : "w-80")} layout
          transition={{duration: 3}}
        >
          <motion.div className={"flex-auto w-64 min-w-0 overflow-hidden"} layout>
            <h1 >logo here</h1>
            <input type="text" ></input>
            
          </motion.div>
          <SideLogoBar isCollapsed={isCollapsed} toggleCollapsed={toggleCollapsed} />
      </motion.div>
      {/* add custom scroller to this main */}
      <motion.main id="main" className="flex-auto w-280 max-h-full bg-red-300 overflow-y-auto" layout>
        <Feeds />
        {/* <Test /> */}
      </motion.main>

    </div>
  )
}

export default Home
