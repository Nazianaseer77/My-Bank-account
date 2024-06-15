import inquirer from "inquirer"


// bank Account interface

interface BankAccount{
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void
    deposit(amount:number):void
    checkBalance(): void
}

//Bank account class

class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number){
      this.accountNumber = accountNumber;
      this.balance = balance      
    }

    // Debit money

    withdraw(amount: number): void {
        if(this.balance >= amount){
            this.balance -= amount;
            console.log(`withdrawl of $${amount} successful. Remaining balance $${this.balance}`)
        }else{
            console.log(`insufficient balance`)
        }
    }
       
    // credit money

    deposit(amount: number):void {
       if(amount > 100){
        amount -= 1; //$1 fee charged if more than $100 is deposited
       } this.balance += amount;
       console.log(`Deposit of $${amount} successful. Remaining balance: $${this.balance}`)
    }

    //check balance 

    checkBalance(): void {
        console.log(`current balance $${this.balance}`);
    }
}

//customer class 

  class customer{
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName:string, lastName:string, gender:string, age:number, mobileNumber:number, account:BankAccount)
    {
        this.firstName = firstName
        this.lastName = lastName
        this.gender = gender
        this.age =age
        this.mobileNumber =mobileNumber
        this.account = account
    }
  }

//create bank account

const accounts: BankAccount[]=[
    new BankAccount (1001, 1000),
    new BankAccount (1002, 2000),
    new BankAccount (1003, 3000)
];

// create customer

const customers: customer[]=[
    new customer ("Naseer", "Ahmed","male",50, 31622277679,accounts[0]),
    new customer ("Nazia", "Naseer","female",45, 3332691109,accounts[1]),
    new customer ("yasha", "Naseer","female",24, 31622277679,accounts[2]),
]

//function to interact with bank account

   async function service(){
    do{
        const accountNumberInput = await inquirer.prompt({
           name: "accountnumber",
           type: "number",
           message:" please Enter your account number",
        })

        const customer = customers.find(customer => customer.account.accountNumber ===accountNumberInput.accountnumber);
        if(customer){
            console.log(`welcome, ${customer.firstName}${customer.lastName}!\n`);
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: "select an operation",
                choices: ["Deposit","Withdraw","Check Balance","Exit"]
            }]);

            switch(ans.select){
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                       name: "amount",
                       type:"number",
                       message: "Enter the amount to deposit:"  

                    })

                    customer.account.deposit(depositAmount.amount);
                    break;

                     case    "Withdraw":
                        const withdrawAmount = await inquirer.prompt({
                           name: "amount",
                           type:"number",
                           message: "Enter the amount to withdraw:"  
    
                        })
    
                        customer.account.withdraw(withdrawAmount.amount);
                        break; 
                        
                    case "Check Balance":
                        customer.account.checkBalance();
                        break;
                    case "Exit":
                        console.log("Exiting bank programe....");
                        console.log("\n Thank you for using our bank services. Have a great day!");
                        return;
            }


        }else{
            console.log("Invalid account number. please try again");
        }
          
    } while(true)
   }

   service()


