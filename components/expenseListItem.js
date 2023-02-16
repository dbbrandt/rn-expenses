import { Text } from 'react-native';

function ExpenseListItem({item, filter}) {

    return (
        <Text>{item.id}. {item.date}</Text>
    )
}

export default ExpenseListItem;
