"use server";

export type WaitlistActionResult = {
  success: boolean;
  error?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_EMAIL_ERROR = "Email inválido.";

function getEmailValue(formData: FormData) {
  const email = formData.get("email");

  return typeof email === "string" ? email.trim() : "";
}

function logWaitlistEmail(email: string) {
  console.log(`[waitlist] email=${email}`);
}

export async function submitWaitlistEmail(
  prevState: WaitlistActionResult,
  formData: FormData,
): Promise<WaitlistActionResult> {
  void prevState;

  const email = getEmailValue(formData);

  if (!EMAIL_PATTERN.test(email)) {
    return {
      success: false,
      error: INVALID_EMAIL_ERROR,
    };
  }

  logWaitlistEmail(email);

  return { success: true };
}
