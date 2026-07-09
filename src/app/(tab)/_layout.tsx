import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="EmployeeForm"
        options={{
          title: "Employee Info",
        }}
      />
      <Tabs.Screen
        name="SigninForm"
        options={{
          title: "Sign In",
        }}
      />
      <Tabs.Screen
        name="SignUpForm"
        options={{
          title: "Sign Up",
        }}
      />
    </Tabs>
  );
}
