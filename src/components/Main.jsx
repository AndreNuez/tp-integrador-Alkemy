import React from 'react'
import Catalog from './Catalog';
import Cart from './Cart';
import Form from './Form';
import Order from './Order';

function Main() {
    return (
        <main>
            <section id='catalogo' className='catalogo'>
                <div>
                    <Catalog />
                </div>
            </section>
            <section id='carrito' className='carritoMain'>
                <Cart />
            </section>
            <section id='formulario' className='formularioMain'>
                <Form />
            </section>
            <section id='detalles' className='detallesMain'>
                <Order />
            </section>
        </main>

    );
}

export default Main;