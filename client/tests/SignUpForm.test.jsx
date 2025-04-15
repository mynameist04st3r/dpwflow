import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import axios from "axios";
import SignUpForm from "../src/components/SignUpForm";


jest.mock("axios");

const mockSetSignUpForm = jest.fn();
const mockSetSignedIn = jest.fn();

describe("SignUpForm Component", () => {
  beforeEach(() => {
    sessionStorage.clear();
    jest.clearAllMocks();
  });

  test("renders all input fields and the submit button", () => {
    render(<SignUpForm setSignUpForm={mockSetSignUpForm} setSignedIn={mockSetSignedIn} />);

    expect(screen.getByPlaceholderText("First Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Last Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Rank")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Phone Number (10 digits)")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("shows error if required fields are empty", async () => {
    render(<SignUpForm setSignUpForm={mockSetSignUpForm} setSignedIn={mockSetSignedIn} />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByText("Please fill out all fields")).toBeInTheDocument()
    );
  });

  test("shows error if passwords do not match", async () => {
    render(<SignUpForm setSignUpForm={mockSetSignUpForm} setSignedIn={mockSetSignedIn} />);

    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "tester" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "differentPass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument()
    );
  });

  test("submits form and sets sessionStorage on success", async () => {
    axios.post.mockResolvedValue({
      data: {
        success: true,
        user: {
          id: 1,
          first_name: "Test",
          last_name: "User",
          phone_number: "1234567890",
          email: "test@example.com",
          role: 2,
        },
        token: "fake-jwt-token",
      },
    });

    render(<SignUpForm setSignUpForm={mockSetSignUpForm} setSignedIn={mockSetSignedIn} />);

    fireEvent.change(screen.getByPlaceholderText("First Name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last Name"), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Rank"), {
      target: { value: "SPC" },
    });
    fireEvent.change(screen.getByPlaceholderText("Phone Number (10 digits)"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "securepass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {
      target: { value: "securepass" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(mockSetSignUpForm).toHaveBeenCalledWith(false);
      expect(mockSetSignedIn).toHaveBeenCalledWith(true);
      expect(sessionStorage.getItem("token")).toBe("fake-jwt-token");

      const storedUser = JSON.parse(sessionStorage.getItem("user"));
      expect(storedUser).toEqual(
        expect.objectContaining({
          first_name: "Test",
          last_name: "User",
          role: 2,
        })
      );
    });
  });
});
