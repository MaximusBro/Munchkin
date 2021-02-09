var door = [];
var gold = [];
players = [];
var kub = [1,2,3,4,5,6]
var start = false;
for (var i = 1; i <= 73; i++) {
  door.push(i + ".png")
}
for (var i = 1; i <= 74; i++) {
  gold.push(i + ".png")
}
shuffle(door);
shuffle(gold);
module.exports = {
    //Експортовані модулі
    pushPlayer: function (object) {
      players.push(object);
    },

    removePlayer: function functionName(id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          players.splice(players.indexOf(item),1);
        }
      })
    },

    numPlayers:function functionName() {
      return players.length;
    },

    getInfo: function () {
        return players;
    },

    startGame: function () {
      players.forEach((item, a) => {
        for (var i = 0; i < 4; i++) {
          item.cardInHandDoor.push(door[0]);
          door.shift();
          item.cardInHandGold.push(gold[0]);
          gold.shift();
        };
        item.start = true;
      })
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
      })
    },

    cardInFront: function (src_, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.cardInFront.push(src_);
          if (src_.slice(0,12)=="public/gold/") {
            var i = item.cardInHandGold.indexOf(src_.replace("public/gold/",""));
            item.cardInHandGold.splice(i,1)
          }
          else if(src_.slice(0,13)=="public/brown/"){
            var i = item.cardInHandDoor.indexOf(src_.replace("public/brown/",""));
            item.cardInHandDoor.splice(i,1)
          }
        }
      })
    },

    pushNick: function (nick,id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.name = nick;
          console.log(item.name);
        }
      })
    },

    UpLvl: function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.level += 1;
        }
      })
    },

    UpDamage: function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.damage += 1;
        }
      })
    },

    DownLvl:function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.level -= 1;
        }
      })
    },

    DownDamage:function (id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.damage -= 1;
        }
      })
    },

    getKub:function functionName() {
      shuffle(kub);
      return kub[0];
    },

    printPlayer: function () {
      players.forEach((item, i) => {
        console.log(item);
      })
    },

  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
