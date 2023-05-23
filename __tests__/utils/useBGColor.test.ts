import { renderHook } from "@testing-library/react";
import { useBGColor } from "@site/utils/useBGColor";

jest.mock("@mantine/core", () => ({
  __esModule: true,
  useMantineTheme: jest.fn(() => ({
    colors: { dark: ["a", "a", "a", "a", "a", "a", "b", "a", "a", "a"] },
  })),
}));

describe("useBGColor", () => {
  it("should return the correct color", () => {
    const { result } = renderHook(() => useBGColor());
    expect(result.current).toBe("b");
  });
});
