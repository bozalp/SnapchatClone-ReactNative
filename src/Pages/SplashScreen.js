import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import Icons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { firebaseConfig } from '../firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { setDark, setLight } from '../Toolkits/themeSlice';
import { useSelector, useDispatch } from 'react-redux';

const SplashScreen = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    const getTheme = async () => {
        const value = await AsyncStorage.getItem('theme');
        value === 'light' || value === null ? dispatch(setDark()) : dispatch(setLight());
    };

    //kayitli kullanici verisi varsa giris yapiyorum. yoksa giris ekranina gidiyorum
    const getUserData = async () => {
        const email = await AsyncStorage.getItem('email');
        const password = await AsyncStorage.getItem('password');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate("HomeScreens");
            })
            .catch(error => {
                navigation.navigate("SignIn");
            });

    }
    const handleSignIn = () => {

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate("HomeScreens");
            })
            .catch(error => {
                Alert.alert(error.message)
            });
    }

    useEffect(() => {
        //resetStorage();
        getTheme();
        setTimeout(() => {
            getUserData();
        }, 1000);
    }, []);
    const resetStorage = async () => {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
    };

    return (
        <View style={styles.container}>
            <Icons name='logo-snapchat' size={72} color={"black"} />
            <Text style={styles.title}>
                Best Snapchat
            </Text>
        </View>
    );
}

const styles = StyleSheet.create(
    {
        container:
        {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        title:
        {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'black',
            letterSpacing: 5
        }
    }
)
export default SplashScreen;
