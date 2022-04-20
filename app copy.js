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

// EXPENSE ITEM STUFF
let expenseItem = $(".expense-item");
let expenseItemTitle = $(".expense-item-title");
let expenseItemValue = $(".expense-item-value");

//My math values
let totalBudget;
let totalBalance = 0;
let expenseTotal;
let allExpenses = [];
let expense;
let count = 0;

// MAIN

budgetForm.addEventListener("submit", function (e) {
  e.preventDefault();
  setBudget();
  setBalance();
  // CLEAR FIELD
  clearInput(budgetInput);
  budgetForm.parentElement.remove();
});

expenseForm.addEventListener("submit", function (e) {
  e.preventDefault();
  // Cant enter expense if there is no budget, or if both expense fields haven't been filled
  if (expenseNameInput.value === "" || expenseAmountInput.value === "") {
    alert("Must enter both EXPENSE fields!");
  } else if (budgetValue.innerHTML === "$0") {
    alert("Must enter a BUDGET first!");
  } else {
    newExpense();
    newExpenseItem();
    // CLEAR FIELD
    clearInput(expenseNameInput, expenseAmountInput);
  }
});

// FUNCTIONS

function setBudget() {
  totalBudget = budgetInput.value;
  totalBudget = parseFloat(totalBudget);
  budgetValue.innerHTML = `$${parseFloat(totalBudget)}`;
}

function setBalance() {
  totalBalance = budgetInput.value;
  balance = parseFloat(totalBalance);
  balanceValue.innerHTML = `$${parseFloat(totalBalance)}`;
}

function newExpense(expenseTotal) {
  // Store expense and push it into an array
  expense = expenseAmountInput.value;
  allExpenses.push(parseFloat(expense));
  // Get the sum
  expenseTotal = 0;
  for (let i = 0; i < allExpenses.length; i++) {
    total = expenseTotal += allExpenses[i];
  }
  // Set the value on screen to what the sum of all expenses is
  expenseValue.innerHTML = `$${total}`;
  subtractBalance(totalBalance, expenseTotal);
}

function subtractBalance(totalBalance, expenseTotal) {
  console.log(expenseTotal);
  totalBalance -= total;
  balanceValue.innerHTML = `$${totalBalance}`;
}

function clearInput(inputName, inputName2) {
  inputName.value = "";
  if (inputName2) {
    inputName2.value = "";
  }
}

function newExpenseItem() {
  expenseItemTitle.innerHTML = `${expenseNameInput.value}`;
  expenseItemValue.innerHTML = `$${expenseAmountInput.value}`;
  let newExpenseItem = expenseItem.cloneNode(true);
  expenseItem.before(newExpenseItem);
  newExpenseItem.style.display = "flex";
  console.dir(newExpenseItem);
  let editBtns = $$(".edit-button");
  let deleteBtns = $$(".delete-button");

  for (let btn of editBtns) {
    btn.addEventListener("click", editExpense);
  }

  for (let btn of deleteBtns) {
    btn.addEventListener("click", function () {
      deleteExpenseItem(btn);
    });
  }
}

function editExpense() {
  // Set input values to the appopriate values of this expense item
  expenseNameInput.value =
    this.parentElement.parentElement.children[0].children[0].innerHTML;
  expenseAmountInput.value =
    this.parentElement.parentElement.children[0].children[1].innerHTML.substring(
      1
    );
  // Delete this expense item
  deleteExpenseItem(this);
}

function deleteExpenseItem(btn) {
  btn.parentElement.parentElement.remove();
  // WE NEED TO NOW SUBTRACT THE EXPENSE AND ADD BACK THE BALANCE
  // Lets get the values first and make sure they are floats
  money =
    btn.parentElement.parentElement.children[0].children[1].innerHTML.substring(
      1
    );
  money = parseFloat(money);
  // Good, now lets subtract this money from the expenses, because we just reduced our expenses

  // And now lets add this back into our balance
  totalBalance = parseFloat(totalBalance) + money;
  balanceValue.innerHTML = parseFloat(totalBalance);
}
