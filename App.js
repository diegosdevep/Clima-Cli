import React, { useEffect, useState } from 'react'
import { Alert, Keyboard, StatusBar, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import Clima from './components/Clima'
import Formulario from './components/Formulario'


const App = () => {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais:''
  })
  const [consultar, setConsultar] = useState(false)
  const [resultado, setResultado] = useState('')
  const [bgColor, setBgColor] = useState('rgb(71,149,212)')

  const {ciudad, pais} = busqueda

  useEffect(() => {
    const consultarClima = async() => {
      if(consultar){
        const appId = '8222c5e8d33aa9666fc2d34740fffc59'
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
  
        try {
          const respuesta = await fetch(url)
          const resultado = await respuesta.json()
          setResultado(resultado)
          setConsultar(false)


          const  kelvin = 273.15 
          const main = resultado
          const actual = main.temp - kelvin

          if(actual < 10){
            setBgColor('rgb(105,108,149)')
          }else if(actual >= 10 && actual < 25){
            setBgColor('rgb(71,149,212)')
          }else{
            setBgColor('rgb(178,28,61)')
          }

        } catch (error) {
          mostrarAlerta()
        }
      }
    }
    consultarClima()
  }, [consultar])
  
  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'No hay resultados, intenta con otra ciudad o pais',
      [{text: 'Ok'}]
    )
  }


  const ocultarTeclado = () => {
    Keyboard.dismiss()
  }

  const bgColorApp = {
    backgroundColor: bgColor
  }

  return (
    <TouchableWithoutFeedback onPress={() => ocultarTeclado()}>
      <View style={[styles.app, bgColorApp]}>
      <StatusBar backgroundColor={'rgb(71,149,212)'}/>
        <View style={styles.contenido}>
          <Clima
            resultado={resultado}
          />
          <Formulario
            busqueda={busqueda}
            setBusqueda={setBusqueda}
            setConsultar={setConsultar}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  app:{
    flex: 1,
    justifyContent: 'center',
  },
  contenido:{
    marginHorizontal:'2.5%'
  }
});

export default App

