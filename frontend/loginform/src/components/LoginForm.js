import bcrypt from "bcryptjs";
import axios from "axios";
import validator from "validator";
import "./loginform.css";
import { useState } from "react";

const LoginForm = () => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserData((currentData) => ({
      ...currentData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);

    const url = "http://localhost:8080/create";

    axios
      .get(url, {
        email: userData.email,
        password: hash,
      })
      .then(function (response) {
        console.log(response);
        alert(response.data.message);
      })
      .catch(function (error) {
        console.log(error);
      });

    console.log(userData);
  };

  // get request the database with email and password
  //

  return (
    <div className="formLayout">
      <div className="formTitle">
        <h1>Log in</h1>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="firstFormDiv">
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={onChangeHandler}
              value={userData.email}
              required
            />
          </label>
          <label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={onChangeHandler}
              value={userData.password}
              required
              min={6}
              max={20}
              pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$"
              title="
                  Password must be between 6 to 20 characters &#013; and contain at
                  least one numeric digit, one uppercase and one lowercase
                  letter
              "
            />
          </label>
          <label></label>

          <button type="submit">Log in</button>

          <a href="#">Create an account</a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;