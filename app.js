const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

//VARIABLES
let buttons = $$(".input-button");
let calcBtn = $(".calculate-budget-button");
let addExpenseBtn = $(".add-expense-button");
let budgetForm = $(".budget-form");
let expenseForm = $(".expense-form");
let budgetInput = $(".budget-input");
let expenseNameInput = $(".expense-name-input");
let expenseAmountInput = $(".expense-amount-input");
let budgetValue = $(".budget-value");
let balanceValue = $(".balance-value");
let expenseValue = $(".expense-value");
let firstDesc = $(".desc-1");
let secondDesc = $(".desc-2");

// EXPENSE ITEM STUFF
let expenseItem = $(".expense-item");
let expenseItemTitle = $(".expense-item-title");
let expenseItemValue = $(".expense-item-value");

// MY MATH VALUES
let expenseNames = [];
let expenses = [];
let expense = 0;
let totalExpenses;
let budget = 0;
let balance = 0;

// MAIN

budgetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  if (budgetInput.value === "") {
    alert("Please enter a budget first!");
  } else {
    // BUDGET!
    // NUMBERS ARE SET TO WHAT YOU INPUT
    budgetValue.innerHTML = "$" + budgetInput.value;
    // WE SAVE THE VARIABLES FROM THE NUMBERS THAT HAVE BEEN SET
    budget = parseFloat(budgetValue.innerHTML);
    // BALANCE!
    // NUMBERS ARE SET TO WHAT YOU INPUT
    balanceValue.innerHTML = "$" + budgetInput.value;
    // WE SAVE THE VARIABLES FROM THE NUMBERS THAT HAVE BEEN SET
    balance = parseFloat(budgetInput.value);
    // CLEAR INPUT
    clearInput(budgetInput);
    firstDesc.remove();
    budgetForm.parentElement.remove();
    secondDesc.innerHTML = "You may continue adding any further expenses: ";
  }
});

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();

  if (!expenseAmountInput.value || !expenseNameInput.value) {
    alert("Please include an expense name and amount.");
  } else if (balance === 0) {
    alert("Please enter a budget first!");
  } else {
    expenseNames.push(expenseNameInput.value);
    expenses.push(parseFloat(expenseAmountInput.value));
    totalExpenses = expenses.reduce(function (pv, cv) {
      return pv + cv;
    }, 0);
    expenseValue.innerHTML = "$" + totalExpenses;
    console.log(expenses);
    // NUMBERS ARE SET TO WHAT THEY ALREADY ARE
    balanceValue.innerHTML = "$" + (balance - totalExpenses);
    // WE SAVE THE VARIABLES FROM THE NUMBERS THAT HAVE BEEN SET
    // CLEAR INPUT

    createExpenseItem(
      totalExpenses,
      balance,
      expenseNameInput,
      expenseAmountInput
    );
    clearInput(expenseAmountInput, expenseNameInput);
  }
});

// FUNCTIONS

function clearInput(firstInputName, secondInputName) {
  firstInputName.value = "";
  if (secondInputName) {
    secondInputName.value = "";
  }
}
let count = 0;

function createExpenseItem() {
  let newItem = expenseItem.cloneNode(true);
  newItem.style.display = "flex";
  newItem.id = count;
  let expenseItemName = newItem.children[0].children[0];
  let expenseItemValue = newItem.children[0].children[1];
  expenseItemName.innerHTML = expenseNameInput.value;
  expenseItemValue.innerHTML = "$" + expenseAmountInput.value;
  expenseItem.after(newItem);

  let editBtns = $$(".edit-button");
  let deleteBtns = $$(".delete-button");

  editBtns.forEach(function (btn) {
    btn.addEventListener("click", getItemExpense);
  });

  editBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      expenseNameInput.value =
        this.parentElement.parentElement.children[0].children[0].innerHTML;
      expenseAmountInput.value =
        this.parentElement.parentElement.children[0].children[1].innerHTML.substring(
          1
        );
    });
  });

  editBtns.forEach(function (btn) {
    btn.addEventListener("click", deleteItem);
  });

  deleteBtns.forEach(function (btn) {
    btn.addEventListener("click", getItemExpense);
  });

  deleteBtns.forEach(function (btn) {
    btn.addEventListener("click", deleteItem);
  });

  count++;
}

function deleteItem() {
  this.parentElement.parentElement.remove();
}

function getItemExpense() {
  deletedItemsExpense = parseFloat(
    this.parentElement.parentElement.children[0].children[1].innerHTML.substring(
      1
    )
  );

  // Change Expenses Display Now
  let index = expenses.indexOf(deletedItemsExpense);
  if (index > -1) {
    expenses.splice(index, 1);
  }
  totalExpenses = expenses.reduce(function (pv, cv) {
    return pv + cv;
  }, 0);
  expenseValue.innerHTML = "$" + totalExpenses;

  // Change Balance Now Too
  balanceValue.innerHTML = "$" + (balance - totalExpenses);

  console.log(expenses);
}
