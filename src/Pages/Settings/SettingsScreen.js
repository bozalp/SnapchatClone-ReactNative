import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { firebaseConfig } from '../../firebaseConfig';
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Theme from './Theme';
import Button from '../../Components/Button';
import * as ImagePicker from 'expo-image-picker';

const SettingsScreen = ({ navigation }) => {
    const theme = useSelector((state) => state.theme.theme);
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const [image, setImage] = useState(null);

    function LogOut() {
        resetStorage();
        auth.signOut().then(() => {
            navigation.navigate("SignIn");
        }).catch(error => Alert.alert(error.message));
    }

    const resetStorage = async () => {
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('password');
    };

    function goToTheme() {
        navigation.navigate("Theme");
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
            {image ? <TouchableOpacity onPress={pickImage} style={{ alignItems: 'center' }}>
                <Image source={{ uri: image }} style={styles.image} />
                <View style={styles.change_text}>
                    <Image
                        source={require('../../images/bg.png')}
                        style={styles.text_image_bg} />
                    <Text>
                        Change image
                    </Text>
                </View>
            </TouchableOpacity> :
                <TouchableOpacity onPress={pickImage}>
                    <View style={styles.empty_image}>
                        <Text style={{ textAlignVertical: 'center', textAlign: 'center' }}>
                            Pick an image
                        </Text>
                    </View>
                </TouchableOpacity>}
            <View style={styles.area}>
                <View>
                    <Button title={"Theme"} onPress={() => goToTheme()} />
                    <Button title={"Edit Profile"} onPress={null} />
                </View>

                <Button title={"Logout"} onPress={() => LogOut()} />

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:
    {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    area:
    {
        flex: 1,
        justifyContent: 'space-between',
        padding: 10
    },
    image:
    {
        width: 200,
        height: 200,
        borderRadius: 100,
        position: 'relative',
    },
    empty_image:
    {
        width: 200,
        height: 200,
        borderRadius: 100,
        backgroundColor: '#ccc',
        justifyContent:'center'
    },
    change_text:
    {
        position: 'absolute',     
        bottom: 0,
        alignItems: 'center',
        paddingBottom:15
    },
    text_image_bg:
    {
        width: 156,
        minHeight:25,
        position: 'absolute',
        opacity: 0.7,
        bottom:0,
    }
});

export default SettingsScreen;