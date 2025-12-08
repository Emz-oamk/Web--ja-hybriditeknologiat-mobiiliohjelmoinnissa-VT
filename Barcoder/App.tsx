import React, {useState, useEffect, FC} from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { useCameraPermissions, CameraView, BarcodeScanningResult, BarcodeType } from 'expo-camera';

const BARCODE_TYPES = [
  'qr', 'ean13', 'ean8', 'code128', 'code39', 'code93',
  'upc_a', 'upc_e', 'pdf417', 'aztec', 'datamatrix', 'itf14',
];

const App: FC = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [barcode, setBarcode] = useState<string | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);

  useEffect((): void => {
    if (permission && !permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = (result: BarcodeScanningResult): void => {
    if (!scanned && result?.data) {
      setScanned(true);
      setBarcode(result.data);
    }
  };

  if (!permission) {
    return <View style={styles.center}><Text>Requesting camera permisson, allow?</Text></View>
  }
  if (!permission.granted) {
    return (
    <View style={styles.center}>
      <Text>Access to camera denied</Text>
      <Button title="Allow" onPress={requestPermission} />
    </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <CameraView
        style={{ flex: 1 }}
        facing="back"
        active={!scanned}
        barcodeScannerSettings={{ barcodeTypes: BARCODE_TYPES as BarcodeType[] }}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
      />

      <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
        <View style={styles.overlay} pointerEvents="box-none">
          {barcode && (
            <View style={styles.resultBox}>
              <Text style={styles.resultText}>Barcode: {barcode}</Text>
              <Button title="Scan Again" onPress={() => { setScanned(false); setBarcode(null); }} />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
  },
  resultBox: {
    backgroundColor: '#f8bbd0',
    padding: 12,
    borderRadius: 8,
  },
  resultText: {
    color: '#ffd9ecff',
    marginBottom: 8,
  }
});

export default App;

