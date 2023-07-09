import { Link } from "react-router-dom";
import axios from "axios";
import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Update = () => {
     
    //since this is an update method we'd need to first get a particular response a user selects by clicking
    //and then make changes to the entries and submit. so this is a read and create method in one
    // since the update method needs a unique id to be able to target a particular server value we reuse read http method to get the particular item we need
   

    const [values, setValues] = useState({ // we use this to dynamically set values variable to an object with the listed items
        email: '',
        first_name: '',
        last_name: '',
        avatar: '',
    })
   
    // this gets the item we want to update using its unique id and its url
    const {id} = useParams();   //this hook helps us target the id of the item we are trying to read
    useEffect(()=>{
        axios.get('https://users-6h7j.onrender.com/user/' +id) // the id tells the server api that we need the entry with the particular id that the param hook extracts
        .then(res => {    // we use this to handle the api call response
            console.log("Data ready for update:::", res);
            setValues(res.data) // we update the value of data with the api response 
        })
        .catch((err) =>console.log(err))
    }, [id])

    //this handles the update function by triggering the onclick event and then 
    //catching the user enteries and setting them to setvalue hook after which the handle function
    //is called by the onsubmit event. the handle update then takes the entries and and puts them on the server
    //with the url location
    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('https://users-6h7j.onrender.com/user/'+id, values) // posts the user entries stored in values object array in the server location represented by the url and id. the id ensures that the new entery is stored as a replacement
        .then(res=> {
            console.log('Response updated...', res)
            navigate('/') //navigates the page to home page after post has been done without errors
        })
        .catch(err => console.log(err))
    }

    const navigate = useNavigate()
    

    return ( 
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 rounded">
                <h1>Update User</h1>
                <form onSubmit={handleUpdate}>
                <div className="mb-2">
                        <label htmlFor="last-name">Profile Pic Url:</label>
                        <input type="text" name="last_name" className="form-control" placeholder="Enter Last Name" required
                        value={values.last_name} onChange={e=> setValues({...values, last_name: e.target.value})}/> {/*the event.target.value targets the entry here and saves it to lastname name in values*/}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email:</label>
                        <input type="email" name="email" className="form-control" placeholder="Enter Email" required 
                        value={values.email} onChange={e=> setValues({...values, email: e.target.value})}/> {/*the value objects supplies the server response to the input fields */}
                    </div> 
                    <div className="mb-2">
                        <label htmlFor="first_name">First Name:</label>
                        <input type="text" name="first_name" className="form-control" placeholder="Enter First Name" required
                        value={values.first_name} onChange={e=> setValues({...values, first_name: e.target.value})}/> 
                    </div>
                    <div className="mb-2">
                        <label htmlFor="last-name">Last Name:</label>
                        <input type="text" name="last_name" className="form-control" placeholder="Enter Last Name" required
                        value={values.last_name} onChange={e=> setValues({...values, last_name: e.target.value})}/> {/*the event.target.value targets the entry here and saves it to lastname name in values*/}
                    </div>
                    <div className="mb-2">
                        <label htmlFor="avatar">Profile Pic:</label>
                        <input type="url" name="avatar" className="form-control" placeholder="Enter profile url" 
                        value={values.avatar} onChange={e=> setValues({...values, avatar: e.target.value})}/>
                    </div>
                    <button className="btn btn-success mb-4">Update</button>
                    <Link to='/' className='btn btn-primary ms-3 mb-4'>Back</Link>
                </form>
            </div>
        </div>
     );
}
 
export default Update; 