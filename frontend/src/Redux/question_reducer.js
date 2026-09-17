import { createSlice } from "@reduxjs/toolkit"

const TRACE_KEY = 'quizTrace'
const QUEUE_KEY = 'quizQueue'

function loadStoredTrace(){
    const saved = Number(localStorage.getItem(TRACE_KEY))
    return Number.isInteger(saved) && saved >= 0 ? saved : 0
}

function loadStoredQueue(){
    try {
        return JSON.parse(localStorage.getItem(QUEUE_KEY)) || { queue: [], answers: [] }
    } catch {
        return { queue: [], answers: [] }
    }
}

const storedQueue = loadStoredQueue()

export const questionReducer = createSlice({
    name: 'questions',
    initialState : {
        queue: storedQueue.queue,
        answers: storedQueue.answers,
        trace: loadStoredTrace()
    },

    reducers : {
        startExamAction : (state, action) => {
            let { question, answers } = action.payload
            localStorage.setItem(QUEUE_KEY, JSON.stringify({ queue: question, answers }))
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
            localStorage.removeItem(QUEUE_KEY)
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
