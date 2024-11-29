import { defineStore } from "pinia";
import { safeParse } from "valibot";
import {
  activityFormCurrentDate,
  activityFormPageOneSchema,
  activityFormPageThreeSchema,
  activityFormPageTwoSchema,
} from "~/schemas/activityForm.schema";

export const useActivityStore = defineStore("activity", () => {
  const sources = ref<string[]>([]);
  const sourceTags = computed(() => {
    const tags = sources.value.map(
      (source) => getDomainAndTLD(source) ?? source,
    );
    return tags.map((tag) => tag);
  });
  const description = ref("");
  const assisted = ref(false);
  const tags = ref<string[]>([]);

  const entities = ref<string[]>([]);
  const involvementSources = ref<{}>({});

  const range = ref<{
    start: Date;
    end: Date;
  }>({
    start: activityFormCurrentDate,
    end: activityFormCurrentDate,
  });

  const startedAt = computed(() => range.value.start);
  const endedAt = computed(() =>
    isOngoing.value ? null : isEvent ? range.value.start : range.value.end,
  );

  const startedAtFormatted = computed(() => {
    if (!range.value.start) return "";
    return formatDate(range.value.start);
  });
  const endedAtFormatted = computed(() => {
    if (!range.value.end) return "";
    return formatDate(range.value.end);
  });

  const isEvent = ref(false);
  const isOngoing = ref(false);

  const page = ref<1 | 2 | 3>(1);
  const pageTitle = computed(() => {
    switch (page.value) {
      case 1:
        return "general";
      case 2:
        return "entities";
      default:
        return "time";
    }
  });

  const canGoBack = computed(() => {
    if (page.value <= 1) return false;
    return true;
  });
  const canGoNext = computed(() => {
    if (page.value >= 3) return false;
    switch (page.value) {
      case 1: {
        const { success } = safeParse(activityFormPageOneSchema, {
          sources: sources.value,
          description: description.value,
        });
        return success;
      }
      case 2: {
        const { success } = safeParse(activityFormPageTwoSchema, {
          tags: tags.value,
          entities: entities.value,
        });
        return success;
      }
      case 3: {
        return false;
      }
    }
  });

  const canSubmit = () => {
    switch (page.value) {
      case 1:
      case 2:
        return false;
      case 3: {
        const { success } = safeParse(activityFormPageThreeSchema, {
          startedAt: startedAt.value,
          endedAt: endedAt.value,
        });
        return success;
      }
    }
  };
  const back = () => {
    if (!canGoBack.value) throw Error("Cannot go back");
    page.value--;
  };
  const next = () => {
    if (!canGoNext.value) throw Error("Cannot go next");
    page.value++;
  };

  return {
    assisted,
    description,
    sources,
    sourceTags,
    tags,
    entities,
    involvementSources,
    range,
    startedAtFormatted,
    endedAtFormatted,
    isEvent,
    isOngoing,
    page,
    pageTitle,
    back,
    next,
    canGoBack,
    canGoNext,
    canSubmit,
  };
});
