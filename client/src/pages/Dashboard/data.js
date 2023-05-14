import React from 'react';
import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
  FaHome,
  FaUserFriends,
} from 'react-icons/fa';
export const links = [
  {
    id: 1,
    url: '/',
    text: 'Acceuil',
    icon: <FaHome />,
  },
  {
    id: 2,
    url: '/categories',
    text: 'Catégories',
    icon: <FaUserFriends />,
  },
  {
    id: 3,
    url: '/regions',
    text: 'Regions',
    icon: <FaUserFriends />,
  },
  {
    id: 4,
    url: '/themes',
    text: 'Themes',
    icon: <FaUserFriends />,
  },
 
];

export const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: <FaBehance />,
  },
  {
    id: 5,
    url: 'https://www.twitter.com',
    icon: <FaSketch />,
  },
];
