import React from 'react'
import { Container } from 'react-bootstrap'
import AddFolderButton from './AddFolderButton'
import Navbar from './Navbar'
import { useFolder } from "../hoooks/useFolderHook"

export default function Dashboard() {
  const  { folder } = useFolder("ell4tZLUb3xDZqTSVp0y")
  //console.log(state)


  return (
    <>
        <Navbar/>
            <Container fluid>
                <AddFolderButton currentFolder={folder}/>
            </Container>
    </>
  )
}
