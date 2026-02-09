import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import colors from '../constants/colors';

type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

// Simulated user database (replace with backend later)
const usersDB: { email: string; password: string }[] = [
  { email: 'test@example.com', password: 'password123' },
  { email: 'user@gmail.com', password: 'userpass' },
];

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    // Check if user exists
    const user = usersDB.find((u) => u.email === email);

    if (!user) {
      Alert.alert(
        'User Not Found',
        'No account found with this email. Please sign up first.',
        [
          { text: 'Cancel' },
          {
            text: 'Sign Up',
            onPress: () => navigation.navigate('SignUp'),
          },
        ]
      );
      return;
    }

    // Check password
    if (user.password !== password) {
      Alert.alert(
        'Incorrect Password',
        'The password you entered is incorrect.',
        [
          { text: 'Cancel' },
          {
            text: 'Reset Password',
            onPress: () => handleResetPassword(user.email),
          },
        ]
      );
      return;
    }

    // Successful login
    Alert.alert('Success', 'Login successful!');
    navigation.replace('Home');
  };

  const handleResetPassword = (userEmail: string) => {
    // For demo purposes, just reset password to "newpassword123"
    const index = usersDB.findIndex((u) => u.email === userEmail);
    if (index !== -1) {
      usersDB[index].password = 'newpassword123';
      Alert.alert(
        'Password Reset',
        'Your password has been reset to "newpassword123". Please login again.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <View style={styles.row}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <Text style={styles.checkbox}>
            {rememberMe ? '☑' : '☐'} Remember me
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            email
              ? handleResetPassword(email)
              : Alert.alert('Error', 'Enter your email first')
          }
        >
          <Text style={styles.link}>Forgot?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.footer}>
          Don’t have an account? <Text style={styles.link}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 32,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  checkbox: {
    color: colors.gray,
  },
  link: {
    color: colors.primary,
    fontWeight: '600',
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 24,
    textAlign: 'center',
    color: colors.gray,
  },
});
