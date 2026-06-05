import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Jacob's Notes",
    pageTitleSuffix: " | Notes",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "japenner.github.io/personal-notes-site",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: { name: "Cormorant Garamond", weights: [400, 500, 600], includeItalic: true },
        body: "Inter",
        code: "IBM Plex Mono",
      },
      colors: {
        // "Expedition" palette — parchment light mode, obsidian + gold dark mode
        lightMode: {
          light: "#f7f1e3",
          lightgray: "#e2dccb",
          gray: "#8d8270",
          darkgray: "#3d3425",
          dark: "#2a2318",
          secondary: "#8a6d1f",
          tertiary: "#a8852e",
          highlight: "rgba(110, 100, 80, 0.1)",
          textHighlight: "#e8d48588",
        },
        darkMode: {
          light: "#060408",
          lightgray: "#2c2735",
          gray: "#9a8e7e",
          darkgray: "#f4ecd8",
          dark: "#f4ecd8",
          secondary: "#d4b050",
          tertiary: "#f0d870",
          highlight: "rgba(255, 255, 255, 0.06)",
          textHighlight: "#d4b05055",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.RemoveFirstHeading(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
