<script setup lang="ts">
if (!isRole("admin")) {
  navigateTo("/");
}

const {
  data: users,
  pending,
  refresh,
} = useFetch(`${useRuntimeConfig().public.auth.baseURL}/admin/users`, {
  method: "GET",
  headers: {
    Authorization: useAuth().token.value,
  },
});

const toast = useToast();

const toggleAccess = async (user) => {
  try {
    await $fetch(
      `${useRuntimeConfig().public.auth.baseURL}/admin/users/${user.id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: useAuth().token.value,
        },
      },
    );

    toast.add({
      severity: "success",
      summary: "Success",
      detail: `Successfully ${
        user.can_access ? "revoked" : "granted"
      } access to ${user.username}`,
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({ severity: "error", summary: error.message, life: 3000 });
  } finally {
    await refresh();
  }
};
</script>

<template>
  <DataTable :value="users" tableStyle="width: 100%" :loading="pending">
    <Column field="id" header="Id"></Column>

    <Column field="username" header="Username"></Column>

    <Column field="role" header="Role">
      <template #body="{ data }">
        <Badge>{{ data.role === "admin" ? "Admin" : "User" }}</Badge>
      </template>
    </Column>

    <Column field="can_access" header="Access">
      <template #body="{ data }">
        <Button
          v-ripple
          :icon="data.can_access ? 'pi pi-lock-open' : 'pi pi-lock'"
          :label="data.can_access ? 'Revoke' : 'Grant'"
          :severity="data.can_access ? 'danger' : 'success'"
          @click="toggleAccess(data)"
          :disabled="data.role === 'admin'"
        />
      </template>
    </Column>
  </DataTable>
</template>
