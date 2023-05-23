import { render, screen, waitFor } from "@testing-library/react";
import { RouterTransition } from "@site/components/RouterTransition";

jest.mock("@mantine/nprogress", () => jest.requireActual("@mantine/nprogress"));
jest.mock("next/router", () => ({
  ...jest.requireActual("next/router"),
  useRouter: () => ({
    asPath: "/",
    events: {
      on: jest.fn(),
      off: jest.fn(),
    },
  }),
}));

describe("RouterTransition", () => {
  it("doesn't render navigation progress on xl screens", () => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useMediaQuery")
      .mockReturnValue(false);

    render(<RouterTransition />);

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
  });

  it.each([
    { description: "taller", size: 2, screenSize: "smaller" },
    { description: "smaller", size: 1, screenSize: "larger" },
  ])(
    "renders $description navigation progress bar on $screenSize screens",
    ({ size, screenSize }) => {
      jest
        .spyOn(jest.requireActual("@mantine/hooks"), "useMediaQuery")
        .mockReturnValueOnce(screenSize === "smaller")
        .mockReturnValueOnce(true);

      const nProgressComponent = jest.spyOn(
        jest.requireActual("@mantine/nprogress"),
        "NavigationProgress"
      );

      render(<RouterTransition />);

      expect(nProgressComponent).toHaveBeenCalledWith(
        expect.objectContaining({ size }),
        {}
      );
    }
  );

  it("completes navigation progress on route change end", async () => {
    jest
      .spyOn(jest.requireActual("@mantine/hooks"), "useMediaQuery")
      .mockReturnValue(true);

    const nProgressCompleteSpy = jest
      .spyOn(jest.requireActual("@mantine/nprogress").nprogress, "complete")
      .mockImplementation(jest.fn().mockName("nprogress.complete"));

    jest.spyOn(require("next/router"), "useRouter").mockImplementation(() => ({
      asPath: "/",
      events: {
        on: jest.fn((event, cb) => {
          if (event === "routeChangeComplete") cb();
        }),
        off: jest.fn(),
      },
    }));

    render(<RouterTransition />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();

    const toWaitForComplete = waitFor(
      () => expect(nProgressCompleteSpy).toHaveBeenCalled(),
      { timeout: 100 }
    );

    await toWaitForComplete;
  });

  it.each([
    { test: "starts", from: "/any-page", to: "/any-other-page" },
    { test: "doesn't start", from: "/same-page", to: "/same-page" },
  ])(
    "$test navigation progress on route change from '$from' to '$to'",
    async ({ from, to }) => {
      jest
        .spyOn(jest.requireActual("@mantine/hooks"), "useMediaQuery")
        .mockReturnValue(true);

      const nProgressStartSpy = jest
        .spyOn(jest.requireActual("@mantine/nprogress").nprogress, "start")
        .mockImplementation(jest.fn().mockName("nprogress.start"));

      jest
        .spyOn(require("next/router"), "useRouter")
        .mockImplementation(() => ({
          asPath: from,
          events: {
            on: jest.fn((event, cb) => {
              if (event === "routeChangeStart") cb(to);
            }),
            off: jest.fn(),
          },
        }));

      render(<RouterTransition />);

      expect(screen.getByRole("progressbar")).toBeInTheDocument();

      const toWaitForStart = waitFor(
        () => expect(nProgressStartSpy).toHaveBeenCalled(),
        { timeout: 100 }
      );

      if (from !== to) {
        await toWaitForStart;
      } else {
        await expect(toWaitForStart).rejects.toThrow();
      }
    }
  );
});
