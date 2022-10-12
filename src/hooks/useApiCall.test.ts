import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import useApiCall from "./useApiCall";

describe("useApiCall", () => {
  test("should the call be successful", async () => {
    const mockTodo = {
      completed: true,
      id: 1,
      title: "lorem ipsum",
      userId: 1,
    };

    const expectedState = {
      data: mockTodo,
      error: null,
      loading: false,
      success: true,
    };

    const mockPromise = new Promise((resolve) => {
      resolve(mockTodo);
    });

    const { result } = renderHook(() => useApiCall());

    expect(result.current[0]).toMatchObject({
      data: null,
      error: null,
      loading: false,
      success: null,
    });

    const [, dispatch] = result.current;
    await act(async () => {
      dispatch(() => mockPromise);
    });
    const state = result.current[0];
    expect(state).toMatchObject(expectedState);
  });

  test("should fail", async () => {
    const expectedState = {
      data: null,
      error: "Error",
      loading: false,
      success: false,
    };

    const mockPromise = new Promise((_resolve, reject) => {
      reject("Error");
    });

    const { result } = renderHook(() => useApiCall());

    expect(result.current[0]).toMatchObject({
      data: null,
      error: null,
      loading: false,
      success: null,
    });

    const [, dispatch] = result.current;
    await act(async () => {
      dispatch(() => mockPromise);
    });
    const state = result.current[0];
    expect(state).toMatchObject(expectedState);
  });
});
