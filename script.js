const SUPABASE_URL = "https://kltdaaqzexezniedsnpm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dd2h2FUlIVgL-WQLjMfIlw_1Wz2xLk-";

const form = document.getElementById("requestForm");
const message = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const row = {
      customer_name: data.get("name") || "",
      email: data.get("email") || "",
      phone: data.get("phone") || "",
      address: data.get("addressArea") || "",
      service: data.get("service") || "",
      preferred_date: data.get("preferredDate") || null,
      preferred_time: data.get("preferredTime") || "",
      message: data.get("details") || "",
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