document.addEventListener("DOMContentLoaded", async () => {
    const addExpenseBtn = document.querySelector(".add-expense");
    const expenseName = document.querySelector("#expense-name");
    const expensePrice = document.querySelector("#expense-amount");
    const expenseDOMList = document.querySelector(".exprese-list");
    const totalExpenseDisplay = document.querySelector(".total");
    const expenseContainer = document.querySelector(".expense-container");
    const budgetAmount = document.querySelector("#budget-amount");
    const addTotalbudget = document.querySelector("#add-total-budget");
    const displayTotalBudget = document.querySelector("#available-budget");
  
    // Retrieve the existing expenses from localStorage or initialize an empty array
    let expenseList = JSON.parse(localStorage.getItem("expenselist")) || [];
    let availableBudget = localStorage.getItem("total") || "";
  
    try {
      displayBudget();
      handleBudgetExpense();
      displayExpense();
      handleDisplayExpense();
    } catch (err) {
      console.error("Error displaying expenses:", err);
    }
  
    // Handle adding total budget
    addTotalbudget.addEventListener("click", (event) => {
      const budgetValue = budgetAmount.value.trim();
      if (!budgetValue) return;
  
      availableBudget = budgetValue;
      budgetAmount.value = "";
      addBudgetToLocal();
      displayBudget();
      handleBudgetExpense();
    });
  
    function addBudgetToLocal() {
      localStorage.setItem("total", availableBudget);
    }
  
    function displayBudget() {
      displayTotalBudget.textContent = availableBudget
        ? `Total Budget: $${availableBudget}`
        : "Total Budget: $0";
    }
  
    function handleBudgetExpense() {
      let budget = availableBudget ? Number(availableBudget) : 0;
      let totalExpense = calculateTotalExpense();
  
      // Disable add button if budget is zero or expense exceeds budget
      if (budget === 0 || totalExpense >= budget) {
        addExpenseBtn.classList.remove("active");
      } else {
        addExpenseBtn.classList.add("active");
      }
    }
  
    // Function to add expense
    function addExpense(expenseTitle, expenseValue) {
      const expense = {
        id: Date.now(),
        expenseTitle: expenseTitle,
        expenseAmount: Number(expenseValue),
      };
      expenseList.push(expense);
      addToLocal();
    }
  
    function addToLocal() {
      localStorage.setItem("expenselist", JSON.stringify(expenseList));
    }
  
    // Add expense button click event
    addExpenseBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const expenseTitle = expenseName.value.trim();
      const expenseAmount = expensePrice.value.trim();
  
      if (expenseTitle && expenseAmount) {
        // Ensure both total expense and available budget exist
        const totalExpense = calculateTotalExpense();
        const budget = Number(availableBudget);
  
        // Check if the new expense exceeds the available budget
        if (totalExpense + Number(expenseAmount) > budget) {
          alert("Expense exceeds the total budget");
          expenseName.value = "";
          expensePrice.value = "";
          return;
        }
  
        // Add the expense and refresh the UI
        addExpense(expenseTitle, expenseAmount);
        displayExpense();
  
        // Empty the input fields
        expenseName.value = "";
        expensePrice.value = "";
  
        // Refresh total expense
        updateTotalExpense();
  
        // Handle budget and expense
        handleBudgetExpense();
      }
    });
  
    function displayExpense() {
      expenseDOMList.innerHTML = expenseList
        .map((expense) => {
          return `
            <li id="${expense.id}">
                <span>${expense.expenseTitle}</span>
                <span>$${expense.expenseAmount}</span>
                <button class="delete-expense">Delete</button>
            </li>
          `;
        })
        .join("");
    }
  
    // Delete expense event using event delegation
    expenseDOMList.addEventListener("click", (event) => {
      if (event.target.classList.contains("delete-expense")) {
        const expenseId = Number(event.target.parentNode.id);
        expenseList = expenseList.filter((exp) => exp.id !== expenseId);
        addToLocal();
        displayExpense();
        updateTotalExpense();
        handleBudgetExpense();
      }
    });
  
    function updateTotalExpense() {
      let total = calculateTotalExpense();
      totalExpenseDisplay.textContent = `Total Expense: $${Math.round(total)}`;
    }
  
    function calculateTotalExpense() {
      return expenseList.reduce((acc, ele) => acc + Number(ele.expenseAmount), 0);
    }
  
    function handleDisplayExpense() {
      totalExpenseDisplay.classList.add("active");
      expenseContainer.classList.add("active");
    }
  });
  