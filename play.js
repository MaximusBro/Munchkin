function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}
var door = [];
var gold = [];
for (var i = 1; i <= 73; i++) {
  door.push(i + ".png")
}
for (var i = 1; i <= 74; i++) {
  gold.push(i + ".png")
}
players = [];
shuffle(door);
module.exports = {
    printDoor: function () {
      console.log(door);
    },
    pushPlayer: function (id) {
      players.push(id);
      console.log(players.length);
    },
    getName: function () {
        return players;
    },
    getDoor: function () {
        var card = door[0]
        door.shift();
        console.log(card);
        return card;
    },
    pushNick: function (nick,id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.name = nick;
          console.log(item.name);
        }
      });
    },
    printPlayer: function () {
      players.forEach((item, i) => {
        console.log(item);
      })
    },
  }
