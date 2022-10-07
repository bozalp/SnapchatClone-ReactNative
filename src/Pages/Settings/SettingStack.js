import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import SettingsScreen from './SettingsScreen';
import Theme from './Theme';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const MainPage = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="Theme" component={Theme} />

        </Stack.Navigator>
    );
}

const styles = StyleSheet.create(
    {

    }
);
export default MainPage;
