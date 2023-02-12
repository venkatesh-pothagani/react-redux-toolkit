import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { add, remove } from "../../store/features/todo-slice";
import styles from "./TodoList.module.css";

const TodoList = () => {
    const dispatch = useAppDispatch();
    const todoList = useAppSelector((state: RootState) => state.todo);
    const [title, setTitle] = useState(" ");
    const [description, setDescription] = useState(" ");

    return (
        <div>
            <div className={styles.card}>
                <div>
                    <input
                        type="text"
                        name="title"
                        id="title"
                        placeholder="ENTER TODO TITTLE"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="text"
                        name="description"
                        id="description"
                        placeholder="ENTER TODO DESCRIPTION"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </div>

                <div>
                    <input
                        type="button"
                        value="SAVE TODO"
                        onClick={(_event) => {
                            dispatch(
                                add({
                                    id: Math.round(Math.random() * 10000),
                                    title,
                                    description,
                                    createdAt: Date.now(),
                                })
                            );
                        }}
                    />
                </div>
            </div>

            <div hidden={todoList.count == 0 ? true : false}>
                {todoList.list.map((todo) => {
                    return (
                        <div
                            key={todo.id}
                            className={styles.todo}
                            onClick={(_event) => {
                                dispatch(remove(todo.id));
                            }}
                        >
                            <p>TITLE: {todo.title}</p>
                            <p>DESCRIPTION: {todo.description}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TodoList;
