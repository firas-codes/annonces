import axios from 'axios';
import React, { useState } from 'react'
import { AiFillEdit } from 'react-icons/ai'
import { Link } from 'react-router-dom'

// const url = "http://localhost:3001/server/regions/villes";
const url = "/server/regions/villes";


const Villes = ({villesprops,gouvernoratsprops}) => {

  const [nomville, setNomville] = useState('');
  const [message, setMessage] = useState("");
  const [selectedGov, setSelectedGov] = useState(null);

  const addVille = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(url, { nomville, idgouvernorat:selectedGov });
      if (response.data) {
        setNomville("");
        setMessage(
          `la ville ${nomville} est ajoutée avec succès`
        );
        window.location.reload(false);
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>Villes</h2>
      <div>
        <h3>
          list des villes
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
              <th>id ville</th>
              <th>nom ville</th>
              {/* <th>id pays</th> */}
              <th>nom gouvernorat</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {villesprops.map((ville, index) =>
            // const { idgouvernorat, nomgouvernorat,idpays } = gouvernorat;
            (
              <tr key={index}>
                <td>
                  {ville.idville}
                </td>
                <td>{ville.nomville}</td>
                {/* <td>{gouvernorat.idpays}</td> */}
                <td>{ville.nomgouvernorat}</td>
                <td>
                  <Link to={`update/${ville.idville}/${ville.nomville}`}>
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
        <h3>ajouter une ville</h3>
        <form onSubmit={addVille}>
          <label htmlFor="ville">nom ville</label>
          <br />
          <input
            type="text"
            id="ville"
            placeholder="eg. Jemmel, Paris"
            value={nomville}
            onChange={(e) => setNomville(e.target.value)}
          />
          <select onChange={(e) => setSelectedGov(e.target.value)} defaultValue={0}>
            <option value={0}  disabled >--selectionner une gouvernorat</option>
            {gouvernoratsprops.map((gouvernorat, index2) => (
              <option key={index2} value={gouvernorat.idGouvernorat}>
                {gouvernorat.nomGouvernorat}
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

export default Villes