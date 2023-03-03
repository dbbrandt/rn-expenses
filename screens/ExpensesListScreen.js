import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ExpenseList from "../components/ui/expenseList";
import IconButton from "../components/ui/iconButton";
import Colors from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

function ExpensesListScreen({route, navigation}) {
    // This component is used by multiple paths and the filter update re-renders the screen.
    // let filter = route.params.filter;
    const maxRecentDays = 7;

    function iconcBarOption(title, shape) {
        return {
            tabBarLabel: title,
                tabBarIcon: ({color, size}) =>
            <Ionicons name={shape} color={color} size={size}/>
        }
    }

    function addButtonHandler() {
        navigation.navigate('Add Expense');
    }

    return (
        <BottomTab.Navigator
            screenOptions={{
                headerStyle: {backgroundColor: Colors.tabsMain},
                headerTintColor: Colors.tabsText,
                tabBarStyle: {backgroundColor: Colors.tabsMain},
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: Colors.tabsInactive,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                },
                headerRight: () => {
                    return <IconButton icon='add' size={30} onPress={addButtonHandler}/>;
                }
            }}
        >
            <BottomTab.Screen
                name="Recent Expenses"
                component={ExpenseList}
                initialParams={{
                    showRecent: true,
                    maxDays: maxRecentDays,
                }}
                options={iconcBarOption("Recent Expenses","hourglass")}
            />
            <BottomTab.Screen
                name="All Expenses"
                component={ExpenseList}
                initialParams={{
                    showRecent: false,
                }}
                options={iconcBarOption("All Expenses","calendar")}
            />
        </BottomTab.Navigator>
    )
}

export default ExpensesListScreen;
