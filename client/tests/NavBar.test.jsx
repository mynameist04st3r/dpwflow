import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../src/components/NavBar";


beforeEach(() => {
  sessionStorage.clear();
});

function renderWithRouter(ui) {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
}

describe("NavBar Component", () => {
  test("renders Home and Contact links", () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
    expect(screen.getByText(/Contact/i)).toBeInTheDocument();
  });

  test("shows Login and Sign Up when not signed in", () => {
    renderWithRouter(<NavBar />);
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  });

  test("shows Logout when user is signed in", () => {
    sessionStorage.setItem("token", "fake_token");
    sessionStorage.setItem("user", JSON.stringify({ role: 2 }));

    renderWithRouter(<NavBar />);
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  test("shows My Requests for user with role >= 2", () => {
    sessionStorage.setItem("token", "fake_token");
    sessionStorage.setItem("user", JSON.stringify({ role: 2 }));

    renderWithRouter(<NavBar />);
    expect(screen.getByText(/My Requests/i)).toBeInTheDocument();
  });

  test("shows Admin for user with role === 4", () => {
    sessionStorage.setItem("token", "fake_token");
    sessionStorage.setItem("user", JSON.stringify({ role: 4 }));

    renderWithRouter(<NavBar />);
    expect(screen.getByText(/Admin/i)).toBeInTheDocument();
  });
});
