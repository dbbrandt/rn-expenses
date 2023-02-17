import {Pressable, StyleSheet} from 'react-native';
import {Ionicons} from '@expo/vector-icons';

function IconButton({icon, color, size,  onPress}) {
    return (
        <Pressable
            android_ripple={{color: color ? color : 'grey'}}
            onPress={onPress}
            style={({pressed}) => pressed ?  styles.base : [styles.pressed, styles.base]}
        >
            <Ionicons name={icon} size={size ? size : 24} color={color ? color : 'white'}/>
        </Pressable>
    )

}

export default IconButton;

const styles = StyleSheet.create({
    base: {
        padding: 10,
    },
    pressed: {
        opacity: 0.7,

    }
})