import {StatusBar} from 'expo-status-bar';

import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {Provider} from 'react-redux';
import {store} from "./store/store";

import {StyleSheet, ImageBackground} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from "./constants/colors";

import AddExpenseScreen from "./screens/addExpenseScreen";
import ExpensesScreen from "./screens/expensesScreen";

import IconButton from "./components/iconButton";

const BottomTab = createBottomTabNavigator();

//To use a background you need to make the default theme transparent
const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    }
}

export default function App() {
    function addExpenseHandler() {
        console.log('Add Expense');
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
                    <BottomTab.Navigator screenOptions={{
                        headerStyle: {backgroundColor: Colors.tabsMain},
                        headerTintColor: Colors.tabsText,
                        tabBarActiveTintColor: Colors.tabsMain,
                        headerRight: () => {
                            return <IconButton icon='add' size={30} onPress={addExpenseHandler}/>;
                        },
                    }}>
                        <BottomTab.Screen name="Recent Expenses"
                                          component={ExpensesScreen}
                                          initialParams={{
                                              initialRoute: 'MealsCategories',
                                              goHome: false,
                                          }}
                                          options={{
                                              tabBarLabel: 'Recent',
                                              tabBarIcon: ({color, size}) =>
                                                  <Ionicons name="home" color={color} size={size}/>
                                          }}/>
                        <BottomTab.Screen name="All Expenses" component={AddExpenseScreen} options={{
                            tabBarIcon: ({color, size}) =>
                                <Ionicons name="person" color={color} size={size}/>
                        }}/>
                    </BottomTab.Navigator>
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
