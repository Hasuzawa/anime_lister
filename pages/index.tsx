import type { NextPage } from 'next'
import Head from 'next/head'
import { useState } from "react";

import SideBar from "~/components/SideBar/SideBar";
import Main from "~/components/Main/Main";


const Home: NextPage = () => {
  const [ isCollapsed, setCollapsed] = useState<boolean>(false);
  const toggleCollapsed = () => setCollapsed(!isCollapsed);
  
  const [ scrollYProgress, setScrollYProgress ] = useState<number>(0);  //0 at top, 1 when at bottom


  return (
    <div className="w-screen h-screen flex" >
      <Head>
        <title>Anime Lister</title>
      </Head>
      <div className="absolute top-0 right-0 bg-yellow-300 z-10">
        <span>collapse state is {isCollapsed.toString()}</span>
      </div>

      <SideBar
        isCollapsed={isCollapsed}
        toggleCollapsed={toggleCollapsed}
        scrollYProgress={scrollYProgress}
      />

      <Main setScrollYProgress={setScrollYProgress} />
      <div className="absolute top-0 left-0">
        <h1>{scrollYProgress}</h1>
      </div>
    </div>
  )
}

export default Home
