import type { ImageMetadata } from "astro";

import playMusic from "../assets/images/play-music.jpg";
import offroad from "../assets/images/offroad.jpg";
import outdoorActivities from "../assets/images/outdoor-activities.jpg";
import techGaming from "../assets/images/tech-gaming.jpg";
import tabletopGaming from "../assets/images/tabletop-gaming.png";

export interface InterestItem {
  heading: string;
  content: string;
  image: ImageMetadata;
  alt: string;
}

export interface InterestSection {
  title: string;
  items: InterestItem[];
}

export const interestSections: InterestSection[] = [
  {
    title: "Play Music",
    items: [
      {
        heading: "Guitar & Vocals",
        content:
          "I have been a shower singer all my life, and started playing guitar in high school, so I've been playing for about 15 years off and on. I mostly play folk, country and rock covers, but have written a few original songs of my own, and really want to start performing at open mic nights when I have more time after graduation.",
        image: playMusic,
        alt: "Chasen playing guitar and singing",
      },
    ],
  },
  {
    title: "Outdoor Adventures",
    items: [
      {
        heading: "Offroading",
        content:
          "I love to go offroading really anywhere, but I'm most familiar with the Northern Nevada area. My friends and I will take my buddy's 4Runner all over and explore both well-known trails taking us to cool lookouts and awesome hidden hot springs, or just pick a path and go till the sun comes up. Either way, it's an absolute blast!",
        image: offroad,
        alt: "Offroading on a Northern Nevada trail",
      },
      {
        heading: "Fishing",
        content:
          "I have made some of the best memories of my life at the end of a fishing pole. My dad would take us out fishing for everything from bass and trout to catfish, and even when we didn't catch anything, we would just hang out and enjoy our time together. Plus, you never know what amazing things you'll get to see when you get out away from the big city! Like my Pops always says, 'A bad day fishing beats a good day of anything else!'",
        image: outdoorActivities,
        alt: "Fishing outdoors with family",
      },
    ],
  },
  {
    title: "Tech/Gaming",
    items: [
      {
        heading: "PC & Gaming",
        content:
          "I absolutely love technology! I wasn't always a 'techie' but really found my calling when I met my best friend in college who was going to school to become a developer. After that, I began just trying to fix any computer issues I would experience on my own and that was that. I also really enjoy all kinds of games from FPS to RPGs. I play 'em all, and love every second!",
        image: techGaming,
        alt: "PC gaming setup",
      },
    ],
  },
  {
    title: "Tabletop Gaming",
    items: [
      {
        heading: "Dungeons and Dragons",
        content:
          "I recently picked up this hobby. I have been interested in D&D for a long time, but after struggling to find a group, I just decided I would learn to DM and start my own group. While I am still building my first campaign and still have much to learn, I'm so excited to get everything completed and organized to start my journey! Get ready, adventurers. I'm coming for you!",
        image: tabletopGaming,
        alt: "Dungeons and Dragons tabletop game",
      },
    ],
  },
];
