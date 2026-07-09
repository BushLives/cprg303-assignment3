import { createBottomTabNavigator } from "expo-router/build/react-navigation/bottom-tabs";

import EmployeeForm from "@/app/(tab)/EmployeeForm";
import SigninForm from "@/app/(tab)/SigninForm";
import SignupForm from "@/app/(tab)/SignupForm";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Employee Form"
        component={EmployeeForm}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Sign In"
        component={SigninForm}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Sign Up"
        component={SignupForm}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}
