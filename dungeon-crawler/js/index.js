var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ROW = 125;
var COL = 200;
var BLOCKSIZE = 10;
var defaultMatrix = [];
var playerPosition = [0, 0];

function createMatrix() {
  function createRow() {
    var row = [];
    for (var i = 0; i < COL; i++) {
      row.push(1);
    }
    return row;
  }
  for (var i = 0; i < ROW; i++) {
    defaultMatrix.push(createRow());
  }
}
function generateMap(Amount, Size, PreviousPosition) {
  //!!!X axis is vertical Y axis is horizontal!!!
  var directionDecider = Math.round(Math.random() * 3);
  var startPosX = PreviousPosition[0];
  var startPosY = PreviousPosition[1];
  var endPosX = void 0;
  var endPosY = void 0;
  //Size = Size + Math.round((Math.random()*10)-5);
  var lineMutator = Math.round(Math.random() * 9);
  var lineLength = Size + 1;

  //Draw interconnecting lines between rectangles
  switch (directionDecider) {
    case 0:
      // Left
      endPosX = PreviousPosition[0];
      endPosY = PreviousPosition[1] = PreviousPosition[1] - lineLength;
      for (var i = -lineLength; i < 0; i++) {
        if (startPosX + lineMutator >= ROW || startPosY + i >= COL || startPosX + lineMutator < 0 || startPosY + i < 0) {
          return 1;
        } else {
          defaultMatrix[startPosX + lineMutator][startPosY + i] = 0;
        }
      }
      break;
    case 1:
      // Up
      endPosX = PreviousPosition[0] = PreviousPosition[0] - lineLength;
      endPosY = PreviousPosition[1];
      for (var i = -lineLength; i < 0; i++) {
        if (startPosX + i >= ROW || startPosY + lineMutator >= COL || startPosX + i < 0 || startPosY + lineMutator < 0) {
          return 1;
        } else {
          defaultMatrix[startPosX + i][startPosY + lineMutator] = 0;
        }
      }
      break;
    case 2:
      // Right
      endPosX = PreviousPosition[0];
      endPosY = PreviousPosition[1] = PreviousPosition[1] + lineLength;
      for (var i = 0; i < lineLength; i++) {
        if (startPosX + lineMutator >= ROW || startPosY + i >= COL || startPosX + lineMutator < 0 || startPosY + i < 0) {
          return 1;
        } else {
          defaultMatrix[startPosX + lineMutator][startPosY + i] = 0;
        }
      }
      break;
    case 3:
      // Down
      endPosX = PreviousPosition[0] = PreviousPosition[0] + lineLength;
      endPosY = PreviousPosition[1];
      for (var i = 0; i < lineLength; i++) {
        if (startPosX + i >= ROW || startPosY + lineMutator >= COL || startPosX + i < 0 || startPosY + lineMutator < 0) {
          return 1;
        } else {
          defaultMatrix[startPosX + i][startPosY + lineMutator] = 0;
        }
      }
      break;
  }

  //Draw rectangle
  for (var height = endPosX; height < endPosX + Size; height++) {
    for (var width = endPosY; width < endPosY + Size; width++) {
      if (height >= ROW || width >= COL || height < 0 || width < 0) {
        return 1;
      } else {
        defaultMatrix[height][width] = 0;
      }
    }
  }

  //Recursion for generating
  Amount--;
  if (Amount !== 0) {
    generateMap(Amount, Size, PreviousPosition);
  } else {
    return 0;
  }
}
function addPlayer() {
  for (var i = 0; i < COL; i++) {
    for (var j = 0; j < ROW; j++) {
      if (defaultMatrix[i][j] === 0) {
        defaultMatrix[i][j] = 2;
        playerPosition[0] = i;
        playerPosition[1] = j;
        return true;
      }
    }
  }
}
function addEnemies() {
  var chanceToSpawn = void 0;
  for (var i = 0; i < defaultMatrix.length; i++) {
    for (var j = 0; j < defaultMatrix[i].length; j++) {
      if (typeof defaultMatrix[i][j] != "undefined") {
        if (defaultMatrix[i][j] === 0) {
          chanceToSpawn = Math.round(Math.random() - 0.48);
          if (chanceToSpawn == 1) {
            defaultMatrix[i][j] = 3;
          }
        }
      } else {
        return 1;
      }
    }
  }
}
function addHealth() {
  var chanceToSpawn = void 0;
  for (var i = 0; i < defaultMatrix.length; i++) {
    for (var j = 0; j < defaultMatrix[i].length; j++) {
      if (typeof defaultMatrix[i][j] != "undefined") {
        if (defaultMatrix[i][j] === 0) {
          chanceToSpawn = Math.round(Math.random() - 0.49);
          if (chanceToSpawn == 1) {
            defaultMatrix[i][j] = 5;
          }
        }
      } else {
        return 1;
      }
    }
  }
}
function addItem() {
  var chanceToSpawn = void 0;
  for (var i = 0; i < defaultMatrix.length; i++) {
    for (var j = 0; j < defaultMatrix[i].length; j++) {
      if (typeof defaultMatrix[i][j] != "undefined") {
        if (defaultMatrix[i][j] === 0) {
          chanceToSpawn = Math.round(Math.random() - 0.49);
          if (chanceToSpawn == 1) {
            defaultMatrix[i][j] = 6;
            return 0;
          }
        }
      } else {
        return 1;
      }
    }
  }
}
function addPortal() {
  for (var i = ROW - 1; i > 0; i--) {
    for (var j = COL - 1; j > 0; j--) {
      if (defaultMatrix[i][j] === 0) {
        defaultMatrix[i][j] = 4;
        return 0;
      }
    }
  }
}
function addBoss() {
  var chanceToSpawn = void 0;
  for (var i = 0; i < defaultMatrix.length; i++) {
    for (var j = 0; j < defaultMatrix[i].length; j++) {
      if (typeof defaultMatrix[i][j] != "undefined") {
        if (defaultMatrix[i][j] === 0) {
          chanceToSpawn = Math.round(Math.random() - 0.49);

          if (chanceToSpawn == 1) {
            defaultMatrix[i][j] = 7;
            return 0;
          }
        }
      } else {
        return 1;
      }
    }
  }
}
function initMap() {
  defaultMatrix.length = 0;
  playerPosition.length = 0;
  playerPosition.push([0, 0]);
  createMatrix();
  generateMap(40, 10, [35, 50]);
  addPlayer();
  addEnemies();
  addHealth();
  addItem();
  addPortal();
  if (Math.round(Math.random() * 10) % 5 === 0) {
    addBoss();
  }
}

initMap();

var Dungeon = function (_React$Component) {
  _inherits(Dungeon, _React$Component);

  function Dungeon() {
    _classCallCheck(this, Dungeon);

    var _this = _possibleConstructorReturn(this, (Dungeon.__proto__ || Object.getPrototypeOf(Dungeon)).call(this));

    _this.state = {
      matrix: defaultMatrix,
      playerPos: [playerPosition[0], playerPosition[1]],
      playerHealth: 100,
      playerItem: 0,
      playerLvl: 1,
      playerXp: 0,
      playerDungeon: 1
    };
    return _this;
  }

  _createClass(Dungeon, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      var newPlayer = this.state.matrix;
      newPlayer[this.state.playerPos[0]][this.state.playerPos[1]] = 2;
      this.setState({ matrix: newPlayer });
    }
  }, {
    key: "handleKeyPress",
    value: function handleKeyPress(event) {
      if (event.keyCode == 37 || event.keyCode == 65) {
        this.movePlayer("left");
      }
      if (event.keyCode == 38 || event.keyCode == 87) {
        this.movePlayer("up");
      }
      if (event.keyCode == 39 || event.keyCode == 68) {
        this.movePlayer("right");
      }
      if (event.keyCode == 40 || event.keyCode == 83) {
        this.movePlayer("down");
      }
    }
  }, {
    key: "movePlayer",
    value: function movePlayer(direction) {
      var newArr = this.state.matrix;
      var newPos = this.state.playerPos;
      newArr[this.state.playerPos[0]][this.state.playerPos[1]] = 0;
      if (direction == "left") {
        var placeToMove = newArr[newPos[0]][newPos[1] - 1];
        newPos = this.movementLogic("left", placeToMove, newPos);
      }
      if (direction == "up") {
        var _placeToMove = newArr[newPos[0] - 1][newPos[1]];
        newPos = this.movementLogic("up", _placeToMove, newPos);
      }
      if (direction == "right") {
        var _placeToMove2 = newArr[newPos[0]][newPos[1] + 1];
        newPos = this.movementLogic("right", _placeToMove2, newPos);
      }
      if (direction == "down") {
        var _placeToMove3 = newArr[newPos[0] + 1][newPos[1]];
        newPos = this.movementLogic("down", _placeToMove3, newPos);
      }
      newArr[newPos[0]][newPos[1]] = 2;
      this.setState({ playerPos: newPos, matrix: newArr });
    }
  }, {
    key: "movementLogic",
    value: function movementLogic(direction, placeToMove, newPos) {
      var whereToGoX = void 0,
          whereToGoY = void 0;
      switch (direction) {
        case "left":
          whereToGoX = newPos[0];
          whereToGoY = newPos[1] - 1;
          break;
        case "up":
          whereToGoX = newPos[0] - 1;
          whereToGoY = newPos[1];
          break;
        case "right":
          whereToGoX = newPos[0];
          whereToGoY = newPos[1] + 1;
          break;
        case "down":
          whereToGoX = newPos[0] + 1;
          whereToGoY = newPos[1];
          break;
      }
      switch (placeToMove) {
        case 0:
          //Moved to playable area
          newPos[0] = whereToGoX;
          newPos[1] = whereToGoY;
          break;
        case 1:
          //Moved to unplayable area
          break;
        case 3:
          //Moved to enemy
          var newHealth = this.state.playerHealth - Math.round(Math.random() * 35);
          if (newHealth <= 0) {
            initMap();
            this.setState({
              playerPos: [playerPosition[0], playerPosition[1]],
              playerLvl: 0,
              playerHealth: 100,
              playerDungeon: 1,
              playerXp: 0,
              playerItem: 0
            });
            return 0;
          } else {
            this.setState({
              playerHealth: this.state.playerHealth - Math.round(Math.random() * 35),
              playerXp: this.state.playerXp + 250
            });
            if (this.state.playerXp >= 1000) {
              this.setState({
                playerLvl: this.state.playerLvl + 1,
                playerXp: 250
              });
            }
            newPos[0] = whereToGoX;
            newPos[1] = whereToGoY;
          }
          break;
        case 4:
          //Moved to Next Level
          initMap();
          this.setState({
            playerPos: [playerPosition[0], playerPosition[1]],
            playerDungeon: this.state.playerDungeon + 1
          });
          return 0;
          break;
        case 5:
          //Moved to Health Pick-up
          this.setState({ playerHealth: this.state.playerHealth + 25 });
          newPos[0] = whereToGoX;
          newPos[1] = whereToGoY;
          break;
        case 6:
          //Moved to Item Pick-up
          this.setState({ playerItem: this.state.playerItem + 1 });
          newPos[0] = whereToGoX;
          newPos[1] = whereToGoY;
          break;
        case 7:
          //Moved to Boss
          var newHp = this.state.playerHealth - 300;
          if (newHp <= 0) {
            initMap();
            this.setState({
              playerPos: [playerPosition[0], playerPosition[1]],
              playerLvl: 1,
              playerHealth: 100,
              playerDungeon: 1,
              playerXp: 0,
              playerItem: 0
            });
            return 0;
          } else {
            this.setState({
              playerHealth: this.state.playerHealth - 300,
              playerXp: this.state.playerXp + 1000
            });
            if (this.state.playerXp >= 1000) {
              this.setState({
                playerLvl: this.state.playerLvl + 1,
                playerXp: 250
              });
            }
            newPos[0] = whereToGoX;
            newPos[1] = whereToGoY;
          }
          break;
      }
      return newPos;
    }
  }, {
    key: "renderSmallPlayground",
    value: function renderSmallPlayground() {
      var playGround = [];
      for (var i = 0; i < ROW; i++) {
        for (var j = 0; j < COL; j++) {
          if (i >= this.state.playerPos[0] - 10 && i <= this.state.playerPos[0] + 10 && j >= this.state.playerPos[1] - 10 && j <= this.state.playerPos[1] + 10) {
            if (this.state.matrix[i][j] === 0) {
              var position = [];
              position.push(i);
              position.push(j);
              playGround.push(React.createElement("div", { className: "block" }));
            }
            if (this.state.matrix[i][j] === 1) {
              var _position = [];
              _position.push(i);
              _position.push(j);
              playGround.push(React.createElement("div", { className: "unplayable" }));
            }
            if (this.state.matrix[i][j] === 2) {
              var _position2 = [];
              _position2.push(i);
              _position2.push(j);
              playGround.push(React.createElement("div", { className: "player" }));
            }
            if (this.state.matrix[i][j] === 3) {
              var _position3 = [];
              _position3.push(i);
              _position3.push(j);
              playGround.push(React.createElement("div", { className: "enemy" }));
            }
            if (this.state.matrix[i][j] === 4) {
              var _position4 = [];
              _position4.push(i);
              _position4.push(j);
              playGround.push(React.createElement("div", { className: "nextlvl" }));
            }
            if (this.state.matrix[i][j] === 5) {
              var _position5 = [];
              _position5.push(i);
              _position5.push(j);
              playGround.push(React.createElement("div", { className: "health" }));
            }
            if (this.state.matrix[i][j] === 6) {
              var _position6 = [];
              _position6.push(i);
              _position6.push(j);
              playGround.push(React.createElement("div", { className: "weapon" }));
            }
            if (this.state.matrix[i][j] === 7) {
              var _position7 = [];
              _position7.push(i);
              _position7.push(j);
              playGround.push(React.createElement("div", { className: "boss" }));
            }
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
    key: "getPlayerItem",
    value: function getPlayerItem() {
      var item = this.state.playerItem;
      switch (item) {
        case 0:
          return "Short Sword";
        case 1:
          return "Scimitar";
        case 2:
          return "Sabre";
        case 3:
          return "Falchion";
        case 4:
          return "Crystal Sword";
        case 5:
          return "Broad Sword";
        case 6:
          return "Long Sword";
        default:
          return "War Sword";
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        { onKeyDown: this.handleKeyPress.bind(this), tabIndex: "0" },
        React.createElement(
          "div",
          { className: "statusbar" },
          React.createElement(
            "div",
            { className: "healthstatus" },
            "Health : ",
            this.state.playerHealth
          ),
          React.createElement(
            "div",
            { className: "itemstatus" },
            "Item : ",
            this.getPlayerItem()
          ),
          React.createElement(
            "div",
            { className: "dungeonstatus" },
            "Dungeon : ",
            this.state.playerDungeon
          ),
          React.createElement(
            "div",
            { className: "levelstatus" },
            "Lvl : ",
            this.state.playerLvl
          ),
          React.createElement(
            "div",
            { className: "xpstatus" },
            "XP : ",
            this.state.playerXp
          )
        ),
        this.renderSmallPlayground()
      );
    }
  }]);

  return Dungeon;
}(React.Component);

ReactDOM.render(React.createElement(Dungeon, null), document.getElementById("gamebox"));

/*
  //Render map where everything is visible
  generatePlayGround() {
    let playGround = [];
    for (var i = 0; i < ROW; i++) {
      for (var j = 0; j < COL; j++) {
        if (this.state.matrix[i][j] === 0) {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="block" />);
        }
        if (this.state.matrix[i][j] === 1) {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="unplayable" />);
        }
        if (this.state.matrix[i][j] === 2) {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="player" />);
        }
        if (this.state.matrix[i][j] === 3) {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="enemy" />);
        }
        if (this.state.matrix[i][j] === 4) {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="nextlvl" />);
        }
        if (this.state.matrix[i][j] === 5) {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="health" />);
        }
        if (this.state.matrix[i][j] === 6) {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="weapon" />);
        }
      }
    }
    return <div id="rowcontainer">{playGround}</div>;
  }
    //Render map where only a certain radius is visible
    generateHiddenPlayGround() {
    let playGround = [];
    for (var i = 0; i < ROW; i++) {
      for (var j = 0; j < COL; j++) {
        if (
          i >= this.state.playerPos[0] - 10 &&
          i <= this.state.playerPos[0] + 10 &&
          j >= this.state.playerPos[1] - 10 &&
          j <= this.state.playerPos[1] + 10
        ) {
          if (this.state.matrix[i][j] === 0) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="block" />);
          }
          if (this.state.matrix[i][j] === 1) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="unplayable" />);
          }
          if (this.state.matrix[i][j] === 2) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="player" />);
          }
          if (this.state.matrix[i][j] === 3) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="enemy" />);
          }
          if (this.state.matrix[i][j] === 4) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="nextlvl" />);
          }
          if (this.state.matrix[i][j] === 5) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="health" />);
          }
          if (this.state.matrix[i][j] === 6) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="weapon" />);
          }
            if (this.state.matrix[i][j] === 7) {
            let position = [];
            position.push(i);
            position.push(j);
            playGround.push(<div className="boss" />);
          }
        } else {
          let position = [];
          position.push(i);
          position.push(j);
          playGround.push(<div className="unplayable" />);
        }
      }
    }
    return <div id="rowcontainer">{playGround}</div>;
  }
  
  
  
  
*/