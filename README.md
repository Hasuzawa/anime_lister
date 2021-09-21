## About
This is a personal project on frontend API. One of the goal is to provide a streamlined experience and maximise the
effecive usage of screen area (optimised for 1440px x 900px screen). I have noticed that too often one has to scroll
around to access the search bar or filter. This is a webpage that tackles the problem.

## Blueplan
<details open>

| Process         | Tools                               |
|-----------------|-------------------------------------|
| Design          | Figma                               |
| Package, Module | npm, Webpack                        |
| Editor          | VS Code                             |
| Frontend        | Next.js, React, Tailwind, HTML, CSS |
| API             | Apollo Client, GraphQL, AniList     |
| Icon, Animation | Phosphor Icons, Framer Motion       |
| Graphics        | Gimp, Inkscape                      |
| Versioning      | Git, GitHub                         |
| Testing         | cypress                             |
| CICD            | GitHub Action                       |
| Deploy          | (?)                                 |
| Analytics       | (?)                                 |

</details>

## This project features

<ul>
    <li>Apollo Client, GraphQL & third party API.</li>
    <li>Framer Motion. Making website like a mobile app.</li>
</ul>
to do list: shift key events, sorting

## In search of site name...
~~Anime Chart~~ (taken, anichart)<br />
~~Anime Lister~~ (taken, animelister)

## Technical commentary

<ul>
    <li>Connected to API using Apollo on POST method. It seems the head does not need to be set manually this time.</li>
    <li>I have included some animation that would shift HTML elements around. I am not sure how it would look in the end product.
    <li>As I expected, the transformations due to animation is causing some performance issue. I should probably turn off
        unnecessary transitory stylings and focus only on the start and end state.</li>
    <li>implemented y-scroll progress indicator. That was more laborious than I have first thought. I have experience with
        vector art and .svg. But to not draw but code it is an entirely different process.
</ul>