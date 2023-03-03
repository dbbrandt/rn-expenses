import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ExpenseList from "../components/ui/expenseList";
import IconButton from "../components/ui/iconButton";
import Colors from "../constants/colors";
import {Ionicons} from "@expo/vector-icons";

const BottomTab = createBottomTabNavigator();

function ExpensesListScreen() {
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

    return (
        // Note: screen options gets passed the navigation params so we can use them inside to return the  options
        // See onPress for the header Button.
        <BottomTab.Navigator
            screenOptions={({navigation}) => ({
                headerStyle: {backgroundColor: Colors.tabsMain},
                headerTintColor: Colors.tabsText,
                tabBarStyle: {backgroundColor: Colors.tabsMain},
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: Colors.tabsInactive,
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: "bold",
                },
                headerRight: ({tintColor}) => (
                    <IconButton
                        icon='add'
                        size={30}
                        color={tintColor}
                        onPress={() => navigation.navigate('Add Expense')}
                    />
            )
            })}
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
