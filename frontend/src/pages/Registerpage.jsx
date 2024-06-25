import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Register.scss";
import { useNavigate } from "react-router-dom";

const Registerpage = () => {
  const [Formdata, setFormdata] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmpassword: "",
    profileImage: null,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormdata({
      ...Formdata,
      [name]: name === "profileImage" ? files[0] : value,
    });
  };

  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    setPasswordMatch(
      Formdata.password === Formdata.confirmpassword ||
        Formdata.confirmpassword === ""
    );
  }, [Formdata.password, Formdata.confirmpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const register_form = new FormData();
      register_form.append("firstname", Formdata.firstname);
      register_form.append("lastname", Formdata.lastname);
      register_form.append("email", Formdata.email);
      register_form.append("password", Formdata.password);
      register_form.append("profileImage", Formdata.profileImage);

      const response = await axios.post(
        "http://localhost:5000/auth/register",register_form
      );

      if (response.status === 200) {
        navigate("/login");
      } else {
        console.log("Registration failed", response.data.message);
      }
    } catch (err) {
      console.log("Registration failed", err.message);
    }
  };

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={handleSubmit}>
          <input
            placeholder="First Name"
            name="firstname"
            value={Formdata.firstname}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Last Name"
            name="lastname"
            value={Formdata.lastname}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Email"
            type="email"
            name="email"
            value={Formdata.email}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Password"
            name="password"
            type="password"
            value={Formdata.password}
            onChange={handleChange}
            required
          />
          <input
            placeholder="Confirm Password"
            name="confirmpassword"
            type="password"
            value={Formdata.confirmpassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <p style={{ color: "red" }}>Passwords don't match</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={handleChange}
            style={{ display: "none" }}
            required
          />
          <label htmlFor="image">
            <img src="./assets/addImage.png" alt="Add Pics Here" />
            <p>Upload Your Photo</p>
          </label>
          {Formdata.profileImage && (
            <img
              src={URL.createObjectURL(Formdata.profileImage)}
              alt="Profile Pic"
              style={{ maxWidth: "80px" }}
            />
          )}
          <button type="submit" disabled={!passwordMatch}>
            Register
          </button>
        </form>
        <a href="/login">Already have an account? Login Here</a>
      </div>
    </div>
  );
};

export default Registerpage;
