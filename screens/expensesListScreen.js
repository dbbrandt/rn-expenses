import {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ExpenseListItem from "../components/ui/expenseListItem";
import {useLayoutEffect} from "react";
import IconButton from "../components/ui/iconButton";
import {daysElapsed, serializeDate} from "../components/utility/date";
import ExpenseModal from "../components/ui/expenseModal";
import {addExpense} from "../store/data";

function ExpensesListScreen({route, navigation}) {
    const dispatch = useDispatch();
    const expenseData = useSelector((state) => state.expenses.expenseData);

    const [expenses, setExpenses] = useState(expenseData);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(
        {id: null, title: '', amount: '', date: new Date}
    );

    let filter = route.params.filter;
    const maxDiff = 7; // days


    function addButtonHandler() {
        setAddModalVisible(true);
    }

    function updateExpenseHandler(expense) {
        setSelectedExpense(expense);
        setUpdateModalVisible(true);
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
        return <ExpenseListItem item={item} onPress={() => updateExpenseHandler(item)}/>
    }

    function addExpenseHandler(date, title, amount) {
        const id = expenseData.length + 1;
        // Storing a multi-value object in state
        dispatch(addExpense({
            id: id,
            date: serializeDate(date),
            title: title,
            amount: amount,
        }));
        setAddModalVisible(false);
    }


    return (
        <View style={styles.expenseContainer}>
            <View style={styles.listContainer}>
                <FlatList data={expenses}
                          keyExtractor={(item) => item.id}
                          renderItem={({item}) => expenseList(item)}
                />
                <ExpenseModal
                    modalTitle='Add Expense'
                    date={new Date}
                    onSubmit={addExpenseHandler}
                    visible={addModalVisible}
                    setVisible={setAddModalVisible}
                />
                <ExpenseModal
                    modalTitle='Update Expense'
                    date={selectedExpense.date}
                    title={selectedExpense.title}
                    amount={selectedExpense.amount}
                    expenseItem={selectedExpense}
                    onSubmit={updateExpenseHandler}
                    visible={updateModalVisible}
                    setVisible={setUpdateModalVisible}/>
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