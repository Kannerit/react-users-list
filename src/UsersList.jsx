import './UsersList.css'
import { useState } from 'react'


const UsersList = () => {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        usertype: 'Admin',
    });

    const [users, setUsers] = useState([])
    const [filteredUsers, setFilteredUsers] = useState([])

    const handleInputChange = (e) => {
        const target = e.target;
        const name = target.name;
        setFormData((prevDataForm) => {
            return { ...prevDataForm, [name]: target.value };
        });
    };

    const filtering = (action) => {
        // console.log(action);

        let newFilteredList = [];

        if (action.target.name === 'showAdmins') {
            newFilteredList = users.filter((user) => {
                return user.usertype === 'Admin'
            })
        }

        else if (action.target.name === 'showUsers') {
            newFilteredList = users.filter((user) => {
                return user.usertype === 'User'
            })
        }

        else if (action.target.name === 'showAll') {
            newFilteredList = users
        }

        setFilteredUsers(newFilteredList);

    }

    const setUser = (e) => {
        e.preventDefault();
        setUsers(users.concat({ ...formData, id: Date.now() }))
    };

    const removeUser = (id) => {
        const filteredUsers = users.filter(user => user.id !== id)
        setUsers(filteredUsers)
    }



    console.log(users);
    return (
        <div className="usersList">

            <form onSubmit={setUser}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    onChange={handleInputChange}
                    value={formData.username}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="user@user.com"
                    onChange={handleInputChange}
                    value={formData.email}
                />

                <label htmlFor="usertype">User type</label>
                <select id="usertype" name="usertype" onChange={handleInputChange}>
                    <option value="Admin">Admin</option>
                    <option value="User">User</option>
                </select>
                <button>Save</button>
            </form>

            <div className="buttons">
                <button name='showAdmins' onClick={(e) => filtering(e)}>Show Admins</button>
                <button name='showUsers' onClick={(e) => filtering(e)}>Show Users</button>
                <button name='showAll' onClick={(e) => filtering(e)}>Show All</button>

            </div>


            <div className="list">

                {users.map((user) => {
                    return (
                        <div className="userItem" key={user.id} onClick={() => removeUser(user.id)}>
                            <p>{user.username}</p>
                            <p>{user.email}</p>
                            <p>{user.usertype}</p>
                        </div>
                    );
                })}
            </div>

        </div>
    )
}


export default UsersList;