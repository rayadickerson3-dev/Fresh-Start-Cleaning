const SUPABASE_URL = "https://kltdaaqzexezniedsnpm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dd2h2FUlGv-LwQLjMfIlw_1Wz2xLk-";

const form = document.getElementById("requestForm");
const message = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailField = form.elements.namedItem("email");
    const email = emailField ? String(emailField.value || "").trim() : "";

    if (!email) {
      if (message) {
        message.textContent = "Please enter your email address.";
        message.className = "form-message error";
      }
      return;
    }

    const data = new FormData(form);
    const row = {
      customer_name: String(data.get("name") || "").trim(),
      email: email,
      phone: String(data.get("phone") || "").trim(),
      address: String(data.get("addressArea") || "").trim(),
      service: String(data.get("service") || "").trim(),
      preferred_date: data.get("preferredDate") || null,
      preferred_time: String(data.get("preferredTime") || "").trim(),
      message: String(data.get("details") || "").trim(),
      status: "pending"
    };

    if (message) {
      message.textContent = "Sending your request...";
      message.className = "form-message";
    }

    try {
      const response = await fetch(SUPABASE_URL + "/rest/v1/booking_requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_ANON_KEY,
          "Authorization": "Bearer " + SUPABASE_ANON_KEY,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify(row)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Supabase error:", response.status, errorText);
        throw new Error(errorText || "Request failed");
      }

      form.reset();
      if (message) {
        message.textContent = "Request received! Fresh Start Cleaning will review it and contact you to confirm the details.";
        message.className = "form-message success";
      }
    } catch (error) {
      console.error("Booking submission error:", error);
      if (message) {
        message.textContent = "We couldn't send your request yet. " + (error.message || "Please call or text 218-556-8051.");
        message.className = "form-message error";
      }
    }
  });
}