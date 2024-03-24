import React, { useState } from "react";
import "../styles/register.scss";
const Register = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    profileImage: null,
  });

  const setInputvalue = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,

      [name]: name === "profileImage" ? files[0] : value,
    });
  };
  console.log(formData);

  return (
    <div className="register">
      <div className="register_content">
        <form className="register_content_form">
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
              style={{ maxWidth: "80px", borderRadius:"50%" }}
            />
          )}
          <button type="submit">Resgister</button>
        </form>
        <a href="/login">Already have an account? Log in here</a>
      </div>
    </div>
  );
};

export default Register;
