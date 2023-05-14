import axios from 'axios';
import React, { useState } from 'react'
import { useFetchPays } from '../../customHooks/useFetchPays';
import { Link } from 'react-router-dom';
import { AiFillEdit } from 'react-icons/ai';


const url = "/server/regions/pays";
// const url = "http://localhost:3001/server/regions/pays";

const Pays = (paysprops) => {

  const [nompays, setNompays] = useState('');
  const [message, setMessage] = useState("");

  const data = useFetchPays(url);
  const { pays } = data;

  // console.log("pays props",paysprops);

  const addCountry = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { nompays });
      if (response.data) {
        setNompays("");
        setMessage(
          `la pays ${nompays} est ajoutée avec succès`
        );
        window.location.reload(false);
      }
      
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Pays</h2>
      <div>
        <h3>
          list des pays
        </h3>
        <table
          style={{
            borderWidth: "2px",
            borderColor: "#aaaaaa",
            borderStyle: "solid",
          }}
        >
          <thead>
            <tr>
              <th>id pays</th>
              <th>nom pays</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {pays.map((singlepays) => {
              const { idpays, nompays } = singlepays;
              return (
                <tr key={idpays}>
                  <td>
                    {idpays}
                  </td>
                  <td>{nompays}</td>
                  <td>
                    <Link to={`update/${idpays}/${nompays}`}>
                      <AiFillEdit />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h3>ajouter une pays</h3>
        <form onSubmit={addCountry}>
          <label htmlFor="pays">nom pays</label>
          <br />
          <input
            type="text"
            id="pays"
            placeholder="eg. Tunisie, France"
            value={nompays}
            onChange={(e) => setNompays(e.target.value)}
          />
          <button type="submit">ajouter</button>
          <br />
          <span>{message}</span>
        </form>
      </div>
    </div>
  )
}

export default Pays