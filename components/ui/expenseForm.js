import {TextInput, View, StyleSheet, Pressable, Text, Platform} from "react-native";
import Colors from "../../constants/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import {formatDate, toDateTime} from "../utility/date";
import {useState} from "react";
import IconButton from "./iconButton";

const isAndroid = Platform.OS === 'android';

function ExpenseForm(params) {
    const {date, title, amount, onSubmit, onCancel,  showDelete, onDelete} = params;
    const [expenseDate, setExpenseDate] = useState(new Date);
    const [expenseTitle, setExpenseTitle] = useState(title);
    const [expenseAmount, setExpenseAmount] = useState(amount);

    const [showDatePicker, setShowDatePicker] = useState(false);

    function onFormSubmit() {
        onSubmit(expenseDate, expenseTitle, expenseAmount);
        setExpenseDate(new Date);
        setExpenseTitle();
        setExpenseAmount();
    }

    function dateInputHandler(event, selectedDate) {
        setExpenseDate(selectedDate);
        setShowDatePicker(false);
    }

    function titleInputHandler(enteredText) {
        setExpenseTitle(enteredText);
    }

    function amountInputHandler(enteredText) {
        setExpenseAmount(enteredText);
    }

    function AndroidDateComponent() {
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

    return (
        <>
            {showDelete &&
            <View style={styles.deleteContainer}>
                <IconButton style={styles.deleteButtonContainer}
                            icon='trash'
                            color={Colors.iconDark}
                            size={30}
                            onPress={onDelete}
                />
            </View>
            }
            <View style={[styles.inputContainer, {marginTop: showDelete ? 0 : 10}]}>
                <View style={[styles.inputFieldContainer, styles.datePickerContainer]}>
                    <DateComponent/>
                </View>
                <View style={styles.inputFieldContainer}>
                    <TextInput
                        style={[styles.inputField, styles.textInput]}
                        maxLength={30}
                        onChangeText={titleInputHandler}
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
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={styles.button}
                        onPress={onCancel}>
                        <Text style={styles.textStyle}>Cancel</Text>
                    </Pressable>
                    <Pressable
                        style={styles.button}
                        onPress={onFormSubmit}>
                        <Text style={styles.textStyle}>Save</Text>
                    </Pressable>
                </View>
            </View>
        </>
    )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    deleteContainer: {
        width: '100%',
        alignItems: 'flex-end',
    },
    inputContainer: {
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
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        margin: 4,
        width: 75,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})