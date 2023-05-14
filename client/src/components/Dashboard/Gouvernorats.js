import axios from 'axios';
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';


// const url = "http://localhost:3001/server/regions/gouvernorats";
const url = "/server/regions/gouvernorats";

const Gouvernorats = ({ gouvernoratsprops, paysprops }) => {
  const [nomgouvernorat, setNomgouvernorat] = useState('');
  const [message, setMessage] = useState("");
  const [selectedPays, setSelectedPays] = useState(null);

  const addGouvernorat = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { nomgouvernorat, idpays:selectedPays });
      if (response.data) {
        setNomgouvernorat("");
        setMessage(
          `la gouvernorat ${nomgouvernorat} est ajoutée avec succès`
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
          list des gouvernorats
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
              <th>id gouvernorat</th>
              <th>nom gouvernorat</th>
              {/* <th>id pays</th> */}
              <th>nom pays</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {gouvernoratsprops.map((gouvernorat, index) =>
            // const { idgouvernorat, nomgouvernorat,idpays } = gouvernorat;
            (
              <tr key={index}>
                <td>
                  {gouvernorat.idGouvernorat}
                </td>
                <td>{gouvernorat.nomGouvernorat}</td>
                {/* <td>{gouvernorat.idpays}</td> */}
                <td>{gouvernorat.nomPays}</td>
                <td>
                  <Link to={`update/${gouvernorat.idgouvernorat}/${gouvernorat.nomgouvernorat}`}>
                    <AiFillEdit />
                  </Link>
                </td>
              </tr>
            )
            )}
          </tbody>
        </table>
      </div>

      <div>
        <h3>ajouter une gouvernorat</h3>
        <form onSubmit={addGouvernorat}>
          <label htmlFor="gouvernorat">nom gouvernorat</label>
          <br />
          <input
            type="text"
            id="gouvernorat"
            placeholder="eg. Monastir, île de france"
            value={nomgouvernorat}
            onChange={(e) => setNomgouvernorat(e.target.value)}
          />
          <select onChange={(e) => setSelectedPays(e.target.value)} defaultValue={0}>
            <option value={0}  disabled >--selectionner un pays</option>
            {paysprops.map((pays, index2) => (
              <option key={index2} value={pays.idpays}>
                {pays.nompays}
              </option>
            ))}

          </select>
          <button type="submit">ajouter</button>
          <br />
          <span>{message}</span>
        </form>
      </div>
    </div>
  )
}

export default Gouvernorats