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
////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('set_info', function (pl) {
  var index = 0;
  pl.forEach((item, i) => {
    if(item.start){$('.start').remove()};
    if (item.id == socket.id) {
      $('#player_name').text(item.name);
      $('#lvl').text("LVL : "+item.level);
      $('#damage').text("Damage : "+item.damage);
      if (item.cardInHandDoor.length > 0) {
        $('#PLAYER_BOX img').remove();
        item.cardInHandDoor.forEach((item, i) => {
          var divID = '#PLAYER_BOX ';
          var img = "<div class='holder'><img onclick=CardInFront($(this).attr('src')) src='public/brown/"+item+"'><div class='block'><button onclick=DoorToFigth("+"'"+item+"'"+")>На стол!</button>></div></div>"
          $(divID).append(img);
        });
      }
/////////////Gold and Door card in hand
      if (item.cardInHandGold.length > 0) {
        $('#PLAYER_BOX2 img').remove();
        item.cardInHandGold.forEach((item, i) => {
          var divID = '#PLAYER_BOX2';
          var img = "<div class='holder'><img onclick=CardInFront($(this).attr('src')) src='public/gold/"+item+"'><div class='block'><button onclick=GoldToFigth("+"'"+item+"'"+")>На стол!</button>></div></div>"
          $(divID).append(img);
        });
      }
      if (item.cardInFront.length > 0) {
          $('#CardInFront img').remove();
          item.cardInFront.forEach((item, i) => {
            var divID = '#CardInFront';
            var img = "<img onclick=DeleteCardInFront($(this).attr('src')) src='"+item+"'>"
            $(divID).append(img);
        });
      }
    }
    else {
      var name = '#name'+(index);
      $(name).text(item.name);
      var lvl = '#lvl'+(index);
      $(lvl).text("LVL : "+item.level);
      var damage = '#damage'+(index);
      $(damage).text("Damage : "+item.damage);
      if (item.cardInFront.length > 0) {
        var card = "#card"+index+" img";
        $(card).remove();
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
  console.log('1');
  socket.emit('delete_card_in_front',src)
  console.log('2');
}
