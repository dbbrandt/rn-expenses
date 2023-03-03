import {Alert} from "react-native";

function alertPopUp({ title, message, onConfirm, onCancel}) {
    Alert.alert(title, message, [
        {
            text: 'Cancel',
            style: 'cancel',
        },
        {text: 'OK', onPress: () => onConfirm()},
    ]);
}

export default alertPopUp;
