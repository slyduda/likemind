import { safeParse } from "valibot";
import {
  activityFormPageOneSchema,
  activityFormPageThreeSchema,
  activityFormPageTwoSchema,
  type ActivityFormEntityType,
  type ActivityFormSourceType,
  type ActivityFormTagType,
  type ActivityFormType,
} from "~/schemas/activityForm.schema";
import { activitySuggestionSourceMaxLength } from "~/schemas/activitySuggestion.schema";
import { v4 as uuidv4 } from "uuid";

const iconPicker = (source: ActivityFormSourceType) => {
  if (source.assisted === "loading") return "solar:black-hole-line-duotone";
  if (source.assisted === "failed") return "solar:list-check-bold-duoton";
  if (source.assisted === "success") return "bi:stars";

  // if (source.parsed === null) return "svg-black-hole";
  if (source.parsed === true) return "solar:list-check-bold-duotone";
  if (source.parsed === false) return "solar:list-cross-bold-duotone";

  if (source.scraped === "loading") return "solar:cloud-bold";
  if (source.scraped === "failed") return "solar:cloud-cross-bold-duotone";
  if (source.scraped === "success") return "solar:cloud-check-bold-duotone";

  return "solar:link-square-line-duotone";
};

const fetchSuggestions = async (sources: string[]) => {
  const suggestion = await $fetch("/api/activities/suggestions", {
    method: "POST",
    body: {
      sources: [
        ...sources.map((source) =>
          trimArticleToMaxLength(source, activitySuggestionSourceMaxLength),
        ),
      ],
    },
  });
  return suggestion;
};

export const useActivityFormStore = defineStore("activity", () => {
  const sources = ref<ActivityFormSourceType[]>([]);
  const sourceTags = computed(() => {
    return sources.value.map((source) => ({
      value: getDomainAndTLD(source.url) ?? source.url,
      icon: iconPicker(source),
    }));
  });

  const updateSource = <K extends keyof ActivityFormSourceType>(
    id: string,
    property: K,
    value: ActivityFormSourceType[K],
  ) => {
    const index = sources.value.findIndex((source) => source.id === id);
    if (index !== -1) {
      const updatedSource = { ...sources.value[index], [property]: value };
      // Use splice and spread to replace the entire array
      sources.value.splice(index, 1, updatedSource);
      sources.value = [...sources.value]; // Ensure reactivity
    }
  };

  const description = ref("");
  const assisted = ref(false);
  const tags = ref<ActivityFormTagType[]>([]);

  const entities = ref<ActivityFormEntityType[]>([]);
  const involvementSources = ref<{}>({});

  const range = ref<{
    start: Date;
    end: Date;
  }>({
    start: new Date(),
    end: new Date(),
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

  const addSuggestion = (suggestion: string) => {
    if (description.value) {
      description.value = description.value + "\n\n" + suggestion;
    }
    description.value = suggestion;
  };

  const addSource = async (url: string) => {
    const id = uuidv4();
    // add the newly parsed url
    const source = {
      id,
      url,
      scraped: null,
      parsed: null,
      assisted: null,
      suggestion: null,
      description: null,
      title: null,
      article: null,
    };
    sources.value.push(source);

    await sleep(2000);

    // get url content
    updateSource(id, "scraped", "loading");
    await sleep(2000);
    const content = await checkUrl(source.url);

    if (!content) {
      updateSource(id, "scraped", "failed");
      return;
    }
    updateSource(id, "scraped", "success");

    await sleep(2000);

    // get the article tag
    const response = await parseArticle(content);
    if (response === null) {
      updateSource(id, "parsed", false);
      return;
    }
    updateSource(id, "parsed", true);
    const { article } = response;
    if (!article) {
      console.log("link had no article");
      return;
    }
    // transform the article tag
    updateSource(id, "article", article);
    if (!assisted.value) return;

    await sleep(2000);

    // get suggestions if ai assist is on

    updateSource(id, "assisted", "loading");
    const suggestion = await fetchSuggestions([article]);
    const suggestionContents = suggestion.choices[0].message.content;
    if (!suggestionContents) {
      updateSource(id, "assisted", "failed");
      return;
    }
    updateSource(id, "assisted", "success");
    updateSource(id, "suggestion", suggestionContents);

    addSuggestion(suggestionContents);
  };

  const updateSuggestions = async () => {
    const filteredSources = sources.value.filter(
      (source) => source.article && source.assisted === null,
    );
    if (!filteredSources.length) return;

    for (const source of filteredSources) {
      updateSource(source.id, "assisted", "loading");
    }

    const suggestion = await fetchSuggestions(
      sources.value.map((source) => source.article ?? ""),
    );

    const suggestionContents = suggestion.choices[0].message.content;
    if (!suggestionContents) {
      for (const source of filteredSources) {
        updateSource(source.id, "assisted", "failed");
      }
      return;
    }
    for (const source of filteredSources) {
      updateSource(source.id, "assisted", "success");
      updateSource(source.id, "suggestion", suggestionContents);
    }

    addSuggestion(suggestionContents);
  };

  const body = computed<ActivityFormType>(() => {
    return {
      sources: sources.value,
      description: description.value,
      entities: entities.value,
      tags: tags.value,
      startedAt: startedAt.value,
      endedAt: endedAt.value,
    };
  });

  const reset = () => {};

  return {
    body,
    assisted,
    description,
    sources,
    updateSource,
    updateSuggestions,
    addSource,
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
    reset,
  };
});
