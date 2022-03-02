import React from 'react'
import { faFileUpload } from "@fortawesome/free-solid-svg-icons"
import {FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import "react-bootstrap"
import { useAuth } from '../../../contexts/authContext'
import { storage, database } from "../../../firebase"
import { ROOT_FOLDER } from "../hoooks/useFolderHook" 


export default function AddFileButton({ currentFolder }) {

    const {currentUser} = useAuth()

    function handleUpload(e) {
        const file = e.target.files[0]
        if (currentFolder == null || file == null) return

        const filePath = currentFolder === ROOT_FOLDER 
        ? `${currentFolder.path.join('/')}/${file.name}`
        : `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}` 

        const uploadTask = storage
        .ref(`/files/${currentUser.uid}/${filePath}`)
        .put(file) //create upload task at location and place file inside of it

        uploadTask.on('state_changed', snapshot =>{

        }, () => {

        }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(url => {
                //console.log(url) //debug
                database.files.add({
                    url: url,
                    name: file.name,
                    createdAt: database.getCurrentTimestamp(),
                    folderId: currentFolder.id,
                    userId: currentUser.uid
                })
            })
        })

    }

  return (
        <label className="btn btn-success btn-sm m-2 mr-3">
            <FontAwesomeIcon icon={faFileUpload} />
            <input 
                type="file" 
                onChange={handleUpload} 
                style={{ opacity: 0, position: 'absolute', left: "-99999px" }} 
            />
        </label>
  )
}
