import { fetch } from '@lib/fetch'
import useSWR from 'swr'

export default function useQuestions() {
  const swr = useSWR('/api/questions', fetch)
  return { ...swr, questions: swr.data }
}
