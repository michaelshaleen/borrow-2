import { Image } from 'expo-image';
import { Platform, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = () => {
    console.log('Submitted:', { name, phone });
    // Add your submit logic here
  };



  //try {
      // Make the PUT request
    //   const response = await axios.put(
    //     'http://your-backend-url/api/users', // Replace with your backend URL
    //     formData,
    //     {
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //     }
    //   );

    //   // Handle success
    //   Alert.alert('Success', 'Profile updated successfully!');
    //   console.log('Response:', response.data);
    // } catch (error: any) {
    //   // Handle error
    //   console.error('Error updating profile:', error);
    //   Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
    // } 
    
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.formContainer}>
        <ThemedText type="subtitle">Contact Form</ThemedText>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Phone"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
        <Button title="Submit" onPress={handleSubmit} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  formContainer: {
    gap: 8,
    marginBottom: 8,
    padding: 20,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});