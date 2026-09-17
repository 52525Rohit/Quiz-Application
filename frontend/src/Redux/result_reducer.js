import { createSlice } from "@reduxjs/toolkit"

const USER_KEY = 'quizUser'
const RESULT_KEY = 'quizResult'
const PUBLISHED_KEY = 'quizResultPublished'

function loadStoredUser(){
    try {
        return JSON.parse(localStorage.getItem(USER_KEY)) || {}
    } catch {
        return {}
    }
}

function loadStoredResult(){
    try {
        return JSON.parse(localStorage.getItem(RESULT_KEY)) || []
    } catch {
        return []
    }
}

const storedUser = loadStoredUser()

export const resultReducer = createSlice({
    name: 'result',
    initialState : {
      userId : storedUser.fullName ?? null,
      email : storedUser.email ?? null,
      result : loadStoredResult()
    },
    reducers : {
        setUserId : (state, action) => {
            state.userId = action.payload.fullName
            state.email = action.payload.email
            localStorage.setItem(USER_KEY, JSON.stringify({ fullName: action.payload.fullName, email: action.payload.email }))
        },

        updateResultAction : (state, action) => {
          const { trace, checked } = action.payload;
          state.result[trace] = checked
          localStorage.setItem(RESULT_KEY, JSON.stringify(state.result))
        },

        resetResultAction : () => {
            localStorage.removeItem(USER_KEY)
            localStorage.removeItem(RESULT_KEY)
            localStorage.removeItem(PUBLISHED_KEY)
            return {
                userId : null,
                email : null,
                result : []
            }
        },

        resetQuizResultAction : (state) => {
            state.result = []
            localStorage.removeItem(RESULT_KEY)
            localStorage.removeItem(PUBLISHED_KEY)
        }
    }
})

export const { setUserId, resetResultAction, resetQuizResultAction, updateResultAction } = resultReducer.actions;
export default resultReducer.reducer;
