import {StatusBar} from 'expo-status-bar';

import {NavigationContainer, DefaultTheme} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";

import {Provider} from 'react-redux';
import {store} from "./store/store";

import {StyleSheet, ImageBackground} from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import Colors from "./constants/colors";

import AddExpenseScreen from "./screens/addExpenseScreen";
import ExpensesListScreen from "./screens/expensesListScreen";

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
                        }}>
                            <BottomTab.Screen
                                name="Recent Expenses"
                                component={ExpensesListScreen}
                                initialParams={{
                                    filter: 'recent',
                                }}
                                options={{
                                    tabBarLabel: 'Recent',
                                    tabBarIcon: ({color, size}) =>
                                        <Ionicons name="md-hourglass-outline" color={color} size={size}/>
                                }}/>
                            <BottomTab.Screen
                                name="All Expenses"
                                initialParams={{
                                    filter: 'all',
                                }}
                                component={ExpensesListScreen}
                                options={{
                                    tabBarIcon: ({color, size}) =>
                                        <Ionicons name="calendar" color={color} size={size}/>
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
