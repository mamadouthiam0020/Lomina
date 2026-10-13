import { usePageMeta } from '../hooks/usePageMeta'

// Renders nothing; keeps document metadata in sync with the current route.
export default function MetaManager() {
  usePageMeta()
  return null
}
