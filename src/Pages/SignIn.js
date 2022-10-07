import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import TextBox from '../Components/TextBox';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignIn = ({ navigation }) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const theme = useSelector((state) => state.theme.theme);

    const [email, setMail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                console.log("giris basarili");
                console.log(user.email);
                console.log(user.password);
                setUserStorage();
                navigation.navigate("HomeScreens");
            })
            .catch(error => Alert.alert(error.message));
    }

    const setUserStorage = async () => {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);
    };
    function handleGoSignUp() {
        navigation.navigate("SignUp");
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header, { color: theme.color, padding: 30, letterSpacing: 5 }]}>Best Social Media</Text>
            <View style={{ margin: 10, }}>
                <Text style={{ color: theme.color, paddingBottom: 30 }}>Login</Text>

                <TextBox title="E-Mail" value={email} onChangeText={setMail} />
                <TextBox title="Password" value={password} onChangeText={setPassword} secureText={true} />

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, { borderColor: theme.color, backgroundColor: '#19c790' }]}
                    onPress={() => handleSignIn()}>
                    <Text style={{ color: theme.color, textAlign: 'center' }}>
                        Login
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: theme.color, textAlign: 'center' }}>
                    Don't you have an account?
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, { borderColor: theme.color, backgroundColor: theme.backgroundColor }]}
                    onPress={() => handleGoSignUp()}>
                    <Text style={{ color: theme.color, textAlign: 'center' }}>
                        Create Account
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            padding: 10,
        },
        header:
        {
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
            paddingBottom: 20,
        },
        phone_number_area:
        {
            flexDirection: 'row',
        },
        button:
        {
            borderWidth: 1,
            borderRadius: 5,
            marginTop: 20,
            height: 50,
            width: '80%',
            justifyContent: 'center',
            alignSelf: 'center'
        }
    }
);
export default SignIn;
