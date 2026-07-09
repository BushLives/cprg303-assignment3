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

export const employeeSchema = z.object({
  firstName: z.string().trim().min(2, "Minimum 2 characters"),
  lastName: z.string().trim().min(2, "Minimum 2 characters"),
  email: z.email("Enter a valid email."),
  phone: z
    .string()
    .refine(
      (val) => val.replace(/\D/g, "").length >= 10,
      "Must have at least digits.",
    ),
  postalCode: z.string().trim().min(2, "Minimum 2 characters"),
});

export type InformationForm = z.infer<typeof employeeSchema>;

function EmployeeForm() {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<InformationForm>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalCode: "",
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

      <Text>First Name</Text>
      <Controller
        control={control}
        name="firstName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. John"
            placeholderTextColor={"grey"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.firstName && (
        <Text style={styles.error}>{errors.firstName.message}</Text>
      )}

      <Text>Last Name</Text>
      <Controller
        control={control}
        name="lastName"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. Doe"
            placeholderTextColor={"grey"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="words"
          />
        )}
      />
      {errors.lastName && (
        <Text style={styles.error}>{errors.lastName.message}</Text>
      )}

      <Text>Email</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="example@example.com"
            placeholderTextColor={"grey"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

      <Text>Phone Number</Text>
      <Controller
        control={control}
        name="phone"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="(403) 555-6780"
            placeholderTextColor={"grey"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />
        )}
      />
      {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}

      <Text>Postal Code</Text>
      <Controller
        control={control}
        name="postalCode"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="e.g. "
            placeholderTextColor={"grey"}
            value={value}
            onChangeText={onChange}
            autoCapitalize="characters"
          />
        )}
      />
      {errors.postalCode && (
        <Text style={styles.error}>{errors.postalCode.message}</Text>
      )}

      <Pressable onPress={handleSubmit(onSubmit)}>
        <Text>Submit</Text>
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
