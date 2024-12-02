export const filterInsert = <T extends { id: string | null }>(items: T[]) => {
  return items.flatMap((item) => {
    const id = item.id;
    if (id) return []; // Exclude entities with `id`
    return [
      {
        ...item,
        id: null,
      },
    ];
  });
};

export const filterSelect = <T extends { id: string | null }>(items: T[]) => {
  return items.flatMap((item) => {
    const id = item.id;
    if (!id) return []; // Exclude entities without `id`
    return [
      {
        ...item,
        id,
      },
    ];
  });
};
