import { createContext, useReducer } from "react"

export const LessonContext = createContext();

const reducer = (state, action) => {
    switch(action.type) {
        case "FETCH_LESSONS": 
            return {
                lessons: action.payload
            }
        // case "SEARCH_BOOKS": 
        //     return {
        //         books: action.payload
        //     }
        // case "EDIT_BOOK": 
        //     return {
        //         authors: [action.payload, ...(state.books ?? [])]
        //     }
        // case "DELETE_BOOK":
        //     return {
        //         books: state.books.filter(book => book._id !== action.payload._id)
        //     }
        // case "ADD_BOOK":
        //     return {
        //         books: [action.payload, ...state.books]
        //     }
        default: return state
    }
}

export const LessonProvider = ({children}) => {
    const [ state, dispatch ] = useReducer(reducer, {
        lessons: null
    })
    
    return (
        <LessonContext.Provider value = {{...state, dispatch}}>
            {children}
        </LessonContext.Provider>
    )
}
