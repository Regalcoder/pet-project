import { useEffect, useState } from "react";
import axios from "axios";
import "../src/home.css";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const usenavigate = useNavigate();
  useEffect(() => {
    let username = sessionStorage.getItem("username");
    if (username === "" || username === null) {
      usenavigate("/login");
    }
  }, [usenavigate]);
  const [data, setData] = useState([]); //we declare a variable data and assign it a state of array then use the setData to assign new valuews to data array
  useEffect(() => {
    axios
      .get("https://users-6h7j.onrender.com/user") // an axios get request to a reqres api server
      .then((res) => {
        // we use this to handle the api call response
        console.log("List of user Data:::", res);
        setData(res.data); // we update the value of data with the api response
      })
      .catch((err) => console.log(err));
  }, []); // the empty array here tells the browser to run our render only once

  const handleDelete = (id) => {
    const confirm = window.confirm("would you like to Delete this entry?");
    if (confirm) {
      axios
        .delete("https://users-6h7j.onrender.com/user/" + id)
        .then((res) => {
          console.log("entry deleted...", res);
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <div className="header">
        <Link to={"/"}>Home</Link>
        <Link style={{ float: "right" }} to={"/login"}>
          Logout
        </Link>
      </div>
      <div className="d-flex flex-column w-100 justify-content-center align-items-center bg-light vh-50">
        <h1>List of Users</h1>
        <div className="table-responsive w-100 rounded bg-white border shadow p-4">
          <div className="d-flex justify-content-end mb-3">
            {/* <Link to="/create" className="btn btn-success">
              Add +
            </Link> */}
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">User Name</th>
                <th scope="col">Email</th>
                <th scope="col">Full Name</th>

                <th scope="col">Profile Pic</th>
                <th scope="col">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                (
                  d,
                  i //since body data is dynamic and not static we use the map method to pick each returned data and display individually by id
                ) => (
                  //its given two arguments where d is the returned data and i is the unique id of each data
                  <tr key={i}>
                    {" "}
                    {/*the i is assigned to a variable key in the table row telling the map method that each row will be filled with items and their ids*/}
                    <td>{d.id}</td>
                    <td>{d.email}</td>
                    <td>{d.name}</td>
                    <td>
                      <img
                        src={d.avatar}
                        width="120px"
                        alt="User Profile Pic"
                      />
                    </td>
                    <td>
                      <Link
                        to={`/read/${d.id}`}
                        type="submit"
                        className="btn btn-sm btn-info me-2"
                      >
                        Read
                      </Link>
                      {/*we use an id on the locator cos we are targeting a single entry*/}
                      <Link
                        to={`/update/${d.id}`}
                        className="btn btn-sm btn-primary me-2"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={(e) => handleDelete(d.id)}
                        type="submit"
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>{" "}
                      {/*an event listener  */}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
