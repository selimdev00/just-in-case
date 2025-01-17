<script setup lang="ts">
import { ref } from "vue";
import { zodResolver } from "@primevue/forms/resolvers/zod";
import { useToast } from "primevue/usetoast";
import { z } from "zod";
import { definePageMeta } from "#imports";

const toast = useToast();
const initialValues = ref({
  username: "",
  password: "",
});
const loading = ref(false);

const resolver = ref(
  zodResolver(
    z.object({
      username: z.string().min(1, { message: "Username is required." }),
      password: z.string().min(1, { message: "Password is required." }),
    }),
  ),
);

const { signIn } = useAuth();

const onFormSubmit = async ({ valid, values }) => {
  loading.value = true;

  try {
    if (valid) {
      await signIn(values, {
        callbackUrl: "/",
      });

      toast.add({
        severity: "success",
        summary: "Login successful",
        life: 3000,
      });
    }
  } catch (err) {
    toast.add({
      severity: "error",
      summary: err.message,
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  layout: "guest",
});
</script>

<template>
  <div class="card flex justify-center">
    <Form
      v-slot="$form"
      :resolver="resolver"
      :initialValues="initialValues"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <InputText name="username" type="text" placeholder="Username" fluid />
        <Message
          v-if="$form.username?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.username.error?.message }}</Message
        >
      </div>
      <div class="flex flex-col gap-1">
        <Password
          name="password"
          type="text"
          placeholder="Password"
          fluid
          :feedback="false"
        />
        <Message
          v-if="$form.password?.invalid"
          severity="error"
          size="small"
          variant="simple"
          >{{ $form.password.error?.message }}</Message
        >
      </div>
      <Button
        type="submit"
        severity="secondary"
        label="Submit"
        :loading="loading"
      />
    </Form>
  </div>
</template>
