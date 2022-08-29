import {Picker} from '@react-native-picker/picker'
import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native'



const Formulario = ({busqueda, setBusqueda, setConsultar}) => {

  const {pais, ciudad} = busqueda;

  const [animacionBoton] = useState(new Animated.Value(1))


  const consultarClima = () => {
    if(pais === '' || ciudad === '') {
      mostrarAlerta()
      return
    }

    setConsultar(true)
  }

  const mostrarAlerta = () => {
    Alert.alert(
      'Error',
      'Agrega una ciudad y pais para la busqueda',
      [{text: 'Entendido'}]
    )
  }

  const animacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: .9,
      useNativeDriver: true,
    }).start()
  }
  const animacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction:4,
      tension:30,
      useNativeDriver: true,
    }).start()
  }

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}]
  }


  return (
    <View style={styles.formulario}>
      <View>
        <TextInput
            onChangeText={ciudad => setBusqueda({...busqueda, ciudad})}
            value={ciudad}
            style={styles.input}
            placeholder='Ciudad'
            placeholderTextColor='#666'
        />
      </View>
      <View>
        <Picker
            selectedValue={pais}
            onValueChange={pais => setBusqueda({...setBusqueda, pais})}
            style={{height:60, backgroundColor:'#FFF'}}
        >
            <Picker.Item label='--Seleccione un Pais--' value=''/>
            <Picker.Item label='Estados Unidos' value='US'/>
            <Picker.Item label='Argentina' value='AR'/>
            <Picker.Item label='Mexico' value='MX'/>
            <Picker.Item label='Colombia' value='CO'/>
            <Picker.Item label='Costa Rica' value='CR'/>
            <Picker.Item label='Peru' value='PE'/>
        </Picker>
      </View>
      <TouchableWithoutFeedback
        onPressIn={() => animacionEntrada()}
        onPressOut={() => animacionSalida()}
        onPress={() => consultarClima()}
      >
        <Animated.View 
          style={[styles.btnBuscar, estiloAnimacion]}
        >
            <Text style={styles.textoBuscar}>Buscar clima</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
    input:{
        padding: 10,
        height: 50,
        backgroundColor:'#FFF',
        fontSize:20,
        marginBottom:20,
        textAlign:'center',
        borderRadius:5
    },
    btnBuscar:{
        marginTop:40,
        backgroundColor:'#000',
        justifyContent: 'center',
        padding: 10,
        borderRadius:5
    },
    textoBuscar:{
        color: '#FFF',
        fontWeight:'bold',
        textTransform:'uppercase',
        textAlign:'center',
        fontSize:18
    }
});

export default Formulario