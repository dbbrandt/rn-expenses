import {StyleSheet, Text} from 'react-native';
import {daysElapsed} from "../utility/date";
import {FlatList, View} from "react-native";
import ExpenseItem from "./expenseItem";
import {useDispatch, useSelector} from "react-redux";
import {setCurrent} from "../../store/data";
import Colors from "../../constants/colors";

function ExpenseList({route, navigation}) {
    const dispatch = useDispatch();
    const expenseData = useSelector((state) => state.expenses.expenseData);
    const { showRecent, maxDays } = route.params;
    const expenses = showRecent ? expenseData.filter((item) => daysElapsed(item.date) <= maxDays) : expenseData;

    function ExpenseHeader() {
        if (expenses && expenses.length > 0) {
            const total = expenses.reduce((accumulator, current) => accumulator + parseFloat(current.amount), 0);
            const recentText = showRecent ? `Showing expenses from last ${maxDays} days.` : '';
            return <Text style={styles.headerContainer}>{recentText} Total: ${total.toLocaleString()}</Text>
        } else {
            return <Text style={styles.headerContainer}>No expenses found.</Text>
        }

    }

    function updateHandler(id) {
        dispatch(setCurrent({id: id}));
        navigation.navigate('Update Expense');
    }

    function expenseItem(item) {
        return <ExpenseItem
            item={item}
            onPress={() => updateHandler(item.id)}
        />
    }

//    if (!expenseData || expenseData.length === 0) return <Text>No expense items.</Text>

    return (
        <View style={styles.expenseContainer}>
            <ExpenseHeader showRecent={showRecent}/>
            <View style={styles.listContainer}>
                <FlatList data={expenses}
                          keyExtractor={(item) => item.id}
                          renderItem={({item}) => expenseItem(item)}
                />
            </View>
        </View>
    )
}

export default ExpenseList;

const styles = StyleSheet.create({
    expenseContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        alignItems: 'center',
    },
    headerContainer: {
        padding: 10,
        color: Colors.expenseText,
        fontWeight: 'bold',
        backgroundColor: Colors.modelBackground,
    },
})