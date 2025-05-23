import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

import { generateBreadcrumbsData } from './config/breadcrumbsDataGenerator'
import { createConfigureFunction } from './config/common'
import { headConfig } from './config/head'
import { ignoreDeadLinksConfig } from './config/ignoreDeadLinks'
import { localesConfig } from './config/locales'
import { markdownConfig } from './config/markdown'
import { rewritesConfig } from './config/rewrites'
import { localeSearchConfig } from './config/search'
import { sitemapConfig } from './config/sitemap'

export default defineConfig({
  srcDir: 'src',
  outDir: './dist',
  srcExclude: [],
  scrollOffset: 'header',
  cleanUrls: true,
  lastUpdated: true,
  locales: localesConfig,
  sitemap: sitemapConfig,
  markdown: markdownConfig,
  head: headConfig,
  rewrites: rewritesConfig,
  ignoreDeadLinks: ignoreDeadLinksConfig,
  vue: {
    template: {
      compilerOptions: {
        // treat all tags with a dash as custom elements
        isCustomElement: tag => tag.includes('-'),
      },
      transformAssetUrls: {
        Image: ['src', 'set-src'],
        LazyImage: ['src', 'set-src'],
      },
    },
  },
  themeConfig: {
    search: {
      provider: 'local',
      options: localeSearchConfig,
    },
  },
  vite: {
    configFile: fileURLToPath(import.meta.resolve('../vite.config.ts')),
  },
  ...createConfigureFunction(),
  transformPageData(pageData, context) {
    generateBreadcrumbsData(pageData, context)
  },
})
