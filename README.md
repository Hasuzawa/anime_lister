## About
This is a personal project on frontend API. One of the goal is to provide a streamlined experience and maximise the
effecive usage of screen area. I have noticed that too often one has to scroll around to access the search bar or filter. This is a webpage that tackles the problem.

The website is a compact website for searching anime. The website is first released on 9 Oct 2021.

## Blueplan
<details open>

| Process         | Tools                               |
|-----------------|-------------------------------------|
| Design          | Figma                               |
| Package, Module | npm, Webpack                        |
| Editor          | VS Code                             |
| Frontend        | Next.js, React, Tailwind, HTML, CSS |
| State Management| MobX                                |
| API             | Apollo Client, GraphQL, AniList     |
| Icon, Animation | Phosphor Icons, Framer Motion       |
| Graphics        | Gimp, Inkscape, Figma               |
| Versioning      | Git, GitHub                         |
| Testing         | cypress                             |
| CICD            | GitHub Action                       |
| Deploy          | Vercel                              |

</details>

## This project features

<ul>
    <li>Apollo Client, GraphQL & third party API</li>
    <li>Filtering and sorting by GraphQL query</li>
    <li>Framer Motion. Animated layout change</li>
    <li>foldable menu. Maximize list area</li>
    <li>y-scroll indicator. I know there is scrollbar but it is browser-dependent</li>
    <li>infinite scrolling. No more pagination button</li>
    <li>hotkeys. Search faster and easier</li>
    <li>generic components. Making components even more versatile</li>
    <li>navigable menu. High web acessibility</li>
</ul>

## Technical commentary

<ul>
    <li>Connected to API using Apollo on POST method. It seems the head does not need to be set manually this time.</li>
    <li>I have included some animation that would shift HTML elements around. I am not sure how it would look in the end product.
    <li>As I expected, the transformations due to animation is causing some performance issue. I should probably turn off
        unnecessary transitory stylings and focus only on the start and end state.</li>
    <li>Implemented y-scroll progress indicator. That was more laborious than I have first thought. I have experience with
        vector art and .svg. But to not draw but code it is an entirely different process.</li>
    <li>Incorporated MobX. Too many prop-drilling across components. Although the MobX I implemented is just slightly barely
        better than a context of useState, its benefit will manifest in larger apps. 
    </li>
    <li>Implemented infinite scrolling. Everytime a new fetch is done there is a layout change. Under existing framework there is no way to animate one layout change only. I have to separate the fetching and displaying if I want different animation behaviour.
    </li>
    <li>Revised select menu to be navigable by keyboard. Trust me when I say this is not a prevalent feature in web.
</ul>