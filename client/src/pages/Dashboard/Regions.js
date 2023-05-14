import React from 'react'
import Pays from '../../components/Dashboard/Pays';
import Gouvernorats from '../../components/Dashboard/Gouvernorats';
import Villes from '../../components/Dashboard/Villes';
import { useFetchPays } from '../../customHooks/useFetchPays';
import { useFetchGouvernorats } from '../../customHooks/useFetchGouvernorats';
import { useFetchVilles } from '../../customHooks/useFetchVilles';

const urlPays = "/server/regions/pays";
const urlGouvernorat = "/server/regions/gouvernorats";
const urlVilles = "/server/regions/villes";
// const urlPays = "http://localhost:3001/server/regions/pays";
// const urlGouvernorat = "http://localhost:3001/server/regions/gouvernorats";
// const urlVilles = "http://localhost:3001/server/regions/villes";


const Regions = () => {
  const paysdata = useFetchPays(urlPays);
  const { pays } = paysdata;

  const gouvernoratsdata = useFetchGouvernorats(urlGouvernorat);
  const { gouvernorats } = gouvernoratsdata;

  const villesdata = useFetchVilles(urlVilles);
  const { villes } = villesdata;

  return (
    <div>
      <h2>Regions</h2>
      <div className='regions'>

        <Pays paysprops={pays} />
        <Gouvernorats gouvernoratsprops={gouvernorats} paysprops={pays} />
        <Villes villesprops={villes} gouvernoratsprops={gouvernorats} />
      </div>
    </div>
  )
}

export default Regions