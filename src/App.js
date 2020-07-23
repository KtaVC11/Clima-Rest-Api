import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';


class App extends Component {
  state = {
    error: '',
    consulta: {},
    resultado: {}

  }

  componentDidUpdate(prevProps, prevState) {
    /*console.log('Props')
    console.log(prevProps);
    console.log('State')
    console.log(prevState);*/
    //si el state antetior es distinto del de la consulta, que realice la consulta al api
    //si los datos son distintos que haga la consulta para que no este haciendo la consulta muchas veces innecesarias
    if (prevState.consulta !== this.state.consulta) {
      this.consultarApi();
    }

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
    //const appId = '451fd66a909484d911e8f2d1f98f6257;'
    // let url=`https://api.darksky.net/forecast`
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
        consulta: respuesta, error: false
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
      resultado = <Clima resultado={this.state.resultado} />
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
