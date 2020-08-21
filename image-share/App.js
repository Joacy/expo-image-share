import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import logo from './src/assets/images/logo.png';

export default function App () {
  const [selectedImage, setSelectedImage] = useState(null);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    };

    const pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }

    setSelectedImage({ localUri: pickerResult.uri });
  };

  const openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />

      <Text style={styles.message}>
        To share a photo from your phone with a friend, just press the button below!
      </Text>

      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },

  message: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
    marginBottom: 10,
  },

  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },

  buttonText: {
    fontSize: 20,
    color: '#fff',
  },

  thumbnail: {
    width: 300,
    height: 300,
    resizeMode: "contain",
  },
});
