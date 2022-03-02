import React from 'react'
import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


export default function File({ file }) {
  return (
    <a href={file.url} target="_blank" className='btn btn-light text-truncate w-100'>
        <FontAwesomeIcon icon={faFile} className="mr-2"/>
        {file.name}

    </a>
  )
}
