document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("propertyForm");
  const steps = document.querySelectorAll(".form-step");
  const dots = document.querySelectorAll(".step-dot");
  const nextBtn = document.querySelector(".btn-next");
  const prevBtn = document.querySelector(".btn-prev");

  let currentStep = 1;

  function updateFormState() {
    // Toggle active classes on steps
    steps.forEach((step) => {
      step.classList.toggle(
        "active",
        parseInt(step.dataset.step) === currentStep,
      );
    });

    // Toggle active state on progress indicators
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index < currentStep);
    });
  }

  nextBtn.addEventListener("click", () => {
    // Check if fields in current step are filled before going forward
    const currentFields = steps[currentStep - 1].querySelectorAll("[required]");
    let allValid = true;

    currentFields.forEach((field) => {
      if (!field.checkValidity()) {
        field.reportValidity();
        allValid = false;
      }
    });

    if (allValid && currentStep < steps.length) {
      currentStep++;
      updateFormState();
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      updateFormState();
    }
  });

  // Final Form submission hook
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    console.log("Form submitted successfully!");
    // Your Appwrite or API database handling logic goes here
  });
});
