import TodoList from "./features/todo-list/TodoList";
import UserList from "./features/users-list/UserList";

import "./App.css";

function App() {
    return (
        <div className="App">
            <TodoList />
            <UserList />
        </div>
    );
}

export default App;
