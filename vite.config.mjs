import react from "@vitejs/plugin-react"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1]
const isUserOrOrganizationPage = repositoryName?.toLowerCase().endsWith(".github.io") ?? false
const isProjectPage = process.env.GITHUB_ACTIONS === "true" && Boolean(repositoryName) && !isUserOrOrganizationPage
const base = isProjectPage && repositoryName ? `/${repositoryName}/` : "/"

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL(".", import.meta.url)),
    },
  },
})
