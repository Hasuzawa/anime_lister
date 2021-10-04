import type { NextPage } from 'next'
import Head from 'next/head'
import { useState, useEffect, useContext } from "react";

import SideBar from "~/components/SideBar/SideBar";
import Main from "~/components/Main/Main";

import { observer } from "mobx-react-lite";

import { SettingsContext } from "~/stores/Settings";

import Debug from "~/components/Debug";

// if you don't use observer wrapper, component will NOT re-render when one of the props it reads changes (but still will
// reflect the change if it is re-rendered some other way)
const Home: NextPage = observer(() => {
  const settings = useContext(SettingsContext);

    // site-wide keyboard event handler
    useEffect(() => {
      const handleKeyboardEvents = (event: KeyboardEvent) => {

        if (event.shiftKey) {
    
          if (event.key === "ArrowRight") {
            console.log("shift right key");
            settings.setCollapsed(false);
          } else if (event.key === "ArrowLeft") {
            settings.setCollapsed(true);
          } else if (event.key === "ArrowUp") {
            let element = document.getElementById("feeds");
            if (!element) { throw new Error("element not in DOM")}
            element.scrollTop = 0;
          } else if (event.key === "ArrowDown") {
            let element = document.getElementById("feeds");
            if (!element) { throw new Error("element not in DOM")}
            element.scrollTop = element.scrollHeight;
          }
        }
      }

      document.addEventListener("keydown", handleKeyboardEvents); //site-wide click event

      return () => {      // clean up
          document.removeEventListener("keydown", handleKeyboardEvents);
      }
    });
  
  return (
    <div className="w-screen h-screen flex" >
      <Head>
        <title>Anime Lister</title>
      </Head>
      <SideBar />
      <Main />

      <Debug />
    </div>
  )
})

export default Home
