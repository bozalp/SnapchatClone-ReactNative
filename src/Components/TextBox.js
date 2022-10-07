import React, { useContext } from 'react';
import { Text, View, TextInput } from 'react-native';
import { useSelector } from 'react-redux';

const TextBox = ({ title, value, onChangeText, secureText }) => {
    const theme = useSelector((state) => state.theme.theme);

    return (
        <TextInput
            style={{
                backgroundColor: theme.grayBackground, color: theme.color,
                borderRadius: 5, marginBottom: 10, borderColor: theme.color, borderWidth: 1, height:42,
                padding:5
            }}
            onChangeText={onChangeText}
            value={value}
            placeholder={title}
            placeholderTextColor={theme.color}
            secureTextEntry={secureText ? true : false}
        />
    );
}

export default TextBox;
