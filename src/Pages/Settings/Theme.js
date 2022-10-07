import React, { useContext, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { setDark, setLight } from '../../Toolkits/themeSlice';
import lightTheme from '../../Themes/light';
import darkTheme from '../../Themes/dark';

import AsyncStorage from '@react-native-async-storage/async-storage';

const Theme = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const dispatch = useDispatch();

    function changeTheme() {
        theme === lightTheme ? dispatch(setDark()) : dispatch(setLight());
        setThemeStorage();
    }

    const setThemeStorage = async () => {
        await AsyncStorage.setItem('theme', theme === lightTheme ? 'light' : 'dark');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            <Text style={[styles.header, { color: theme.color }]}>Theme Setting</Text>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => changeTheme()}>
                    <Image
                        source={theme.title === 'light' ? require('../../images/darkMode.png') :
                            require('../../images/lightMode.png')
                        }
                        style={styles.button_image} />
                </TouchableOpacity>
                <Text style={{ color: theme.color, paddingTop: 10 }}>
                    {theme.title === 'light' ? "Dark Mode" : "Light Mode"}
                </Text>
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
        button:
        {
            paddingTop: 40,
            alignItems: 'center'
        },
        button_image:
        {
            width: 64,
            height: 64,
        },
        header:
        {
            fontSize: 18,
            textAlign: 'center',
            fontWeight: 'bold',
        }
    }
);
export default Theme;
