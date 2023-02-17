import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import { DateTimePickerAndroid } from 'react-native';
import Colors from "../../constants/colors";
import {formatDateString} from "../utility/date";

function ExpenseListItem({item, filter}) {
    const {width} = useWindowDimensions();
    return (
        <View style={[styles.expenseContainer,{width: width - 10}]}>
            <View style={styles.textContainer}>
                <Text style={styles.textFormat}>{item.title}</Text>
                <Text style={styles.textFormat}>{formatDateString(item.date)}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amountFormat}>{item.amount}</Text>
            </View>
        </View>
    )
}

export default ExpenseListItem;

const styles = StyleSheet.create({
    expenseContainer: {
        flex: 1,
        flexDirection: 'row',
        marginTop: 15,
        padding: 5,
        borderRadius: 5,
        backgroundColor: Colors.expenseBackground,
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
