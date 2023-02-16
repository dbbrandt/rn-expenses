import { Text, StyleSheet } from 'react-native';

function ExpenseListItem({item, filter}) {

    return (
        <Text style={styles.textFormat}>{item.id}. {item.date}</Text>
    )
}

export default ExpenseListItem;

const styles=StyleSheet.create({
    textFormat: {
      margin: 5,
    },
})
