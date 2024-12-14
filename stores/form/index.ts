type Form =
  | "activity"
  | "relationship"
  | "involvement"
  | "entity"
  | "activity-review"
  | "involvement-review"
  | "relationship-review";

export const useFormStore = defineStore("form", () => {
  const activityForm = useActivityFormStore();
  const involvementForm = useInvolvementFormStore();

  const type = ref<Form | null>(null);

  const reset = () => {
    activityForm.reset();
    involvementForm.reset();
  };

  const form = computed(() => type.value);
  const setForm = (form: Form) => {
    reset();
    type.value = form;
  };
  const cancel = () => {
    reset();
    type.value = null;
  };

  return { form, setForm, cancel };
});
