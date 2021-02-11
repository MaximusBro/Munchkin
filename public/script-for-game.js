var socket = io.connect('/');

socket.on('players_in_room',function (players,pass) {
  $('#players').text(players);
  $('#pass').text(pass)
});
socket.on('send_kik_door',function (kik) {
  $('#fight #door img').remove();
  kik.forEach((item, i) => {
    var k = "<div class='holder'><img src='"+"public/brown/"+item+"'><div class='block'><button onclick=DeleteDoorFigth("+"'"+item+"'"+")>Отбой</button><br><button onclick=TakeDoorFigth("+"'"+item+"'"+")>В руку!</button></div></div>"
    $('#fight #door').append(k)
  });
});
socket.on('send_kik_gold',function (kik) {
  $('#fight #gold img').remove();
  kik.forEach((item, i) => {
    var k = "<div class='holder'><img src='"+"public/gold/"+item+"'><div class='block'><button onclick=DeleteGoldFigth("+"'"+item+"'"+")>Отбой</button><br><button onclick=TakeGoldFigth("+"'"+item+"'"+")>В руку!</button></div></div>"
    $('#fight #gold').append(k)
  });
});
socket.on('set_kub',function (num) {
    $('#kub').text(num);
})
socket.on('del_del_',function functionName() {
  $('.delCard img').remove();
})
socket.on('set_del_',function (arr) {
  $('.delCard img').remove();
  arr.forEach((item, i) => {
    var img = "<div class='holder'><img onclick=DelToFight($(this).attr('src')) src='"+item+"'>"
    $('.delCard').append(img);
  });
  console.log(arr);
})
socket.on('set_bord',function (pl) {
  for (var i = 0; i < (pl.length-1); i++) {
    var div = "<div class='"+i+"__' id='card"+i+"'><p><span ><span id='name"+i+"' class='n1'></span></span><br><span ><span id='lvl"+i+"' class='n1'></span></span><br><span ><span id='damage"+i+"' class='n1'></span></span></p></div>"
    $('.playertabs').append(div);
  }
})
////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('set_info', function (pl) {
  var index = 0;
  pl.forEach((item, i) => {
    if(item.start){
      $('.start').remove()
    };
    if (item.id == socket.id) {
      $('#player_name').text(item.name);
      $('#lvl').text("LVL : "+item.level);
      $('#damage').text("Damage : "+item.damage);
      $('#PLAYER_BOX img').remove();
      if (item.cardInHandDoor.length > 0) {

        item.cardInHandDoor.forEach((item, i) => {
          var divID = '#PLAYER_BOX ';
          var img = "<div class='holder'><img onclick=CardInFront($(this).attr('src')) src='public/brown/"+item+"'><div class='block'><button onclick=DoorToFigth("+"'"+item+"'"+")>На стол!</button>></div></div>"
          $(divID).append(img);
        });
      }
/////////////Gold and Door card in hand
$('#PLAYER_BOX2 img').remove();
      if (item.cardInHandGold.length > 0) {

        item.cardInHandGold.forEach((item, i) => {
          var divID = '#PLAYER_BOX2';
          var img = "<div class='holder'><img onclick=CardInFront($(this).attr('src')) src='public/gold/"+item+"'><div class='block'><button onclick=GoldToFigth("+"'"+item+"'"+")>На стол!</button>></div></div>"
          $(divID).append(img);
        });
      }
      $('#CardInFront img').remove();
      if (item.cardInFront.length > 0) {

          item.cardInFront.forEach((item, i) => {
            var divID = '#CardInFront';
            if (item.slice(0,12)=="public/gold/") {
              var i = item.replace("public/gold/","")
              var img = "<div class='holder'><img onclick=DeleteCardInFront($(this).attr('src')) src='"+item+"'><div class='block'><button onclick=FrontToGold("+"'"+i+"'"+")>В руку!</button>></div></div>"
              $(divID).append(img);
            }
            else if(item.slice(0,13)=="public/brown/"){
              var i = item.replace("public/brown/","")
              var img = "<div class='holder'><img onclick=DeleteCardInFront($(this).attr('src')) src='"+item+"'><div class='block'><button onclick=FrontToDoor("+"'"+i+"'"+")>В руку!</button>></div></div>"
              $(divID).append(img);
            }

        });
      }
    }
    else {
      var name = '#name'+(index);
      $(name).text(item.name+" : "+(item.cardInHandDoor.length+item.cardInHandGold.length));
      var lvl = '#lvl'+(index);
      $(lvl).text("LVL : "+item.level);
      var damage = '#damage'+(index);
      $(damage).text("Damage : "+item.damage);
      var card = "#card"+index+" img";
      $(card).remove();
      if (item.cardInFront.length > 0) {
        item.cardInFront.forEach((item, a) => {
          var divID = "#card"+index;
          console.log(item);
          var img = "<img src='"+item+"'>"
          $(divID).append(img);
          console.log(img);
        });
      }
      index++;

    }
  });
});
/////////////////////////////////////////////////////////////////
function Send_nick(nick) {
  socket.emit('Send_info',nick);
  console.log(nick);
}
function StartGame() {
  socket.emit('start_game')
}
function GetDoor() {
  socket.emit('get_door')
}
function GetGold() {
  socket.emit('get_gold')
}
function UpLVL() {
  socket.emit('up_lvl')
}
function UpDamage() {
  socket.emit('up_damage')
}
function DownLVL() {
socket.emit('down_lvl')
}
function DownDamage() {
socket.emit('down_damage')
}
function CardInFront(src_) {
  socket.emit('card_in_front',src_);
  }
function Kub() {
  socket.emit('kub');
}
function KikDoor() {
  socket.emit('kik_door')
}
function KikGold() {
  socket.emit('kik_gold')
}
function DeleteGoldFigth(src) {
  console.log('1');
  socket.emit('del_gold_figth',src);
  console.log('2');
}
function DeleteDoorFigth(src) {
  socket.emit('del_door_figth',src);
}
function TakeDoorFigth(src) {
  socket.emit('take_door_figth',src)
  DeleteDoorFigth(src)
}
function TakeGoldFigth(src) {
  socket.emit('take_gold_figth',src)
  DeleteGoldFigth(src)
}
function DoorToFigth(src) {
  socket.emit('door_to_figth',src);
}
function GoldToFigth(src) {
  socket.emit('gold_to_figth',src);
}
function DeleteCardInFront(src) {
  socket.emit('delete_card_in_front',src)
}
function FrontToDoor(src) {
  socket.emit('front_to_door',src)
}
function FrontToGold(src) {
  socket.emit('front_to_gold',src)
}
function SetDel() {
  socket.emit('set_del')
}
function DelDel() {
  socket.emit('del_del')
}
function DelToFight(src) {
 socket.emit('del_to_fight',src)
}
