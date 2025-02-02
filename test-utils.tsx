import type { ReactElement, ReactNode } from "react";
import { MantineProvider } from "@mantine/core";
import { render, type RenderOptions } from "@testing-library/react";
import { resolver, theme } from "@site/constants";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider theme={theme} cssVariablesResolver={resolver}>
      {children}
    </MantineProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };
