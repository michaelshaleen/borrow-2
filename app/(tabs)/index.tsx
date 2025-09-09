import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState<string>('');

  const handleChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      console.log('Submitting form data:', formData);
      const response = await axios.post('http://10.0.2.2:3000/api/register', formData);
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(error.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={formData.username}
          onChangeText={(text) => handleChange('username', text)}
          autoCapitalize="none"
          placeholder="Enter username"
        />
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleChange('email', text)}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholder="Enter email"
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          value={formData.password}
          onChangeText={(text) => handleChange('password', text)}
          secureTextEntry
          placeholder="Enter password"
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        {message ? (
          <Text style={[styles.message, message.includes('failed') ? styles.error : styles.success]}>
            {message}
          </Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 16,
  },
  success: {
    color: 'green',
  },
  error: {
    color: 'red',
  },
});

export default RegistrationForm;

// import { Image } from 'expo-image';
// import { Platform, StyleSheet, TextInput, Button } from 'react-native';
// import { useState } from 'react';
// import { HelloWave } from '@/components/HelloWave';
// import ParallaxScrollView from '@/components/ParallaxScrollView';
// import { ThemedText } from '@/components/ThemedText';
// import { ThemedView } from '@/components/ThemedView';
// import axios, { AxiosError } from 'axios';

// export default function HomeScreen() {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');

//   const handleSubmit = async () => {
//     console.log('handle submit function:', { name, phone });
//     axios.post('http://localhost:8081/api/users', { name, phone })
//       .then(response => {
//         console.log('Response:', response.data);
//         alert('Profile updated successfully!');
//       })
//       .catch((error: AxiosError) => {
//         console.error('Error updating profile:', error);
//       })
//   };
  

//   //try {
//       // Make the PUT request
//     //   const response = await axios.put(
//     //     'http://your-backend-url/api/users', // Replace with your backend URL
//     //     formData,
//     //     {
//     //       headers: {
//     //         'Content-Type': 'application/json',
//     //       },
//     //     }
//     //   );

//     //   // Handle success
//     //   Alert.alert('Success', 'Profile updated successfully!');
//     //   console.log('Response:', response.data);
//     // } catch (error: any) {
//     //   // Handle error
//     //   console.error('Error updating profile:', error);
//     //   Alert.alert('Error', error.response?.data?.message || 'Something went wrong');
//     // } 
    
//   return (
//     <ParallaxScrollView
//       headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
//       headerImage={
//         <Image
//           source={require('@/assets/images/partial-react-logo.png')}
//           style={styles.reactLogo}
//         />
//       }>
//       <ThemedView style={styles.formContainer}>
//         <ThemedText type="subtitle">Contact Form</ThemedText>
//         <TextInput
//           style={styles.input}
//           placeholder="Name"
//           value={name}
//           onChangeText={setName}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder="Phone"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//         />
//         <Button title="Submit" onPress={handleSubmit} />
//       </ThemedView>

//     </ParallaxScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   formContainer: {
//     gap: 8,
//     marginBottom: 8,
//     padding: 20,
//   },
//   reactLogo: {
//     height: 178,
//     width: 290,
//     bottom: 0,
//     left: 0,
//     position: 'absolute',
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     paddingHorizontal: 10,
//     color: "red",
//   },
// });