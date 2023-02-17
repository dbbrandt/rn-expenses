import {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from "react-redux";
import ExpenseListItem from "../components/ui/expenseListItem";
import {useLayoutEffect} from "react";
import AddExpenseScreen from "./addExpenseScreen";
import IconButton from "../components/ui/iconButton";
import {daysElapsed} from "../components/utility/date";

function ExpensesListScreen({route, navigation}) {
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const expenseData = useSelector((state) => state.expenses.expenseData);
    const [expenses, setExpenses] = useState(expenseData);
    let filter = route.params.filter;
    const maxDiff = 7;


    function addButtonHandler() {
        setAddModalVisible(true);
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon='add' size={30} onPress={addButtonHandler}/>;
            }
        });
        filter = route.params.filter;
        setExpenses(expenseData);
        if (filter !== 'all' && expenseData.length > 0) {
            setExpenses(expenseData.filter((item) => daysElapsed(item.date) <= maxDiff));
        }
    }, [route, navigation, addModalVisible])

    function expenseList(item) {
        return <ExpenseListItem item={item} filter={filter}/>
    }

    return (
        <View style={styles.expenseContainer}>
            <View style={styles.listContainer}>
                <FlatList data={expenses}
                          keyExtractor={(item) => item.id}
                          renderItem={({item}) => expenseList(item)}
                />
                <AddExpenseScreen help='HELP' visible={addModalVisible} setVisible={setAddModalVisible}/>
            </View>
        </View>
    )
}

export default ExpensesListScreen;

const styles = StyleSheet.create({
    expenseContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
    },
})