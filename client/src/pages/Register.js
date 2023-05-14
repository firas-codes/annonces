import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// const url = "http://10.0.2.15:5001/server/auth/register";
const url = "/server/auth/register";

const Register = () => {
  

  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [telephone, setTelephone] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nom && !prenom && !email && !mdp && !telephone) {
      alert("please provide all fields");
    } else {
      try {
        const response = await axios.post(url, {
          nom,
          prenom,
          email,
          mdp,
          telephone,
        });

        const userData = await response.data;
        console.log("userdata from register", userData);
            

        // dispatch(login({ user, isAdmin, isDoctor, isPatient }));
        // navigate('/dashboard');
        navigate("/");
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <section>
      <h2>Register form</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="name">nom:</label>
        <input
          required
          type="text"
          id="name"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <label htmlFor="lastName">prenom:</label>
        <input
          required
          type="text"
          id="lastName"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
        />
        <label htmlFor="email">email:</label>
        <input
          required
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">mot de passe:</label>
        <input
          required
          type="password"
          id="password"
          value={mdp}
          onChange={(e) => setMdp(e.target.value)}
        />
        
        <label htmlFor="phone">telephone:</label>
        <input
          required
          type="text"
          id="phone"
          value={telephone}
          onChange={(e) => setTelephone(e.target.value)}
        />
        <hr />
        <button type="submit" className="btn">
          register
        </button>
      </form>
    </section>
  );
};

export default Register;
