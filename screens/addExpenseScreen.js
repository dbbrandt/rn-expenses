import {useState} from 'react';
import {View, Text, TextInput, StyleSheet, Platform, Pressable} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {useSelector, useDispatch} from 'react-redux';
import {addExpense} from "../store/data";
import {serializeDate, formatDate} from "../components/utility/date";
import AddExpenseModal from "../components/ui/addExpenseModal";
import Colors from "../constants/colors";

const isAndroid = Platform.OS === 'android';

function AddExpenseScreen({visible, setVisible}) {
    const expenseData = useSelector((state) => state.expenses.expenseData);
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [expenseTitle, setExpenseTitle] = useState('');
    const [expenseDate, setExpenseDate] = useState(new Date);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const dispatch = useDispatch();

    console.log(`Platform is  android is: ${isAndroid}`);

    function addExpenseHandler() {
        const id = expenseData.length + 1;
        // Storing a multi-value object in state
        dispatch(addExpense({
            id: id,
            date: serializeDate(expenseDate),
            title: expenseTitle,
            amount: expenseAmount,
        }));
        setVisible(false);
        setExpenseAmount(0);
        setExpenseTitle('');
        setExpenseDate(new Date);
    }

    function amountInputHandler(enteredText) {
        setExpenseAmount(enteredText);
    }

    function dateInputHandler(event, selectedDate) {
        const currentDate = selectedDate;
        setExpenseDate(currentDate);
        setShowDatePicker(false);
    }

    function textInputHandler(enteredText) {
        setExpenseTitle(enteredText);
    }

    function AndroidDateComponent() {
        console.log(`showDatePicker: ${showDatePicker}`);
        if (showDatePicker)
            return (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={expenseDate}
                    mode='date'
                    onChange={dateInputHandler}
                />
            )
        else
            return (
                <Pressable
                    onPress={() => setShowDatePicker(true)}
                >
                    <Text style={{marginHorizontal: 10}}>{formatDate(expenseDate)}</Text>
                </Pressable>
            )
    }

    function DateComponent() {
        if (isAndroid) {
            return <AndroidDateComponent/>
        } else {
            return (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={expenseDate}
                    mode='date'
                    onChange={dateInputHandler}
                />
            )
        }
    }

    return <AddExpenseModal
        onSubmit={addExpenseHandler}
        title='Add Expense'
        visible={visible}
        setVisible={setVisible}
    >
        <View style={styles.inputContainer}>
            <View style={[styles.inputFieldContainer, styles.datePickerContainer]}>
                <DateComponent/>
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput
                    style={[styles.inputField, styles.textInput]}
                    maxLength={30}
                    onChangeText={textInputHandler}
                    value={expenseTitle}
                />
            </View>
            <View style={styles.inputFieldContainer}>
                <TextInput
                    style={[styles.inputField, styles.numberInput]}
                    maxLength={7}
                    keyboardType="number-pad"
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={amountInputHandler}
                    value={expenseAmount}
                />
            </View>
        </View>
    </AddExpenseModal>
}

export default AddExpenseScreen;

const styles = StyleSheet.create({
    inputContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    inputFieldContainer: {
        borderWidth: 1,
        marginVertical: 5,
        marginHorizontal: 5,
        backgroundColor: 'white',
        borderRadius: 3,
    },
    inputField: {
        fontSize: 18,
        color: Colors.expenseText,
        paddingHorizontal: 10,
        fontWeight: 'bold',
    },
    textInput: {
        height: 40,
        width: 200,
        textAlign: 'left',
    },
    numberInput: {
        height: 40,
        width: 100,
        textAlign: 'right',
    },
    datePickerContainer: {
        paddingRight: 5,
        paddingVertical: isAndroid ? 5 : 0,
    }
})