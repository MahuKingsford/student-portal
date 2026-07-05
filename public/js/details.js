// public/js/details.js
// -----------------------------------------------------------------------------
// Client-side behaviour for the Student Details page: when the "Change
// Status" select is changed, send the new value to the server with fetch()
// (PATCH /students/:id/status) and update the on-screen badge/text without
// reloading the page.
// -----------------------------------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
  const select = document.getElementById("changeStatus");
  const statusBadge = document.getElementById("status-badge");
  const statusText = document.getElementById("status-text");
  const feedback = document.getElementById("status-feedback");

  if (!select) return;

  select.addEventListener("change", async () => {
    const newStatus = select.value;
    const studentId = select.dataset.studentId;

    feedback.textContent = "Saving...";
    feedback.className = "status-feedback";

    try {
      const response = await fetch(`/students/${studentId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Failed to update status.");
      }

      // Update the badge and text in place — no page reload required.
      statusBadge.textContent = result.status;
      statusBadge.className = `status-pill status-pill--${result.status}`;
      statusText.textContent = result.status;

      feedback.textContent = "Status updated.";
      feedback.className = "status-feedback is-success";
    } catch (err) {
      feedback.textContent = err.message || "Could not update status.";
      feedback.className = "status-feedback is-error";
    }
  });
});
