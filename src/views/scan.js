import React, { useState } from 'react';
import { View, Text, Button, Modal, StyleSheet } from 'react-native';
import SvgQRCode from 'react-native-qrcode-svg';  // Generador de QR
import { BarCodeScanner } from 'expo-barcode-scanner';  // Escaneo de códigos QR


const grupoActual = 'Integrantes: Pablo Zurbano, Simón Suken';

const AboutScreen = () => {
  const [scanned, setScanned] = useState(true);  // Estado para el escáner de QR
  const [dataScanned, setDataScanned] = useState('');  // Estado para almacenar datos escaneados
  const [modalVisible, setModalVisible] = useState(false);  // Estado para el Modal

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);  // Desactivar el escaneo tras leer un código
    setDataScanned(data);  // Guardar los datos escaneados
    setModalVisible(true);  // Mostrar el modal con los datos escaneados
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acerca de la Aplicación</Text>

      {/* Mostrar el QR del grupo */}
      <Text style={styles.subtitle}>Código QR de la aplicación:</Text>
      <SvgQRCode value={grupoActual} size={150} />

      {/* Botón para escanear otro QR */}
      <Button
        title="Escanear QR de otra aplicación"
        onPress={() => setScanned(false)}
      />

      {/* Escáner de código QR */}
      {!scanned && (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={styles.scanner}
        />
      )}

      {/* Modal para mostrar los datos escaneados */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Integrantes de la app escaneada:</Text>
            <Text style={styles.scannedData}>{dataScanned}</Text>
            <Button
              title="Cerrar"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  scanner: {
    width: '100%',
    height: 300,
    marginVertical: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scannedData: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default AboutScreen;
``
