import {Alert} from "react-native";

export function alertPopUp({ title, message, onConfirm, onCancel}) {
    Alert.alert(title, message, [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {text: 'OK', onPress: () => onConfirm()},
    ]);
}

