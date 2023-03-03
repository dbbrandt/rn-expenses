import {StyleSheet, ImageBackground, View} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import ExpensesListScreen from "./screens/ExpensesListScreen";
import ExpenseFormScreen from "./screens/ExpenseFormScreen";
import {serializeDate} from "./components/utility/date";
import {addExpense} from "./store/data";

const Stack = createStackNavigator();

//To use a background you need to make the default theme transparent
const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    }
}

export default function App() {


    function ExpenseUpdateForm() {
        return <ExpenseFormScreen
            formTitle='Update Expense'
            // onSubmit={updateExpenseHandler}
            showDelete={true}
            // onDelete={handleDeleteButton}
        />
    }

    return (
        <Provider store={store}>
            <StatusBar style="light"/>
            <ImageBackground source={require('./assets/images/background.png')}
                             resizeMode="cover"
                             style={styles.rootScreen}
                             imageStyle={styles.backgroundImage}
            >
                <NavigationContainer theme={navTheme}>
                        <Stack.Navigator screenOptions={{
                            headerShown: false,
                            cardStyle: {presentation: 'transparentModal'},
                            cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS,
                        }}>
                            <Stack.Screen name='Expense List' component={ExpensesListScreen}/>
                            <Stack.Screen
                                name='Add Expense'
                                component={ExpenseFormScreen}
                                initialParams={{
                                    formTitle: 'Add Expense',
                                    showDelete: false,
                                }}
                            />
                            <Stack.Screen
                                name='Update Expense'
                                component={ExpenseFormScreen}
                                initialParams={{
                                    formTitle: 'Update Expense',
                                    showDelete: true,
                                    // date: {selectedExpense.date},
                                    // title: = {selectedExpense.title}
                                    // amount = {selectedExpense.amount}
                                    // onSubmit={updateExpenseHandler}
                                    // onDelete={handleDeleteButton}
                                }}
                            />
                        </Stack.Navigator>
                </NavigationContainer>
            </ImageBackground>
        </Provider>
    )
}
const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
