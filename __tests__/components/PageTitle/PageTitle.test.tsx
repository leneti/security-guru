import { render, screen } from "@testing-library/react";
import { PageTitle } from "@site/components/PageTitle";
import { APP_NAME, APP_NAME_DEV } from "@site/constants";

jest.mock("next/head", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-next-head">{children}</div>
  ),
}));

describe("PageTitle", () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
  });

  afterAll(() => {
    process.env = OLD_ENV;
  });

  const mockPageName = "About";

  it.each([
    { env: "production", page: "home", title: APP_NAME },
    { env: "development", page: "home", title: APP_NAME_DEV },
    {
      env: "production",
      page: mockPageName.toLowerCase(),
      title: `${mockPageName} | ${APP_NAME}`,
      children: mockPageName,
    },
  ])(
    "renders correct title in $env environment on $page page",
    ({ env, title, children }) => {
      process.env = Object.assign(process.env, {
        NODE_ENV: env,
      });

      render(<PageTitle>{children}</PageTitle>);

      expect(screen.getByText(title)).toBeInTheDocument();
    }
  );
});
