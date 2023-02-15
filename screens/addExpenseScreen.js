import { View, Text, StyleSheet } from 'react-native';
import Colors from "../constants/colors";
import IconButton from "../components/iconButton";

import {useSelector, useDispatch} from 'react-redux';
import { addExpense } from "../store/data";

function AddExpenseScreen({ navigation }) {
  const expenseData = useSelector((state) => state.expenses.expenseData);
  const dispatch = useDispatch();

  function gotoHomeHandler() {
    const id = expenseData.length + 1;
    const now = new Date();
    // Storing a multi-value object in state
    dispatch(addExpense({id: id, date: now.toLocaleString()}));
    navigation.navigate('Recent Expenses')
  }

  return (
    <View style={styles.rootContainer}>
      <Text>
        This is the <Text style={styles.highlight}>"User"</Text> screen!
      </Text>
      <IconButton icon='home' size={100} color={Colors.tabsMain} onPress={gotoHomeHandler}/>
    </View>
  );
}

export default AddExpenseScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: Colors.textHighlight,
  },
});
