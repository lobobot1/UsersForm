import { fetch } from '@lib/fetch'
import useSWR from 'swr'

export default function useFormDetail(id, enabled = true) {
  const swr = useSWR(enabled ? `/api/forms/${id}` : null, fetch)

  return { ...swr, form: swr.data }
}
