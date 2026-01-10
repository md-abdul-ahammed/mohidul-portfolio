import localFont from "next/font/local";

export const neueMontreal = localFont({
  src: [
    {
      path: "./NeueMontreal-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "./NeueMontreal-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./NeueMontreal-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./NeueMontreal-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-neue-montreal",
});

export const NeueMachina = localFont({
  src: [
    {
      path: "./NeueMachina-Regular.otf",
      weight: "400", 
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-neue-machina",
});