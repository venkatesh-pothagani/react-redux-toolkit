import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { RootState } from "../../store";
import { remove, fetchUsers } from "../../store/features/user-slice";
import styles from "./UserList.module.css";

const UserList = () => {
    const userList = useAppSelector((state: RootState) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    return (
        <div>
            {userList.users.map((user) => {
                return (
                    <div key={user.id}>
                        <div
                            className={styles.card}
                            onClick={(_event) => {
                                dispatch(remove(user.id));
                            }}
                        >
                            <p>ID: {user.id}</p>
                            <p>NAME: {user.name}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default UserList;
