import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DrugsList } from "../DrugsList";
import * as hooks from "../../hooks";
import {
  mockTableConfig,
  mockDrugs,
  mockMeta,
  mockCompanies,
} from "./mockDrugs";

vi.mock("../../hooks", () => ({
  useDrugs: vi.fn(),
  useCompanies: vi.fn(),
  useTableConfig: vi.fn(),
}));

describe("DrugsList Component", () => {
  const defaultMocks = {
    useDrugs: {
      drugs: mockDrugs,
      loading: false,
      error: null,
      meta: mockMeta,
      refetch: vi.fn(),
    },
    useCompanies: {
      companies: mockCompanies,
      loading: false,
      error: null,
      refetch: vi.fn(),
    },
    useTableConfig: {
      configs: mockTableConfig,
      loading: false,
      error: null,
      refetch: vi.fn(),
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(hooks.useDrugs).mockReturnValue(defaultMocks.useDrugs);
    vi.mocked(hooks.useCompanies).mockReturnValue(defaultMocks.useCompanies);
    vi.mocked(hooks.useTableConfig).mockReturnValue(
      defaultMocks.useTableConfig
    );
  });

  it("should display loading spinner when drugs are loading initially", () => {
    vi.mocked(hooks.useDrugs).mockReturnValue({
      ...defaultMocks.useDrugs,
      drugs: [],
      loading: true,
    });

    render(<DrugsList />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("should display error message when drugs fail to load", () => {
    const errorMessage = "Failed to load drugs";
    vi.mocked(hooks.useDrugs).mockReturnValue({
      ...defaultMocks.useDrugs,
      error: errorMessage,
    });

    render(<DrugsList />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it("should render all visible columns from config in correct order", () => {
    render(<DrugsList />);

    const headers = screen.getAllByRole("columnheader");
    expect(headers[0]).toHaveTextContent("Id");
    expect(headers[1]).toHaveTextContent("Drug Code");
    expect(headers[2]).toHaveTextContent("Name");
    expect(headers[3]).toHaveTextContent("Company");
    expect(headers[4]).toHaveTextContent("Launch Date");
  });

  it("should render drug data correctly", () => {
    render(<DrugsList />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("0006-0568")).toBeInTheDocument();
    expect(screen.getByText("vorinostat (ZOLINZA)")).toBeInTheDocument();
    expect(screen.getByText("Merck Sharp & Dohme Corp.")).toBeInTheDocument();
    expect(screen.getByText("15.02.2004")).toBeInTheDocument();

    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("68828-192")).toBeInTheDocument();
    expect(screen.getByText(/Avobenzone.*\(CC Cream/)).toBeInTheDocument();
    expect(
      screen.getByText("Jafra cosmetics International")
    ).toBeInTheDocument();
    expect(screen.getByText("02.02.2011")).toBeInTheDocument();
  });

  it('should display "No drugs found" message when no data is available', () => {
    vi.mocked(hooks.useDrugs).mockReturnValue({
      ...defaultMocks.useDrugs,
      drugs: [],
    });

    render(<DrugsList />);

    expect(screen.getByText("No drugs found")).toBeInTheDocument();
  });

  it("should filter drugs when company is selected", async () => {
    const mockRefetch = vi.fn();
    vi.mocked(hooks.useDrugs).mockReturnValue({
      ...defaultMocks.useDrugs,
      refetch: mockRefetch,
    });

    render(<DrugsList />);

    const dropdowns = screen.getAllByRole("combobox");
    const companyDropdown = dropdowns.find(
      (el) => !el.getAttribute("aria-labelledby")?.includes("Rows")
    );

    await userEvent.click(companyDropdown!);

    await waitFor(() => {
      const merck = screen.getByRole("option", {
        name: "Merck Sharp & Dohme Corp.",
      });
      userEvent.click(merck);
    });

    await waitFor(() => {
      expect(mockRefetch).toHaveBeenCalled();
    });
  });

  it("should reset page to 0 when company filter changes", async () => {
    const mockUseDrugs = vi.fn().mockReturnValue(defaultMocks.useDrugs);
    vi.mocked(hooks.useDrugs).mockImplementation(mockUseDrugs);

    render(<DrugsList />);

    const nextPageButton = screen.getByRole("button", { name: /next page/i });
    await userEvent.click(nextPageButton);

    const dropdowns = screen.getAllByRole("combobox");
    const companyDropdown = dropdowns.find(
      (el) => !el.getAttribute("aria-labelledby")?.includes("Rows")
    );

    await userEvent.click(companyDropdown!);

    await waitFor(() => {
      const jafra = screen.getByRole("option", {
        name: "Jafra cosmetics International",
      });
      userEvent.click(jafra);
    });

    await waitFor(() => {
      const lastCall =
        mockUseDrugs.mock.calls[mockUseDrugs.mock.calls.length - 1][0];
      expect(lastCall.page).toBe(1);
    });
  });

  it("should filter by company when company name is clicked in table", async () => {
    const mockUseDrugs = vi.fn().mockReturnValue(defaultMocks.useDrugs);
    vi.mocked(hooks.useDrugs).mockImplementation(mockUseDrugs);

    render(<DrugsList />);

    const companyLink = screen.getByText("Merck Sharp & Dohme Corp.");
    await userEvent.click(companyLink);

    await waitFor(() => {
      const lastCall =
        mockUseDrugs.mock.calls[mockUseDrugs.mock.calls.length - 1][0];
      expect(lastCall.company).toBe("Merck Sharp & Dohme Corp.");
      expect(lastCall.page).toBe(1);
    });
  });
});
