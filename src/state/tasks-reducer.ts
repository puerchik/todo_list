import { act } from "@testing-library/react";
import { TasksStateType } from "../App";
import { v1 } from "uuid";


export const tasksReducer = (state: TasksStateType, action: MainType): TasksStateType => {
    switch (action.type) {
        case "ADD-TODOLIST-TASKS": {
            return { ...state, [action.payload.newTodolistId]: [] }
        }
        case "REMOVE-TODOLIST-TASK": {
            return { ...state }
        }
        case "REMOVE-TASK": {
            return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(el => el.id !== action.payload.id) }
        }
        case "ADD-TASK": {
            const task = { id: v1(), title: action.payload.title, isDone: false };
            return { ...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]] }
        }
        case "CHANGE-STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
                    ? { ...el, isDone: action.payload.isDone }
                    : el)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.id
                    ? { ...el, title: action.payload.newTitle }
                    : el)
            }
        }
        default: return state
    }
}

type MainType = AddTodolistTasksACType | RemoveTodolistTaskACType | RemoveTaskACType | AddTaskACType | ChangeStatusACType | ChangeTaskTitleACType

type AddTodolistTasksACType = ReturnType<typeof addTodolistTasksAC>
export const addTodolistTasksAC = (newTodolistId: string) => {
    return {
        type: "ADD-TODOLIST-TASKS",
        payload: {
            newTodolistId
        }
    } as const
}

type RemoveTodolistTaskACType = ReturnType<typeof removeTodolistTaskAC>
export const removeTodolistTaskAC = () => {
    return {
        type: "REMOVE-TODOLIST-TASK"
    } as const
}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId,
            id
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            title,
            todolistId
        }
    } as const
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (id: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-STATUS",
        payload: {
            id,
            isDone,
            todolistId
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (id: string, newTitle: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            id,
            newTitle,
            todolistId
        }
    } as const
}