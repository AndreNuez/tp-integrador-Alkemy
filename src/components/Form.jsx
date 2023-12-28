import React, { useRef, useState, useContext } from 'react';
import AppContext from '../contexts/AppContext';
import Order from './Order';
import { toast } from 'react-toastify';

function Form() {
    const { items, totalCartRef, totalPriceRef, placeOrder, submitted, clickEnviar } = useContext(AppContext);
    //Declaracion de referencias para cada input
    const dniRef = useRef("");
    const nombresRef = useRef("");
    const apellidosRef = useRef("");
    const correoRef = useRef("");
    const direccionRef = useRef("");
    const telefonoRef = useRef("");
    const localidadRef = useRef("");
    const provinciaRef = useRef("");

    //Función handleSubmit para guardar datos ingresados en el Form + datos del carrito
    const handleSubmit = (event) => {
        event.preventDefault();
        const price = totalPriceRef.current;
        const cant = totalCartRef.current;
        console.log(price);

        const order = {
            id: Date.now(),
            dni: dniRef.current.value,
            cliente: apellidosRef.current.value + ", " + nombresRef.current.value,
            mail: correoRef.current.value,
            direccion: direccionRef.current.value,
            locprov: localidadRef.current.value + ", " + provinciaRef.current.value,
            telefono: telefonoRef.current.value,
            items: items,
            cant: cant,
            price: price,
        };

        // Limpiamos los campos luego de guardar información
        dniRef.current.value = "";
        apellidosRef.current.value = "";
        nombresRef.current.value = "";
        correoRef.current.value = "";
        direccionRef.current.value = "";
        localidadRef.current.value = "";
        provinciaRef.current.value = "";
        telefonoRef.current.value = "";

        clickEnviar(true);
        placeOrder(order);
        toast.info("¡Pedido realizado con éxito!");
        
        var section = document.getElementById('catalogo');
        section.style.display = 'none';
        var section = document.getElementById('carrito');
        section.style.display = 'none';

        //Limpiamos las variables para luego hacer el reset de la web
        totalCartRef.current = 0;
        totalPriceRef.current = 0;
    }
    //Si la cantidad de items en carrito es 0, no muestro el formulario.
    if (totalCartRef.current == 0) {
        return
    }
    else {
        return (
            <>
                <form className='form' id='form' onSubmit={handleSubmit}>
                    <h2>INFORMACIÓN DE CONTACTO</h2>
                    <div className='formInputs'>
                        <div>
                            <label htmlFor="dni">DNI:</label>
                            <input type="text" name='dni'
                                ref={dniRef}
                                id='dni' maxLength="8"
                                pattern="^[0-9]{8}$"
                                title="Ingrese solo numeros" required />
                        </div>
                        <div>
                            <label htmlFor="nombres">Nombres:</label>
                            <input type="text" name='nombres'
                                ref={nombresRef}
                                id='nombres' required />
                        </div>
                        <div>
                            <label htmlFor="apellidos">Apellidos:</label>
                            <input type="text" name='apellidos'
                                ref={apellidosRef}
                                id='apellidos' required />
                        </div>
                        <div>
                            <label htmlFor="correo">Correo:</label>
                            <input type="email" name="correo"
                                ref={correoRef}
                                id="correo" required />
                        </div>
                        <div>
                            <label htmlFor="direccion">Dirección:</label>
                            <input type="text" name="direccion"
                                ref={direccionRef}
                                id="direccion" required />
                        </div>
                        <div>
                            <label htmlFor="localidad">Localidad:</label>
                            <input type="text" name="localidad"
                                ref={localidadRef}
                                id="localidad" required />
                        </div>
                        <div>
                            <label htmlFor="provincia">Provincia:</label>
                            <input type="text" name="provincia"
                                ref={provinciaRef}
                                id="provincia" required />
                        </div>
                        <div>
                            <label htmlFor="telefono">Teléfono:</label>
                            <input type="text" name="telefono"
                                ref={telefonoRef}
                                id="telefono" pattern="[0-9]+"
                                title="Ingrese solo numeros" required />
                        </div>
                    </div>
                    <div>
                        <button className='btnCart' type="submit">Enviar</button>
                    </div>
                </form >
            </>
        )
    }
}

export default Form;