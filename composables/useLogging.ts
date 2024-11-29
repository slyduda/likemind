import type { FetchContext, FetchResponse, ResponseType } from "ofetch";

type CustomResponse = FetchContext<any, ResponseType> & {
  response: FetchResponse<any>;
};

type CustomError = FetchContext<any, ResponseType> & {
  error: Error;
};

export const useLogging = () => {
  const mainStore = useMainStore();

  const onRequestError = (request: CustomError) => {
    mainStore.messages.push(fetchTransformer(request));
  };
  const onResponse = (request: CustomResponse) => {
    mainStore.messages.push(fetchTransformer(request));
  };
  const onResponseError = (request: CustomResponse) => {
    mainStore.messages.push(fetchTransformer(request));
  };

  const onResponseRedirect = (request: CustomResponse) => {
    onResponse(request);
    const router = useRouter();

    if (request.response.redirected) {
      const location = request.response.url;
      window.location.href = location; // try to find out how to add a proper "follow" to ofetch
    } else {
      router.push("/");
    }
  };

  return { onRequestError, onResponse, onResponseError, onResponseRedirect };
};
