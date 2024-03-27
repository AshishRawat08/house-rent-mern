import React, { useEffect, useState } from "react";
import "../styles/register.scss";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    profileImage: "",
  });

  const setInputvalue = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,

      [name]: name === "profileImage" ? files[0] : value,
    });
  };
  // console.log(formData);

  //submit user data
  const [passwordMatched, setPasswordMatched] = useState(true);

  useEffect(() => {
    setPasswordMatched(
      formData.password === formData.cpassword || formData.cpassword === ""
    );
  }, [formData.password, formData.cpassword]);
  const navigate = useNavigate();

  const submitUserData = async (e) => {
    e.preventDefault();

    try {
      const registerFormData = new FormData();
      for (var key in formData) {
        registerFormData.append(key, formData[key]);
      }

      const response = await fetch("http://localhost:6010/auth/register", {
        method: "POST",
        body: registerFormData,
      });

      if (response.ok) {
        navigate("/login");
       
      } else {
        console.log("error");
      }
    } catch (error) {
      console.log("Error:", error); // Log the error object for more details
    }
  };
  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form" onSubmit={submitUserData}>
          <input
            type="text"
            placeholder="First Name"
            name="fname"
            value={formData.fname}
            onChange={setInputvalue}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            name="lname"
            value={formData.lname}
            onChange={setInputvalue}
            required
          />
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={setInputvalue}
            required
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={setInputvalue}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            name="cpassword"
            value={formData.cpassword}
            onChange={setInputvalue}
            required
          />
          {!passwordMatched && (
            <p style={{ color: "red" }}>Password not matched</p>
          )}
          <input
            id="image"
            type="file"
            name="profileImage"
            accept="image/*"
            onChange={setInputvalue}
            required
            style={{ display: "none" }}
          />
          <label htmlFor="image">
            <img src="/assests/addImage.png" alt="add profile pic" />
            <p>Upload your photo</p>
          </label>

          {formData.profileImage && (
            <img
              src={URL.createObjectURL(formData.profileImage)}
              alt="profile pic"
              style={{ maxWidth: "80px", borderRadius: "50%" }}
            />
          )}
          <button type="submit" disabled={!passwordMatched}>
            Resgister
          </button>
        </form>
        <a href="/login">Already have an account? Log in here</a>
      </div>
    </div>
  );
};

export default Register;
