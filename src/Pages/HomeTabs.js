import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingStack from './Settings/SettingStack';
import HomeStack from './HomeStack';
import Map from './Map';
import Icons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeScreens = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="HomeStack" component={HomeStack} options={{
                title:"Home",
                tabBarIcon: ({ color }) => (
                    <Icons name='home-outline' size={24} color={color} />
                )
            }}/>
            <Tab.Screen name="Map" component={Map}options={{
                tabBarIcon: ({ color }) => (
                    <Icons name='map-outline' size={24} color={color} />
                )
            }} />
            <Tab.Screen name="Settings" component={SettingStack}options={{
                tabBarIcon: ({ color }) => (
                    <Icons name='settings-outline' size={24} color={color} />
                )
            }} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default HomeScreens;