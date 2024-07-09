$(document).ready(function(){
    var engineON = false, timerId;
    $("#menubutton").click(function(){
        clearInterval(timerId);
        $("#textArea").html("Follow the steps as shown in pop-out screen:");
        $("#popup").css("display", "block");
        $("#instruct").css("display", "block");
    });
    $("#close").click(function(){
        window.location.href="../ServiceMenu/servicemenu.html";
    });
    $("#keyonIndex").click(function(){
        if(!engineON){
            engineON = true;
            clearInterval(timerId);
            $("#keyonIndex").css("background","url(../../img/keys/Key_on_button_pressed.png) no-repeat").css("background-size","contain");
            $("#menubutton").css("display", "block");
            $("#textArea").html("The Dipslay Screen got Turned ON. Now click on below '<b>Service Mode</b>' button.");
            $('#screenArea').css("background","url('Img/BGON.png')").css("background-size","cover");
            $('#screenArea').animate({opacity: 1}, 3000);
            setTimeout( function() { 
                $('#screenArea').css("background","url('Img/background.png')").css("background-size","cover");
                timerId = setInterval( function() { blinkIt("#menubutton","url(../../img/common/Service_menu_Button.png) no-repeat","url(../../img/common/Service_menu_Button_hover.png) no-repeat");}, 1000);
            }, 3000);
        }
    });
    $("#keyoff").click(function(){
        if(engineON){
            engineON = false;
            $("#table tr").remove();
            $("#table-scroll").remove();
            $("#keyonIndex").css("background","url(../../img/keys/Key_on_button_normal.png) no-repeat").css("background-size","contain");
            $('#screenArea').css("background","url('Img/BGOFF.png')").css("background-size","cover");
            $('#screenArea').animate({opacity: 0}, 3000);
            setTimeout( function() { 
                window.location.href="../home/home.html";
            }, 3000);
        }
    });
    var opacity = 1;
    function blinkIt(ele, url1, url2) { 
        // console.log(opacity, ele)  
        if(opacity == 0){opacity = 1; $(ele).css("background",url1).css("background-size","contain");}
        else{ opacity = 0; $(ele).css("background",url2).css("background-size","contain");}
    }
    timerId = setInterval( function() { blinkIt("#keyonIndex","url(../../img/keys/Key_on_button_normal.png) no-repeat","url(../../img/keys/Key_on_mouse_hover.png) no-repeat");}, 1000);
});
