import React, { Component } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

const Button = ({ title, onPress }) => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}
            style={[styles.buttons, { borderWidth: 1, borderColor: theme.color }]}>
            <Text style={{ color: theme.color }}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttons:
    {
        width: 180,
        height: 64,
        marginBottom: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
});

export default Button;
