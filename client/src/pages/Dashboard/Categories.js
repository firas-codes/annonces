import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

// const url = "http://10.0.2.15:5001/server/categories";
// const url = "http://localhost:3001/server/categories";
const url = "/server/categories";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [nomcategorie, setNomcategorie] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [message, setMessage] = useState("");

    const fetchCategories = async () => {

        let headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Accept", "application/json");
        // headers.append("Origin", "http://front.internots.com:3001");
        // headers.append("Access-Control-Allow-Origin", "http://front.internots.com:3001");
        headers.append("Origin", "http://localhost:3000");
        headers.append("Access-Control-Allow-Origin", "http://localhost:3000");
        headers.append("Access-Control-Allow-Credentials", "true");
        try {
            const response = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: headers
            });
            // const response = await axios.get(url);
            const data = await response.json();
            const { categories } = data;

            if (categories) {
                const newCategories = categories.map((categorie) => {
                    const { idcategorie, idcategorieparent, nomcategorie } = categorie;
                    return {
                        idcategorie,
                        idcategorieparent,
                        nomcategorie,
                    };
                });
                setCategories(newCategories);
            } else {
                setCategories([]);
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const addCategory = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(url, { nomcategorie, idcategorieparent: selectedCategory });
            // console.log(response);
            if (response.data) {
                fetchCategories();
                setNomcategorie("");
                setMessage(
                    `la catégorie ${nomcategorie} est ajoutée avec succès`
                );
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1>Categories</h1>
            <div>
                <div>
                    <h3>ajouter une categorie</h3>
                    <form onSubmit={addCategory}>
                        <label htmlFor="cat">nom categorie</label>
                        <br />
                        <input
                            type="text"
                            id="cat"
                            placeholder="eg. vehicules, immobilier"
                            value={nomcategorie}
                            onChange={(e) => setNomcategorie(e.target.value)}
                        />
                        <select onChange={(e) => setSelectedCategory(e.target.value)}>
                            <option value="0">
                                --Catégorie Parent--
                            </option>
                            {categories.map((categorie, index) => (
                                <option key={index} value={categorie.idcategorie}>
                                    {categorie.nomcategorie}
                                </option>
                            ))}
                        </select>
                        <button type="submit">ajouter</button>
                        <br />
                        <span>{message}</span>
                    </form>
                </div>
                <br />
                <br />
                <br />
                <table
                    style={{
                        borderWidth: "2px",
                        borderColor: "#aaaaaa",
                        borderStyle: "solid",
                    }}
                >
                    <thead>
                        <tr>
                            <th>id categorie</th>
                            <th>id categorie parent</th>
                            <th>nom categorie</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((categorie) => {
                            const { idcategorie, idcategorieparent, nomcategorie } = categorie;
                            return (
                                <tr key={idcategorie}>
                                    <td>
                                        {idcategorie}
                                    </td>
                                    <td>{idcategorieparent}</td>
                                    <td>{nomcategorie}</td>
                                    <td>
                                        <Link to={`update/${idcategorie}/${nomcategorie}`}>
                                            <AiFillEdit />
                                        </Link>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {/* <div>
                    {categories.map((categorie, index) => {
                        const { idcategorie, nomcategorie } = categorie;
                        return (
                            <ul key={index}>
                                <li>id:{idcategorie}</li>
                                <Link to={`${nomcategorie}/${idcategorie}`}>
                                    <li>nom:{nomcategorie}</li>
                                </Link>
                                <Link to={`update/${idcategorie}/${nomcategorie}`}>
                                    <AiFillEdit />
                                </Link>
                            </ul>
                        );
                    })}
                </div> */}
            </div>
        </div>
    )
}

export default Categories