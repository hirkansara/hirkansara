(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#primary-nav");

  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "بستن منو" : "باز کردن منو");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        nav.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
      }
    });
  }

  const year = document.querySelector("#year");
  if (year) year.textContent = new Intl.DateTimeFormat("fa-IR", { year: "numeric" }).format(new Date());

  const topButton = document.querySelector("#back-to-top");
  if (topButton) {
    const updateTopButton = () => topButton.classList.toggle("visible", window.scrollY > 450);
    window.addEventListener("scroll", updateTopButton, { passive: true });
    updateTopButton();
    topButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }

  const form = document.querySelector("#inquiry-form");
  const status = document.querySelector("#form-status");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data = new FormData(form);
      const subject = `درخواست مشاوره ملکی - ${data.get("type")}`;
      const body = [
        "سلام، درخواست مشاوره از وب‌سایت مشاور املاک هیرکان سرا ارسال می‌شود.",
        "",
        `نام: ${data.get("name")}`,
        `شماره تماس: ${data.get("phone")}`,
        `نوع درخواست: ${data.get("type")}`,
        `بودجه تقریبی: ${data.get("budget")}`,
        `محدوده و توضیحات: ${data.get("details") || "ذکر نشده"}`,
      ].join("\n");

      const mailto = `mailto:hirkansararealestate@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      if (status) {
        status.textContent = "در حال باز کردن برنامه ایمیل شما… اگر برنامه‌ای باز نشد، به آدرس hirkansararealestate@gmail.com ایمیل بزنید.";
      }
      window.location.href = mailto;
    });
  }
})();
