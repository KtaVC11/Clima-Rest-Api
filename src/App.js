import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';


class App extends Component {
  state = {
    error: '',
    consulta: {},
    resultado: {}

  }

  componentDidUpdate() {
    this.consultarApi();
  }

  componentDidMount() {
    this.setState({
      error: false
    })
  }

  consultarApi = () => {
    const { ciudad, pais } = this.state.consulta;
    if (!ciudad || !pais) return null;
    //console.log(ciudad);

    //leer la url y agregar el API key
    const appId = '0d33f7c266099e701156d0da07efa3a6';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&APPID=${appId}`;
    // console.log(url);


    //query con fetch api
    fetch(url)
      .then(respuesta => {
        //console.log(respuesta)
        return respuesta.json();
      })
      .then(datos => {
        // console.log(datos)
        this.setState({
          resultado: datos
        })
      })
      .catch(error => {
        console.log(error)
      })


  }

  datosConsulta = respuesta => {
    //console.log(respuesta);
    if (respuesta.ciudad === '' || respuesta.pais === '') {
      //console.log('hay errores');
      this.setState({
        error: true
      })

    } else {
      //console.log('todo correcto');
      this.setState({
        consulta: respuesta
      })

    }
  }

  //cuando es algo que no es parte de un metodo se escribe antes del return
  render() {
    const error = this.state.error;
    let resultado;

    if (error) {
      resultado = <Error mensaje='Ambos campos son obligatorios' />
    } else {

    }

    return (
      <div className="App" >
        <Header
          titulo='Clima React'
        />
        <Formulario
          datosConsulta={this.datosConsulta} //el prop se llama igual que el metodo
        />
        {resultado}
      </div>

    );
  }

}

export default App;
