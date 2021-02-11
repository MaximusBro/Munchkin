var door = [];
var gold = [];
players = [];
var fightdoor = [];
var fightgold = [];
var del = []
var kub = [1,2,3,4,5,6]
var start = false;
module.exports = {
    //Експортовані модулі
    setKolod:function () {
      door = []
      gold = []
      fightdoor = []
      fightgold = []
      del = []
      for (var i = 1; i <= 92; i++) {
        door.push(i + ".jpg")
      }
      for (var i = 1; i <= 77; i++) {
        gold.push(i + ".jpg")
      }
      shuffle(door);
      shuffle(gold);

    },
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
    kikDoor:function () {
      fightdoor.push(door[0]);
      door.shift();
      return fightdoor;
    },
    kikGold:function () {
      fightgold.push(gold[0]);
      gold.shift();
      return fightgold;
    },
    delDoorFigth:function (src) {
      fightdoor.splice(fightdoor.indexOf(src),1)
      del.push("public/brown/"+src);
      return fightdoor;
    },
    delGoldFigth:function (src) {
      fightgold.splice(fightgold.indexOf(src),1)
      del.push("public/gold/"+src);
      return fightgold;
    },
    TakeDoorFigth:function (src, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.cardInHandDoor.push(src);
        }
      });
    },
    TakeGoldFigth:function (src, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.cardInHandGold.push(src);
        }
      });
    },
    DoorToFigth:function (src, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          fightdoor.push(src);
          item.cardInHandDoor.splice(item.cardInHandDoor.indexOf(src),1);
        }
      });
    },
    GoldToFigth:function (src, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          fightgold.push(src);
          item.cardInHandGold.splice(item.cardInHandGold.indexOf(src),1);
        }
      });
    },
    FrontToDoor:function (src, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          item.cardInFront.splice(item.cardInFront.indexOf("public/brown/"+src),1);
          item.cardInHandDoor.push(src);
        }
      });
    },
    FrontToGold:function (src, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          console.log("norm0");
          item.cardInFront.splice(item.cardInFront.indexOf("public/gold/"+src),1);
          console.log("norm1");
          item.cardInHandGold.push(src);
          console.log("norm2");
        }
      });
    },
    getFigthDoor:function () {
      return fightdoor;
    },
    getFigthGold:function () {
      return fightgold;
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
    DeleteCardInFront: function (src, id) {
      players.forEach((item, i) => {
        if (id == item.id) {
          console.log("Zashlo");
          if (src.slice(0,12)=="public/gold/") {
            var index =item.cardInFront.indexOf(src)
            del.push(src);
            item.cardInFront.splice(index,1)
          }

          else if(src.slice(0,13)=="public/brown/"){
            var index =item.cardInFront.indexOf(src)
            del.push(src);
            item.cardInFront.splice(index,1)
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
    getKub:function() {
      shuffle(kub);
      return kub[0];
    },
    printPlayer: function () {
      players.forEach((item, i) => {
        console.log(item);
      })
    },
    DelToFight:function (src,id) {
          if (src.slice(0,12)=="public/gold/") {
          del.splice(del.indexOf(src),1)
          fightgold.push(src.replace("public/gold/",""))
          }
          else if(src.slice(0,13)=="public/brown/"){
            del.splice(del.indexOf(src),1)
            fightdoor.push(src.replace("public/brown/",""))
      }
    },
    getDel:function () {
      return del;
    }
  }
  function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
  }
