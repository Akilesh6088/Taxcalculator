document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const resultModal = document.getElementById("resultModal");
    const closeBtn = document.querySelector(".close");
    const taxResult = document.getElementById("taxResult");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        hideErrorIcons();
        const grossIncome = parseFloat(document.getElementById("grossIncome").value) || 0;
        const extraIncome = parseFloat(document.getElementById("extraIncome").value) || 0;
        const age = document.getElementById("age").value;
        const deductions = parseFloat(document.getElementById("deductions").value) || 0;
        if (!age) {
            showErrorIcon("age", "Please select an age group");
            return;
        }

        const overallIncomeBeforeDeductions = grossIncome + extraIncome;
        const overallIncomeAfterDeductions = overallIncomeBeforeDeductions - deductions;

        let tax = 0;

        if (overallIncomeAfterDeductions > 800000) {
            const taxableAmount = overallIncomeAfterDeductions - 800000;
            if (age === "<40") {
                tax = 0.3 * taxableAmount;
            } else if (age === "≥ 40 &lt; 60") {
                tax = 0.4 * taxableAmount;
            } else if (age === "≥ 60") {
                tax = 0.1 * taxableAmount;
            }
        }

        const overallIncomeAfterTax = overallIncomeAfterDeductions - tax;
        showResultModal(overallIncomeAfterTax);
    });

    closeBtn.addEventListener("click", function() {
        resultModal.style.display = "none";
    });

    function showResultModal(overallIncomeAfterTax) {
        resultModal.style.display = "block";
        taxResult.innerHTML = "Your overall income after tax deductions will be: "+ overallIncomeAfterTax.toFixed(2) +" Lakhs after tax deducations";
    }

    function showErrorIcon(fieldId, errorMessage) {
        const errorIcon = document.querySelector(`#${fieldId} + .error-icon`);
        errorIcon.setAttribute("title", errorMessage);
        errorIcon.style.display = "inline-block";
    }

    function hideErrorIcons() {
        const errorIcons = document.querySelectorAll(".error-icon");
        errorIcons.forEach(icon => {
            icon.style.display = "none";
        });
    }

    const grossIncomeInput = document.getElementById("grossIncome");
    grossIncomeInput.addEventListener("input", function() {
        const inputValue = this.value;
        if (/[^0-9\.]/.test(inputValue)) {
            alert("Please enter numbers only.");
            this.value = inputValue.replace(/[^0-9\.]/g, '');

            alert("Please enter numbers only. !");
        }
    });
});
