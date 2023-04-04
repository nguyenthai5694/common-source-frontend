import React from 'react'
import { MAX_WORD_NOTES } from 'app/const/common.const'

export default function MaxWordNotes({
  id = '',
  message = MAX_WORD_NOTES,
}) {
  return (
    <div className='p-max-word__note' id={id}>
      {message}
    </div>
  )
}