// $.getScript('../../js/api.js');
// import { keyEntered, keyCheck } from './keysFn.js';

var jsondata, tble, index, tablelength = 0, dataPath, keyData, marker = "default", engineON = true, selcLine = true, canClickKey = true, canclick51 = false, canclick95 = false, canclick40 = false, canclick90 = false, Diagt;
var cursor = {
    tab: 1,
    position: 1
};
tble = document.getElementById("table");

function cursorSel() {
    index = cursor.position;
    // console.log(index, tble)
    if (cursor.position > tablelength) cursor.position = 1;
    if (selcLine) {
        for (let i = 0; i <= tablelength; i++) {
            $("tr#col" + i + ">td").css("background-color", "#0036e8");
        }
        $("tr#col" + cursor.position + ">td").css("background-color", "#ff9c07");
        if (Diagt != "CCMO") {
            if (tble.rows.length > 0) tble.rows[cursor.position - 1].scrollIntoView(false);
        }
    } else {
        for (let i = 0; i <= tablelength; i++) {
            $("tr#col" + i + ">td").css("background-color", "#0030ce");
        }
    }

    if (index <= 9) index = "0" + cursor.position;
    $('#index').html(index);
}

$(document).ready(function () {
    tble = document.getElementById("table");
    // Fetch data from ServiceMenu JSON
    function getData(callback) {
        $.ajax({
            type: 'GET',
            url: '../../JSON/serviceMenu.json',
            contentType: 'aplication/json',
            dataType: 'json',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            success: function (data) {
                callback(data);
            },
            error: function (status, errorThrown) {
                console.log(status, errorThrown);
            }
        });
    }
    getData(callbackFunction);
    function callbackFunction(data) {
        flag = true;
        jsondata = data;
        dataPath = data.ServiceMenu;
        displayMenu(dataPath);
        dispNotes(dataPath);
    }

    // Fetch data from keyClick JSON
    function getKeyData(callbackKey) {
        $.ajax({
            type: 'GET',
            url: '../../JSON/KeyClick.json',
            contentType: 'aplication/json',
            dataType: 'jsonp',
            crossDomain: true,
            beforeSend: function (xhr) {
                xhr.withCredentials = true;
            },
            success: function (data) {
                callbackKey(data);
            },
            error: function (status, errorThrown) {
                console.log(status, errorThrown);
            }
        });
    }
    getKeyData(callbackKeyFunction);
    function callbackKeyFunction(data) {
        keyData = data;
    }

    $("#keyoff").click(function () {
        if (engineON) {
            engineON = false;
            clearInterval(timerId);
            $("#table tr").remove();
            $("#table-scroll").remove();
            $("#keyon").css("background", "url(../../img/keys/Key_on_button_normal.png) no-repeat").css("background-size", "contain");
            $('#screenArea').css("background", "url('Img/BGOFF.png')").css("background-size", "cover");
            $('#screenArea').animate({ opacity: 0 }, 3000);
            setTimeout(function () {
                window.location.href = "../home/home.html";
            }, 3000);
        }
    });


    $("#keyon").click(function () {
        engineON = true;
        $("#keyon").css("background", "url(../../img/keys/Key_on_button_pressed.png) no-repeat").css("background-size", "contain");
    });

    var pathFound, flag = false, scrf1click = false, canEnterF1 = true, canEnterF2 = true, canEnterF3 = true, canEnterF4 = true, notesMarker = "", dataTxt, counterSelection = 0, mtcCounter = 0, nicCounter = 0, steps = 0, moveF = true;
    var arr = [], arrpos = [], arrtab = [], cursorpos = [], fetchedID = "0", canSdmHold = false, canClickBack = true, backBtnClick = 0, popupTimeOut, MSReg = false;
    var timer, btnA = true, ashVal = 0, ashTimer, adjmnt, selval = ["ON", "30h"], mms = "", mntsValue = 30, dftCounter = 0, ARSFlag = false, canfetch = true;
    var temp = ["", "SI", "", "", "Flexible", "", ""], dftSel = "", camVal = ["Use", "---", "---"], canReset = false, abmRCounter = 0, mtcDtf, SCRCode, sdmFound;
    var CCMOArr = [false, false, false, false, false, false], pCalCounter = 0, ESACounter = 0, canEnterF6 = true, titleArr = ['Service Menu'], isSCROTP = false;
    var timerES, timerIFC, timerKDOC, blinkTimer, timeLeft, timerId, timerFloat, reverse = false, pumpVal, pStopped = false, absClearCliked = false, abm = "";
    var pdmid = ["pdmtimer1", "pdmtimer2", "pdmtimer3", "pdmtimer4", "pdmtimer5", "pdmtimer6"], canholdPDM = true, canClearABS = false, hasAbsCleared = false;

    // Service Menu contents display function
    function displayMenu(dataPath) {
        // console.log(dataPath)
        $("#index").html("01");
        $("#table tr").remove();
        tablelength = dataPath.length;
        for (let i = 1; i <= tablelength; i++) {
            var id = i;
            if (id <= 9) id = "0" + id;
            if (marker == "mtcModeS") {
                id = dataPath[i - 1].code;
            }
            var rowid = "col" + i;
            var col1id = "slno" + i;
            var col2id = "name" + i;
            var row = $('<tr id = ' + rowid + '></tr>');
            row.append($('<td id=' + col1id + ' style="width: 35px;"></td>').html(id));
            if (marker == "dft") {
                row.append($('<td id=' + col2id + '></td>').html(dataPath[i - 1].Name + '<p id=dtfValue' + id + '>' + temp[i - 1] + '</p>'));
                if (dataPath[i - 1].value == "") {
                    $('#dtfValue' + id).css("display", "none");
                }
            } else if (mtcCounter == 1) {
                row.append($('<td id=' + col2id + ' sytle="width: 244px;"></td>').html(dataPath[i - 1].Name + '<p id=dtfVal>' + selval[i - 1] + '</p>'));
            } else row.append($('<td id=' + col2id + '></td>').html(dataPath[i - 1].Name));
            $('#table').append(row);
        }
        $('#screenArea').css("background", "url('Img/BG00.png')").css("background-size", "cover");
        $("#table-scroll").css("overflow", "auto").css("height", "203px").css("margin-top", "20px");
        $("#heading").html(titleArr[steps - 1]);
        $("#index").css("display", "block");
        $("#table").css("height", "208px").css("font-size", "large").css("width", "100%");
        $("#table tr").css("border-bottom", "none").css("border", "2px solid #0030ce").css("height", "34px");
        $("#table-wrapper").css("margin-top", "35px");
        if (marker == "abmR") $("#table").css("height", "auto"); $("#table-scroll").css("overflow-y", "scroll");
        if (marker == "kmtx" || tble.rows.length < 6) $("#table").css("height", "auto");
        if (mtcCounter >= 1) {
            $("#table").css("height", "60px");
            $("#table-scroll").css("overflow-y", "scroll");
            $('#screenArea').css("background", "url('Img/BG502.png')").css("background-size", "cover");
            $("#table tbody tr td:first-child").css("width", "30px");
        }
    }

    // left side menu descrition and steps display function
    function dispNotes(dataPath) {
        if (flag) {
            $('#noteArea p').remove();
            $('#noteArea b').remove();
            dataTxt = dataPath[cursor.position - 1];
            if (notesMarker == "dft") dataTxt = dataPath[0];
            if (dataTxt.Name != "") {
                $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Name));
                $('#noteArea').append($('<p style="height:1px;"></p>').html('&nbsp'));
            }

            if (dataTxt.Description != "") {
                for (let i = 0; i < dataTxt.Description.length; i++) {
                    $('#noteArea').append($('<p></p>').html('&nbsp'));
                    $('#noteArea').append($('<p></p>').html(dataTxt.Description[i]));
                }
            }

            if (dataTxt.Steps != "") {
                $('#noteArea').append($('<p></p>').html('&nbsp'));
                $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Steps));
            }

            if (dataTxt.Remark != "") {
                $('#noteArea').append($('<p style="height:5px;"></p>').html('&nbsp'));
                for (let i = 0; i < dataTxt.Remark.length; i++) {
                    if (dataTxt.Remark[i] == "REMARK") {
                        $('#noteArea').append($('<p style="height:15px;"></p>').html('&nbsp'));
                        $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Remark[i]));
                        $('#noteArea').append($('<p style="height:1px;"></p>').html('&nbsp'));
                    } else if (dataTxt.Remark[i] == "NOTICE") {
                        $('#noteArea').append($('<p style="height:15px;"></p>').html('&nbsp'));
                        $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Remark[i]));
                        i++;
                        $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Remark[i]));
                        $('#noteArea').append($('<p style="height:1px;"></p>').html('&nbsp'));
                    } else if (dataTxt.Remark[i] == "Step") {
                        i++;
                        $('#noteArea').append($('<p style="height:5px;"></p>').html('&nbsp'));
                        $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Remark[i]));
                        $('#noteArea').append($('<p style="height:5px;"></p>').html('&nbsp'));
                    } else if (dataTxt.Remark[i].charAt(0) === "F") {
                        $('#noteArea').append($('<p></p>').html(dataTxt.Remark[i]));
                        $('#noteArea').append($('<p style="height:0px;"></p>').html('&nbsp'));
                    }
                    else {
                        $('#noteArea').append($('<p></p>').html(dataTxt.Remark[i]));
                        $('#noteArea').append($('<p style="height:5px;"></p>').html('&nbsp'));
                    }
                }
            }
            if (dataTxt.Buttons != "") {
                $('#noteArea').append($('<p></p>').html('&nbsp'));
                for (let i = 0; i < dataTxt.Buttons.length; i++) {
                    if (dataTxt.Buttons[i] == "Step") {
                        i++;
                        $('#noteArea').append($('<p style="height:5px;"></p>').html('&nbsp'));
                        $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Buttons[i]));
                        $('#noteArea').append($('<p style="height:5px;"></p>').html('&nbsp'));
                    } else if (dataTxt.Buttons[i] == "REMARK") {
                        $('#noteArea').append($('<p style="height:15px;"></p>').html('&nbsp'));
                        $('#noteArea').append($('<b><p></p></b>').html(dataTxt.Buttons[i]));
                        $('#noteArea').append($('<p style="height:1px;"></p>').html('&nbsp'));
                    } else if (dataTxt.Buttons[i].charAt(0) === "F") {
                        $('#noteArea').append($('<p></p>').html(dataTxt.Buttons[i]));
                        $('#noteArea').append($('<p style="height:0px;"></p>').html('&nbsp'));
                    } else $('#noteArea').append($('<p></p>').html(dataTxt.Buttons[i]));
                }
            }
        }
    }

    // fecthing ID for the Back Button
    function compareIds(json, id) {
        let found = false;
        Object.values(json).forEach(val => {
            if (val && val.id == id) {
                found = true;
                pathFound = json;
            } else if (val && !found && val.NextPage) {
                found = compareIds(val.NextPage, id);
            }
        });
        return found;
    }

    // fecthing ID for the Back Button
    function fetchSDM(json, id) {
        let found = false;
        Object.values(json).forEach(val => {
            if (val && val.code == id) {
                found = true;
                sdmFound = val;
                // console.log(sdmFound)
            } else if (val && !found && val.NextPage) {
                found = compareIds(val.NextPage, id);
            }
        });
        return found;
    }

    function moveDown() {
        cursor.position++;
        if (tablelength < 1) {
            return 0;
        }
        if (cursor.position > tablelength) {
            cursor.position = 1;
        }
    }

    function moveUp() {
        if (moveF) {
            cursor.position--;
            if (cursor.position < 1) {
                cursor.position = tablelength;
            }
        }
    }

    // Button F1
    $("#function1button").click(function () {
        switch (marker) {
            case "pdm":
                moveF = true;
                clearPDMIntervel();
                moveDown();
                displaypdm(cursor.position);
                break;

            case "sdm":
                if (canEnterF1) {
                    cursor.position = 1;
                    cursor.tab--;
                    if (cursor.tab < 1) {
                        cursor.tab = 7;
                    }
                    displaysdm(cursor.tab);
                    var box = counterSelection + 1;
                    var posdata = jsondata.ServiceMenu[1].NextPage[0].pages[cursor.tab - 1];
                    $('#box' + box).val(posdata.code[cursor.position - 1]);
                    cursorSel();
                }
                break;

            case "abmR":
                moveF = false;
                break;

            case "mtcR":
                moveDown();
                if (cursor.position >= 1 && cursor.position <= 5) cursor.position = 6;
                else if (cursor.position >= 6 && cursor.position <= 11) cursor.position = 11;
                else if (cursor.position >= 12 && cursor.position <= 16) cursor.position = 16;
                else if (cursor.position >= 17) cursor.position = 1;
                // console.log(cursor.position);
                cursorSel();
                break;

            case "mtcModeS":
                moveDown();
                if (cursor.position >= 1 && cursor.position <= 6) cursor.position = 7;
                else if (cursor.position >= 7 && cursor.position <= 12) cursor.position = 13;
                else if (cursor.position >= 13) cursor.position = 1;
                // console.log(cursor.position);
                cursorSel();
                break;

            case "phno":
                break;

            case "dft":
                break;

            case "diaTst":
                if (Diagt == "CCMO") {
                    moveUp();
                    $('#screenArea').css("background", "url('Img/BG80a" + cursor.position + ".png')").css("background-size", "cover");
                } else if (Diagt == "ash") {
                    // clearInterval(timer);
                    $('#screenArea').css("background", "url('Img/BG810.png')").css("background-size", "cover");
                    // $("#function1button").css("opacity","1"); 
                    // ashTimer= setInterval(ashfn, 1000);
                    $("#value1").html("10");
                } else if (Diagt == "scr") {
                    scrf1click = true;
                    canClickBack = false;
                    $('#screenArea').css("background", "url('Img/BG810.png')").css("background-size", "cover");
                    if (SCRCode == 1) {
                        clearInterval(timerFloat);
                        pStopped = false;
                        timeLeft = 1800;
                        timerId = setInterval(function () { countDown("#value3"); }, 1000);
                        timerFloat = setInterval(function () { getFloatVal("#value2"); }, 100);
                    } else if (SCRCode == 2) {
                        clearInterval(timerFloat);
                        pStopped = false;
                        $("#value1").html(10);
                        timerFloat = setInterval(function () { getFloatVal("#value2"); }, 100);
                        timerId = setInterval(function () { randomIntFromInterval(26, 29, 0, "#value5"); }, 2000);
                        setTimeout(function () {
                            var timeleft = 250;
                            timerES = setInterval(function () {
                                timeleft--;
                                var minutes = Math.floor(timeleft / 60);
                                var seconds = timeleft % 60;
                                if (seconds < 10) var s = "0" + seconds;
                                else s = seconds;
                                $("#value4").html(minutes + ":" + s);
                                if (timeleft < 0) {
                                    clearInterval(timerES);
                                    pStopped = true;
                                    $("#value4").html("0:00");
                                    $("#value1").html(20).css("opacity", "1");
                                }
                            }, 1000);
                        }, 2000);
                    } else {
                        timeLeft = 60;
                        timerId = setInterval(function () { countDown("#value2"); }, 1000);
                    }
                } else if (isSCROTP) {
                    backBtnClicked();
                }
                break;

            case "adjst":
                if (adjmnt == "cspsps") {
                    $("#rect").css("display", "block");
                    $("#rect div").css("animation", "progres 4s 1 linear");
                    $('#screenArea').css("background", "url('Img/BG903.png')").css("background-size", "cover");
                    setTimeout(calibrationFinish, 3900);
                } else if (adjmnt == "pumpCal") {
                    if (pCalCounter > 1) {
                        $("#rect").css("display", "block");
                        $("#rect div").css("animation", "progres 4s 1 linear");
                        $('#screenArea').css("background", "url('Img/BG809.png')").css("background-size", "cover");
                        setTimeout(calibrationFinish, 3900);
                    }
                    if (pCalCounter >= 2) pCalCounter--;
                }
                break;

            case "nic":
                break;

            case "kmtx":
                break;

            case "sMsg":
                break;

            default:
                break;
        }
    });
    // Button F2
    $("#function2button").click(function () {
        switch (marker) {
            case "pdm":
                clearPDMIntervel();
                moveUp();
                moveF = true;
                displaypdm(cursor.position);
                break;

            case "sdm":
                if (canEnterF2) {
                    cursor.position = 1;
                    cursor.tab++;
                    if (cursor.tab > 7) cursor.tab = 1;
                    displaysdm(cursor.tab);
                    var box = counterSelection + 1;
                    var posdata = jsondata.ServiceMenu[1].NextPage[0].pages[cursor.tab - 1];
                    $('#box' + box).val(posdata.code[cursor.position - 1]);
                    cursorSel();
                }
                break;

            case "abmR":
                // moveF = false;
                if (canClearABS) {
                    $("#heading").html("");
                    $("#table tr").remove();
                    $('#screenArea').css("background", "url('Img/BG305.png')").css("background-size", "cover");
                    canClearABS = false;
                    absClearCliked = true;
                    canEnterF6 = true;
                }
                break;

            case "mtcR":
                moveUp();
                if (cursor.position >= 1 && cursor.position <= 5) cursor.position = 1;
                else if (cursor.position >= 6 && cursor.position <= 11) cursor.position = 6;
                else if (cursor.position >= 12 && cursor.position <= 15) cursor.position = 11;
                else if (cursor.position >= 17) cursor.position = 16;
                // console.log(cursor.position);
                cursorSel();
                break;

            case "mtcModeS":
                moveUp();
                if (cursor.position >= 1 && cursor.position <= 6) cursor.position = 1;
                else if (cursor.position >= 7 && cursor.position <= 12) cursor.position = 7;
                else if (cursor.position >= 13) cursor.position = 13;
                cursorSel();
                break;

            case "phno":
                break;

            case "dft":
                break;

            case "diaTst":
                if (Diagt == "CCMO") {
                    moveDown();
                    // console.log("cylinder",cursor.position);
                    $('#screenArea').css("background", "url('Img/BG80a" + cursor.position + ".png')").css("background-size", "cover");
                } else if (Diagt == "ash") {
                    // clearInterval(timer);
                    clearInterval(ashTimer);
                    $('#screenArea').css("background", "url('Img/BG809.png')").css("background-size", "cover");
                    // $("#function2button").css("opacity","1"); 
                    $("#value1").html("0");
                } else if (Diagt == "scr") {
                    if (scrf1click) {
                        // canClickBack = true;
                        scrf1click = false;
                        $('#screenArea').css("background", "url('Img/BG809.png')").css("background-size", "cover");
                        clearInterval(timerId);
                        clearInterval(timerES);
                        pStopped = true;
                        $("#value1").html(20).css("opacity", "1");
                        clearInterval(blinkTimer);
                        countDownFlag = false;
                        if (SCRCode == 7) {
                            canClickBack = false;
                            canEnterF6 = false;
                            $("#value1").html(20).css("opacity", "1");
                            $("#value3").html(4);
                            $("#value4").html(4);
                            setTimeout(function () {
                                $('#screenArea').css("background", "url('Img/BG811.png')").css("background-size", "cover");
                                timerId = setInterval(function () { blinkIt("#keyoff", "url(../../img/keys/Key_off_mouse_hover.png) no-repeat", "url(../../img/keys/Key_off_button_normal.png) no-repeat"); }, 1000);
                            }, 1000);
                        }
                    }
                }
                break;

            case "adjst":
                break;

            case "nic":
                break;

            case "kmtx":
                break;

            case "sMsg":
                break;

            default:
                break;
        }
    });
    // Button F3
    $("#function3button").click(function () {
        switch (marker) {
            case "pdm":
                selcLine = false;
                break;

            case "sdm":
                if (canEnterF3) {
                    moveDown();
                    cursorSel();
                    var box = counterSelection + 1;
                    var posdata = jsondata.ServiceMenu[1].NextPage[0].pages[cursor.tab - 1];
                    $('#box' + box).val(posdata.code[cursor.position - 1]);
                }
                break;

            case "abmR":
                moveDown();
                cursorSel();
                break;

            case "mtcR":
                moveDown();
                cursorSel();
                break;

            case "mtcModeS":
                if (mms == "mnts") {
                    selcLine = false;
                    mntsValue--;
                    $("#mntsVal").html(mntsValue);
                } else {
                    moveDown();
                    cursorSel();
                    if (mtcCounter == 1) {
                        $('#index').html(dataPath[cursor.position - 1].code);
                        dispNotes(dataPath);
                    }
                }
                break;

            case "phno":
                break;

            case "dft":
                moveDown();
                cursorSel();
                break;

            case "diaTst":
                if (canEnterF3) {
                    moveDown();
                    cursorSel();
                    dispNotes(dataPath);
                }

                break;

            case "adjst":
                moveDown();
                cursorSel();
                if (adjmnt == "adj12347") {
                    tablelength = dataPath[0].pages[0].value.length;
                    displayAdjst(dataPath);
                } else if (adjmnt == "pumpCal" && pCalCounter < 2) {
                    dispNotes(keyData.data[1].NextPage);
                }
                break;

            case "nic":
                break;

            case "kmtx":
                moveDown();
                cursorSel();
                break;

            case "sMsg":
                break;

            default:
                moveDown();
                cursorSel();
                dispNotes(dataPath);
                break;
        }
    });
    // Button F4
    $("#function4button").click(function () {
        switch (marker) {
            case "pdm":
                selcLine = false;
                holdPDM();
                break;

            case "sdm":
                if (!canEnterF4) {
                    if (!canSdmHold) {
                        canSdmHold = true;
                        $('#screenArea').css("background", "url('Img/BG210.png')").css("background-size", "cover");
                    } else if (canSdmHold) {
                        canSdmHold = false;
                        $('#screenArea').css("background", "url('Img/BG211.png')").css("background-size", "cover");
                    }
                } else if (canEnterF4) {
                    moveUp();
                    cursorSel();
                    var box = counterSelection + 1;
                    var posdata = jsondata.ServiceMenu[1].NextPage[0].pages[cursor.tab - 1];
                    $('#box' + box).val(posdata.code[cursor.position - 1]);
                }
                break;

            case "abmR":
                moveF = true;
                moveUp();
                cursorSel();
                break;

            case "mtcR":
                moveUp();
                cursorSel();
                break;

            case "mtcModeS":
                if (mms == "mnts") {
                    selcLine = false;
                    mntsValue++;
                    $("#mntsVal").html(mntsValue);
                } else {
                    moveUp();
                    cursorSel();
                    if (mtcCounter == 1) {
                        $('#index').html(dataPath[cursor.position - 1].code);
                        dispNotes(dataPath);
                    }
                }

                break;

            case "phno":
                break;

            case "dft":
                moveUp();
                cursorSel();
                break;

            case "diaTst":
                if (canEnterF4) {
                    moveUp();
                    cursorSel();
                    dispNotes(dataPath);
                }
                break;

            case "adjst":
                moveUp();
                cursorSel();
                if (adjmnt == "adj12347") {
                    tablelength = dataPath[0].pages[0].value.length;
                    displayAdjst(dataPath);
                } else if (adjmnt == "pumpCal" && pCalCounter < 2) {
                    dispNotes(keyData.data[1].NextPage);
                }
                break;

            case "nic":
                break;

            case "kmtx":
                moveUp();
                cursorSel();
                break;

            case "sMsg":
                break;

            default:
                moveUp();
                cursorSel();
                dispNotes(dataPath);
                break;
        }
    });
    // Button F5 back Button
    $("#function5button").click(function () {
        if (!scrf1click) backBtnClicked();
    });
    // Button F6 enter selection
    $("#function6button").click(function () {
        if (canEnterF6) {
            // console.log(hasAbsCleared)
            if (Diagt != "ARS" && abmRCounter < 2 && marker != "adjst" && marker != "mtcModeS" && marker != "sdm" && marker != "dft" && Diagt != "CCMO" && adjmnt != "pumpCal") titleArr[steps + 1] = dataPath[cursor.position - 1].Name
            // console.log(MSReg, Diagt, cursor.position, cursorpos, ARSFlag)
            notesMarker = "";
            flag = true;
            cursorpos[steps] = cursor.position;
            steps++;
            if (marker != "sdm" && mtcDtf != "reset" && Diagt != "ESADRst" && Diagt != "SCROTP" && adjmnt != "pumpCal" && adjmnt != "cspsps" && Diagt != "CCMO" && Diagt != "MS" && marker != "mtcR" && abmRCounter < 2 && MSReg == false && Diagt != "ARS" && Diagt != "scr" && Diagt != "Kmt" && Diagt != "ecafc" && marker != "nic" && Diagt != "rnae" && adjmnt != "adj12347" && mtcCounter < 2 && dftCounter < 1) {
                var nameT = dataPath[cursor.position - 1].Name;
                dataPath = dataPath[cursor.position - 1].NextPage;
                var panID = "panList" + steps;
            }
            if (keyEntered == "40" || keyEntered == "51" || keyEntered == "95" || keyEntered == "90") {
                if (keyEntered == "40") nameT = keyData.data[1].Name
                else if (keyEntered == "51") nameT = keyData.data[0].Name
                else if (keyEntered == "95") nameT = keyData.data[2].Name
                else if (keyEntered == "90") nameT = keyData.data[3].Name
            }
            if (nameT != undefined && nameT != "") $('#Panlink').append($('<span id=' + panID + '></span>').html('&nbsp;&nbsp;>&nbsp;&nbsp;' + nameT));

            switch (marker) {
                case "pdm":
                    canClickKey = false;
                    canEnterF6 = false;
                    break;

                case "sdm":
                    steps--;
                    counterSelection++;
                    if (counterSelection <= 6) {
                        var clickedBox = jsondata.ServiceMenu[1].NextPage[0].pages[cursor.tab - 1].code[cursor.position - 1];
                        // console.log(clickedBox)
                        if (!$('#' + clickedBox).attr('checked')) {
                            arr[counterSelection - 1] = clickedBox;
                            arrpos[counterSelection - 1] = cursor.position - 1;
                            arrtab[counterSelection - 1] = cursor.tab - 1;
                            $('#' + clickedBox).attr("checked", true);
                            $('#box' + counterSelection).css("background-color", "red");
                            $('#box' + counterSelection).css("color", "white");
                            $('#box' + counterSelection).val(clickedBox);
                            var box = counterSelection + 1;
                            var posdata = jsondata.ServiceMenu[1].NextPage[0].pages[cursor.tab - 1];
                            // console.log(posdata.code[cursor.position-1], '#box'+box)
                            $('#box' + box).val(posdata.code[cursor.position - 1]);
                        } else {
                            selcLine = false;
                            counterSelection = 0;
                            displaysdmSel(arr, arrpos, arrtab);
                            canEnterF6 = false;
                        }
                    }
                    else {
                        notesMarker = "dft"
                        dispNotes(jsondata.ServiceMenu[1].NextPage[0].NextPage);
                        counterSelection = 0;
                        selcLine = false;
                        cursorSel();
                        displaysdmSel(arr, arrpos, arrtab)
                    }
                    break;

                case "abmR":
                    if (absClearCliked) {
                        hasAbsCleared = true;
                        subAbmR(jsondata.ServiceMenu[2].NextPage[1].NextPage[0].pages);
                        $("#heading").html("Electrical Sys Abnormality Record");
                        // $("#table tr").remove();
                        cursor.position = 1;
                        canEnterF6 = false;
                        steps--;
                        absClearCliked = false;
                        canfetch = false;
                    } else {
                        abmRCounter++;
                        if (abmRCounter == 1) {
                            notesMarker = "dft";
                            dispNotes(dataPath);
                            if (cursor.position == 1) {
                                abm = "mech";
                                subAbmR(dataPath[0].pages, nameT);
                            } else if (cursor.position == 2) {
                                abm = "ele";
                                subAbmR(dataPath[0].pages, nameT);
                                // if (hasAbsCleared) $("#table tr").remove();
                            }
                            cursor.position = 1;
                        } else {
                            steps--;
                            canEnterF6 = false;
                        }
                    }
                    break;

                case "mtcR":
                    steps--;
                    canEnterF6 = false;
                    break;

                case "mtcModeS":
                    if (mtcDtf == "reset") {
                        mtcDtf = "";
                        steps--;
                        mtcCounter = 0;
                        $('#screenArea').css("background", "url('Img/BG501.png')").css("background-size", "cover");
                        backBtnClicked();
                        // console.log(mtcCounter, dataPath, cursorpos, steps);
                    } else if (cursor.position == 16) {
                        mtcDtf = "reset";
                        // console.log(steps, cursorpos)
                        $("#table div").remove();
                        $("#table tr").remove();
                        $("#table p").remove();
                        $('#screenArea').css("background", "url('Img/BG504.png')").css("background-size", "cover");
                        $("#heading").html("");
                        dispNotes(jsondata.ServiceMenu[4].NextPage)
                    } else {
                        mtcDtf = "";
                        mtcCounter++;
                        if (mtcCounter == 1) {
                            mtcDtf = null;
                            tablelength = dataPath.length;
                            $('#screenArea').css("background", "url('Img/BG501.png')").css("background-size", "cover");
                            displayMenu(dataPath);
                        } else if (mtcCounter == 2) {
                            if (cursor.position - 1 == 0) {
                                tablelength = jsondata.ServiceMenu[4].NextPage[cursor.position - 1].NextPage[0].pages.length;
                                displayMntModeS(jsondata.ServiceMenu[4].NextPage[cursor.position - 1].NextPage[0].pages, nameT);
                            } else if (cursor.position - 1 == 1) {
                                // console.log(jsondata.ServiceMenu[4].NextPage[cursor.position-1].NextPage[1]);
                                displayMntModeS(jsondata.ServiceMenu[4].NextPage[cursor.position - 1].NextPage[1].pages, nameT);
                            }
                            cursor.position = 1;
                        } else if (mtcCounter == 3) {
                            flag = "";
                            mtcCounter--;
                            // console.log(mtcCounter);
                            if (cursor.position == 1) selval[0] = "ON";
                            else selval[0] = "OFF";
                            selval[1] = mntsValue + "h";
                            steps--;
                            backBtnClicked();
                        }
                        $("#heading").html(jsondata.ServiceMenu[4].NextPage[cursor.position - 1].Name);
                        cursor.position = 1;
                        dispNotes(dataPath)
                    }
                    break;

                case "dft":
                    dftCounter++;
                    if (dftCounter == 1) {
                        if (keyEntered == "51") {
                            dftSel = "CWR";
                            // console.log(keyData.data);
                            notesMarker = "dft";
                            dispNotes(keyData.data);
                            displaydft("With/Without Counter Weight Remover", keyData.data[0]);
                        } else {
                            notesMarker = "dft";
                            dispNotes(dataPath);
                            displaydft(nameT, dataPath[0]);
                        }
                        cursor.position = 1;
                    } else if (dftCounter == 2) {
                        steps--;
                        if (dftSel == "option") {
                            canEnterF6 = false;
                        } else if (dftSel == "camera") {
                            steps++;
                            dataPath = dataPath[0].NextPage[cursor.position - 1];
                            displaydft("", dataPath);
                        } else if (dftSel == "CWR") {
                            backBtnClicked();
                        } else {
                            var cp = cursorpos[dftCounter - 1];
                            if (temp[cp - 1] != "") temp[cp - 1] = dataPath[0].pages[cursor.position - 1];
                            backBtnClicked();
                        }
                        cursor.position = 1;
                    } else if (dftCounter == 3) {
                        steps -= 2;
                        flag = false;
                        if (dftSel == "option") {
                            // console.log("option");
                            canEnterF6 = false;
                        } else if (dftSel == "camera") {
                            var cp = cursorpos[steps];
                            camVal[cp - 1] = dataPath.pages[cursor.position - 1];
                            dataPath = jsondata.ServiceMenu[6].NextPage[3].NextPage;
                            displaydft("", dataPath[0]);
                            // console.log(cursorpos[steps])
                        }
                        dftCounter = 1;
                        cursor.position = cursorpos[steps];
                    }
                    break;

                case "diaTst":
                    if (keyEntered == "95" || Diagt == "ESADRst") {
                        $("#index").css("opacity", "0");
                        canEnterF3 = false;
                        canEnterF4 = false;
                        backBtnClick = 0;
                        Diagt = "ESADRst";
                        ESACounter++;
                        if (ESACounter == 1) {
                            $("#table tr").remove();
                            $("#heading").html("");
                            $("#table-scroll").css("overflow-y", "hidden");
                            $('#screenArea').css("background", "url('Img/BG813.png')").css("background-size", "cover");
                            dispNotes(keyData.data[2].NextPage)
                        } else if (ESACounter == 2) {
                            steps--;
                            $('#screenArea').css("background", "url('Img/BG814.png')").css("background-size", "cover");
                        } else {
                            ESACounter = 0;
                            steps--;
                            backBtnClicked();
                            Diagt = "";
                        }
                    } else if (keyEntered == "90" || Diagt == "SCROTP") {
                        $("#index").css("opacity", "0");
                        canEnterF4 = false;
                        canEnterF3 = false;
                        backBtnClick = 0;
                        Diagt = "SCROTP";
                        ESACounter++;
                        if (ESACounter == 1) {
                            $("#table tr").remove();
                            $("#heading").html("");
                            $("#table-scroll").css("overflow-y", "hidden");
                            $('#screenArea').css("background", "url('Img/BG8010.png')").css("background-size", "cover");
                            if (isSCROTP) $('#screenArea').css("background", "url('Img/BG8012.png')").css("background-size", "cover");
                            dispNotes(keyData.data[3].NextPage);
                            if (!isSCROTP) setTimeout(popupScrOtp, 1000);
                        } else if (ESACounter == 2) {
                            steps--;
                            $('#screenArea').css("background", "url('Img/BG8011.png')").css("background-size", "cover");
                        } else {
                            isSCROTP = true;
                            ESACounter = 0;
                            steps--;
                            backBtnClicked();
                            Diagt = "";
                        }
                    } else if (Diagt == "CCMO") {
                        steps--;
                        if (CCMOArr[cursor.position - 1] == false) {
                            CCMOArr[cursor.position - 1] = true;
                            $('#box' + cursor.position).css('background-color', '#ff9c07');
                        } else {
                            CCMOArr[cursor.position - 1] = false;
                            $('#box' + cursor.position).css('background-color', '#d10a0a');
                            setTimeout(function () {
                                $('#box' + cursor.position).css('background-color', '#1e24a5');
                            }, 500);
                        }

                    } else if (Diagt == "ARS") {
                        steps--;
                        if (MSReg) {
                            $('#screenArea').css("background", "url('Img/BG802.png')").css("background-size", "cover");
                            blinkTimer = setInterval(function () { blink("", 802); }, 1000);
                            MSReg = false;
                            ARSFlag = false;
                            canClickBack = false;
                        } else {
                            clearInterval(blinkTimer)
                            canClickBack = true;
                            $('#screenArea').css("background", "url('Img/BG804.png')").css("background-size", "cover");
                            if (ARSFlag) {
                                ARSFlag = false;
                                cursor.position = 2;
                                $('#screenArea').css("background", "url('Img/BG805.png')").css("background-size", "cover");
                                MSReg = true;
                            }
                            ARSFlag = true;
                        }
                    } else if (Diagt == "Kmt") {
                        if (!canReset) {
                            steps--;
                            canReset = true;
                            $("#table tr").remove();
                            $("#heading").html("");
                            $('#screenArea').css("background", "url('Img/BG807.png')").css("background-size", "cover");
                        } else {
                            canReset = false;
                            steps--;
                            backBtnClicked();
                        }

                    } else if (Diagt == "ecafc") {
                        if (!canReset) {
                            canReset = true;
                            $('#screenArea').css("background", "url('Img/BG808a.png')").css("background-size", "cover");
                            steps--;
                        } else {
                            canClickBack = true;
                            canReset = false;
                            steps--;
                            backBtnClicked();
                        }
                    } else if (Diagt == "rnae") {
                        if (!canReset) {
                            canReset = true;
                            $('#screenArea').css("background", "url('Img/BG812a.png')").css("background-size", "cover");
                            steps--;
                        } else {
                            canClickBack = true;
                            $("#table div").remove();
                            canReset = false;
                            steps--;
                            backBtnClicked();
                        }
                    } else if (Diagt == "scr") {
                        dispSCR(dataPath[cursor.position - 1]);
                        canEnterF6 = false;
                    } else if (Diagt == "MS") {
                        dispMSCyldr(dataPath[cursor.position - 1], cursor.position);
                        notesMarker = "dft"
                        dispNotes(dataPath[cursor.position - 1].NextPage);
                        canEnterF6 = false;
                        canEnterF3 = false;
                        canEnterF4 = false;
                    }
                    else {
                        notesMarker = "dft";
                        if (dataPath != undefined) dispNotes(dataPath);
                        if (cursor.position == 1 || cursor.position == 2 || cursor.position == 3 || cursor.position == 6 || cursor.position == 7 || cursor.position == 8) {
                            dispDiagTest(dataPath);
                        } else if (cursor.position == 4 || cursor.position == 5) {
                            if (cursor.position == 5) Diagt = "scr";
                            else if (cursor.position == 4) Diagt = "MS";
                            displayMenu(dataPath);
                        }
                        cursor.position = 1;
                    }
                    notesMarker = "";
                    break;

                case "adjst":
                    if (keyEntered == "40" || adjmnt == "pumpCal") {
                        adjmnt = "pumpCal";
                        pCalCounter++;
                        if (pCalCounter == 1) {
                            displayMenu(keyData.data[1].NextPage);
                            dispNotes(keyData.data[1].NextPage)
                        } else if (pCalCounter == 2) {
                            steps--;
                            if (cursor.position == 3) {
                                displayAdjst(keyData.data[1].NextPage, "");
                            } else {
                                canEnterF6 = false;
                                displayAdjst(keyData.data[1].NextPage, keyData.data[1].NextPage[cursor.position - 1].Name);
                            }
                        } else if (pCalCounter == 3) {
                            if (cursor.position == 3) {
                                // steps--;
                                pCalCounter = 1;
                                displayMenu(keyData.data[1].NextPage);
                            }
                        } else {
                            steps--;
                            pCalCounter = 1;
                        }
                        // console.log(pCalCounter,cursorpos);
                    } else if (adjmnt == "adj12347") {
                        steps--;
                        backBtnClicked();
                    } else if (adjmnt == "cspsps") {
                        steps--;
                        // console.log("hi cp")
                        backBtnClicked();
                    } else {
                        notesMarker = "dft";
                        var nameH = jsondata.ServiceMenu[8].NextPage[cursor.position - 1].Name;
                        displayAdjst(dataPath, nameH);
                        cursor.position = 1;
                        dispNotes(dataPath);
                    }

                    break;

                case "nic":
                    steps--;
                    nicCounter++;
                    flag = false;
                    if (nicCounter <= 2) {
                        dispNotes(dataPath);
                        displayNIC(nicCounter);
                        if (nicCounter == 2) {
                            canEnterF6 = false;
                            canClickBack = false;
                            timerId = setInterval(function () { blinkIt("#keyoff", "url(../../img/keys/Key_off_button_normal.png) no-repeat", "url(../../img/keys/Key_off_mouse_hover.png) no-repeat"); }, 1000);
                        }
                    }
                    break;

                case "kmtx":
                    notesMarker = "dft";
                    dispNotes(dataPath);
                    displayKmtx(dataPath);
                    canEnterF6 = false;
                    break;

                default:
                    $("#screenArea input").remove();
                    if (cursor.position == 1) {
                        marker = "pdm";
                        selcLine = false;
                        cursor.position = 1;
                        displaypdm();
                        dispNotes(dataPath);

                    } else if (cursor.position == 2) {
                        marker = "sdm";
                        tablelength = dataPath[0].pages.length;
                        cursor.position = 1;
                        dispNotes(dataPath);
                        cursor.tab = 1;
                        displaysdm(1);
                        for (let i = 6; i >= 1; i--) {
                            $('#screenArea').append('<input id=box' + i + ' type="text" value="">');
                            $('#box' + i).attr('disabled', 'disabled');
                        }
                        var box = counterSelection + 1;
                        var posdata = jsondata.ServiceMenu[1].NextPage[0].pages[cursor.tab - 1];
                        $('#box' + box).val(posdata.code[cursor.position - 1]);

                    } else if (cursor.position == 3) {
                        marker = "abmR";
                        tablelength = dataPath[0].NextPage.length;
                        displayMenu(dataPath);
                        cursor.position = 1;
                        dispNotes(dataPath);
                        $("#heading").html("Abnormality Record");

                    } else if (cursor.position == 4) {
                        marker = "mtcR";
                        tablelength = dataPath[0].pages[0].code.length;
                        cursor.position = 1;
                        dispNotes(dataPath);
                        displayMntR(dataPath[0].pages[0]);

                    } else if (cursor.position == 5) {
                        marker = "mtcModeS";
                        tablelength = dataPath.length;
                        displayMenu(dataPath);
                        cursor.position = 1;
                        dispNotes(dataPath);
                        $("#heading").html("Maintenace Mode Setting");
                        $('#screenArea').css("background", "url('Img/BG501.png')").css("background-size", "cover");
                        canClickKey = false;

                    } else if (cursor.position == 6) {
                        marker = "phno"
                        displayPhn();
                        cursor.position = 1;
                        dispNotes(dataPath);

                    } else if (cursor.position == 7) {
                        canclick51 = true;
                        marker = "dft";
                        tablelength = dataPath.length;
                        displayMenu(dataPath)
                        cursor.position = 1;
                        dispNotes(dataPath);
                        $("#heading").html("Default");

                    } else if (cursor.position == 8) {
                        marker = "diaTst";
                        canclick95 = true;
                        canclick90 = true;
                        tablelength = dataPath.length;
                        displayMenu(dataPath)
                        cursor.position = 1;
                        dispNotes(dataPath);
                        $("#heading").html("Diagnostic Tests ");

                    } else if (cursor.position == 9) {
                        canclick40 = true;
                        pCalCounter = 0;
                        marker = "adjst";
                        tablelength = dataPath.length;
                        displayMenu(dataPath);
                        cursor.position = 1;
                        dispNotes(dataPath);
                        $("#heading").html("Adjustment");

                    } else if (cursor.position == 10) {
                        marker = "nic";
                        nicCounter++;
                        tablelength = dataPath.length;
                        displayNIC(nicCounter);
                        cursor.position = 1;
                        dispNotes(dataPath);

                    } else if (cursor.position == 11) {
                        marker = "kmtx";
                        tablelength = dataPath.length;
                        cursor.position = 1;
                        displayMenu(dataPath);
                        dispNotes(dataPath);
                        $("#heading").html("KOMTRAX Settings");

                    } else if (cursor.position == 12) {
                        marker = "sMsg"
                        tablelength = dataPath.length;
                        cursor.position = 1;
                        displayMsg();
                        dispNotes(dataPath);
                        canEnterF6 = false;
                    }
                    var index = cursor.position;
                    if (index <= 9) index = "0" + cursor.position;
                    $('#index').html(index);
                    break;
            }
            keyCheck(null);
            cursorSel();
            if (mtcCounter < 2 && dftCounter < 2 && canfetch != false && abmRCounter < 2 && adjmnt != "pumpCal" && Diagt != "ESADRst" && Diagt != "SCROTP" && mtcDtf != "reset") fetchedID = dataPath[0].id;
        }
    });

    // 01 Pre-Defined Monitoring Screen Display
    function displaypdm() {
        canholdPDM = true;
        $("#table tr").remove();
        $("#table-scroll").css("overflow", "hidden");
        tablelength = jsondata.ServiceMenu[0].NextPage[0].pages.length;
        var len = jsondata.ServiceMenu[0].NextPage[0].pages[cursor.position - 1].code.length;
        var posdata = jsondata.ServiceMenu[0].NextPage[0].pages[cursor.position - 1];
        for (let i = 1; i <= len; i++) {
            var rowid = "col" + i;
            var col1id = "slno" + i;
            var col2id = "name" + i;
            var col3id = "value" + i;
            var row = $('<tr id = ' + rowid + '></tr>');
            row.append($('<td style="width:10%;padding-right: 19px;" id=' + col2id + '></td>').html(posdata.code[i - 1]));
            row.append($('<td style="width:71%;" id=' + col2id + '></td>').html(posdata.items[i - 1]));
            row.append($('<td style="width:10%; text-align:right; padding-right: 19px;" id=' + col3id + '></td> ').html(posdata.value[i - 1]));
            row.append($('<td style="width:10%;" id=' + col1id + '></td>').html(posdata.unit[i - 1]));
            $('#table').append(row);
        }
        $('#screenArea').css("background", "url('Img/BG01.png')").css("background-size", "cover");
        if (cursor.position <= 9) $("#heading").html("Pre-defined Monitoring (0" + cursor.position + "/25)");
        else $("#heading").html("Pre-defined Monitoring (" + cursor.position + "/25)");
        $("#index").css("display", "none");
        $("#table").css("height", "auto").css("font-size", "medium").css("margin-top", "13px;")
        $("#table tr").css("border", "none").css("height", "20px").css("border-bottom", "1px solid rgb(255 255 255 / 52%)");
        $("#heading").css("font-size", "18px");
        for (let i = 0; i <= tablelength; i++) {
            $("tr#col" + i + ">td").css("background-color", "#0030ce");
        }
        for (let i = 1; i <= len; i++) {
            ;
            if (posdata.monitor[i - 1]) pdmid[i - 1] = setInterval(function () { randomIntFromInterval(parseFloat(posdata.max[i - 1]), parseFloat(posdata.min[i - 1]), parseFloat(posdata.dec[i - 1]), "#value" + i); }, parseFloat(posdata.time[i - 1]));
        }
    }
    function holdPDM() {
        if (canholdPDM) {
            canholdPDM = false;
            $('#screenArea').css("background", "url('Img/BG012.png')").css("background-size", "cover");
            for (let i = 1; i <= 6; i++) {
                clearInterval(pdmid[i - 1]);
            }
        }
        else {
            canholdPDM = true;
            $('#screenArea').css("background", "url('Img/BG01.png')").css("background-size", "cover");
            var len = jsondata.ServiceMenu[0].NextPage[0].pages[cursor.position - 1].code.length;
            var posdata = jsondata.ServiceMenu[0].NextPage[0].pages[cursor.position - 1];
            for (let i = 1; i <= len; i++) {
                ;
                if (posdata.monitor[i - 1]) pdmid[i - 1] = setInterval(function () { randomIntFromInterval(parseFloat(posdata.max[i - 1]), parseFloat(posdata.min[i - 1]), parseFloat(posdata.dec[i - 1]), "#value" + i); }, 800);
            }
        }
    }
    function clearPDMIntervel() {
        for (let i = 1; i <= 6; i++) {
            clearInterval(pdmid[i - 1]);
        }
    }

    // 02 Self-Defined Monitoring Screen Display
    function displaysdm(tabIndex) {
        $("#table tr").remove();
        $("#table-scroll").css("overflow", "auto").css("height", "156px")
        tablelength = jsondata.ServiceMenu[1].NextPage[0].pages[tabIndex - 1].code.length;
        var len = jsondata.ServiceMenu[1].NextPage[0].pages[tabIndex - 1].code.length;
        var posdata = jsondata.ServiceMenu[1].NextPage[0].pages[tabIndex - 1];
        for (let i = 1; i <= len; i++) {
            var rowid = "col" + i;
            var col2id = "name" + i;
            var row = $('<tr id = ' + rowid + '></tr>');
            row.append($('<td id=' + col2id + ' style="padding: 0px 0px 0px 3px;"><input type="checkbox" id=' + posdata.code[i - 1] + ' value=' + posdata.code[i - 1] + '></input></td>'));
            row.append($('<td id=' + col2id + '></td>').html(posdata.code[i - 1]));
            row.append($('<td id=' + col2id + '></td>').html(posdata.items[i - 1]));
            $('#table').append(row);
        }
        $('#screenArea').css("background", "url('Img/BG20" + tabIndex + ".png')").css("background-size", "cover").css("background-position-x", "100%");
        $("#heading").html("");
        $("#index").css("display", "none");
        $("#table").css("height", "auto").css("font-size", "medium").css("margin-top", "13px;")
        $("#table tr").css("height", "20px");
        $("#table-wrapper").css("margin-top", "48px");
        $("table#table > tbody > tr > td:first-child").css("width", "58px");
    }
    // 02 Self-Defined Monitoring selected menu Screen Display
    function displaysdmSel(arr, arrpos, arrtab) {
        canEnterF1 = false;
        canEnterF2 = false;
        canEnterF3 = false;
        canEnterF4 = false;
        var sdmJSon = jsondata.ServiceMenu[1].NextPage[0].extraVal;
        $("#screenArea input").remove();
        $("#table tr").remove();
        $("#tablesdm table").remove();
        $("#table-scroll").css("overflow", "hidden").css("height", "165px");
        var posdata = jsondata.ServiceMenu[1].NextPage[0];
        for (let i = 1; i <= arr.length; i++) {
            var tableid = "table" + i;
            var rowid = "row" + i;
            var col1id = "slno" + i;
            var col2id = "name" + i;
            var tablesdm = $('<table id = ' + tableid + '></table>')
            if (fetchSDM(sdmJSon, posdata.pages[arrtab[i - 1]].code[arrpos[i - 1]])) {
                console.log(sdmFound)
                var row1 = $('<tr id = ' + rowid + '></tr>');
                row1.append($('<td id=' + col2id + '></td>').html(sdmFound.code + "&nbsp;&nbsp;&nbsp;" + sdmFound.name));
                tablesdm.append(row1);
                var row2 = $('<tr id = ' + rowid + '></tr>');
                for (let j = 1; j <= sdmFound.subnames.length; j++) {
                    if (sdmFound.values[j - 1] === "ON") var clas = "blue";
                    else var clas = "red";
                    row2.append($('<td style="padding-right: 12px;" id=' + col2id + '></tr>').html(sdmFound.subnames[j - 1] + "&nbsp;&nbsp;&nbsp;<span id='sdmVal' class = " + clas + ">" + sdmFound.values[j - 1] + "</span>"));
                    if (j % 2 == 0) {
                        rowid = "row" + j;
                        row2 = $('<tr id = ' + rowid + '></tr>');
                    }
                    tablesdm.append(row2);
                }
                $('#tablesdm').append(tablesdm);
            } else {
                var row = $('<tr id = ' + rowid + '></tr>');
                row.append($('<td style="width: 15%;" id=' + col2id + '></td>').html(posdata.pages[arrtab[i - 1]].code[arrpos[i - 1]]));
                row.append($('<td style="width: 50%;" id=' + col2id + '></td>').html(posdata.pages[arrtab[i - 1]].items[arrpos[i - 1]]));
                row.append($('<td style="width: 15%;" id=' + col1id + '></td>').html(posdata.pages[arrtab[i - 1]].value[arrpos[i - 1]]));
                row.append($('<td style="width: 15%;" id=' + col1id + '></td>').html(posdata.pages[arrtab[i - 1]].unit[arrpos[i - 1]]));
                tablesdm.append(row);
                $('#tablesdm').append(tablesdm);
            }
        }
        $('#screenArea').css("background", "url('Img/BG210.png')").css("background-size", "cover");
        $("#heading").html("Monitoring");
        $("#index").css("display", "none");
        $("table td").css("background-color", "#0030ce");
        $("#table").css("height", "auto").css("font-size", "small").css("margin-top", "13px;")
        $("#table tr").css("border", "none").css("height", "20px").css("border-bottom", "1px solid #fff");
        $("#table-wrapper").css("margin-top", "35px");
        $("table#table > tbody > tr > td:first-child").css("width", "58px");
        canSdmHold = true;
    }

    // 03 Abnormality Record menu Screen Display
    function subAbmR(txt, heading) {
        // console.log(hasAbsCleared, abm)
        flag = false;
        var len = txt[0].code.length;
        tablelength = len;
        $("#table tr").remove();
        $("#table-scroll").css("height", "203px")
        for (let i = 1; i <= len; i++) {
            var rowid = "col" + i;
            var col1id = "slno" + i;
            if (hasAbsCleared && abm == "ele") {
                if (txt[0].error[i - 1] == "E") {
                    var row = $('<tr id = ' + rowid + '></tr>');
                    row.append($('<td style="width:15%"; id=' + col1id + '></td>').html("0" + i + "/" + "0" + len + '&nbsp;&nbsp;&nbsp;<span style="color:#b90909;font-weight:bold;">' + txt[0].error[i - 1] + "</span>" + "<BR>" + '<p style="opacity:0">hi</p>'));
                    row.append($('<td  id=' + col1id + ' style="width:50px;"></td>').html(txt[0].code[i - 1] + "<BR>" + txt[0].fq[i - 1]));
                    row.append($('<td  id=' + col1id + ' style="width:205px;"></td>').html(txt[0].Name[i - 1] + "<BR>" + txt[0].FOcc[i - 1] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + txt[0].FOccV[i - 1] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + txt[0].LOcc[i - 1] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + txt[0].LOccV[i - 1]));
                }
            } else {
                var row = $('<tr id = ' + rowid + '></tr>');
                row.append($('<td style="width:15%"; id=' + col1id + '></td>').html("0" + i + "/" + "0" + len + '&nbsp;&nbsp;&nbsp;<span style="color:#b90909;font-weight:bold;">' + txt[0].error[i - 1] + "</span>" + "<BR>" + '<p style="opacity:0">hi</p>'));
                row.append($('<td  id=' + col1id + ' style="width:50px;"></td>').html(txt[0].code[i - 1] + "<BR>" + txt[0].fq[i - 1]));
                row.append($('<td  id=' + col1id + ' style="width:205px;"></td>').html(txt[0].Name[i - 1] + "<BR>" + txt[0].FOcc[i - 1] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + txt[0].FOccV[i - 1] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + txt[0].LOcc[i - 1] + "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" + txt[0].LOccV[i - 1]));
            }
            $('#table').append(row);
        }
        $('#screenArea').css("background", "url('Img/BG303.png')").css("background-size", "cover");
        $("#heading").html(heading);
        $("#table").css("height", "auto").css("font-size", "small").css("margin-top", "13px;");
        $("#table tr").css("border", "none").css("height", "20px").css("border-bottom", "1px solid #fff");
        $("#table-wrapper").css("margin-top", "39px");
        $("table#table > tbody > tr > td:first-child").css("width", "58px");
        $("#table-scroll").css("height", "206px")
        if (!hasAbsCleared) {
            if (heading == "Electrical Sys Abnormality Record") popupTimeOut = setTimeout(showClearInst, 2000);
        }
    }
    function showClearInst() {
        $("#popup").css("display", "block");
    }
    $("#close").click(function () {
        $("#popup").css("display", "none");
        canClearABS = true;
        $('#screenArea').css("background", "url('Img/BG304.png')").css("background-size", "cover");
    });

    // 04 Maintenance Record Screen Display
    function displayMntR(txt) {
        flag = false;
        $("#table tr").remove();
        $("#table-scroll").css("overflow", "auto");
        for (let i = 1; i <= tablelength; i++) {
            var rowid = "col" + i;
            var col1id = "col" + i;
            var col2id = "name" + i;
            var row = $('<tr id = ' + rowid + '></tr>');
            row.append($('<td id=' + col1id + ' sytle="width: 30px;"></td>').html(txt.code[i - 1]));
            row.append($('<td id=' + col2id + ' sytle="width: 244px;"></td>').html(txt.items[i - 1]));
            row.append($('<td id=' + col2id + ' sytle="width: 60px;"></td>').html(txt.cFq[i - 1]));
            row.append($('<td id=' + col2id + ' sytle="width: 45px;"></td>').html(txt.SHR[i - 1]));
            $('#table').append(row);
        }
        $("#table").css("font-size", "small");
        $("#table tr").css("height", "37px");
        $("#table-scroll").css("height", "186px").css("margin-top", "55px");
        $('#screenArea').css("background", "url('Img/BG402.png')").css("background-size", "cover");
        $("#heading").html("");
        $("#index").css("display", "none");
    }

    // 05 Maintenance Mode Setting Screen Display
    function displayMntModeS(txt, labelH) {
        $("#index").html("01");
        flag = false;
        $("#table tr").remove();
        $("#table-scroll").css("overflow-y", "scroll");
        if (cursor.position == 1) {
            flag = false;
            mms = "mmc";
            $("#index").css("display", "block");
            for (let i = 1; i <= tablelength; i++) {
                var rowid = "col" + i;
                var row = $('<tr id = ' + rowid + '></tr>');
                row.append($('<td sytle="width: 30px;"></td>').html(txt[i - 1]));
                $('#table').append(row);
                $('#screenArea').css("background", "url('Img/BG502.png')").css("background-size", "cover");
            }
        } else if (cursor.position == 2) {
            mms = "mnts";
            $("#index").css("display", "none");
            $("#table-scroll").css("overflow-y", "auto");
            var row = $('<div style="margin-top: 87px;"></div>');
            row.append($('<td id="rnae" sytle="width: 30px;"></td>').html('<p style="float: left; margin-left: 140px; font-size: 31px;">30</p><p id="mntsVal" style="float: left; margin-left: 125px; font-size: 31px;">' + mntsValue + '</p>'));
            $('#table').append(row);
            $('#screenArea').css("background", "url('Img/BG503.png')").css("background-size", "cover");
        }
        $("#heading").html(labelH);
    }

    // 06 Phone number entry Screen Display
    function displayPhn() {
        $("#index").css("display", "none");
        $("#heading").html("");
        $("#table tr").remove();
        $("#table-scroll").css("display", "none");
        $('#screenArea').css("background", "url('Img/BG601.png')").css("background-size", "cover");
        $("#popupPhone").css("display", "block");
    }
    $("#closeP").click(function () {
        $("#popupPhone").css("display", "none");
        $("#table-scroll").css("display", "block");
        cursor.position = 6;
        backBtnClicked();
    });

    //07 Default submenu Screen Display
    function displaydft(title, txt) {
        flag = false;
        $("#heading").html(title);
        $("#index").html("01");
        $("#table tr").remove();
        if (txt.pages != undefined) {
            tablelength = txt.pages.length;
            for (let i = 1; i <= tablelength; i++) {
                var rowid = "col" + i;
                var col2id = "name" + i;
                var row = $('<tr id = ' + rowid + '></tr>');
                row.append($('<td id=' + col2id + ' sytle="width: 30px;"></td>').html(txt.pages[i - 1]));
                $('#table').append(row);
            }
            if (tablelength <= 6) $("#table").css("height", "100px");
        } else {
            if (cursor.position == 4 || dftSel == "camera") {
                dftSel = "camera";
                tablelength = txt.NextPage.length;
                // console.log(camVal)
                for (let i = 1; i <= tablelength; i++) {
                    var rowid = "col" + i;
                    var col2id = "name" + i;
                    var row = $('<tr id = ' + rowid + '></tr>');
                    row.append($('<td id=' + col2id + ' sytle="width: 30px;"></td>').html(txt.NextPage[i - 1].Name + '<p id=dtfVal>' + camVal[i - 1] + '</p>'));
                    $('#table').append(row);
                }
                $("table#table").css("height", "135px");
            } else if (cursor.position == 7) {
                dftSel = "option";
                tablelength = txt.NextPage.length;
                for (let i = 1; i <= tablelength; i++) {
                    var rowid = "col" + i;
                    var col2id = "name" + i;
                    var row = $('<tr id = ' + rowid + '></tr>');
                    row.append($('<td id=' + col2id + ' sytle="width: 30px;"></td>').html(txt.NextPage[i - 1].Name + '<p id=dtfVal>' + txt.NextPage[i - 1].value + '</p>'));
                    $('#table').append(row);
                }
                $("table#table").css("height", "135px");
            }
        }
    }

    // 08 Diagnostics Tests Menu
    function dispDiagTest(txt) {
        // console.log(txt, cursor.position, ARSFlag)
        if (txt[0].pages == undefined || txt[0].pages == "") {
            $("#table tr").remove();
            $("#table div").remove();
            $("#heading").html("");
            // console.log("ooopps");
            if (cursor.position == 2) {
                canEnterF3 = false;
                canEnterF4 = false;
                Diagt = "ARS";
                $('#screenArea').css("background", "url('Img/BG801.png')").css("background-size", "cover");
                MSReg = true;
                ARSFlag = false;
                canClickBack = false;
                $("#index").css("display", "none");
            } else if (cursor.position == 6) {
                Diagt = "ecafc";
                $("#table-scroll").css("overflow", "hidden");
                $('#screenArea').css("background", "url('Img/BG808.png')").css("background-size", "cover");
                canClickBack = false;
            } else if (cursor.position == 8) {
                Diagt = "rnae";
                $("#index").css("display", "none");
                $("#table-scroll").css("overflow", "hidden");
                $('#screenArea').css("background", "url('Img/BG812.png')").css("background-size", "cover");
                var row = $('<div style="margin-top: 95px;"></div>');
                row.append($('<td id="rnae" sytle="width: 30px;"></td>').html('<p style="float: left; margin-left: 165px; font-size: 36px;">0</p><p style="float: left; margin-left: 141px; font-size: 36px;">0</p>'));
                $('#table').append(row);
                canClickBack = false;
            } else if (cursor.position == 4) {
                Diagt = "MS";
            }
        }
        else {
            $("#table tr").remove();
            $("#heading").html("");
            tablelength = txt[0].pages[0].code.length;
            for (let i = 1; i <= tablelength; i++) {
                var rowid = "col" + i;
                var col2id = "name" + i;
                var col3id = "value" + i;
                var row = $('<tr id = ' + rowid + '></tr>');
                row.append($('<td id=' + col2id + ' sytle="width: 30px;"></td>').html(txt[0].pages[0].code[i - 1]));
                row.append($('<td id=' + col2id + ' sytle="width: 30px;"></td>').html(txt[0].pages[0].Name[i - 1]));
                row.append($('<td id=' + col3id + ' sytle="width: 30px;"></td>').html(txt[0].pages[0].value[i - 1]));
                row.append($('<td id=' + col2id + ' sytle="width: 30px;"></td>').html(txt[0].pages[0].unit[i - 1]));
                $('#table').append(row);
            }
            if (cursor.position == 3) {
                Diagt = "Kmt";
                flag = false;
                cursor.position = 1;
                $('#index').html("01");
                $("#heading").html("KDPF Memory Test");
                $('#screenArea').css("background", "url('Img/BG806.png')").css("background-size", "cover");
                $("#table").css("height", "140px").css("font-size", "medium");
            } else if (cursor.position == 7) {
                Diagt = "ash";
                $("#table-scroll").css("overflow", "hidden");
                $("#table-wrapper").css("margin-top", "58px");
                $("#heading").html("Ash in Soot Accumulation Correction");
                $('#screenArea').css("background", "url('Img/BG809.png')").css("background-size", "cover");
                if (tablelength <= 6) $("#table").css("height", "75px").css("font-size", "small").css("width", "82%"); $("#table tr").css("border", "none").css("height", "20px").css("border-bottom", "1px solid #fff");
                selcLine = false;
                cursorSel();
                btnA = true;
                blinkTimer = setInterval(function () { blink("#value1", ""); }, 500);
                // timer = setInterval( function() { animateBtn(1); }, 500 );
            }
            else if (cursor.position == 1) {
                Diagt = "CCMO";
                canEnterF3 = false;
                canEnterF4 = false;
                $('#screenArea').css("background", "url('Img/BG80a1.png')").css("background-size", "cover");
                $("#table-scroll").css("overflow", "hidden");
                $('#table-scroll').append('<div style="margin-right: 76px;"></div>')
                for (let i = 6; i >= 1; i--) {
                    $('#table-scroll div').append('<input id=box' + i + ' type="text" value=' + i + '>');
                    $('#box' + i).attr('disabled', 'disabled');
                }
                timerES = setInterval(function () { randomIntFromInterval(960, 1040, 0, "#value1"); }, 500);
                timerIFC = setInterval(function () { randomIntFromInterval(26, 30, 1, "#value2"); }, 800);
                timerKDOC = setInterval(function () { randomIntFromInterval(130, 134, 1, "#value3"); }, 800);
                tablelength = 6;
                if (tablelength <= 6) $("#table").css("height", "75px").css("font-size", "small"); $("#table tr").css("border", "none").css("height", "20px").css("border-bottom", "1px solid #fff");
                selcLine = false;
                cursorSel();
            }
        }
    }
    //SCR test
    function dispSCR(txt) {
        clearInterval(timerFloat);
        clearInterval(timerES);
        pStopped = false;
        SCRCode = txt.code;
        $("#table tr").remove();
        $("#heading").html(txt.Name);
        $("#index").css("display", "none");
        $("#table-scroll").css("overflow", "hidden");
        tablelength = txt.pages[0].Name.length;
        for (let i = 1; i <= tablelength; i++) {
            var rowid = "col" + i;
            var col2id = "value" + i;
            var col1id = "unit" + i;
            var row = $('<tr id = ' + rowid + '></tr>');
            row.append($('<td style="max-width:270px;" ></td>').html(txt.pages[0].Name[i - 1]));
            row.append($('<td id=' + col2id + '></td>').html(txt.pages[0].value[i - 1]));
            row.append($('<td id=' + col1id + '></td>').html(txt.pages[0].unit[i - 1]));
            $('#table').append(row);
        }
        $("#table").css("height", "auto").css("font-size", "medium").css("margin-top", "13px;").css("width", "80%").css("margin-top", "40px")
        $("#table tr").css("border", "none").css("height", "20px").css("border-bottom", "1px solid #fff");
        selcLine = false;
        cursorSel();
        $('#screenArea').css("background", "url('Img/BG809.png')").css("background-size", "cover");
        canClickBack = false;
        canEnterF4 = false;
        canEnterF3 = false;
        blinkTimer = setInterval(function () { blink("#value1", ""); }, 500);
    }
    // MS Cylinder
    function dispMSCyldr(txt, img) {
        backBtnClick = 0;
        $("#heading").html(txt.Name);
        $("#index").html("01");
        $("#table tr").remove();
        tablelength = txt.NextPage[0].pages[0].code.length;
        for (let i = 1; i <= tablelength; i++) {
            var rowid = "col" + i;
            var col2id = "name" + i;
            var row = $('<tr id = ' + rowid + '></tr>');
            row.append($('<td style="max-width:270px;" ></td>').html(txt.NextPage[0].pages[0].Name[i - 1]));
            row.append($('<td></td>').html(txt.NextPage[0].pages[0].value[i - 1]));
            row.append($('<td></td>').html(txt.NextPage[0].pages[0].unit[i - 1]));
            $('#table').append(row);
        }
        $("#table").css("height", "auto").css("font-size", "15px").css("margin-top", "0px;").css("width", "98%").css("line-height", "0px");
        $("#table tr").css("border", "none").css("height", "17px").css("border-bottom", "1px solid #fff");
        $("#table-scroll").css("overflow", "hidden");
        $('#screenArea').css("background", "url('Img/BG84" + img + ".png')").css("background-size", "cover");
        selcLine = false;
        cursorSel();
    }
    function popupScrOtp() {
        $("#popupScrOtp").css("display", "block");
    }
    $("#closeSCR").click(function () {
        $("#popupScrOtp").css("display", "none");
    });

    //09 Adjustment Screen Display
    function displayAdjst(txt, headLine) {
        $("#table div").remove();
        $("#table tr").remove();
        $("#index").css("display", "none");
        $("#heading").html(headLine);
        $("#table-scroll").css("overflow", "hidden");
        if (adjmnt == "pumpCal") {
            if (cursor.position == 1 || cursor.position == 2) {
                $('#screenArea').css("background", "url('Img/BG905.png')").css("background-size", "cover");
                var row = $('<div id="rect" style="display: none; box-shadow: inset -0.1px -0.1px 0px 0px; height: 28px; width: 325px; background-color: #1e24a5; margin-left: 35px; margin-top: 48px;"></div>');
                row.append($('<div style="height: 28px; width: 1%; background-color: #f7a624;"></div>'));
                $('#table').append(row);
            } else if (cursor.position == 3) {
                $('#screenArea').css("background", "url('Img/BG907.png')").css("background-size", "cover");
            }
        } else if (cursor.position == 1 || cursor.position == 2 || cursor.position == 3 || cursor.position == 4 || cursor.position == 7 || adjmnt == "adj12347") {
            adjmnt = "adj12347";
            $('#screenArea').css("background", "url('Img/BG901.png')").css("background-size", "cover");
            var row = $('<div style="margin-top: 69px;"></div>');
            if (cursor.position == 7) cursor.position = 1;
            row.append($('<td id="rnae" sytle="width: 30px;"></td>').html('<p style="float: left; margin-left: 140px; font-size: 36px;">' + txt[0].pages[0].code[0] + '</p><p style="float: left; margin-left: 52px; font-size: 36px;">' + txt[0].pages[0].value[cursor.position - 1] + '</p>'));
            $('#table').append(row);
        } else if (cursor.position == 5 || cursor.position == 6 || adjmnt == "cspsps") {
            adjmnt = "cspsps";
            $('#screenArea').css("background", "url('Img/BG902.png')").css("background-size", "cover");
            var row = $('<div id="rect" style="display: none; box-shadow: inset -0.1px -0.1px 0px 0px; height: 28px; width: 325px; background-color: #1e24a5; margin-left: 35px; margin-top: 48px;"></div>');
            row.append($('<div style="height: 28px; width: 1%; background-color: #f7a624;"></div>'));
            $('#table').append(row);
            if (cursor.position == 5) $("#heading").html("Calibrate F Pump Swash Plate Sens Min");
            else if (cursor.position == 6) $("#heading").html("Calibrate R Pump Swash Plate Sens Min");
        }
    }

    // 10 No-Injection Cranking Screen Display
    function displayNIC(img) {
        $("#index").css("display", "none");
        $("#heading").html("");
        $("#table tr").remove();
        $("#table-scroll").css("overflow", "hidden");
        $('#screenArea').css("background", "url('Img/BG100" + img + ".png')").css("background-size", "cover");
    }

    // 11 Komtrax Settings Screen Display
    function displayKmtx(txt) {
        $("#index").css("display", "none");
        $("#heading").html("");
        $("#table div").remove();
        $("#table tr").remove();
        $("#table-scroll").css("overflow", "hidden");
        $('#screenArea').css("background", "url('Img/BG110" + cursor.position + ".png')").css("background-size", "cover");
        if (cursor.position == 1) {
            $("#heading").html("Terminal Status");
            for (let i = 1; i <= tablelength; i++) {
                var rowid = "col" + i;
                var col2id = "name" + i;
                var row = $('<tr id = ' + rowid + '></tr>');
                row.append($('<td id=' + col2id + ' sytle="width: 100px;"></td>').html(txt[0].pages[0].label[i - 1]));
                row.append($('<td id=' + col2id + ' sytle="width: 100px;"></td>').html(txt[0].pages[0].value[i - 1]));
                $('#table').append(row);
            }
            $("#table tbody tr td:first-child").css("max-width", "none");
            if (tablelength <= 6) $("#table").css("height", "100px").css("font-size", "small");
        }
        else if (cursor.position == 2) {
            var row = $('<div style="margin-left: 160px;"></div>');
            row.append($('<p style="margin-top: 8px;"></p>').html("-------------------"));
            row.append($('<p style="margin-top: 6px;"></p>').html("-------------------"));
            row.append($('<p style="margin-top: 5px;"></p>').html("-------------------"));
            row.append($('<p style="margin-top: 27px;"></p>').html("Out of Service Area"));
            row.append($('<p style="margin-top: 7px;"></p>').html("-------------------"));
            row.append($('<p style="margin-top: 10px;float: right;margin-right: 23px;"></p>').html("0"));
            $('#table').append(row);
        }
    }

    // 12 Service Messages Screen Display
    function displayMsg() {
        $("#index").css("display", "none");
        $("#heading").html("");
        $("#table tr").remove();
        $("#table-scroll").css("overflow", "hidden");
        $('#screenArea').css("background", "url('Img/BG1201.png')").css("background-size", "cover");
    }

    // CAL F pump swash plate sensor calibration Finish
    function calibrationFinish() {
        $("#rect").css("display", "none");
        if (adjmnt == "cspsps") $('#screenArea').css("background", "url('Img/BG904.png')").css("background-size", "cover");
        else if (adjmnt == "pumpCal") $('#screenArea').css("background", "url('Img/BG906.png')").css("background-size", "cover");
    }
    //Animate Button
    function animateBtn(index) {
        if (btnA) {
            $("#function" + index + "button").css("opacity", ".7");
            btnA = false;
        }
        else {
            $("#function" + index + "button").css("opacity", "1");
            btnA = true;
        }
    }
    // Ash Function
    function ashfn() {
        if (ashVal < 20) {
            ashVal += 10;
            $("#value1").html(ashVal);
        } else {
            clearInterval(ashTimer);
            $("#value1").html("20");
            // timer = setInterval( function() { animateBtn(2); }, 500 );
        }

    }

    //Back Button click Function
    function backBtnClicked() {
        // console.log("back")
        $("#index").css("opacity", "1");
        pCalCounter--;
        canEnterF6 = true;
        canEnterF3 = true;
        canEnterF4 = true;
        canEnterF1 = true;
        canEnterF2 = true;
        pStopped = false;
        clearInterval(blinkTimer);
        clearInterval(timerId);
        clearInterval(timerFloat);
        clearInterval(timerES);
        clearInterval(timerIFC);
        clearInterval(timerKDOC);
        countDownFlag = false;
        if (canClickBack) {
            var panID = "panList" + steps;
            $('#Panlink #' + panID).remove();
            resetAllValues();
            if (backBtnClick > 1) Diagt = "";
            // console.log("fetchedID : ",fetchedID);
            if (canSdmHold) { fetchedID = fetchedID; }
            else if (Diagt == "ESADRst" || Diagt == "SCROTP" || Diagt == "MS" || adjmnt == "pumpCal" || mtcCounter > 0 || dftCounter > 3 || mtcDtf != null) { console.log("") }
            else { fetchedID = fetchedID.substring(0, fetchedID.length - 2); }
            if (fetchedID.length <= 2) marker = "default";
            // console.log(fetchedID)
            if (fetchedID.length >= 1) {
                flag = true;
                compareIds(jsondata["ServiceMenu"], fetchedID)
                dataPath = pathFound;
                if (marker != "sdm" && pCalCounter < 1) {
                    if (marker == "adjst" && marker == "diaTst") notesMarker = "dft";
                    displayMenu(dataPath);
                    steps--;
                    cursor.position = cursorpos[steps];
                    dispNotes(dataPath);
                    cursorSel();
                }
                if (fetchedID.length == 1) {
                    canclick40 = false;
                    canclick51 = false;
                    canclick95 = false;
                    canclick90 = false;
                    Diagt = "";
                    backBtnClick = 0;
                }
            } else {
                canclick40 = false;
                canclick51 = false;
                // console.log("<1", cursor.position, cursorpos[0])
                backBtnClick = 0;
                marker = "default";
                dataPath = jsondata.ServiceMenu;
                displayMenu(dataPath);
                if (cursorpos[0] == undefined) cursor.position = 1;
                else cursor.position = cursorpos[0];
                dispNotes(dataPath);
                cursorSel();
            }
            switch (marker) {
                case "pdm":
                    moveF = true;
                    selcLine = true;
                    marker = "";
                    break;

                case "sdm":
                    if (backBtnClick == 1) {
                        displaysdm(1);
                        cursor.tab = 1;
                        backBtnClick--;
                        for (let i = 6; i >= 1; i--) {
                            $('#screenArea').append('<input id=box' + i + ' type="text" value="">');
                            $('#box' + i).attr('disabled', 'disabled');
                        }
                        canSdmHold = false;
                        cursorSel();
                    } else {
                        displayMenu(dataPath);
                        dispNotes(dataPath);
                    }
                    break;

                case "abmR":
                    break;

                case "mtcR":
                    break;

                case "mtcModeS":
                    mtcDtf = null;
                    if (mms != "") {
                        mms = "";
                    }
                    if (mtcCounter == 1) {
                        mntsValue = 30;
                        selval = ["ON", "30h"]
                    }
                    break;

                case "diaTst":
                    if (Diagt != "MS") Diagt = "";
                    break;

                case "adjst":
                    // console.log(marker)
                    if (adjmnt != "pumpCal") {
                        adjmnt = "";
                    } else {
                        if (pCalCounter == 1) {
                            displayMenu(keyData.data[1].NextPage);
                            dispNotes(keyData.data[1].NextPage);
                        } else if (pCalCounter < 1) adjmnt = "";
                        cursor.position = cursorpos[steps];
                        cursorSel();
                    }
                    break;

                case "dft":
                    break;
            }
        } else {
            if (Diagt == "scr") {
                if (!scrf1click) {
                    steps--;
                    displayMenu(jsondata.ServiceMenu[7].NextPage[4].NextPage);
                    $("#table").css("margin-top", "0px").css("width", "100%");
                    $("#table-scroll").css("overflow", "auto");
                    $("#index").css("display", "block");
                    cursor.position = cursorpos[steps];
                    selcLine = true;
                    cursorSel();
                    canClickBack = true;
                }
            }
        }
    }
    function resetAllValues() {
        sdmFound = "";
        clearPDMIntervel();
        abm = "";
        arr = [];
        arrpos = [];
        arrtab = [];
        canReset = false;
        canClickKey = true;
        MSReg = false;
        counterSelection = 0;
        ESACounter = 0;
        clearTimeout(popupTimeOut);
        $("#screenArea input").remove();
        $("#table-scroll div").remove();
        selcLine = true;
        backBtnClick++;
        mtcCounter--;
        nicCounter = 0;
        if (mtcCounter < 1) mtcCounter = 0;
        dftCounter = 0;
        abmRCounter = 0;
        flag = true;
        $("#table div").remove();
        $("#table tr").remove();
        $("#table p").remove();
        $("#tablesdm table").remove();
        ARSFlag = false;
        $("#table").css("margin-top", "0px");
        dftSel = "";
        notesMarker = "";
        canfetch = true;
    }

    function randomIntFromInterval(min, max, decP, ele) {
        var val = (Math.random() * (max - min) + min).toFixed(decP);
        $(ele).html(val);
    }

    function getFloatVal(ele) {
        pumpVal = parseFloat($(ele).html());
        // console.log(pumpVal, pStopped)
        var val = (Math.random() * (5.0 - 0.1) + 0.1).toFixed(1);
        if (pStopped) {
            reverse = true;
            if (pumpVal < 10) clearInterval(timerFloat);
        } else {
            if (pumpVal > 1010) reverse = true;
            else if (pumpVal < 810) reverse = false;
        }

        if (reverse) pumpVal -= parseFloat(val);
        else pumpVal += parseFloat(val);
        $(ele).html(pumpVal.toFixed(1));
    }

    var countDownFlag = false;
    function countDown(ele) {
        $("#value1").html(10);
        if (timeLeft == 0) {
            clearTimeout(timerId);
            if (!countDownFlag) {
                countDownFlag = true;
                timeLeft = 900;
                if (SCRCode == 3 || SCRCode == 4) {
                    $("#value3").html("ON");
                    timerId = setInterval(function () { countDown("#value4"); }, 1000);
                }
                else if (SCRCode == 5 || SCRCode == 6) timerId = setInterval(function () { countDown("#value3"); }, 1000);
                else if (SCRCode == 7) $("#value1").html(10);
            }

        } else {
            if (SCRCode != 7) {
                timeLeft--;
                $(ele).html(timeLeft);
            }
        }
    }

    var opacity = 1;
    function blink(ele, img) {
        if (opacity == 0) { opacity = 1; img; }
        else { opacity = 0; img++; }
        if (ele != "") $(ele).css('opacity', opacity);
        else if (img != "") $('#screenArea').css("background", "url('Img/BG" + img + ".png')").css("background-size", "cover");
    }

    function blinkIt(ele, url1, url2) {
        if (opacity == 0) { opacity = 1; $(ele).css("background", url1).css("background-size", "contain"); }
        else { opacity = 0; $(ele).css("background", url2).css("background-size", "contain"); }
    }
});
// export { cursor, cursorSel, tablelength, canClickKey, canclick51, canclick40, canclick95, canclick90 };
