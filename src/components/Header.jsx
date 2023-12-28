import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext';

function Header() {

    const { totalCartRef } = useContext(AppContext);
    
    //Funcion para mostrar detalle del carrito
    const mostrarCarrito = (event) => {
        var section = document.getElementById('carrito');
        section.style.display = 'block';
        carrito.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <header>
            <nav>
                <div>
                    <img className='logo' src='../src/assets/img/logo.png' alt='logo'></img>
                </div>
                <h2>Shop Cart</h2>
                <div>
                    <button className='btnCarrito' onClick={mostrarCarrito}>Ver Carrito ({totalCartRef.current}) </button>
                </div>
            </nav>
        </header>

    );
}

export default Header;
