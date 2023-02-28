import {useState} from 'react';
import {View, StyleSheet, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from "react-redux";
import ExpenseListItem from "../components/ui/expenseListItem";
import {useLayoutEffect} from "react";
import IconButton from "../components/ui/iconButton";
import {daysElapsed, serializeDate} from "../components/utility/date";
import ExpenseModal from "../components/ui/expenseModal";
import {addExpense, updateExpense, removeExpense} from "../store/data";
import {alertPopUp} from "../components/utility/alertPopUp";
import Colors from "../constants/colors";

function ExpensesListScreen({route, navigation}) {
    const newExpense = {id: null, title: '', amount: '', date: new Date};
    const dispatch = useDispatch();
    const expenseData = useSelector((state) => state.expenses.expenseData);

    const [expenses, setExpenses] = useState(expenseData);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [updateModalVisible, setUpdateModalVisible] = useState(false);
    const [selectedExpense, setSelectedExpense] = useState(newExpense);

    // This component is used by multiple paths and the filter update re-renders the screen.
    let filter = route.params.filter;
    const maxDiff = 7; // days


    function addButtonHandler() {
        setAddModalVisible(true);
    }

    function showRecent() {
        return (filter !== 'all' && expenseData.length > 0)
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return <IconButton icon='add' size={30} onPress={addButtonHandler}/>;
            }
        });
        filter = route.params.filter;
        setExpenses(expenseData);
        if (showRecent()) {
            setExpenses(expenseData.filter((item) => daysElapsed(item.date) <= maxDiff));
        }
    }, [route, navigation, addModalVisible, updateModalVisible, expenseData])

    function ExpenseHeader() {
        const total =  expenseData.reduce((accumulator, current) => accumulator + parseFloat(current.amount), 0);
        const recentText =  showRecent() ? `Showing expenses from last ${maxDiff} days.` : '';
        return <Text style={styles.headerContainer}>{recentText} Total: ${total.toLocaleString()}</Text>
    }

    function expenseList(item) {
        return <ExpenseListItem
            item={item}
            onPress={() => showUpdateModal(item)}
        />
    }

    function showUpdateModal(item) {
        setUpdateModalVisible(true);
        setSelectedExpense(item);
    }

    function updateExpenseHandler(date, title, amount) {
        // setSelectedExpense(expense);
        dispatch(updateExpense({
            id: selectedExpense.id,
            date: serializeDate(date),
            title: title,
            amount: amount,
        }));
        setSelectedExpense(newExpense);
        setUpdateModalVisible(false);
    }

    function addExpenseHandler(date, title, amount) {
        const id = expenseData.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id, 0) + 1;
        dispatch(addExpense({
            id: id,
            date: serializeDate(date),
            title: title,
            amount: amount,
        }));
        setAddModalVisible(false);
    }

    function handleDeleteButton() {
        alertPopUp({
            title: 'Confirm Delete',
            description: 'Are you sure you want to permanently delete this expense?',
            onConfirm: removeExpenseHandler
        })
    }

    function removeExpenseHandler() {
        // Storing a multi-value object in state
        dispatch(removeExpense({id: selectedExpense.id}));
        setUpdateModalVisible(false);
        setSelectedExpense(newExpense);
    }

    console.log(expenseData);

    return (
        <View style={styles.expenseContainer}>
            <ExpenseHeader/>
            <View style={styles.listContainer}>
                <FlatList data={expenses}
                          keyExtractor={(item) => item.id}
                    // onDelete={(item) => confirmDelete()}
                          renderItem={({item}) => expenseList(item)}
                />
                <ExpenseModal
                    visible={addModalVisible}
                    modalTitle='Add Expense'
                    date={new Date}
                    onSubmit={addExpenseHandler}
                    onCancel={() => setAddModalVisible(false)}
                    showDelete={false}
                />
                <ExpenseModal
                    visible={updateModalVisible}
                    modalTitle='Update Expense'
                    date={selectedExpense.date}
                    title={selectedExpense.title}
                    amount={selectedExpense.amount}
                    setVisible={setUpdateModalVisible}
                    onSubmit={updateExpenseHandler}
                    onCancel={() => setUpdateModalVisible(false)}
                    showDelete={true}
                    onDelete={handleDeleteButton}
                />
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
        alignItems: 'center',
    },
    headerContainer: {
        padding: 10,
        color: Colors.expenseText,
        fontWeight: 'bold',
        backgroundColor: Colors.modelBackground,
    },
})