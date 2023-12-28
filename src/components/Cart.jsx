import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext';

function Cart() {
    const { items, agregar, quitar, totalCartRef, totalPriceRef, vaciarCarrito } = useContext(AppContext);

    //Funcion para mostrar formulario de compra
    const mostrarForm = (event) => {
        event.preventDefault();
        var section = document.getElementById('formulario');
        section.style.display = 'block';
        formulario.scrollIntoView({ behavior: "smooth" });
    };

    if (totalCartRef.current == 0 ) {
        return <h2>CARRITO VACÍO</h2>

    } else {
        return (
            <>
                <div>
                    <h2>ITEMS EN CARRITO</h2>
                    <table className='carrito'>
                        <tbody>
                            <tr className='trCarrito'>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th></th>
                                <th></th>
                            </tr>
                            {items.map((item) => (

                                <tr key={`item-${item.id}`}>
                                    <th>{item.title}</th>
                                    <th>{item.quantity}</th>
                                    <th>{((item.price) * (item.quantity)).toFixed(2)}</th>
                                    <th><button onClick={() => agregar(item)}>+</button></th>
                                    <th><button onClick={() => quitar(item)}>-</button></th>
                                </tr>

                            ))}
                        </tbody>
                    </table>
                    <h3>Precio Total $ {(totalPriceRef.current).toFixed(2)} </h3>
                    <h4>Items:{totalCartRef.current} </h4>
                    <div>
                        <button className='btnCart' onClick={mostrarForm}>Realizar Pedido</button>
                        <button className='btnCart' onClick={vaciarCarrito}>Vaciar Carrito</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Cart;