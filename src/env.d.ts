/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // add more environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}