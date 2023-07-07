import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

function Login() {
  const [username, usernameUpdate] = useState("");
  const [password, passwordUpdate] = useState("");

  const navigate = useNavigate();

  useEffect(()=>{
    sessionStorage.clear();
  }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    if (validate()) { //all conditions in the validate boolean function has to run before the get can be triggered here
      // this will run a get request as long as user entry is not null or empty
      // console.log('Proceed! Your login is successful...')
      axios
        .get("https://users-6h7j.onrender.com/user/" + username ) //this will return a user detail with the supplied unique username hence why username is added. if the entered username is not on the db it will return an error
        .then((res) => {
           if (Object.keys(res.data).length === 0) {
             // this condition will check ther server response using the object key method then count its length.if its length is zero which means the server returned nothin then it means that the username entered is not on the db
             toast.error("please enter valid username");
             console.log('wrong username entered');
           }  else { //this condition will run once the other condition is met otherwise it is ignored
             if (res.data.password === password) {
               toast.success("login successful...");
               sessionStorage.setItem('username', username)
               navigate("/");
               console.log('login successful')
            } else {
               toast.error("Password not correct");
             }
            }
          console.log('stuff...',res.data)
        })
        .catch((err) => {
          toast.error("This username does not exist...");
          console.log("login failed due to :" + err);
        });
    }
  };

  const validate = () => {
    //this wiil test to ensure that user entry is not empty for both fields
    let result = true;
    if (username === "" || username === null) {
      result = false;
      toast.warning("Please Enter Username");
    }
    if (password === "" || password === null) {
      result = false;
      toast.warning("Please Enter Password");
    }

    return result;
  };
  return (
    <div className="row mt-5">
      <div className="offset-lg-3 col-lg-6">
        <form onSubmit={ProceedLogin} className="container">
          <div className="card">
            <div className="card-header">
              <h2>User Login</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>
                  User Name <span className="errmsg">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Username..."
                  value={username}
                  onChange={(e) => usernameUpdate(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>
                  Password <span className="errmsg">*</span>
                </label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="password..."
                  value={password}
                  onChange={(e) => passwordUpdate(e.target.value)}
                />
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
              <Link className="btn btn-success mx-4" to={"/register"}>
                New User?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
