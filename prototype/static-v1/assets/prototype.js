(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var state = params.get("state") || "default";

  document.querySelectorAll("[data-state-view]").forEach(function (element) {
    var states = element.getAttribute("data-state-view").split(/\s+/);
    element.hidden = states.indexOf(state) === -1;
  });

  document.querySelectorAll("[data-choice-group]").forEach(function (group) {
    group.addEventListener("click", function (event) {
      var choice = event.target.closest("[data-choice]");
      if (!choice || choice.classList.contains("disabled")) {
        return;
      }

      group.querySelectorAll("[data-choice]").forEach(function (item) {
        item.classList.remove("active");
        item.setAttribute("aria-pressed", "false");
      });
      choice.classList.add("active");
      choice.setAttribute("aria-pressed", "true");
    });
  });

  document.querySelectorAll("[data-prototype-target]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      window.location.href = form.getAttribute("data-prototype-target");
    });
  });

  document.querySelectorAll("[data-account-switch]").forEach(function (select) {
    select.addEventListener("change", function () {
      window.location.href = "index.html?state=success";
    });
  });
})();
