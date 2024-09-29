document.addEventListener('DOMContentLoaded', async () => {
    const addExpenseBtn = document.querySelector('#add-expense');
    const expenseName = document.querySelector('#expense-name');
    const expensePrice = document.querySelector('#expense-amount');
    const expenseDOMList = document.querySelector('.exprese-list');
    const totalExpenseDisplay = document.querySelector('.total')
    const expenseContainer = document.querySelector('.expense-container')

    // Retrieve the existing expenses from localStorage or initialize an empty array
    let expenseList = JSON.parse(localStorage.getItem('expenselist')) || [];

    try {
        // Display the expenses after ensuring they are properly parsed
        displayExpense();
        //handle the display expense 
        handleDisplayExpense()
    } catch (err) {
        console.error('Error displaying expenses:', err);
    }

    // Function to add expense 
    function addExpense(expenseName, expenseValue) {
        const expense = {
            id:Date.now(),
            expenseTitle: `${expenseName}`,
            expenseAmount: `${expenseValue}`
        };

        expenseList.push(expense);
        addToLocal(); // Save the updated expense list to localStorage
      
    }

    // Add expense to local storage 
    function addToLocal() {
        localStorage.setItem('expenselist', JSON.stringify(expenseList));
    }

    // Add expense button 
    addExpenseBtn.addEventListener('click', (event) => {
        event.preventDefault()
        const expenseTitle = expenseName.value.trim();
        const expenseAmount = expensePrice.value.trim();

        if (expenseTitle && expenseAmount) { // Check that fields are not empty
            addExpense(expenseTitle, expenseAmount);
            displayExpense(); // Refresh the displayed expense list

            // empty the input fiels 
            expenseName.value=''
            expensePrice.value=''

            // refresh the total expense 

            updateTotalExpense()

            

        }
    });

    // Display all expenses 
    function displayExpense() {
        expenseDOMList.innerHTML = ''
        expenseDOMList.innerHTML = expenseList.map((expense) => {
            return `
                <li id="${expense.id}">
                    <span>${expense.expenseTitle}</span>
                    <span>$${expense.expenseAmount}</span>
                    <button class="delete-expense">Delete</button>
                </li>
            `;
        }).join('');
    }



    // delete the expesse using the event delegation and the event bubling 

    expenseDOMList.addEventListener('click',(event)=>{
        const expenseToRemove = Number(event.target.parentNode.id);


        // filter the expense array 

        expenseList = expenseList.filter(exp => exp.id!==expenseToRemove)

        // update the local storage 

        addToLocal()

        // refresh the dom 
        displayExpense()

        // refresh the total expense 

        updateTotalExpense()
    })


    // updating the total expense 
    function updateTotalExpense(){
        totalExpenseDisplay.textContent=''
        let total = 0
        expenseList.forEach(ele => {
            total+= Number(ele.expenseAmount)
        });

        totalExpenseDisplay.textContent=`Total Exepnse : $${Math.round(total)}`
    }


    //handle the display block vivsiblity 

    function handleDisplayExpense(){
        totalExpenseDisplay.classList.add('active')
        expenseContainer.classList.add('active')
    }
});
