import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Create = () => {
    const [values, setValues] = useState({ // we use this to dynamically set values variable to an object with the listed items
        email: '',
        first_name: '',
        last_name: '',
        avatar: '',
    })

    const navigate = useNavigate();

    const handleSubmit = (event) => { // takes an event argument cos its working with an event listener
        event.preventDefault(); // prevents the default submit action
        axios.post('https://reqres.in/api/users', values) // posts the user entries stored in values object array in the server location represented by the url
        .then(res=> {
            console.log('Response created in server...', res)
            navigate('/') //navigates the page to home page after post has been done without errors
        })
        .catch(err => console.log(err))
    }
    return ( 
        <div className="container d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="container border bg-white shadow px-5 pt-3 rounded">
                <h1>Add a User</h1>
                <form  onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter Email" required 
                        onChange={e=> setValues({...values, email: e.target.value})}/> {/*we use an onchange listener to check for changes in input then target the entries using e.target.value. the e is for event and tells the browser its listening for an event */}
                    </div>  {/*... is a spread operator method that copies all the item in a given variable and sets it to a new one which in this case is setValues. this way value variable takes on any user entry as its new value */}
                    <div className="mb-2">
                        <label htmlFor="first_name">First Name:</label>
                        <input type="text" name="first_name" className="form-control" placeholder="Enter First Name" required
                        onChange={e=> setValues({...values, first_name: e.target.value})}/> {/*the event.target.value targets the entry here and saves it to first name in values*/}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="last-name">Last Name:</label>
                        <input type="text" name="last_name" className="form-control" placeholder="Enter Last Name" required
                        onChange={e=> setValues({...values, last_name: e.target.value})}/> {/*the event.target.value targets the entry here and saves it to lastname name in values*/}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="avatar">Profile Pic:</label>
                        <input type="url" name="avatar" className="form-control" placeholder="Enter profile url" 
                        onChange={e=> setValues({...values, avatar: e.target.value})}/>
                    </div>
                    <button className="btn btn-success mb-4">Submit</button>
                    <Link to='/' className='btn btn-primary ms-3 mb-4'>Back</Link>
                </form>
            </div>
        </div>
     );
}
 
export default Create;