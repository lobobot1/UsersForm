import { fetch } from '@lib/fetch'
import { useCallback } from 'react'
import useSWR from 'swr'

export default function useFormDetail(id) {
  const swr = useSWR(`/api/forms/${id}`, fetch)
  
  return { ...swr, form: swr.data }
}
