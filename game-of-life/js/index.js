var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//Rows : 30 , Cols : 50
//0 : default , -1 new-cell , 1 old-cell
var ROW = 30;
var COL = 50;
var defaultMatrix = [];

function createRow() {
  var row = [];
  for (var i = 0; i < COL; i++) {
    row.push(Math.round(Math.random() - 0.2));
  }
  return row;
}
function createMatrix() {
  for (var i = 0; i < ROW; i++) {
    defaultMatrix.push(createRow());
  }
  for (var i = 0; i < ROW; i++) {
    defaultMatrix[i][0] = 0;
    defaultMatrix[i][COL - 1] = 0;
  }
  for (var i = 0; i < COL; i++) {
    defaultMatrix[0][i] = 0;
    defaultMatrix[ROW - 1][i] = 0;
  }
}
createMatrix();

var Game = function (_React$Component) {
  _inherits(Game, _React$Component);

  function Game() {
    _classCallCheck(this, Game);

    var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this));

    _this.state = {
      matrix: defaultMatrix,
      isRunning: true
    };
    return _this;
  }

  _createClass(Game, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.timerID = setInterval(this.updateArray.bind(this), 50);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      clearInterval(this.timerID);
    }
  }, {
    key: "clickHandler",
    value: function clickHandler(pos) {
      var newMatrix = this.state.matrix;
      var row = pos[0];
      var col = pos[1];

      if (newMatrix[row][col] == 0) {
        newMatrix[row][col] = 1;
      } else {
        newMatrix[row][col] = 0;
      }

      clearInterval(this.timerID);
      this.setState({ matrix: newMatrix, isRunning: true });
      this.timerID = setInterval(this.updateArray.bind(this), 50);
    }
  }, {
    key: "updateArray",
    value: function updateArray() {
      var tmpMatrix = this.state.matrix;
      var newMatrix = this.state.matrix;

      //Create a border
      for (var i = 0; i < ROW; i++) {
        tmpMatrix[i][0] = 0;
        tmpMatrix[i][COL - 1] = 0;
      }
      for (var i = 0; i < COL; i++) {
        tmpMatrix[0][i] = 0;
        tmpMatrix[ROW - 1][i] = 0;
      }

      //Set the new cells to old cells
      for (var i = 0; i < ROW; i++) {
        for (var j = 0; j < COL; j++) {
          if (tmpMatrix[i][j] === -1) {
            tmpMatrix[i][j] = 1;
          }
        }
      }

      //Kill the old cells meetig the criteria
      for (var i = 1; i < ROW - 1; i++) {
        for (var j = 1; j < COL - 1; j++) {
          if (tmpMatrix[i][j] === 1) {
            //Checking if the element should die or not

            // Surrounding elements array
            // Indexes of surrounding elements
            // 0 1 2
            // 3   4
            // 5 6 7
            var sea = [];

            sea.push(tmpMatrix[i - 1][j - 1]); //TL
            sea.push(tmpMatrix[i - 1][j]); //TM
            sea.push(tmpMatrix[i - 1][j + 1]); //TR
            sea.push(tmpMatrix[i][j - 1]); //ML
            sea.push(tmpMatrix[i][j + 1]); //MR
            sea.push(tmpMatrix[i + 1][j - 1]); //BL
            sea.push(tmpMatrix[i + 1][j]); //BM
            sea.push(tmpMatrix[i + 1][j + 1]); //BR

            var sumOfOldCells = 0;
            for (var x = 0; x < sea.length; x++) {
              if (sea[x] === 1) {
                sumOfOldCells++;
              }
            }
            if (sumOfOldCells < 2 || sumOfOldCells > 3) {
              newMatrix[i][j] = 0;
            } else {
              newMatrix[i][j] = 1;
            }
          }

          //Empty cell check
          if (tmpMatrix[i][j] === 0) {
            var _sea = [];

            _sea.push(tmpMatrix[i - 1][j - 1]); //TL
            _sea.push(tmpMatrix[i - 1][j]); //TM
            _sea.push(tmpMatrix[i - 1][j + 1]); //TR
            _sea.push(tmpMatrix[i][j - 1]); //ML
            _sea.push(tmpMatrix[i][j + 1]); //MR
            _sea.push(tmpMatrix[i + 1][j - 1]); //BL
            _sea.push(tmpMatrix[i + 1][j]); //BM
            _sea.push(tmpMatrix[i + 1][j + 1]); //BR

            var sumOfAliveCells = 0;
            for (var x = 0; x < _sea.length; x++) {
              if (_sea[x] === 1) {
                sumOfAliveCells++;
              }
            }
            if (sumOfAliveCells === 3) {
              newMatrix[i][j] = -1;
            }
          }
        }
      }
      this.setState({ matrix: newMatrix });
    }
  }, {
    key: "generatePlayGround",
    value: function generatePlayGround() {
      var _this2 = this;

      var playGround = [];
      for (var i = 0; i < ROW; i++) {
        for (var j = 0; j < COL; j++) {
          if (this.state.matrix[i][j] == 0) {
            (function () {
              var position = [];
              position.push(i);
              position.push(j);
              playGround.push(React.createElement("div", {
                className: "cell-dead",
                onClick: function onClick() {
                  return _this2.clickHandler(position);
                }
              }));
            })();
          }
          if (this.state.matrix[i][j] === -1) {
            (function () {
              var position = [];
              position.push(i);
              position.push(j);
              playGround.push(React.createElement("div", {
                className: "cell-new",
                onClick: function onClick() {
                  return _this2.clickHandler(position);
                }
              }));
            })();
          }
          if (this.state.matrix[i][j] == 1) {
            (function () {
              var position = [];
              position.push(i);
              position.push(j);
              playGround.push(React.createElement("div", {
                className: "cell-old",
                onClick: function onClick() {
                  return _this2.clickHandler(position);
                }
              }));
            })();
          }
        }
      }
      return React.createElement(
        "div",
        { id: "rowcontainer" },
        playGround
      );
    }
  }, {
    key: "stopBoard",
    value: function stopBoard() {
      this.setState({ isRunning: false });
      clearInterval(this.timerID);
    }
  }, {
    key: "startBoard",
    value: function startBoard() {
      this.setState({ matrix: defaultMatrix, isRunning: true });
      this.timerID = setInterval(this.updateArray.bind(this), 50);
    }
  }, {
    key: "startStop",
    value: function startStop() {
      var _this3 = this;

      if (this.state.isRunning) {
        return React.createElement(
          "button",
          { className: "btn btn-primary", onClick: function onClick() {
              return _this3.stopBoard();
            } },
          "Stop"
        );
      } else {
        return React.createElement(
          "button",
          { className: "btn btn-secondary", onClick: function onClick() {
              return _this3.startBoard();
            } },
          "Start"
        );
      }
    }
  }, {
    key: "clearBoard",
    value: function clearBoard() {
      var clearedBoard = this.state.matrix;
      for (var i = 0; i < clearedBoard[0].length; i++) {
        for (var j = 0; j < clearedBoard[1].length; j++) {
          clearedBoard[i][j] = 0;
        }
      }
      this.setState({ matrix: clearedBoard });
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      return React.createElement(
        "div",
        { className: "gamecontainer" },
        this.generatePlayGround(),
        React.createElement(
          "div",
          { id: "start-stop" },
          this.startStop(),
          React.createElement(
            "button",
            { className: "btn btn-danger", onClick: function onClick() {
                return _this4.clearBoard();
              } },
            "Clear"
          )
        )
      );
    }
  }]);

  return Game;
}(React.Component);

ReactDOM.render(React.createElement(Game, null), document.getElementById("element"));