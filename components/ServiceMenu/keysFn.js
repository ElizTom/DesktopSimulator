// import { cursor, cursorSel, tablelength, canClickKey, canclick51, canclick95, canclick40, canclick90 } from './servicemenu.js';

var keyEntered = "";
function keyCheck(value){
    // console.log(value)
    if(canClickKey && value != null){
        if(value.length == 2){
            if(value <= tablelength && value >= 1){
                while(value.charAt(0) === '0') value = value.substring(1);
                cursor.position = value;
                keyEntered = value;
                cursorSel();
                value = "";
            }else if(value == "51"){
                // console.log("51");
                if(canclick51){
                    // console.log("51 clicked");
                    cursor.position = value;
                    cursorSel();
                }else value = "";
                keyEntered = value;
            }else if(value == "95"){
                // console.log("95");
                if(canclick95){
                    // console.log("95 clicked");
                    cursor.position = value;
                    cursorSel();
                }else value = "";
                keyEntered = value;
            }else if(value == "40"){
                if(canclick40){
                    // console.log("40 clicked");
                    cursor.position = value;
                    cursorSel();
                }else value = "";
                keyEntered = value;
            }else if(value == "90"){
                if(canclick90){
                    // console.log("90 clicked");
                    cursor.position = value;
                    cursorSel();
                }else value = "";
                keyEntered = value;
            }else value = "";
            keyEntered = value;
        }else if(value.length > 2){
            value = "";
            keyEntered = "";
        }
    }else if(value == null) keyEntered = "";
    // keyEntered = value;
    // console.log(value,";;;", keyEntered)
}

$(document).ready(function() {
    //keys
    $("#key_decel").click(function(){
        keyEntered += 1;
        keyCheck(keyEntered);
    });
    $("#key_mode").click(function(){
        keyEntered += 2;
        keyCheck(keyEntered);
    });
    $("#key_speed").click(function(){
        keyEntered += 3;
        keyCheck(keyEntered);
    });
    $("#key_04").click(function(){
        keyEntered += 4;
        keyCheck(keyEntered);
    });
    $("#key_05").click(function(){
        keyEntered += 5;
        keyCheck(keyEntered);
    });
    $("#key_06").click(function(){
        keyEntered += 6;
        keyCheck(keyEntered);
    });
    $("#key_07").click(function(){
        keyEntered += 7;
        keyCheck(keyEntered);
    });
    $("#key_08").click(function(){
        keyEntered += 8;
        keyCheck(keyEntered);
    });
    $("#key_09").click(function(){
        keyEntered += 9;
        keyCheck(keyEntered);
    });
    $("#key_10").click(function(){
        console.log("K10");
    });
    $("#key_00").click(function(){
        keyEntered += 0;
        keyCheck(keyEntered);
    });
    $("#key_12").click(function(){
        console.log("K12");
    });
    $("#key_13").click(function(){
        console.log("K13");
    });
    $("#key_14").click(function(){
        console.log("K14");
    });
    $("#key_15").click(function(){
        console.log("K15");
    });
    // $( "#function6button" ).click(function() {
    //     console.log("enter");
    // });
});
// export{ keyEntered, keyCheck };