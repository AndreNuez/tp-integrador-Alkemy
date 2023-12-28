import { useState, useEffect, useRef } from 'react'

import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main';
import AppContext from './contexts/AppContext';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  //Declaro estado para array de productos
  const [productos, setProductos] = useState([]);
  //Declaro estado para array de items en carrito
  const [items, setItems] = useState([]);

  //Declaro estado para objeto que guarde todos los datos de la orden
  const [order, setOrder] = useState("");

  // Declaro referencia para totalCartRef
  const totalCartRef = useRef(0);
  //Declaro referencia para totalPriceRef
  const totalPriceRef = useRef(0);

  // Consumimos datos de fake API para llenar array de productos
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())    // lo que obtiene de la URL lo transforma en json.
      .then((data) => setProductos(data));  // usa los datos del json para setear el array productos.
  }, []);

  //Funcion para agregar productos del catálogo al carrito
  const agregar = (producto) => {
    //Guardo la posición en el array en donde se encuentra el producto que quiero agregar
    const index = items.findIndex((item) => item.id == producto.id);

    if (index == -1) { //Si es -1 significa que el producto no se encuentra actualmente en el array
      producto.quantity = 1;  // Cambio cantidad del producto a 1.
      totalCartRef.current++;
      totalPriceRef.current += producto.price;
      setItems([...items, producto]); // Agrego producto a array de items en carrito.
      toast.success('Producto agregado al carrito.'); //muestro alerta de producto agregado.

    } else {
      producto.quantity++;
      totalCartRef.current++;
      totalPriceRef.current += producto.price;
      setItems([...items]);
    }
  };

  //Funcion para quitar productos del carrito
  const quitar = (producto) => {
    const index = items.findIndex((item) => item.id == producto.id);

    if (producto.quantity > 1) { //Si cantidad es mayor a 1, resto 1.
      producto.quantity--;
      totalCartRef.current--;
      totalPriceRef.current -= producto.price;
      setItems([...items]);
    }
    else { // Si cantidad es 1, quito el item del carrito
      const newItems = [...items]; // si está, crea un nuevo array A PARTIR del otro (por eso los ...)
      newItems.splice(index, 1); // quitamos el elemento del array del index correspondiente.
      setItems(newItems);

      if (totalCartRef.current > 1) { //Si la cantidad en carrito es mayor a 1
        totalCartRef.current--;
        totalPriceRef.current -= producto.price;

      }
      else {
        totalPriceRef.current = 0;
        totalCartRef.current--;
        var section = document.getElementById('formulario');
        section.style.display = 'none';
        var section = document.getElementById('carrito');
        section.style.display = 'none';
        catalogo.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  //Funcion para vaciar carrito al hacer click en btn Vaciar Carrito
  const vaciarCarrito = (event) => {
    const newItems = [];
    setItems(newItems);
    totalPriceRef.current = 0;
    totalCartRef.current = 0;
    var section = document.getElementById('formulario');
    section.style.display = 'none';
    var section = document.getElementById('carrito');
    section.style.display = 'none';
    catalogo.scrollIntoView({ behavior: "smooth" });
  };

  //Función para crear Orden con datos del pedido.
  const placeOrder = (order) => {
    setOrder(order);
  };

  //Declaro estado submitted.
  const [submitted, setSubmitted] = useState(false);

  const clickEnviar = (submitted) => {
    setSubmitted(submitted);
  };

  //Funcion para setear todo de cero luego de terminado el pedido (btnAceptar)
  const setearACero = (event) => {
    setSubmitted(false);
    setOrder("");
    setItems([]);
    var section = document.getElementById('catalogo');
    section.style.display = 'block';
    var section = document.getElementById('formulario');
    section.style.display = 'none';
    var section = document.getElementById('carrito');
    section.style.display = 'none';
  }

  const data = {
    productos,
    items,
    agregar,
    quitar,
    totalCartRef,
    totalPriceRef,
    vaciarCarrito,
    order,
    placeOrder,
    clickEnviar,
    submitted,
    setearACero,
  }

  return (
    <>
      <AppContext.Provider value={data}>
        <Header />
        <Main />
        <Footer />
        <ToastContainer
          position="top-center"
          autoClose={1000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" />
      </AppContext.Provider>
    </>
  );
}

export default App
