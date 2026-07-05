// public/js/form.js
// -----------------------------------------------------------------------------
// Client-side behaviour for the Portal Form page:
//   1. Asynchronously fetches the states + local-government dataset from the
//      server and uses it to populate the "State Of Origin" select.
//   2. Repopulates the "Local Government" select whenever a state is chosen,
//      using the data that was already fetched (no extra request needed).
//   3. Disables the submit button while the form is being sent, just to
//      prevent a double submission.
// -----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const stateSelect = document.getElementById("state");
  const lgaSelect = document.getElementById("lga");
  const form = document.getElementById("portal-form");

  if (stateSelect && lgaSelect) {
    loadStatesData(stateSelect, lgaSelect);
  }

  if (form) {
    form.addEventListener("submit", () => {
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Submitting...";
      }
    });
  }
});

/**
 * Fetches /api/states asynchronously and wires up the State -> LGA
 * dependent-dropdown behaviour.
 */
async function loadStatesData(stateSelect, lgaSelect) {
  try {
    const response = await fetch("/api/states");
    if (!response.ok) throw new Error("Network response was not ok");

    const statesData = await response.json(); // [{ state, local: [...] }, ...]

    // Fill the State dropdown.
    statesData.forEach((entry) => {
      const option = document.createElement("option");
      option.value = entry.state;
      option.textContent = entry.state;
      stateSelect.appendChild(option);
    });

    // Whenever the state changes, repopulate the LGA dropdown from the data
    // we already have in memory (no need to hit the server again).
    stateSelect.addEventListener("change", () => {
      // Reset to just the placeholder option.
      lgaSelect.length = 1;

      const selectedState = statesData.find((entry) => entry.state === stateSelect.value);
      if (!selectedState) return;

      selectedState.local.forEach((lgaName) => {
        const option = document.createElement("option");
        option.value = lgaName;
        option.textContent = lgaName;
        lgaSelect.appendChild(option);
      });
    });
  } catch (err) {
    console.error("Could not load states/LGA data:", err);
  }
}
