// ! ! !
// Three Bugs

//Bug 1: when we call the calculateSTI function, we want to call the 2nd dimension array[i] and not first dimension array
//Bug 2: in the getBaseSTI function, we want to return just the basePercent, not the basePercent minus 1
//Bug 3: if rating is 2, there should be no bonus regardless of years with company. Removed the bonus if rating=2 before setting the bonus amount to newArray[1]
//Bug 4: rounded annual compensation
//Hard: added spaces between information. new for loop before newText

var arrayAtticus = ["Atticus", "2405", "47000", 3];
var arrayJem = ["Jem", "62347", "63500", 4];
var arrayBoo = ["Boo", "11435", "54000", 3];
var arrayScout = ["Scout", "6243", "74750", 5];

var array = [arrayAtticus, arrayJem, arrayBoo, arrayScout];

//Create variables used to write to the DOM
var newEl, newText, position, title;
//Capture the position of insertion into the DOM
position = document.getElementById('content');

//Loop the array, extracting each array and writing information to the DOM
//Note that the information is not 'clean'
for(var i = 0; i < array.length; i++){
	array[i] = calculateSTI(array[i]);
  newEl = document.createElement('li');
  
  if (i%2){
    newEl.className = "list-group-item";
  }

  //add a space between array elements and then display
  var displayArray = array[i];
  for (var j = 0; j<displayArray.length; j++){
    if (j < (displayArray.length - 1)) {
      displayArray[j] += ", "; 
    }
    newText = document.createTextNode(displayArray[j]);
    newEl.appendChild(newText);
    position.appendChild(newEl);
  }

}

function calculateSTI(array1){
  var newArray = [];

  newArray[0] = array1[0];

  var employeeNumber = array1[1];
  var baseSalary = array1[2];
  var reviewScore = array1[3];

  var bonus = getBaseSTI(reviewScore) + getYearAdjustment(employeeNumber) - getIncomeAdjustment(baseSalary);
  if(bonus > 0.13){
    bonus = 0.13;
  }
  if(reviewScore == 2){
    bonus = 0;
  } 

  newArray[1] = bonus;
  newArray[2] = Math.round(baseSalary * (1.0 + bonus));
  newArray[3] = Math.round(baseSalary * bonus);
  console.log(newArray[0] + " " + newArray[1] + " " + newArray[2] + " " + newArray[3]);
  return newArray;
}

function getBaseSTI(reviewScore){
  var basePercent;
  switch(reviewScore){
    case 1:
      basePercent = 0;
      break;
    case 2:
      basePercent = 0;
      break;
    case 3:
      basePercent = 0.04;
      break;
    case 4:
      basePercent = 0.06;
      break;
    case 5:
      basePercent = 0.10;
      break;
  }
  return basePercent;
}

function getYearAdjustment(employeeNumber){
  var yearAdjustment = 0;
  if(employeeNumber.length == 4){
    yearAdjustment = 0.05;
  }
  return yearAdjustment;
}

function getIncomeAdjustment(salary){
  var incomeAdjustment = 0;
  salary = parseInt(salary);
  if(salary > 65000){
    incomeAdjustment = 0.01;
  }
  return incomeAdjustment;
}