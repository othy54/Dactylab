/**
 * 
 *     Dactylab a helpful typing app
    Copyright (C) 2019  Othman Bensaoula

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


// EFFET ECRITURE SUR ECRAN D'ACCUEIL

const instance = new TypeIt('#txtWelcome', {
    startDelay: 1250,
    speed: 50,
}).exec(async () => {
    await new Promise((resolve, reject) => {
        setTimeout(() => {
            $('.begin').fadeIn('slow');
            return resolve();
        }, 500)
    });
})
    .go();

// EVENEMENT CLICK SUR LES DEUX BOUTONS DE L'ECRAN D'ACCUEIL

$('#btnTutorial').on('click', function () {

    $('#page1').val('on').css('background-color', 'white');
    $('#loader').fadeOut('slow').promise().done(function () {
        $('#explic').show();
        $('#subPageBtns').fadeIn();
        $('#tutorial1').fadeIn();
    });
})

$('#btnDactylab').on('click', function () {
    $('#loader').hide();
    $('#applic').fadeIn();
})

//PAGINATION 

$('#page1').on('click', function () {

    $('.myPagination').css('background-color', 'transparent').val('');
    $('.tutorialPage').hide().promise().done(function () {
        $('#tutorial1').fadeIn();
    });

    $('#page1').css('background-color', 'white').val('on');
})


$('#page2').on('click', function () {
    $('.myPagination').css('background-color', 'transparent').val('');
    $('.tutorialPage').hide().promise().done(function () {
        $('#tutorial2').fadeIn();
    });
    $('#page2').css('background-color', 'white').val('on');
})

$('#page3').on('click', function () {
    $('.myPagination').css('background-color', 'transparent').val('');
    $('.tutorialPage').hide().promise().done(function () {
        $('#tutorial3').fadeIn();
    });
    $('#page3').css('background-color', 'white').val('on');
})

$('#page4').on('click', function () {
    $('.myPagination').css('background-color', 'transparent').val('');
    $('.tutorialPage').hide().promise().done(function () {
        $('#tutorial4').fadeIn();
    });
    $('#page4').css('background-color', 'white').val('on');
})

$('#page5').on('click', function () {
    $('.myPagination').css('background-color', 'transparent').val('');
    $('.tutorialPage').hide().promise().done(function () {
        $('#tutorial5').fadeIn();
    });
    $('#page5').css('background-color', 'white').val('on');
})




$('#btnNext').on('click', function () {
    var catchPage = Number($('#subPageBtns').find('button[value=on]').text());

    if (catchPage < 5) {
        $('.myPagination').css('background-color', 'transparent').val('');
        $('.tutorialPage').hide().promise().done(function () {
            $('#tutorial' + (catchPage + 1)).fadeIn();
        });
        $('#page' + (catchPage + 1)).css('background-color', 'white').val('on');
    }

})

$('#btnPrevious').on('click', function () {
    var catchPage = Number($('#subPageBtns').find('button[value=on]').text());

    if (catchPage > 1) {
        $('.myPagination').css('background-color', 'transparent').val('');
        $('.tutorialPage').hide().promise().done(function () {
            $('#tutorial' + (catchPage - 1)).show();
        });
        $('#page' + (catchPage - 1)).css('background-color', 'white').val('on');
    }
})

$('#btnDactylab2').on('click', function () {
    $('#explic').hide();
    $('#applic').fadeIn('slow');
})


// DECLARATION DES VARIABLES

var words = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQSTUVWXYZ0123456789²\&é"\'(-è_çà=)~#{[|`\\^@]}^$ù!:;,¨£%§/.?¤<>µ*';
var boxSize = 10;
var win = 0;
var lvl = 1;


//RANDOM SUR L'INDEX DE WORDS

function toRandom() {
    var i = Math.floor(Math.random() * words.length);
    return words[i];
}

//AUTRE FONCTION RANDOM POUR RANDOM PLUSIEURS FOIS

function ranDom() {
    var num = '';
    for (var k = 0; k < lvl; k++) {
        num += toRandom();
    }
    return num;
}

//ANIMATION DE LA LETTRE QUI DESCEND

function down() {
    boxSize = 77;
    $('#screen').animate({ height: boxSize + 'vh' }, 10000, function () {
        $('#text').text(ranDom());
        boxSize = 10;
        $('#screen').css('height', boxSize + 'vh');
        $('#thisList').scrollTop($('#thisList').height());
    });
}

// BOUTON COMMENCE QUI DEMARRE LE SETINTERVAL

$('#btnBegin').on('click', function () {
    $('#answer').focus();
    $('#text').text(toRandom());
    setInterval(down, 600);
})


//REGLE DE JEU

$('#answer').on('input', function (e) {

    var answer = $('#answer').val();
    var textTyped = $('#text').text();
    var i = answer.length - 1;


    if (answer[i] !== textTyped[i] && answer.length > 0) {
        $('#text').css('color', 'red');
    } else {
        $('#text').css('color', 'green');
    }

    if (answer == textTyped) {

        if (win == 5) {
            lvl++;
            win = 0;
        } else {
            win++;
        }

        $('#text').text(ranDom());
        $('ul').append('<li class="list-group-item">' + textTyped + '</li>')
        $('#answer').val('');
        $('#screen').finish();
        $('#level').html(lvl);
        boxSize = 10;
        down();
        $('#text').css('color', 'black');
        console.log(win);
    }

    $('#thisList').scrollTop($('#thisList').height());

})



