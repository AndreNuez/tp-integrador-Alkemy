import React, { useContext } from 'react'
import AppContext from '../contexts/AppContext';

function Order() {

    const { order, totalPriceRef, submitted, setearACero } = useContext(AppContext);

    if (submitted) {

        return (
            <>
                <h1>DETALLES DEL PEDIDO</h1>
                <hr></hr>
                <div className='detalles'>
                    <div>
                        <p><b>PEDIDO NRO. #{order.id}</b></p>
                        <p>Nombre y Apellido: {order.cliente}</p>
                        <p>Correo: {order.mail}</p>
                        <p>Dirección: {order.direccion} — {order.locprov}</p>
                        <p>Teléfono: {order.telefono}</p>
                        <h4>Productos:</h4>
                        <ul>
                            {order.items.map((item) => (
                                <li key={`item-${item.id}`}>
                                    {item.title} x {item.quantity}
                                </li>
                            ))}
                        </ul>
                        <p><b>Total a abonar $ {(order.price).toFixed(2)}</b></p>
                    </div>
                    <div className='divAceptar'>
                        <button className='btnCart' onClick={setearACero}>Aceptar</button>
                    </div>
                </div>
            </>
        )
    }
}

export default Order;