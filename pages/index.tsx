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
        <meta name="keywords"           content="anime, search anime, " />
        <meta name="description"        content="Anime Lister is a compact one page application to search for anime.
            The website is created by Hasuzawa Yuichi with data fetched from AniList GraphQL API" />
        <meta name="author"             content="Hasuzawa Yuichi" />

        {/*  Open Graph meta  */}
        
        <meta property="og:locale"      content="en_US" />
        <meta property="og:type"        content="website" />
        <meta property="og:url"         content="https://central-repository.vercel.app/" />
        <meta property="og:title"       content="Anime Lister by Hasuzawa Yuichi" />
        <meta property="og:description" content="The website facilitates searching anime." />

        <meta property="og:site_name"   content="Anime Lister" />

        <link rel="icon" href="/favicon.ico" />

        {/*  theme color  */}

        {/* <meta name="theme-color" media="(prefers-color-scheme: dark" content="black" /> */}
        {/* <meta name="theme-color" media="(prefers-color-scheme: light" content="white" /> */}
      </Head>
      <SideBar />
      <Main />

      <Debug />
    </div>
  )
})

export default Home
