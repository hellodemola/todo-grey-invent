import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { describe, expect, it } from "vitest";
import { store } from "../store/store";
import App from "../App";

describe("Todo List Component", () => {
  it("renders the list correctly", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText("Colloborative Todo List")).toBeInTheDocument();
  });

  it("allows adding a new todo", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const addButton = screen.getByText("Add Task");
    fireEvent.click(addButton);

    expect(screen.getByText("Create a new task")).toBeInTheDocument();
  });
});
