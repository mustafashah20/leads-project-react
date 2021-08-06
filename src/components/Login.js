import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([])

    const history = useHistory()

    useEffect(() => {
        axios.get('http://localhost:5000/users/')
            .then(res => {
                setUsers(res.data)
            })
    }, []);

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        for (let i = 0; i < users.length; i++) {
            if (username === users[i].username && password === users[i].password) {
                localStorage.setItem('logged-in-user', JSON.stringify(users[i]));
                history.push('/');
                break;
            }
        }
    }

    return (
        <div>
            <h3 className="mt-3">Login Form</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group mt-3">
                    <label>Username</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}
                    />
                </div>
                <div className="form-group mt-3">
                    <label>Password</label>
                    <input type="text"
                        required
                        className="form-control"
                        value={password}
                        onChange={onChangePassword}
                    />
                </div>
                <div className="form-group mt-3">
                    <input type="submit" value="Login" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}
