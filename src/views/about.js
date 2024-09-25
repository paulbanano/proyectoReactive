import React, { useState, useEffect } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Acerca = () => {
  const [permisoCamara, setPermisoCamara] = useState(null);
  const [dataEscaneada, setDataEscaneada] = useState('');
  const [mostrarModal, setMostrarModal] = useState(false);

  const onCodeScanned = ({ data }) => {
    setDataEscaneada(data);
  };

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermisoCamara(status === 'granted');
    })();
  }, []);

  if (permisoCamara === null) {
    return <Text>Solicitando permiso para la cámara...</Text>;
  }
  if (permisoCamara === false) {
    return <Text>Acceso a la cámara denegado</Text>;
  }

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Información de la App</Text>
      <Text style={styles.detalle}>Integrantes: Simon Suken, Pablo Zurbano</Text>
      <QRCode
        value="Simon Suken, Pablo Zurbano"
        size={200}
        color="black"
        backgroundColor="white"
      />
      <Button title="Escanear QR" onPress={() => setMostrarModal(true)} />

      <Modal
        animationType="slide"
        transparent={true}
        visible={mostrarModal}
        onRequestClose={() => setMostrarModal(false)}
      >
        <View style={styles.modal}>
          <BarCodeScanner
            onBarCodeScanned={onCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View style={styles.infoBox}>
            <Text style={styles.textoEscaneado}>
              {dataEscaneada ? `Datos escaneados: ${dataEscaneada}` : 'Escanea un código QR'}
            </Text>
            <Button title="Cerrar" onPress={() => setMostrarModal(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    marginBottom: 16,
  },
  detalle: {
    fontSize: 18,
    marginBottom: 16,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  infoBox: {
    width: '80%',
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  textoEscaneado: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 16,
  },
});

export default Acerca;
