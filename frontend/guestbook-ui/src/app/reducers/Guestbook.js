import * as Const from "../actions/Const"

// Reducers
const guestBookReducer = (state = { notes: [] }, action) => {
    switch (action.type) {
        case Const.ADD_NOTE:
            return {
                ...state,
                notes: [...state.notes, { ...action.data }]
            }
        case Const.UPDATE_MSG:
            return {
                ...state,
                message: action.message
            }
        case Const.UPDATE_AUTHOR:
            return {
                ...state,
                author: action.author
            }
        case Const.LOAD_NOTES:
            return {
                ...state,
                notes: action.notes
            }
        default:
            return state
    }
}

export default guestBookReducer
