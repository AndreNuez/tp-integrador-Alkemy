import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext';

function Catalog() {
    const { productos, agregar } = useContext(AppContext);

    return (
        <>
            <h1>NUESTRO CATÁLOGO</h1>
            <div className="containerCards">
                {productos.map((producto) => (
                    <div className="card" key={`producto-${producto.id}`}>
                        <figure>
                            <img src={producto.image}></img>
                        </figure>
                        <div className="contenido">
                            <h2>{producto.title}</h2>
                            <p>{producto.description}</p>
                            <h3>$ {producto.price}</h3>
                        </div>
                        <button onClick={() => agregar(producto)}>Agregar</button>
                    </div>
                ))}
            </div>
        </>
    );

}

export default Catalog;