import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';

const Scan = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const [isScanning, setIsScanning] = useState(false);

  const handleBarCodeRead = (e) => {
    setScannedData(e.data);
    setIsScanning(false);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de</Text>
      <Button title="Escanear otro QR" onPress={() => setIsScanning(true)} />

      {/* Modal para escanear */}
      <Modal
        transparent={true}
        visible={isScanning}
        animationType="slide"
        onRequestClose={() => setIsScanning(false)}
      >
        <View style={styles.modalContainer}>
          <RNCamera
            style={styles.camera}
            onBarCodeRead={handleBarCodeRead}
            captureAudio={false}
          >
            <Text style={styles.text}>Escanea el código QR</Text>
            <Button title="Cancelar" onPress={() => setIsScanning(false)} />
          </RNCamera>
        </View>
      </Modal>

      {/* Modal para mostrar los resultados escaneados */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.scannedText}>Datos escaneados: {scannedData}</Text>
          <Button title="Cerrar" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  camera: {
    width: '100%',
    height: '80%',
  },
  text: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    margin: 20,
  },
  scannedText: {
    color: '#000',
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Scan;
