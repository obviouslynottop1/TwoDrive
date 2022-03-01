import { useEffect, useReducer } from "react";
import { database } from "../../../firebase";

const ACTIONS = {  //set to private vairable (only accessable within this file)
    SELECT_FOLDER: 'select-folder',
    UPDATE_FOLDER: 'update-folder',
}

const ROOT_FOLDER = {
    name: 'Root', 
    id: null, 
    path: [] 
}


function reducer(state, { type, payload }) {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolder: []
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }
        

            default: 
                return state

        
    }

}

export function useFolder(folderId = null, folder=null) { //sets null to ensure no firebase errors
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolder: [],
        childFiles: []
    })

    useEffect(() => {
        dispatch({ 
            type: ACTIONS.SELECT_FOLDER,
            payload : { folderId, folder} 
        })
    }, [folderId, folder])

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER}
            })
        } 

        database.folders.doc(folderId).get().then(doc => {
            console.log(doc.data())
        }).catch(() => {
            dispatch({ 
                type: ACTIONS.SELECT_FOLDER,
                payload : { folderId, folder} 
            })
    
        })
    }, [folderId])


    return state
}