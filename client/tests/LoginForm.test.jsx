import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LoginForm from "../src/components/LoginForm";
import axios from "axios";

jest.mock("axios");

const mockSetLoginForm = jest.fn();
const mockSetSignedIn = jest.fn();

function renderLoginForm() {
  return render(
    <LoginForm setLoginForm={mockSetLoginForm} setSignedIn={mockSetSignedIn} />
  );
}

describe("LoginForm Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test("renders login inputs and submit button", () => {
    renderLoginForm();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("successfully logs in a user", async () => {
    axios.post.mockResolvedValue({
      data: {
        success: true,
        user: { role: 2, id: 1, first_name: "Test", last_name: "User" },
        token: "mock_token",
      },
    });

    renderLoginForm();
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(mockSetLoginForm).toHaveBeenCalledWith(false);
      expect(mockSetSignedIn).toHaveBeenCalledWith(true);
      expect(sessionStorage.getItem("token")).toBe("mock_token");
      expect(JSON.parse(sessionStorage.getItem("user")).role).toBe(2);
    });
  });

  test("shows error when login fails with invalid credentials", async () => {
    axios.post.mockResolvedValue({
      data: { success: false, message: "Invalid credentials" },
    });

    renderLoginForm();
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByText(/Invalid credentials/i)).toBeInTheDocument()
    );
  });

  test("shows error when server is unreachable", async () => {
    axios.post.mockRejectedValue(new Error("Server is down"));

    renderLoginForm();
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "pass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByText(/Unable to connect to server/i)).toBeInTheDocument()
    );
  });

  test("closes form when close button is clicked", () => {
    renderLoginForm();
    fireEvent.click(screen.getByText("X"));
    expect(mockSetLoginForm).toHaveBeenCalledWith(false);
  });
});
