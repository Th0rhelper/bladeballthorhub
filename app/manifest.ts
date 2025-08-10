import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Stumble League",
    short_name: "Stumble League",
    description: "The ultimate gaming experience with Stumble League",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ef4444",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  }
}
