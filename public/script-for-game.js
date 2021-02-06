var socket = io.connect('/');

socket.on('players_in_room',function (players) {
  $('#players').text(players);
});
////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('set_info', function (pl) {
  var index = 0;
  pl.forEach((item, i) => {
    if (item.id == socket.id) {
      $('#player_name').text(item.name);
      $('#lvl').text("LVL : "+item.level);
      $('#damage').text("Damage : "+item.damage);
      $('#PLAYER_BOX img').remove();
      if (item.cardInHandDoor.length > 0) {
        item.cardInHandDoor.forEach((item, i) => {
          var divID = '#PLAYER_BOX  #'+i;
          $(divID).append('<img onclick=CardInFront($(this).attr("src"))>');
          divID +=' img'
          item = "public/brown/"+item;
          $(divID).attr('src', item);
        });
      }
/////////////Gold and Door card in hand
      $('#PLAYER_BOX2 img').remove();
      if (item.cardInHandGold.length > 0) {
        item.cardInHandGold.forEach((item, i) => {
          var divID = '#PLAYER_BOX2 #'+i;
          $(divID).append('<img onclick=CardInFront($(this).attr("src"))>');
          divID +=' img'
          item = "public/gold/"+item;
          $(divID).attr('src', item);
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
      // if (item.cardInHand.length > 0) {
      //   var hand = ".card img"
      //   $(hand).remove();
      //   console.log(item.cardInHand);
      //   item.cardInHand.forEach((item, a) => {
      //     hand = ' .card '+(a+"_");
      //     $(hand).append('<img>');
      //     hand +=' img'
      //     item = "public/brown/"+item;
      //     $(hand).attr('src', item);
      //     console.log(item);
      //   });
      // }
      index++;
    }
  });
});
/////////////////////////////////////////////////////////////////
function Send_nick(nick) {
  socket.emit('Send_info',nick);
  console.log(nick);
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

function CardInFront(s) {
var a = "<img src='"+s+"' onclick='$(this).remove()'>"
console.log(a);
$('#CardInFront').append(a);
}
