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
    getInfo: function () {
        return players;
    },
    getDoor: function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.cardInHandDoor.push(door[0]);
          door.shift();
        }
      });
    },
    getGold: function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.cardInHandGold.push(gold[0]);
          gold.shift();
        }
      });
    },
    pushNick: function (nick,id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.name = nick;
          console.log(item.name);
        }
      });
    },
    UpLvl: function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.level += 1;
        }
      });
    },
    UpDamage: function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.damage += 1;
        }
      });
    },
    DownLvl:function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.level -= 1;
        }
      });
    },
    DownDamage:function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.damage -= 1;
        }
      });
    },
    printPlayer: function () {
      players.forEach((item, i) => {
        console.log(item);
      })
    },
  }
