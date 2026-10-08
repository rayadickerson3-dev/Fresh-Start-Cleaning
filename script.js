const SUPABASE_URL = "https://kltdaaqzexezniedsnpm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_dd2h2FUlIVgL-WQLjMfIlw_1Wz2xLk-";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const form = document.getElementById("requestForm");
const message = document.getElementById("formMessage");

if (form) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const row = {
      customer_name: data.get("name") || "",
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

    const { error } = await supabase.from("booking_requests").insert([row]);

    if (error) {
      console.error(error);
      if (message) {
        message.textContent = "We couldn't send your request yet. Please call or text 218-556-8051.";
        message.className = "form-message error";
      }
      return;
    }

    form.reset();
    if (message) {
      message.textContent = "Request received! Fresh Start Cleaning will review it and contact you to confirm the details.";
      message.className = "form-message success";
    }
  });
}
