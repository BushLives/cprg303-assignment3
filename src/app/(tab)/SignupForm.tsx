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

export const signUpSchema = z
  .object({
    fullName: z.string().trim().min(2, "Minimum 2 characters"),
    email: z.email("Enter a valid email."),
    password: z.string().trim().min(2, "Minimum 2 characters"),
    confirmPassword: z.string().trim().min(2, "Must match with password"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
      });
    }
  });

export type InformationForm = z.infer<typeof signUpSchema>;

function EmployeeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InformationForm>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      <Text>Employee Form</Text>

      <Text>Full Name</Text>
      <Controller
        control={control}
        name="fullName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. John Doe"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.fullName && (
        <Text style={styles.error}>{errors.fullName.message}</Text>
      )}

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
            placeholder="password"
            placeholderTextColor={theme.colors.muted}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Text>Confirm Passowr</Text>
      <Controller
        control={control}
        name="confirmPassword"
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
      {errors.confirmPassword && (
        <Text style={styles.error}>{errors.confirmPassword.message}</Text>
      )}

      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Sign Up</Text>
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
