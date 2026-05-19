import { afterEach, describe, expect, it, vi } from "vitest";

import { submitWaitlistEmail, type WaitlistActionResult } from "@/app/actions/waitlist";

const initialState: WaitlistActionResult = { success: false };

function formDataWithEmail(email: string) {
  const formData = new FormData();
  formData.set("email", email);

  return formData;
}

describe("submitWaitlistEmail", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns success and logs a valid email", async () => {
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await expect(
      submitWaitlistEmail(initialState, formDataWithEmail("teste@email.com")),
    ).resolves.toEqual({ success: true });
    expect(consoleLog).toHaveBeenCalledWith("[waitlist] email=teste@email.com");
  });

  it("returns the Portuguese error for an invalid email", async () => {
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await expect(
      submitWaitlistEmail(initialState, formDataWithEmail("not-an-email")),
    ).resolves.toEqual({ success: false, error: "Email inválido." });
    expect(consoleLog).not.toHaveBeenCalled();
  });

  it("returns the Portuguese error for an empty email", async () => {
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await expect(submitWaitlistEmail(initialState, formDataWithEmail(""))).resolves.toEqual({
      success: false,
      error: "Email inválido.",
    });
    expect(consoleLog).not.toHaveBeenCalled();
  });

  it("accepts a minimal valid email format", async () => {
    const consoleLog = vi.spyOn(console, "log").mockImplementation(() => undefined);

    await expect(submitWaitlistEmail(initialState, formDataWithEmail("a@b.c"))).resolves.toEqual({
      success: true,
    });
    expect(consoleLog).toHaveBeenCalledWith("[waitlist] email=a@b.c");
  });
});
