document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  if (tabs.length && !document.querySelector('.tab.active')) {
    tabs[0].classList.add('active');
  }
  if (tabContents.length && !document.querySelector('.tab-content.active')) {
    tabContents[0].classList.add('active');
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));
      tab.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });

  const teamCards = document.querySelectorAll(".team-card");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

  teamCards.forEach((card) => observer.observe(card));
});