import React, { ChangeEvent, useState } from "react"

type PropsType = {
    oldTitle: string
    callback: (newTitle: string) => void
}

export const EditableSpan = (props: PropsType) => {
    const [edit, setEdit] = useState(false)
    const [newTitle, setNewTitle] = useState(props.oldTitle)

    const editHandler = () => {
        setEdit(!edit)
        if (edit) {
            props.callback(newTitle)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        edit
            ? <input onChange={onChangeHandler} value={newTitle} onBlur={editHandler} autoFocus />
            : <span onDoubleClick={editHandler}>{newTitle}</span>
    )
}