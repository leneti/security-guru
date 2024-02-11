import axios from "axios";
import { render, screen, fireEvent, waitFor } from "@site/test-utils";
import * as mCore from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { GetInTouch } from "@site/app/susisiekite/GetInTouch";
import { theme } from "@site/constants/theme";
import { ErrorMessages } from "@site/constants/error-messages";

jest.mock("axios");
jest.mock("@site/components/ContactInfo");
jest.mock(
  "@tabler/icons-react",
  () =>
    new Proxy(
      {
        __esModule: true,
      },
      {
        get: (_: any, prop: string) => () => <div>mock_{prop}</div>,
      },
    ),
);
jest.mock("@mantine/notifications");
jest.mock("@mantine/core", () => {
  const orgMantineCore = jest.requireActual("@mantine/core");
  const Btn = orgMantineCore.Button;
  return {
    ...orgMantineCore,
    Button: jest.fn((props: any) => <Btn {...props} />),
  };
});

interface FormFields {
  solution: string;
  name: string;
  city: string;
  email: string;
  number: string;
  message: string;
}

const mockFormData: FormFields = {
  solution: "Verslui",
  name: "Mock Name",
  city: "Vilnius",
  email: "mock@mock.mock",
  number: "867654321",
  message: "Mock Message",
};

const renderWithTheme = () =>
  render(
    <mCore.MantineProvider theme={theme}>
      <GetInTouch />
    </mCore.MantineProvider>,
  );

describe("GetInTouch", () => {
  const fillForm = (overrideFormData?: Partial<FormFields>) => {
    const formData = { ...mockFormData, ...overrideFormData };

    const versluiRadio = screen.getByLabelText(/verslui/i);
    fireEvent.click(versluiRadio);

    const nameInput = screen.getByPlaceholderText(/security guru/i);
    fireEvent.change(nameInput, { target: { value: formData.name } });

    const cityInput = screen.getByPlaceholderText(/miestas/i);
    fireEvent.change(cityInput, { target: { value: formData.city } });

    const emailInput = screen.getByPlaceholderText(/info@securityguru\.lt/i);
    fireEvent.change(emailInput, { target: { value: formData.email } });

    const numberInput = screen.getByPlaceholderText(/\+37061234567/i);
    fireEvent.change(numberInput, { target: { value: formData.number } });

    const messageInput = screen.getByLabelText(/pastabos/i);
    fireEvent.change(messageInput, { target: { value: formData.message } });
  };

  it("doesn't make API calls with no data", () => {
    const mockAxiosPost = jest.fn().mockName("axios.post");
    (axios.post as jest.Mock).mockImplementation(mockAxiosPost);

    renderWithTheme();

    const submitBtn = screen.getByRole("button");

    fireEvent.click(submitBtn);
    expect(mockAxiosPost).not.toHaveBeenCalled();
  });

  it("doesn't make API call with incorrect data", () => {
    const mockAxiosPost = jest.fn().mockName("axios.post");
    (axios.post as jest.Mock).mockImplementation(mockAxiosPost);

    renderWithTheme();

    const submitBtn = screen.getByRole("button");

    fillForm({ name: " " });
    fireEvent.click(submitBtn);
    expect(mockAxiosPost).not.toHaveBeenCalled();

    fillForm({ number: "mock_bad_number" });
    fireEvent.click(submitBtn);
    expect(mockAxiosPost).not.toHaveBeenCalled();

    fillForm({ email: "mock_bad_email" });
    fireEvent.click(submitBtn);
    expect(mockAxiosPost).not.toHaveBeenCalled();
  });

  it("makes API call with correct data", async () => {
    const mockAxiosPost = (axios.post as jest.Mock).mockImplementation(
      jest.fn(() => Promise.resolve()).mockName("axios.post"),
    );

    renderWithTheme();

    fillForm();

    const submitBtn = screen.getByRole("button");

    fireEvent.click(submitBtn);

    expect(mockAxiosPost).toHaveBeenCalledWith("/api/contact", mockFormData);
    await waitFor(() =>
      expect(screen.getByPlaceholderText(/security guru/i)).toHaveValue(""),
    );
  });

  it.each([
    {
      type: "default",
      mockResponse: undefined,
      expectedProps: expect.objectContaining({
        title: "Kažkas nutiko...",
        message: expect.stringContaining("vėliau"),
      }),
    },
    {
      type: "specific",
      mockResponse: {
        response: {
          data: {
            message: `[BAD_CONTACT_FORM] ${ErrorMessages.INCORRECT_EMAIL}`,
          },
        },
      },
      expectedProps: expect.objectContaining({
        title: "Netinkamai užpildyta forma",
        message: ErrorMessages.INCORRECT_EMAIL,
      }),
    },
  ])(
    "shows notification with $type error message",
    async ({ mockResponse, expectedProps }) => {
      (axios.post as jest.Mock).mockImplementation(
        jest.fn(() => Promise.reject(mockResponse)).mockName("axios.post"),
      );

      const showNotificationMock = jest
        .spyOn(notifications, "show")
        .mockImplementation(jest.fn().mockName("notifications.show"));
      const updateNotificationMock = jest
        .spyOn(notifications, "update")
        .mockImplementation(jest.fn().mockName("notifications.update"));

      renderWithTheme();

      fillForm();

      const submitBtn = screen.getByRole("button");
      fireEvent.click(submitBtn);

      expect(showNotificationMock).toHaveBeenCalled();

      await waitFor(() =>
        expect(updateNotificationMock).toHaveBeenCalledWith(expectedProps),
      );
    },
  );
});
