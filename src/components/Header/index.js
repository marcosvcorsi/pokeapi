import React from 'react';

import { NavBar, ImgLogo } from './styles';


import pokemon from '../../assets/pokemon.png';


export default function Header() {
    return (
        <NavBar>
            <ImgLogo src={pokemon} />
        </NavBar>
    );
}
