import {StyleSheet, View, Platform} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import {CardStyleInterpolators} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {store} from "./store/store";
import ExpensesListScreen from "./screens/ExpensesListScreen";
import ExpenseFormScreen from "./screens/ExpenseFormScreen";

const Stack = createStackNavigator();

export default function App() {


    function ExpenseUpdateForm() {
        return <ExpenseFormScreen
            formTitle='Update Expense'
            showDelete={true}
        />
    }

    return (
        <Provider store={store}>
            <StatusBar style="light"/>
            <NavigationContainer>
                <View style={styles.rootScreen}>
                        <Stack.Navigator screenOptions={{
                            headerShown: false,
                            cardStyleInterpolator: (Platform.OS === 'android') ?
                                CardStyleInterpolators.forFadeFromBottomAndroid :
                                CardStyleInterpolators.forModalPresentationIOS
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
                                }}
                            />
                        </Stack.Navigator>
                </View>
            </NavigationContainer>
        </Provider>
    )
}
const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
