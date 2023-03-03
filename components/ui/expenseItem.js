import {View, Text, StyleSheet, Pressable, useWindowDimensions} from 'react-native';
import {DateTimePickerAndroid} from 'react-native';
import Colors from "../../constants/colors";
import {formatDateString} from "../utility/date";
import IconButton from "./iconButton";

function ExpenseItem({item, onPress}) {
    const {width} = useWindowDimensions();
    return (
        <Pressable
            onPress={onPress}
            style={({pressed}) => pressed && styles.pressed}
            android_ripple={{color: Colors.primary600}}
        >
            <View style={[styles.expenseContainer, {width: width - 10}]}>
                <View style={styles.textContainer}>
                    <Text style={styles.textFormat}>{item.title}</Text>
                    <Text style={styles.textFormat}>{formatDateString(item.date)}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amountFormat}>${parseFloat(item.amount).toLocaleString()}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    expenseContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        padding: 5,
        borderRadius: 5,
        backgroundColor: Colors.tabsMain,
    },
    pressed: {
        opacity: 0.75,
    },
    textContainer: {
        flex: 4,
    },
    textFormat: {
        padding: 2,
        paddingLeft: 10,
        fontWeight: 'bold',
        color: 'white',
    },
    amountContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'space-between',
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    amountFormat: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Colors.expenseText,
    }
})
