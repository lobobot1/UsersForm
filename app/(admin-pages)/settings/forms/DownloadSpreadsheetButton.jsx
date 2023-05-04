'use client'
import Download from '@/app/components/icons/Download'
import useForms from '@/app/hooks/useForms'

const DownloadSpreadsheetButton = () => {
  const { forms, isLoading } = useForms()

  if (!forms || isLoading || forms.data.length === 0) {
    return null
  }

  return (
    <a
      href='/api/db/export'
      title='Download as spreadsheet'
      className='flex gap-2 disabled'
      target='_blank'
    >
      <Download />
    </a>
  )
}

export default DownloadSpreadsheetButton
