import { useCallback, useReducer } from "react";

interface ApiCallState<TData> {
  data: TData | null;
  error: string | null;
  loading: boolean;
  success: boolean | null;
}

interface ApiCallActions {
  type: "success" | "request" | "error";
  payload?: any;
}

const INITIAL_STATE: ApiCallState<any> = {
  data: null,
  error: null,
  loading: false,
  success: null,
};
type ApiCallDispatcher = (asyncFunction: () => Promise<any>) => Promise<void>;

const useApiCall = <T>(): [ApiCallState<T>, ApiCallDispatcher] => {
  const reducer = (state: ApiCallState<T>, action: ApiCallActions) => {
    switch (action.type) {
      case "success":
        return {
          ...state,
          loading: false,
          data: action.payload,
          success: true,
        };

      case "request":
        return {
          ...state,
          loading: true,
        };
      case "error":
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const execute = useCallback(async (asyncFunction: () => Promise<T>) => {
    dispatch({ type: "request" });
    try {
      const response = await asyncFunction();
      dispatch({ type: "success", payload: response });
    } catch (error) {
      dispatch({ type: "error", payload: error });
    }
  }, []);
  return [state, execute];
};

export default useApiCall;
