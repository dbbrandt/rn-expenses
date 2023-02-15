import {View, StyleSheet, FlatList} from 'react-native';
import {useSelector} from "react-redux";
import ExpenseListItem from "../components/expenseListItem";

function ExpensesScreen({route}) {
    const expenseData = useSelector((state) => state.expenses.expenseData);

    function expenseList(item) {
        return <ExpenseListItem item={item}/>
    }

    return (
        <View style={styles.listContainer}>
            <FlatList data={expenseData}
                      keyExtractor={(item) => item.id}
                      renderItem={({item}) => expenseList(item)}
            />
        </View>
    )
}

export default ExpensesScreen;

const styles = StyleSheet.create({
    listContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})