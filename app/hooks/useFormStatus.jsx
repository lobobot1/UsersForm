import { fetch } from '@lib/fetch'
import useSWR from 'swr'

export default function useFormStatus() {
  const swr = useSWR('/api/status', fetch)
  return { ...swr, formStatus: swr.data }
}
