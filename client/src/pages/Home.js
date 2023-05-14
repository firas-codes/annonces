import React, { useState } from 'react'
import { useFetchCategories } from '../customHooks/useFetchCategories';
import { Link } from 'react-router-dom';



// const url = "http://localhost:3001/server/categories";
const url = "/server/categories";

const Home = () => {

  const data = useFetchCategories(url);
  // console.log("data from usefetch", data);
  // console.log("type of data from usefetch", typeof(data));

  const { categories } = data;
  // console.log("categories from data", categories);

  const filtered = categories.filter(categorie => {
    return categorie.idcategorieparent === 0;
  });

  const [showSubCat, setShowSubCat] = useState(false);
  const [subCat, setSubCat] = useState([]);

  const getSubCat = (id) => {
    const newSubCat = categories.filter(categorie => {
      return categorie.idcategorieparent === id;
    });
    setSubCat(newSubCat);
    setShowSubCat(true);
  }

  // console.log("sub category", subCat);

  

  document.title = "Welcome | Home";
  document.getElementsByTagName("META")[3].content = "Your description about the page or site here to set dynamically";

  return (
    <>
      {/* <Helmet>
        <title>Home</title>
        <meta name="description" content="Home component" />
      </Helmet> */}

      <div>Home page</div>
      <div className='navcat'>
        {
          filtered.map((categorie, index) =>
          (
            <ul key={index} onMouseLeave={() => setShowSubCat(false)}>
              <Link to={`listing/${categorie.nomcategorie}/${categorie.idcategorie}`}>

                <li onMouseOver={() => getSubCat(categorie.idcategorie)} >{categorie.nomcategorie}</li>
              </Link>
              {showSubCat && (
                <>
                  {subCat.map((subcat, index2) => (

                    <ul key={index2} >
                      {subcat.idcategorieparent === categorie.idcategorie && (<Link to={`listing/${subcat.nomcategorie}/${subcat.idcategorie}`}>
                        <li >{subcat.nomcategorie}</li>
                      </Link>)}
                      {/* <li >
                        {subcat.idcategorieparent === categorie.idcategorie && subcat.nomcategorie}
                      </li> */}
                    </ul>
                  ))}
                </>
              )}
            </ul>
          )
          )
        }
      </div>
    </>
  )
}

export default Home