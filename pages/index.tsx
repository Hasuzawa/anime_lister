import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useContext } from "react";

import SideBar from "~/components/SideBar/SideBar";
import Main from "~/components/Main/Main";

import { observer } from "mobx-react-lite";
import { FilterFieldsContext } from '~/stores/stores';

// if you don't remember observer wrapper, component will NOT re-render when one of the props it reads changes (but still will
// reflect the change if it is re-rendered some other way)
const Home: NextPage = observer(() => {
  const filterFields = useContext(FilterFieldsContext);


  const [ isCollapsed, setCollapsed] = useState<boolean>(false);
  const toggleCollapsed = () => setCollapsed(!isCollapsed);
  
  const [ scrollYProgress, setScrollYProgress ] = useState<number>(0);  //0 at top, 1 when at bottom


  return (
    <div className="w-screen h-screen flex" >
      <Head>
        <title>Anime Lister</title>
      </Head>
      <div className="absolute top-0 right-0 bg-yellow-300 z-10 flex flex-col">
        <span>collapse state is {isCollapsed.toString()}</span>
        <span>current year is {filterFields.year}</span>
        <span>current status is {filterFields.status}</span>
        <span>current format is {filterFields.format}</span>
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
})

export default Home
