import React from "react";
import { links } from "./data";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
 
  return (
    <aside >
      
      <div></div>
      <ul >
        {links.map((link, index) => {
          const { id, url, text } = link;
          return (
            <li key={id}>
              <NavLink to={`/dashboard${url}`} className={({isActive})=>isActive? 'link active':'link'}>{text}</NavLink>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
