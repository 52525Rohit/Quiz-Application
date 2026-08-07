import { createSlice } from "@reduxjs/toolkit"

const TRACE_KEY = 'quizTrace'

function loadStoredTrace(){
    const saved = Number(localStorage.getItem(TRACE_KEY))
    return Number.isInteger(saved) && saved >= 0 ? saved : 0
}

export const questionReducer = createSlice({
    name: 'questions',
    initialState : {
        queue: [],
        answers: [],
        trace: loadStoredTrace()
    },

    reducers : {
        startExamAction : (state, action) => {
            let { question, answers } = action.payload
            return{
               ...state,
               queue : question, answers
            }
        },
        moveNextAction : (state) => {
           const trace = state.trace + 1
           localStorage.setItem(TRACE_KEY, trace)
           return {
            ...state,
            trace
           }
        },

        movePrevAction : (state) => {
            const trace = state.trace - 1
            localStorage.setItem(TRACE_KEY, trace)
            return {
                ...state,
                trace
            }
        },
        resetAllAction : () => {
            localStorage.removeItem(TRACE_KEY)
            localStorage.removeItem('quizTimer')
            return {
                queue: [],
                answers: [],
                trace: 0
            }
        }
    }

})

export const { startExamAction, moveNextAction, movePrevAction, resetAllAction } = questionReducer.actions;
export default questionReducer.reducer;
