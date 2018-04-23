$(function() {
  var reset = function() {
    text = "";
    operands = [0];
    operators = [];
    nOfOperators = 0;
    nOfOperands = 0;
    result = 0;
    newCalc = false;
    document.getElementById("output1").innerHTML = "0";
    document.getElementById("output2").innerHTML = "0";
  };

  var text = "";
  var operands = [0];
  var operators = [];
  var result = 0;
  var nOfOperators = 0;
  var nOfOperands = 0;
  var newCalc = false;

  $("button").click(function() {
    //reset when = was used
    if (newCalc) reset();
    text = this.id;
    //update html with input text
    if (document.getElementById("output1").innerHTML == "0") {
      document.getElementById("output1").innerHTML = text;
    } else {
      document.getElementById("output1").innerHTML += text;
    }
    //reset everything when C is pressed
    if (this.id == "CE" || this.id == "C") {
      reset();
    }

    //input logic
    if (isNaN(text)) {
      operators = operators.concat(text);
      if (text != "=") operands = operands.concat(0);
      nOfOperators++;
      nOfOperands++;
    } else {
      if (operands[nOfOperands] !== 0) {
        operands[nOfOperands] = operands[nOfOperands] * 10 + Number(text);
      } else {
        operands[nOfOperands] += Number(text);
      }
    }

    //result calculation
    if (text == "=") {
      for (var j = 0; j < nOfOperators; j++) {
        //precedence logic * and /
        for (var i = 0; i < nOfOperators; i++) {
          if (operators[i] == "x") {
            operands[i] = Number(operands[i] * operands[i + 1]);
            operands.splice(i + 1, 1);
            operators.splice(i, 1);
          }
          if (operators[i] == "/") {
            operands[i] = Number(operands[i] / operands[i + 1]);
            operands.splice(i + 1, 1);
            operators.splice(i, 1);
          }
        }
        //precedence logic + and -
        for (var i = 0; i < nOfOperators; i++) {
          if (operators[i] == "+") {
            operands[i] = Number(operands[i] + operands[i + 1]);
            operands.splice(i + 1, 1);
            operators.splice(i, 1);
          }
          if (operators[i] == "-") {
            operands[i] = Number(operands[i] - operands[i + 1]);
            operands.splice(i + 1, 1);
            operators.splice(i, 1);
          }
        }
        result = Number(operands[0]);
        newCalc = true;
      }
      document.getElementById("output2").innerHTML = result;
    }
  });
});