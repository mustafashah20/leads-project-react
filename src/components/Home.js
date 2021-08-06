import React, { useEffect, useState } from 'react'
import CreateLead from '../components/CreateLead'
import MainList from './MainList'
import { useHistory } from 'react-router-dom'

export default function Home() {

    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('logged-in-user')) {
            setUserLoggedIn(true);
        }
        else {
            history.push('/');
        }
    }, [])

    const onLogout = () => {
        localStorage.removeItem('logged-in-user');
        history.push('/');
    }

    return (
        <div>
            {
                userLoggedIn &&
                <div>
                    <div className="row d-flex justify-content-end mt-3">
                        <div className="col-auto">
                            <button type="button" className="btn btn-outline-danger" onClick={onLogout}>
                                Logout
                            </button>
                        </div>
                    </div>
                    <CreateLead />
                    <MainList />
                </div>
            }
        </div>
    )
}
