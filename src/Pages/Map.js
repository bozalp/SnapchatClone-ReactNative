import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Alert, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, LatLng } from 'react-native-maps';
import * as Location from 'expo-location';
import { getStorage, ref, listAll } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../firebaseConfig';
import randomFloat from 'random-float';
import Button from '../Components/Button';

const CustomMarker = ({ coordinate, imageUrl }) => {

    function s() {
        Alert.alert("sa");
    }

    return (
        <Marker coordinate={coordinate} onPress={s}>
            <View style={styles.image_area}>
                <Image
                    style={styles.image}
                    source={{
                        uri: imageUrl
                    }}
                />
                <View style={styles.triangle} />
            </View>
        </Marker >
    )
}

const Map = () => {
    initializeApp(firebaseConfig);
    const [imageList, setImageList] = useState([]);
    /*const [coordinateList, setcoordinates] = useState([{
        index: 1,
        latitude: 41.0391683,
        longitude: 28.9982707,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    },
    {
        index: 1,
        latitude: 38.0391683,
        longitude: 24.9982707,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    }]);*/
    const [coordinateList, setcoordinates] = useState([{
        key: 0,
        latitude: randomFloat(32, 42),
        longitude: randomFloat(24, 32),
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
    }]);
    const theme = useSelector((state) => state.theme.theme);
    const [loading, setLoading] = useState(true);


    function listImages() {
        const storage = getStorage();
        const listRef = ref(storage, '/');
        listAll(listRef)
            .then((res) => {
                res.items.forEach((itemRef) => {
                    //gelen veriyi alabilmek için belirli bir formata uyarladım
                    const url = "https://firebasestorage.googleapis.com/v0/b/" + itemRef.bucket + "/o/" + itemRef.fullPath + "?alt=media&token=abf69362-2762-4b5d-8532-0e55fd6dd0ad";
                    setImageList((prev) => [...prev, url]);
                });
            }).catch((error) => {
                Alert.alert(error.toString());
            });
    }
    //kendim için rastgele konum bilgisi üretiyorum
    function createCoordinate() {
        let latitude = 0;
        let longitude = 0;
        for (let i = 0; i < 5; i++) {
            latitude = randomFloat(36, 42);
            longitude = randomFloat(24, 32);
            coordinateList.push({
                key: i + 1,
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            })
        }
    }

    useEffect(() => {
        createCoordinate();
        listImages();

    }, []);


    return (
        <View style={[styles.container, { backgroundColor: theme.backgroundColor }]}>

            <MapView
                initialRegion={coordinateList[0]}
                mapType="standard"
                style={styles.map}>

                {     
                    imageList.map((images, index) => {
                        return (   
                            <CustomMarker coordinate={coordinateList[index]} imageUrl={images} />
                        )
                        
                    })
                }
                
            </MapView>

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    image_area:
    {
        alignItems: 'center',
    },
    image:
    {
        width: 40,
        height: 40,
        borderRadius: 20,
        borderColor: 'red',
        borderWidth: 3,
    },
    triangle: {
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 25,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "red",
        bottom: 5,
        transform: [{ rotate: "180deg" }],
    },
});

export default Map;