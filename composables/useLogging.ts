export const useLogging = () => {
  const mainStore = useMainStore();

  const onRequestError = (request: any) => {
    mainStore.messages.push(fetchTransformer(request));
  };
  const onResponse = (request: any) => {
    mainStore.messages.push(fetchTransformer(request));
  };
  const onResponseError = (request: any) => {
    mainStore.messages.push(fetchTransformer(request));
  };

  return { onRequestError, onResponse, onResponseError };
};
