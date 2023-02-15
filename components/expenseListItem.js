import { Text } from 'react-native';

function ExpenseListItem({item}) {
    return (
        <Text>{item.date}</Text>
    )
}

export default ExpenseListItem;
