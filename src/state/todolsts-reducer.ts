import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App";

export const todolistsReducer = (state: TodolistType[], action: MainType): TodolistType[] => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id !== action.payload.id)
        }
        case "CHANGE-FILTER": {
            return state.map(el => el.id === action.payload.todolistId ? { ...el, filter: action.payload.value } : el)
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(el => el.id === action.payload.id ? { ...el, title: action.payload.title } : el)
        }
        case "ADD-TODOLIST": {
            const newTodolist: TodolistType = { id: action.payload.newTodolistId, title: action.payload.title, filter: 'all' };
            return [newTodolist, ...state]
        }
        default: return state
    }
}

type MainType = RemoveTodolistACType | ChangeFilterACType | ChangeTodolistTitleACType | AddTodolistACType

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (id: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id
        }
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: FilterValuesType, todolistId: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            value,
            todolistId
        }
    } as const
}

type ChangeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            id,
            title
        }
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTodolistId: string, title: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            newTodolistId,
            title
        }
    } as const
}