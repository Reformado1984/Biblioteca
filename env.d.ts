/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SENDGRID_API_KEY: string
  readonly VITE_SENDGRID_FROM_EMAIL: string
  readonly VITE_SENDGRID_FROM_NAME: string
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
} 