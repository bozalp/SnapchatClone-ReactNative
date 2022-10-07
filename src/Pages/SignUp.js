import React, { useContext, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import TextBox from '../Components/TextBox';


const SignUp = ({ navigation }) => {

    const firebaseConfig = {
        apiKey: "AIzaSyCUDjTKlbW8sVgBBjirO5XPSuYheQjLfH8",
        authDomain: "snapchatapp-de814.firebaseapp.com",
        projectId: "snapchatapp-de814",
        storageBucket: "snapchatapp-de814.appspot.com",
        messagingSenderId: "42077216869",
        appId: "1:42077216869:web:e5e7f01493abd4f640668c",
        measurementId: "G-CGWV0KWCG9"
    };

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);
    const theme = useSelector((state) => state.theme.theme);

    const [email, setMail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordAgain, setPasswordAgain] = useState(null);
    const [username, setUsername] = useState(null);

    const handleSignUp = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user.email);
                navigation.navigate("SignIn");
            })
            .catch(error => Alert.alert(error.message));
    }
    function handleGoSignIn() {
        navigation.navigate("SignIn");
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header, { color: theme.color, paddingTop: 30, letterSpacing: 5 }]}>Best Music App</Text>
            <View style={{ margin: 10, }}>
                <Text style={{ color: theme.color, paddingBottom: 30 }}>Create Account</Text>

                <TextBox title="UserName" value={username} onChangeText={setUsername} />
                <TextBox title="E-Mail" value={email} onChangeText={setMail} />
                <TextBox title="Password" value={password} onChangeText={setPassword} secureText={true} />
                <TextBox title="Password (Again)" value={passwordAgain} onChangeText={setPasswordAgain} secureText={true} />

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, { borderColor: theme.color, backgroundColor: '#19c790' }]}
                    onPress={() => handleSignUp()}>
                    <Text style={{ color: theme.color, textAlign: 'center' }}>
                        Create Account
                    </Text>
                </TouchableOpacity>
                <Text style={{ color: theme.color, textAlign: 'center' }}>
                    Do you have an account?
                </Text>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={[styles.button, { borderColor: theme.color, backgroundColor: theme.backgroundColor  }]}
                    onPress={() => handleGoSignIn()}>
                    <Text style={{ color: theme.color, textAlign: 'center' }}>
                        Sign In
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
export default SignUp;
