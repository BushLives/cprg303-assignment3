"use cilent";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { theme } from "../../../styles/theme";

import {
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
} from "react-native";
import { z } from "zod";

export const signInSchema = z.object({
  email: z.email("Enter a valid email."),
  password: z.string().trim().min(2, "Minimum 2 characters"),
});

export type InformationForm = z.infer<typeof signInSchema>;

function EmployeeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InformationForm>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: InformationForm) => {
    Alert.alert("Infomation Saved", "Your information has been updated.", [
      { text: "OK", onPress: () => router.back() },
    ]);
  };
  return (
    <ScrollView>
      <Text>Sign In</Text>

      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="example@example.com"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text>Password</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. "
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Sign In</Text>
      </Pressable>
    </ScrollView>
  );
}

export default EmployeeForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    color: theme.colors.error,
  },
});
