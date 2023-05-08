import { MantineTheme } from "@mantine/core";
import { getBGColor } from "@site/utils/getBGColor";

const mockTheme = {
  colors: { dark: ["a", "a", "a", "a", "a", "a", "b", "a", "a", "a"] },
};

describe("getBGColor", () => {
  it("should return the correct color", () => {
    expect(getBGColor(mockTheme as MantineTheme)).toBe("b"); // 6th shade of dark
  });
});
