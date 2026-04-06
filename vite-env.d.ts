/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SQUARE_APPLICATION_ID: string
  readonly VITE_SQUARE_LOCATION_ID: string
  readonly VITE_SQUARE_ENABLED: string
  readonly VITE_ORDER_ENDPOINT: string
  readonly VITE_ADMIN_EMAIL: string
  readonly VITE_ETRANSFER_EMAIL: string
  readonly VITE_SITE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
