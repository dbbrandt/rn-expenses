import {useEffect} from "react";
import {View, Text, StyleSheet, Modal, Pressable} from 'react-native';
import Colors from "../constants/colors";

import {useSelector, useDispatch} from 'react-redux';
import {addExpense} from "../store/data";

function AddExpenseScreen({help, visible, setVisible}) {
    const expenseData = useSelector((state) => state.expenses.expenseData);
    const dispatch = useDispatch();


    function addExpenseHandler() {
        const id = expenseData.length + 1;
        const now = new Date();
        // Storing a multi-value object in state
        dispatch(addExpense({id: id, date: now.toLocaleString()}));
        setVisible(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
                setVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Add Expense</Text>
                    <View style={styles.buttonContainer}>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setVisible(false)}>
                            <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={addExpenseHandler}>
                            <Text style={styles.textStyle}>Save</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export default AddExpenseScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonContainer: {
      flexDirection: 'row',
    },
    button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2,
        margin: 4,
        width: 75,
    },
    buttonOpen: {
        backgroundColor: '#F194FF',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
