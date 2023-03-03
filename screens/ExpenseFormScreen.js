import {ImageBackground, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import ExpenseForm from "../components/ui/expenseForm";
import Colors from "../constants/colors";
import {serializeDate, toDateTime} from "../components/utility/date";
import {useDispatch, useSelector} from "react-redux";
import {addExpense, updateExpense, removeExpense, setCurrent} from "../store/data";
import alertPopUp from "../components/utility/alertPopUp";

function ExpenseFormScreen({route, navigation}) {
    const {formTitle, showDelete} = route.params;
    const dispatch = useDispatch();
    const expenseData = useSelector((state) => state.expenses.expenseData);
    let currentId = useSelector((state) => state.expenses.currentId)
    const onSubmit = showUpdateForm() ? handleUpdateExpense : handleAddExpense;
    const currentExpense = initExpenseData();

    function showUpdateForm() {
        return (formTitle === 'Update Expense')
    }

    function initExpenseData() {
        console.log(`InitExpenseData: showUpdateForm: ${showUpdateForm()} currentId: ${currentId} expenseData.lengh: ${expenseData.length}`);
        let expense = null;
        if (showUpdateForm() && currentId && expenseData.length > 0)
            expense = expenseData[expenseData.findIndex(x => x.id === currentId)];
        if (expense) {
            return {
                id: expense.id,
                date: new Date(toDateTime(expense.date)),
                title: expense.title,
                amount: expense.amount,
            }
        } else {
            return  {
                id: null,
                date: new Date,
                title: '',
                amount: '',
            }
        }
    }

    function closeForm() {
        navigation.navigate('Expense List');
    }

    function handleAddExpense(date, title, amount) {
        const maxId = expenseData.reduce((prev, current) => (prev.id > current.id) ? prev.id : current.id, 0);
        dispatch(addExpense({
            id: maxId + 1,
            date: serializeDate(date),
            title: title,
            amount: amount,
        }));
        closeForm();
    }

    function handleUpdateExpense(date, title, amount) {
        console.log('HandleUpdateExpense');
        console.log(date);
        console.log(serializeDate(date));
        dispatch(updateExpense({
            id: currentExpense.id,
            date: serializeDate(date),
            title: title,
            amount: amount,
        }));
        closeForm();
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
        dispatch(removeExpense({id: currentExpense.id}));
        dispatch(setCurrent({id: null}));
        closeForm();
    }

    return (
        <SafeAreaView style={styles.rootContainer}>
            <View style={styles.centeredView}>
                <View style={styles.formView}>
                    <ImageBackground source={require('../assets/images/background.png')}
                                     resizeMode="cover"
                                     style={styles.imageStyle}
                                     imageStyle={styles.backgroundImage}
                    >

                        <View style={styles.textHeaderContainer}>
                            <Text style={styles.modalText}>{formTitle}</Text>
                        </View>
                        <ExpenseForm
                            date={currentExpense.date}
                            title={currentExpense.title}
                            amount={currentExpense.amount}
                            onSubmit={onSubmit}
                            onCancel={closeForm}
                            showDelete={showDelete}
                            onDelete={handleDeleteButton}
                        />
                    </ImageBackground>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ExpenseFormScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        overflow: 'hidden',
    },
    centeredView: {
        flex: 1,
        marginTop: 10,
        marginHorizontal: 10,
    },
    formView: {
        flex: 1,
        backgroundColor: Colors.modelBackground,
        borderRadius: 20,
        // alignItems: 'center',
        // shadowColor: 'black',
        // shadowOffset: {
        //     width: 0,
        //     height: 2,
        // },
        // shadowOpacity: 0.25,
        // shadowRadius: 4,
        // elevation: 5,
    },
    textHeaderContainer: {
        width: '100%',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.modalHeader,
    },
    modalText: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.modalText,
    },
    imageStyle: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
    },
    backgroundImage: {
        opacity: 0.5,
        borderRadius: 20,
        overflow: 'hidden',
    },
});
