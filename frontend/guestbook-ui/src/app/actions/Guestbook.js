import * as Const from "./Const"

// Action Creators
export const addNote = data => {
    return {
        type: Const.ADD_NOTE,
        data
    }
}

export const updateMessage = message => {
    return {
        type: Const.UPDATE_MSG,
        message
    }
}

export const updateAuthor = author => {
    return {
        type: Const.UPDATE_AUTHOR,
        author
    }
}

export const loadNotes = notes => {
    return {
        type: Const.LOAD_NOTES,
        notes
    }
}