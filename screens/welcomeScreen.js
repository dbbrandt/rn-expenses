import {View, Text, StyleSheet, FlatList} from 'react-native';
import Colors from "../constants/colors";
import {useSelector} from "react-redux";
import {useLayoutEffect} from "react";

function WelcomeScreen({ navigation }) {
    const expenseData = useSelector((state) => state.expenses.expenseData);

    useLayoutEffect(() => {
    navigation.setOptions({
            title: 'Recent Expenses',
        }
    )})

    function dateList(item, index) {
        return (
            <View style={styles.listContainer}>
                <Text style={{marginBottom: 10}}>{index+1}. {item.date} ({item.id})</Text>
            </View>
        )
    }

    return (
        <View style={styles.rootContainer}>
            <View style={styles.welcomeText}>
                <Text style={{marginBottom: 10}}>
                    This is the <Text style={styles.highlight}>"Welcome"</Text> screen!
                </Text>
                <Text>
                    Below are timestamps of Icon links from the user page
                </Text>
                <Text>
                    to demonstrate Redux storage.
                </Text>
            </View>
            <View style={styles.listContainer}>
                <FlatList data={expenseData}
                          keyExtractor={(item) => item.id }
                          renderItem={({item, index}) => dateList(item, index)}
                />
            </View>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
    },
    highlight: {
        fontWeight: 'bold',
        color: Colors.textHighlight,
    },
    listContainer: {
        flex: 1,

    }
});
