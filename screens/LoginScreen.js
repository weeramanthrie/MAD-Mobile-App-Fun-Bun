import React, { useState } from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useDispatch, useSelector } from 'react-redux';
import { setUserCredentials, setAuthenticationStatus } from './Store';
import { useFonts, PressStart2P_400Regular } from '@expo-google-fonts/press-start-2p'; 

export default function LoginScreen() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFocusedUsername, setIsFocusedUsername] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false); 

  const dispatch = useDispatch();
  const navigation = useNavigation(); 

  const { username: storedUsername, password: storedPassword } = useSelector((state) => state.auth);

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (username === storedUsername && password === storedPassword) {
      dispatch(setAuthenticationStatus(true));
      navigation.navigate('Home', { username: username }); 
    } else {
      setErrorMessage('Incorrect username or password');
    }
  };

  // Load fonts
  let [fontsLoaded] = useFonts({
    PressStart2P_400Regular,
  });

  if (!fontsLoaded) {
    return null; 
  }

  return (
    <KeyboardAvoidingView
      style={styles.keyboardContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <StatusBar style="light" backgroundColor="#4F5B62" />
        
        <Text style={styles.title}>Fun Bun</Text>

        <Image
          source={require('../assets/images/mushroom.png')} 
          style={styles.image}
        />

        <View style={styles.usernameContainer}>
          <TextInput
            style={[
              styles.input,
              isFocusedUsername && styles.inputFocused,
            ]}
            placeholder="Enter Username"
            placeholderTextColor="#AAB2B8"
            onChangeText={(text) => setUsername(text)}
            value={username}
            onFocus={() => setIsFocusedUsername(true)}
            onBlur={() => setIsFocusedUsername(false)}
            autoCapitalize="none"
          />
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={[
              styles.input,
              isFocusedPassword && styles.inputFocused,
            ]}
            placeholder="Enter Password"
            placeholderTextColor="#AAB2B8"
            onChangeText={(text) => setPassword(text)}
            value={password}
            onFocus={() => setIsFocusedPassword(true)}
            onBlur={() => setIsFocusedPassword(false)}
            secureTextEntry={!isPasswordVisible}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Icon
              name={isPasswordVisible ? 'visibility-off' : 'visibility'}
              size={24}
              color="#AAB2B8"
            />
          </TouchableOpacity>
        </View>

        {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Play Now</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          New to Fun Bun?{' '}
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate('SignUp')}
          >
            Sign Up Here
          </Text>
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    backgroundColor: '#4F5B62', 
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  image: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 10,
    fontSize: 90, 
    color: '#FFD700', 
    fontWeight: 'bold',
    textAlign: 'center',
    letterSpacing: 1.5,
    textShadowColor: '#4B59F7',
    textShadowOffset: { width: 2, height: 2 },
    fontStyle: 'italic',
    textShadowRadius: 12,
    background: 'linear-gradient(to right, #FFD700, #FF6347)',
  },
  usernameContainer: {  
    width: '85%',
    marginTop: 20,
  },
  passwordContainer: {
    width: '85%',
    marginTop: 20,
    position: 'relative',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#283D3B',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 15, 
    color: '#fff',
    borderWidth: 1,
    borderColor: '#44475A',
    fontFamily: 'PressStart2P_400Regular', 
  },
  inputFocused: {
    borderColor: '#FFD700',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  errorText: {
    color: '#FF5252',
    marginTop: 10,
    fontSize: 14,
    fontFamily: 'PressStart2P_400Regular', 
  },
  button: {
    marginTop: 30,
    width: '60%',
    height: 50,
    backgroundColor: '#FF6A13', 
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#1E1E2F',
    fontSize: 22,
    fontWeight: 'bold',
    fontFamily: 'PressStart2P_400Regular', // Retro gaming font
  },
  footerText: {
    marginTop: 20,
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'PressStart2P_400Regular', // Retro gaming font
  },
  signUpText: {
    color: '#FFD700',
    fontWeight: 'bold',
  },
});
