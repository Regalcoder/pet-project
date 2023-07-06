import axios from "axios";
import { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom";

const Read = () => {

    const [data, setData] = useState([]) //we declare a variable data and assign it a state of array then use the setData to assign new valuews to data array
    const {id} = useParams(); //this hook helps us target the id of the item we are trying to read
    useEffect(()=>{
        axios.get('https://reqres.in/api/users/' +id) // the id tells the server api that we need the entry with the particular id that the param hook extracts
        .then(res => {    // we use this to handle the api call response
            setData(res.data.data) // we update the value of data with the api response 
        })
        .catch((err) =>console.log(err))
    }, [id])


    return ( 
        <div className="d-flex w-100 vh-100 justify-content-center align-items-center bg-light">
            <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
                <h3>Detail of User</h3>
                <div className="mb-3 d-flex flex-column"> 
                    <strong>Profile Pic: </strong>
                    <img width='120px' src={data.avatar} alt="" />
                </div>
                <div className="mb-2">
                    <strong>Email: {data.email}</strong>
                </div>
                <div className="mb-2">
                    <strong>First Name: {data.first_name}</strong>
                </div>
                <div className="mb-2">
                    <strong>Last Name: {data.last_name}</strong>
                </div>
                
                <Link to={`/update/${id}`} className="btn btn-success">Edit</Link>
                <Link to='/' className="btn btn-primary ms-3">Back</Link>
            </div>
        </div>
     );
}
 
export default Read;