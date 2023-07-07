import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [id, idChange] = useState("");
  const [name, nameChange] = useState("");
  const [password, passwordChange] = useState("");
  const [email, emailChange] = useState("");
  const [phone, phoneChange] = useState("");
  const [country, countryChange] = useState("Nigeria");
  const [address, addressChange] = useState("");
  const [gender, genderChange] = useState("male");

  const navigate = useNavigate();

  const IsValidate = () => {
    //boolean function to test if all enteries are supplied by the user
    let Isproceed = true;
    let errormessage = "please enter the value in";
    let errormessage2 = "please enter the value in";
    let errormessage3 = "please enter the value in";
    let errormessage4 = "please enter the value in";
    if (id === null || id === "") {
      Isproceed = false;
      errormessage += " username"; // this will add the string username to the error message
      toast.warning(errormessage);
    }

    if (name === null || name === "") {
      Isproceed = false;
      errormessage2 += " Full name"; // this will add the string username to the error message
      toast.warning(errormessage2);
    }

    if (password === null || password === "") {
      Isproceed = false;
      errormessage3 += " password"; // this will add the string username to the error message
      toast.warning(errormessage3);
    }

    if (email === null || email === "") {
      Isproceed = false;
      errormessage4 += " email"; // this will add the string username to the error message
      toast.warning(errormessage4);
    } else {
      if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      } //it makes logical sense to set isproceed to true here but doing that will make all other conditions true since isproceed is what we are using to test every other condition. what will work is to use a unique condition to test only email. its not needed since it works well already
      else {
        Isproceed = false;
        toast.warning("please enter a valid email address");
      }
    }
    return Isproceed;
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    let regobj = { id, name, password, email, phone, country, address, gender };
    if (IsValidate()) {
      // this will use the isvalidate function to check if all enteries are supplied before running the handlesubmit function
      console.log(regobj);

      axios
        .post(" https://users-6h7j.onrender.com/user", regobj)
        .then((response) => {
          toast.success("Registeration successful...");
          navigate("/login");
          console.log(
            "your registeration details has been recieved successfully...",
            response
          );
        })
        .catch((err) => {
          toast.error("Registeration failed:" + err);
          console.log("Registeration failed:" + err);
        });
    }
  };
  return (
    <div className="mt-5">
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit}>
          <div className="card">
            <div className="card-header">
              <h1>User Registeration</h1>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      User Name<span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      value={id}
                      onChange={(e) => idChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Password<span className="errmsg">*</span>
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => passwordChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Full name<span className="errmsg">*</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => nameChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Email<span className="errmsg">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => emailChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Phone<span className="errmsg">*</span>
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => phoneChange(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>
                      Country<span className="errmsg">*</span>
                    </label>
                    <select
                      value={country}
                      onChange={(e) => countryChange(e.target.value)}
                      className="form-control"
                    >
                      <option value="India">India</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="China">China</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </select>
                  </div>
                </div>

                <div className="col-lg-12">
                  <div className="form-group">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      value={address}
                      onChange={(e) => addressChange(e.target.value)}
                      placeholder="Enter your address"
                    />
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="form-group">
                    <label>Gender</label>
                    <br />
                    <input
                      type="radio"
                      checked={gender === "male"}
                      onChange={(e) => genderChange(e.target.value)}
                      name="gender"
                      value="male"
                      className="app-check mx-2"
                    />
                    <label>Male</label>
                    <input
                      type="radio"
                      checked={gender === "female"}
                      onChange={(e) => genderChange(e.target.value)}
                      name="gender"
                      value="female"
                      className="app-check mx-2"
                    />
                    <label>female</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <a href="/" className="btn btn-danger mx-4">
                Back
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
