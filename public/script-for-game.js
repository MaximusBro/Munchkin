var socket = io.connect('/');

socket.on('players_in_room',function (players,pass) {
  $('#players').text(players);
  $('#pass').text(pass)
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
      if (item.cardInFront.length > 0) {
          $('#CardInFront img').remove();
          item.cardInFront.forEach((item, i) => {
          var divID = '#CardInFront #'+i;
          $(divID).append('<img src=item>');
          divID +=' img'
          $(divID).attr('src', item);
          console.log(item);
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
          var divID = "#card"+index+" #"+a;
          $(divID).append('<img>');
          divID +=' img'
          $(divID).attr('src', item);
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
