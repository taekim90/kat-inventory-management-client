import { useParams } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserEdit({ currentUser, setCurrentUser, users }) {

    const { id } = useParams()
    const [manager, setManager] = useState(false);
    const [form, setForm] = useState(currentUser)

    const foundUser = users.find(user => {
        return user._id === id
    })

    const handleManager = () => {
        setManager(!manager)
        if (manager === true) {
            console.log('manager')
        } else {
            console.log('not manager')
        }
    };

    useEffect(() => {
        const managerStatus = {
            manager: manager
        }
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/${id}`, managerStatus)
        .then(response => {
            console.log(response.data)
        })
    }, [manager])

    // console.log("CurrentUser", currentUser)
    // console.log("Found User ", foundUser)

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            await axios.put(`${process.env.REACT_APP_SERVER_URL}/api-v1/users/:id`, form)
            .then(response => {
                console.log(response.data)
                return axios.get(`${process.env.REACT_APP_SERVER_URL}/api-v1/users`)
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <h1>User Info</h1> 
            {/* {userInfo} */}
            {foundUser && currentUser ? 
                <>
                    <h4>Username: {foundUser.username}</h4>
                    <h4>Name: {foundUser.firstname} {foundUser.lastname}</h4>
                    <h4>Email: {foundUser.email}</h4>
                    <h4>Manager Privileges: 
                        <input 
                            type="checkbox" 
                            id="manager" 
                            name="manager" 
                            checked={manager} 
                            onChange={handleManager}>
                        </input>
                    </h4>
                </>
                :
                <></>
            }

            {currentUser && foundUser ? 
                <>
                    {foundUser._id === currentUser.id ?
                        <>
                            <h2>Update User Info</h2>
                            <form onSubmit={handleSubmit}>
                                <p>
                                    <label htmlFor='firstname'>First Name:</label>
                                    <input
                                        type='text'
                                        id='firstname'
                                        value={form.firstname}
                                        onChange={e => setForm({ ...form, firstname: e.target.value })}
                                    />
                                </p>
                                <p>
                                    <label htmlFor='lastname'>Last Name:</label>
                                    <input
                                        type='text'
                                        id='lastname'
                                        value={form.lastname}
                                        onChange={e => setForm({ ...form, lastname: e.target.value })}
                                    />
                                </p>
                                <p>
                                    <label htmlFor='password'>Password:</label>
                                    <input
                                        type='password'
                                        id='password'
                                        value={form.password}
                                        onChange={e => setForm({ ...form, password: e.target.value })}
                                        // placeholder='enter your password...'
                                    />
                                </p>
                                <button type='submit'>Submit</button>
                            </form>
                        </>
                        :
                        <></>
                    }
                </>
                : 
                <></>
            }
        </>
    )
}