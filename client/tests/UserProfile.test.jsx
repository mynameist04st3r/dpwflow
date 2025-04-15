import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import UserProfile from "../src/pages/userProfile";
import axios from "axios";

jest.mock("axios");

global.alert = jest.fn();

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("UserProfile Component", () => {
  const mockUser = {
    id: 1,
    username: "testuser",
    first_name: "Test",
    last_name: "User",
    rank: "SGT",
    email: "test@example.com",
    phone_number: "1234567890",
    role: 2,
  };

  beforeEach(() => {
    sessionStorage.setItem("user", JSON.stringify(mockUser));
    axios.get.mockResolvedValue({ data: [mockUser] });
  });

  afterEach(() => {
    jest.clearAllMocks();
    sessionStorage.clear();
  });

  test("renders user profile info", async () => {
    renderWithRouter(<UserProfile />);
    expect(await screen.findByText("User Profile")).toBeInTheDocument();
    expect(screen.getByText(/Test User/)).toBeInTheDocument();
    expect(screen.getByText(/SGT/)).toBeInTheDocument();
  });

  test("shows edit profile form", async () => {
    renderWithRouter(<UserProfile />);
    await screen.findByText("User Profile");

    fireEvent.click(screen.getByText("Edit Profile"));
    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
  });

  test("shows credentials form and submits", async () => {
    renderWithRouter(<UserProfile />);
    await screen.findByText("User Profile");

    fireEvent.click(screen.getByText("Change Credentials"));

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "newusername" },
    });
    fireEvent.change(screen.getByPlaceholderText("Current Password"), {
      target: { value: "oldpass" },
    });
    fireEvent.change(screen.getByPlaceholderText("New Password"), {
      target: { value: "newpass" },
    });

    axios.patch.mockResolvedValue({ data: {} });

    await act(async () => {
      fireEvent.click(screen.getByText("Save Credentials"));
    });

    expect(axios.patch).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith("Credentials updated");
  });

  test("shows profile update and submits", async () => {
    renderWithRouter(<UserProfile />);
    await screen.findByText("User Profile");

    fireEvent.click(screen.getByText("Edit Profile"));

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Updated" },
    });

    axios.patch.mockResolvedValue({});
    axios.get.mockResolvedValueOnce({
      data: [{ ...mockUser, first_name: "Updated" }],
    });

    await act(async () => {
      fireEvent.click(screen.getByText("Save Profile"));
    });

    expect(axios.patch).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalled();
    expect(global.alert).toHaveBeenCalledWith("Profile updated");
  });

  test("handles errors gracefully", async () => {
    sessionStorage.setItem("user", JSON.stringify(mockUser));
    axios.get.mockRejectedValue(new Error("Fetch failed"));

    renderWithRouter(<UserProfile />);

    await waitFor(() =>
      expect(
        screen.getByText(/unable to fetch user data/i)
      ).toBeInTheDocument()
    );
  });
});
