var tabs = [{
    name: 'servicemenu',
    len: 12    
        }];

var sdmtabs = [{
    name: 'ENG',
    len: 42    
}, {
    name: 'KDPF',
    len: 12
}, {
    name: 'SCR',
    len: 5
}, {
    name: 'PUMP',
    len: 5
}, {
    name: 'ICT',
    len: 5
}, {
    name: 'W/E',
    len: 5
}, {
    name: 'MON',
    len: 5
}];

var trid=["col1","tr#col2>td","col3","col4","col5","col6","col7","col8","col9","col10","col11","col12"]


$(function () {
    /* Define Buttons */
    var fButtons = {
        f1: $('#function1button'),
        f2: $('#function2button'),
        f3: $('#function3button'),
        f4: $('#function4button'),
        f5: $('#function5button'),
        f6: $('#function6button'),
        f6: $('#function6button')
    };

    /* Define Display Object */
    var disp = {
        jq: $('#image'),
        setImage: function ( /* @jQuery Object */ image) {
            this.jq.find('img').remove();
            image.clone().appendTo(this.jq);
        },
        setPointer: function (point) {
            disp.setImage($('#image' + point.display + '' + point.decel + '' + point.mode + '' + point.speed));
        },
        setMenuImage: function () {
            var img = $('#img' + cursor.tab + '_menu' + cursor.position);
            disp.setImage(img);
        },
        setPanList: function (array) {
            var t = '<a style="color: #5D8892;" href="index.html">Home</a>';
            $('#panList').html(t);
            for (var i = 0; i < array.length; i++) {
                var tmp = $('a <style="color: #5D8892;" href="#">' + array[i].name + '</a>').click(array[i].function);
                $('#panList').append(' &gt ').append(tmp);
            }
        },
        setNote: function (text) {
            $('#noteArea').html(text);
        },
        clearNote: function (text) {
            $('#noteArea').html('');
        }
    };

    /* Define Variables */
    var cursor = {
        tab: 0,
        position: 1
    };

    /* Define Scrollable State Object Extends State() */
    function Scroll() {
        this.pos = 0;
        this.screen = [];
    }
    Scroll.prototype = new State();
    Scroll.prototype.setScreen = function () {
        disp.setImage(this.screen[this.pos]);
    };
    Scroll.prototype.define = function (screens) {
        for (var i = 0; i < screens.length; i++) {
            this.screen[i] = screens[i];
        }
    };
    Scroll.prototype.f3 = function () {
        this.pos++;
        this.pos %= this.screen.length;
        disp.setImage(this.screen[this.pos]);
        this.move();
    };
    Scroll.prototype.f4 = function () {
        this.pos--;
        if (this.pos < 0) {
            this.pos = this.screen.length - 1;
        }
        disp.setImage(this.screen[this.pos]);
        this.move();
    };
    Scroll.prototype.move = function () {
        return 0;
    };

    /* Define Value State Object Extends State() */
    function Value() {
        this.pos = 0;
        this.screen = [];
    }
    Value.prototype = new State();
    Value.prototype.setScreen = function () {
        disp.setImage(this.screen[this.pos]);
    };
    Value.prototype.define = function (screens) {
        for (var i = 0; i < screens.length; i++) {
            this.screen[i] = screens[i];
        }
    };
    Value.prototype.f3 = function () {
        console.log(this.pos + ' / ' + this.screen.length);
        if (this.pos < this.screen.length - 1) {
            this.pos++;
            disp.setImage(this.screen[this.pos]);
        }
        this.move();
    };
    Value.prototype.f4 = function () {
        if (0 < this.pos) {
            this.pos--;
            disp.setImage(this.screen[this.pos]);
        }
        this.move();
    };
    Value.prototype.move = function () {
        return 0;
    };

    /* Define state groups */
    var sg = function () {
        var mainmenu = new State();
        mainmenu.refresh = function () {
            disp.setMenuImage();
            mainmenu.setClickListener(fButtons);
            mainmenu.tabFunc();
            mainmenu.setlongpress();
        };
        mainmenu.tabFunc = function () {
                disp.setPanList([{
                    name: 'Service Menu',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
        };
        mainmenu.setlongpress = function () {
            if (cursor.tab == 4) {
                mainmenu.setLongTouchListener(fButtons.f6, function () {
                    screen63.refresh(cursor.position);
                }, 1000);
            } else {
                if (mainmenu.longTimer != null) {
                    mainmenu.setClickListener(fButtons);
                    mainmenu.longTimer = null;
                }
            }
            if ( cursor.position == 1) {
                disp.setNote($('#ecoguidance').html());
            } else if ( cursor.position == 2) {
                disp.setNote('<p style="font-size: 18px;"><b>Self-defined monitoring</b></p><p>The machine monitor can monitor the condition of the machine in real time by receiving signals from various switches, sensors, and actuators installed to various parts of the machine and the information from the controllers which is controlling switches, etc.</p><p>&nbsp;</p><p>“Self-define Monitoring” function is used to select a desired monitoring item.</p><p>&nbsp;</p><p>1. Select “Self-define Monitoring” on “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if ( cursor.position == 3) {
                disp.setNote('<p style="font-size: 18px;"><b>Abnormality Record</b></p><p>The machine monitor logs the past and currently occurring failures classifying them into the mechanical system abnormality and electrical system abnormality.</p><p>&nbsp;</p><p> To check the electrical system abnormality record or mechanical system abnormality record, perform the following procedures. For the failure code list, see “Failure code list”for troubleshooting.</p><p>&nbsp;</p><p> </p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if ( cursor.position == 4) {
                disp.setNote('<p style="font-size: 18px;"><b>Maintenance record</b></p><p>The machine monitor records the maintenance information of the filters, oils, etc., which are displayed and checked by the following operations.When the maintenance is performed, if the data are reset in the operator mode, the number of the times of maintenance is recorded in this section.</p><p>&nbsp;</p><p>1. Select “Maintenance Record” on “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 5) {
                disp.setNote('<p style="font-size: 18px;"><b>Maintenance Mode Setting </b></p><p>The actuating condition of the maintenance function in the operator mode can be set and changed by using this menu.</p<ul class="list"><li class="list">• To enable or disable the function</li><li class="list">• To change set replacement interval (by item)</li><li class="list">• To initialize all of replacement interval setting</li></ul><p>&nbsp;</p><p>1. Select “Maintenance Mode Setting” on “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 6) {
                disp.setNote('<p style="font-size: 18px;"><b>Phone Number Entry Setting </b></p><p>The telephone number can be displayed together with “Current Abnormality” in the operator mode. Phone number can be registered and changed according to the following procedure. Phone number must be registered in order to display the number while in operator mode.</p><p>&nbsp;</p><p>1. Select “Phone Number Entry” from the “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 7) {
                disp.setNote('<p style="font-size: 18px;"><b>Default</b></p><p>Default setting menu is used to check or change default values of the machine monitor and the machine.</p><p>&nbsp;</p><p>Functions:<ul class="list"><li class="list">• Key-on mode</li><li class="list">• Unit</li><li class="list">• With/without attachment</li><li class="list">• Camera</li><li class="list">• Auto idle stop time fixing</li><li class="list">• With/without quick coupler</li><li class="list">• Option</li><li class="list">• With/without counter weight remover</li></ul></p><p>&nbsp;</p><p>1. Select “Default” on “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 8) {
                disp.setNote('<p style="font-size: 18px;"><b>Diagnostic Tests </b></p><p>Testing menu checks the machine or resets the settings of the machine monitor.</p><p>&nbsp;</p><p>Functions:<ul class="list"><li class="list">• Cylinder cut-out operation</li><li class="list">• Regeneraton for service</li><li class="list">• KDPF memory reset</li><li class="list">• SCR service test</li><li class="list">• Engine controller active fault clear</li><li class="list">• Ash in soot accmulation correction</li><li class="list">• MS Cylinder function check</li><li class="list">• Reset Number of Abrupt Engine Stop by AIS</li><li class="list">• Engine stop adblue/def inj overheat count reset</il></ul></p><p>&nbsp;</p><p>1. Select “Diagnostic Tests” from the “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 9) {
                disp.setNote('<p style="font-size: 18px;"><b>Adjustment </b></p><p>Adjustment menu is used to check the various settings of the machine or to adjust the value.</p><p>&nbsp;</p><p>Functions:<ul class="list"><li class="list">• Pump Absorption Torque (F)</li><li class="list">• Pump Absorption Torque (R)</li><li class="list">• Travel Low Speed</li><li class="list">• Att Flow Adjust in Combined Ope</li><li class="list">• Calibrate F Pump Swash Plate Sensor</li><li class="list">• Calibrate R Pump Swash Plate Sensor</li><li class="list">• Fan Speed Mode Select</li><li class="list">• "Pump calibration: Matching speed</li><li class="list">• Pump calibration: Matching speed calibration</li><li class="list">• Restore to Default Setting"</li></ul></p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 10) {
                disp.setNote('<p style="font-size: 18px;"><b>No-Injection Cranking </b></p><p>If the engine is operated after long storage of the machine, it may be worn or damaged because of insufficient lubrication with oil. To prevent this, the machine has a function to crank the engine without injecting fuel to lubricate the engine before starting it.</p><p>&nbsp;</p><p>Setting of No-Injection cranking to be performed while the engine is stopped.</p><p>&nbsp;</p><p>No-Injection cranking does not function while the engine is running. This function can be selected even when the engine is running. However, if you execute No-Injection cranking, “Engine is running. Please turn the key off once.” is displayed on the screen.</p><p>&nbsp;</p><p>Even if the confirmation screen is displayed and No-Injection cranking is operated, the function does not become effective in the following cases. Turn the starting switch OFF once to operate.</p><p>&nbsp;</p><p><ul class="list"><li class="list">• The communication between the machine monitor and engine controller is not normal.</li><li class="list">• An engine start operation has been performed before the message “No-injection cranking is possible” is displayed.</li></ul></p><p>&nbsp;</p><p>1)Select “No-Injection Cranking” on “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 11) {
                disp.setNote('<p style="font-size: 18px;"><b>KOMTRAX settings </b></p><p>&nbsp;</p><p>Functions:<ul class="list"><li class="list">• Terminal Status</li><li class="list">• GPS & Communication State</li><li class="list">• Modem Information</li></ul></p><p>&nbsp;</p><p> </p><p>&nbsp;</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } else if (cursor.position == 12) {
                disp.setNote('<p style="font-size: 18px;"><b>Service Message </b></p><p>Special messages for the technician sent from the KOMTRAX base station (a distributor, etc.) can be checked with this function.</p><p>&nbsp;</p><p>If a received message includes a setting operation, a return mail can be sent by using the numeral input switches as well.</p><p>&nbsp;</p><p>1. Select “Service Message” on “Service Menu” screen.</p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F3: Moves the selection downward.</li><li class="list">F4: Moves the selection upward.</li><li class="list">F5: Selection is canceled. The screen goes back to “Service Menu” screen.</li><li class="list">F6: Accepts the selected item and goes to the “Pre-defined Monitoring” setting screen.</li></ul>');
            } 
            // else if (cursor.position == 3) {
            //     disp.setNote($('#clockadjust').html());
            // } else if (cursor.position == 4) {
            //     disp.setNote($('#language').html());
            // } else if (cursor.position == 5) {
                /*20150624 disp.setNote(''); */
                // disp.setNote('The operator ID function can be set by the machine owner only, through the MyKOMTRAX on the web');
            // }
            /*20150624 else if (cursor.tab == 5 && cursor.position == 6) {
                
            }*/


        }
        // mainmenu.f1 = function () {
        //     cursor.tab--;
        //     cursor.position = 1;
        //     if (cursor.tab < 0) {
        //         cursor.tab = tabs.length - 1;
        //     }
        //     disp.setMenuImage();
        //     mainmenu.tabFunc();
        //     mainmenu.setlongpress();
        // };
        // mainmenu.f2 = function () {
        //     cursor.tab++;
        //     cursor.tab %= tabs.length;
        //     cursor.position = 1;
        //     disp.setMenuImage();
        //     mainmenu.tabFunc();
        //     mainmenu.setlongpress();
        // };
        mainmenu.f3 = function () {
            if (tabs[cursor.tab].len < 1) {
                return 0;
            }
            cursor.position++;
            if (cursor.position > tabs[cursor.tab].len) {
                cursor.position = 1;
            }
            for(let i=0;i<=trid.length;i++){
                $( "tr#col"+i+">td" ).css("background-color", "#0036e8");
            }
            $("tr#col"+cursor.position+">td" ).css("background-color", "#ff9c07");
            if(cursor.position==1 || cursor.position==7 ){
                $('#table-scroll').animate({
                    scrollTop: $("tr#col"+cursor.position+">td").offset().top
                },10);
            }
            disp.setMenuImage();
            mainmenu.setlongpress();
            mainmenu.tabFunc();
        };
        mainmenu.f4 = function () {
            if (tabs[cursor.tab].len < 1) {
                return 0;
            }
            cursor.position--;
            if (cursor.position < 1) {
                cursor.position = tabs[cursor.tab].len;
            }
            disp.setMenuImage();
            mainmenu.setlongpress();
            mainmenu.tabFunc();
            for(let i=0;i<=trid.length;i++){
                $( "tr#col"+i+">td" ).css("background-color", "#0036e8");
            }
            $("tr#col"+cursor.position+">td" ).css("background-color", "#ff9c07");
            if(cursor.position==12){
                $('#table-scroll').animate({
                    scrollTop: $("tr#col"+cursor.position+">td").offset().top
                },10);
            }
            if(cursor.position==6){
                $('#table-scroll').animate({
                    scrollTop: $("tr#col1>td").offset().top
                },10);
            }
        };
        mainmenu.f6 = function () {
            console.log(cursor.position);
            /* call sub menu */
            if (cursor.position == 1) {
                pdm.refresh();
            } else if (cursor.position == 2) {
                sdm.refresh();
            } else if (cursor.position == 3) {
                averageFuel.refresh();
            } else if (cursor.position == 4) {
                energyConfigurations.pos = 0;
                energyConfigurations.refresh();
            } else if (cursor.position == 5) {
                economyModeAdjust.refresh();
            } else if (cursor.position == 6) {
                breaker.refresh();
            } else if (cursor.position == 7) {
                attachmentSetting.refresh();
            } else if (cursor.position == 8) {
                fanReverse.refresh();
            } else if (cursor.position == 9) {
                autoIdleStop.refresh();
            } else if (cursor.position == 10) {
                screen61.i = 0;
                screen61.refresh();
            } else if (cursor.position == 11) {
                screenAdjust.refresh();
            } else if (cursor.position == 12) {
                screenAdjustCamera.refresh();
            } 

        };

        /* Energy saving guidance > Operation Records (Screen34, 35) */
        var pdm = new State();
        pdm.pos = 0;
        pdm.refresh = function () {
            disp.setPanList([{
                name: 'Service Menu',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Pre-Defined Monitoring',
                function: function () {
                    pdm.refresh();
                }
                        }]);
            disp.setNote('<p><b>Operation on the Operating Record Screen</b></p><p>On the operating record screen, it is possible to carry out the following operations with switches F3 to F5.</p><ul class="list1"><li class="list1">F3: Displays the next page. When on the last page, it displays the first page.</li><li class="list1">F4: Displays the previous page. When on the first page, it displays the last page.</li><li class="list1">F5: Returns to the ECO guidance menu screen.</li></ul>');
            disp.setImage($('#pdm1'));
            pdm.pos = 1;
            pdm.setClickListener(fButtons);
        };
        /* 戻るボタン back button*/
        pdm.f5 = function () {
            mainmenu.refresh();
        };
        /* 上下移動 move up and down */
        pdm.f3 = function () {
            console.log(pdm.pos);
            pdm.pos++;
            if (pdm.pos >= 5) pdm.pos = 1;
            disp.setImage($('#pdm'+pdm.pos));
        };
        pdm.f4 = function () {
            pdm.f3();
        }

        /* Energy saving guidance > ECO Guidance Records (Screen36) */
        var sdm = new State();
        sdm.refresh = function () {
            disp.setPanList([{
                name: 'Self-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Self-define Monitoring Information',
                function: function () {
                    sdm.refresh();
                }
                        }]);
            disp.setNote('<p>&nbsp;</p><p>After “Monitoring Selection Menu” screen is displayed, select items to be monitored by using the function switches or numeral input switches.</p><p>&nbsp;</p><p>For setting of the monitoring, each time function switch F2 is pressed, sequential switching among “ENG” → “KDPF” → “SCR” → “PUMP” → “ICT” →“W/E” → “MON” → “ENG” takes place in this order. (When F1 is pressed, sequential switching takes place in the reverse order.)<p>&nbsp;</p><ul class="list"><li class="list">• Selection with function switches: Select an applicable equipment by using F1 or F2, select an item by using F3 or F4, and then enter it by using F6.</li><li class="list">• Selection with numeral input switches: Enter a 5-digit code, and the item of that code is selected directly. Enter that item by using F6.</li><li class="list">• If the color of the selected box changes from yellow to red, the selection of the item of that box is entered.</li><li class="list">• Up to six monitoring items are selectable at a time. However, the items may not be set up to six depending on the form of display of the selected item.</li></ui></p><p>&nbsp;</p><p>&nbsp;</p><ul class="list"><li class="list">F1: Moves the selection leftward</li><li class="list">F2: Moves the selection rightward</li><li class="list">F3: Moves the selection downward</li><li class="list">F4: Moves the selection upward</li><li class="list">F5: Clears input numbers/Returns the screen to “Service Menu” screen</li><li class="list">F6: Enters the selection</li></ui>');
            disp.setImage($('#s36'));
            sdm.tab = 0;
            sdm.pos = 0
            sdm.setClickListener(fButtons);
        };
        sdm.tabFunc = function () {
            console.log(sdm.tab);
            if (sdm.tab == 0){
                disp.setPanList([{
                    name: 'ENG',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
            }else if (sdm.tab == 1){
                disp.setPanList([{
                    name: 'KDPF',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
            }else if (sdm.tab == 2){
                disp.setPanList([{
                    name: 'SCR',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
            }else if (sdm.tab == 3){
                disp.setPanList([{
                    name: 'PUMP',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
            }else if (sdm.tab == 4){
                disp.setPanList([{
                    name: 'ICT',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
            }else if (sdm.tab == 5){
                disp.setPanList([{
                    name: 'W/E',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
            }else if (sdm.tab == 6){
                disp.setPanList([{
                    name: 'MON',
                    function: function () {
                        mainmenu.refresh();
                    }
                }]);
            }
        };
        /* 戻るボタン back button*/
        sdm.f1 = function () {
            console.log(sdm.tab);
            sdm.tab--;
            if (sdm.tab < 0) {
                sdm.tab = sdmtabs.length -1 ;
            }
            // disp.setMenuImage();
            sdm.tabFunc();
            // mainmenu.setlongpress();
        };
        sdm.f2 = function () {
            console.log(sdm.tab);
            sdm.tab++;
            sdm.tab %= sdmtabs.length;
            // sdm.tab = 1;
            // disp.setMenuImage();
            sdm.tabFunc();
            // sdm.setlongpress();
        };
        sdm.f5 = function () {
            mainmenu.refresh();
        };


        /* Energy saving guidance > Average fuel consumption record (Screen37, 38) */
        var averageFuel = new State();
        averageFuel.pos = 0;
        averageFuel.confirm = false;
        averageFuel.refresh = function () {
            disp.setPanList([{
                name: 'Pre-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Fuel Consumption Records',
                function: function () {
                    averageFuel.refresh();
                }
                        }]);
            disp.setNote('<p><b>Operation on the Fuel Consumption Record Screen</b></p><p>On the fuel consumption record screen, it is possible to carry out the following operations with switches F1, F2 and F5.</p><ul class="list1"><li class="list1">F1: Clears the graph data.</li><li class="list1">F2: Switches graphical displays of the average fuel consumption.</li><li class="list1">F5: Returns to the ECO guidance menu screen.</li></ul><p>&nbsp;</p><p><b>REMARK</b></p><p>The displayed value of fuel consumption may differ from the actual value due to the operating conditions of the customers (fuel, weather or work contents, etc.).</p>');
            averageFuel.pos = 0;
            disp.setImage($('#s37'));
            averageFuel.setClickListener(fButtons);
        };
        /* 戻るボタン back button*/
        averageFuel.f5 = function () {
            if (!averageFuel.confirm) {
                mainmenu.refresh();
            } else {
                averageFuel.confirm = false;
                if (averageFuel.pos == 0) {
                    disp.setImage($('#s37'));
                } else if (averageFuel.pos == 1) {
                    disp.setImage($('#s38'));
                }
            }
        };
        /* グラフボタン graph button*/
        averageFuel.f2 = function () {
            if (!averageFuel.confirm) {
                if (averageFuel.pos == 0) {
                    averageFuel.pos = 1;
                    disp.setImage($('#s38'));
                } else if (averageFuel.pos == 1) {
                    averageFuel.pos = 0;
                    disp.setImage($('#s37'));
                }
            }
        };
        /* CLEARボタン CLEAR button */
        averageFuel.f1 = function () {
            if (!averageFuel.confirm) {
                averageFuel.confirm = true;
                if (averageFuel.pos == 0) {
                    disp.setImage($('#s399'));
                } else if (averageFuel.pos == 1) {
                    disp.setImage($('#s39'));
                }
            }
        }

        /* Energy saving guidance > Configurations */
        var energyConfigurations = new Scroll();
        energyConfigurations.define([$('#s40'), $('#s42'), $('#s44'), $('#s46'), $('#s48')]);
        energyConfigurations.refresh = function () {
            disp.setPanList([{
                name: 'Pre-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Configurations',
                function: function () {
                    energyConfigurations.refresh();
                }
                        }]);
            energyConfigurations.move();
            energyConfigurations.setScreen();
            energyConfigurations.setClickListener(fButtons);
        };
        energyConfigurations.f5 = function () {
            mainmenu.refresh();
        };
        energyConfigurations.f6 = function () {
            if (energyConfigurations.pos == 0) {
                screen41.refresh();
            } else if (energyConfigurations.pos == 1) {
                screen43.refresh();
            } else if (energyConfigurations.pos == 2) {
                screen45.refresh();
            } else if (energyConfigurations.pos == 3) {
                screen47.refresh();
            } else if (energyConfigurations.pos == 4) {
                screen49.refresh();
            }
        };
        energyConfigurations.move = function () {
            switch (energyConfigurations.pos) {
            case 0:
                disp.setNote('<p><b>Setting the Display of the Fuel Consumption Gauge</b></p><p>Is possible to change the display of fuel consumption gauge and the setting of Display/Non-display.</p><p>Select display fuel consumption gauge from the display setting screen, then press switch F6.</p><p>On the display setting screen, it is possible to carry out the following operations with switches F3 to F6.</p><ul class="list1"><li class="list1">F3: Selects the next item (a line down below the current one).<br>When on the last line, it moves to the top line on the next page.</li><li class="list1">F4: Moves to previous item (1 line up). <br>When on the top line, it moves to the last line on the previous page.</li><li class="list1">F5: Cancels the setting and returns to the display setting screen.</li><li class="list1">F6: Changes the setting and returns to the display setting screen.</li</ul>');
                break;
            case 1:
                disp.setNote('<p><b>Switching Display/Non-display of ECO Gauge</b></p><p>Is possible to change the setting of Display/Non-display of ECO gauge.</p><p>Select the ECO gauge display from the display setting screen, then press switch F6.</p>');
                break;
            case 2:
                disp.setNote('<p><b>Setting the Target Fuel Consumption Value Displayed in the ECO Gauge</b></p><p>The target fuel consumption value displayed in ECO gauge setting screen appears.</p><p>On the display setting screen, it is possible to carry out the following operations with switches F3 to F6.</p><ul class="list1"><li class="list1">F3: Decreases the target fuel consumption value by 1 ｌ/h.</li><li class="list1">F4: Increases the target fuel consumption value by 1 ｌ/h.</li><li class="list1">F5: Cancels the setting and returns to the display setting screen.</li><li class="list1">F6: Changes the setting and returns to the display setting screen.</li></ul>');
                break;
            case 3:
                disp.setNote('<p><b>Switching Display/Non-display of Energy Saving (ECO) Guidance</b></p><p>It is possible to change the setting of Display/Non-display of energy saving (ECO) guidance.</p><p>Select energy saving (ECO) guidance display from the display setting screen, then press switch F6.</p>');
                break;
            case 4:
                disp.setNote('<p><b>Switching Display/Non-display of Guidance When the Starting Key is Turned off</b></p><p>It is possible to change the setting of Display/Non-display of guidance when the starting key is turned off.</p><p>Select guidance display when starting key is OFF from the display setting screen, then press switch F6.</p>');
                break;
            }

        }

        /* Energy saving guidance > Configurations > Average Fuel Consumption Display */
        var screen41 = new Scroll();
        screen41.define([$('#s411'), $('#s412'), $('#s413')]);
        screen41.refresh = function () {
            disp.setPanList([{
                name: 'Pre-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Configurations',
                function: function () {
                    energyConfigurations.refresh();
                }
                        }, {
                name: 'Average Fuel Consumption Display',
                function: function () {
                    screen41.refresh();
                }
                        }]);
            disp.setNote('<p><b>Setting the Display of the Fuel Consumption Gauge</b></p><p>The display setting of fuel consumption gauge screen appears.</p><p>・1 day</p><p>Displays the average fuel consumption from 0:00 a.m. of the day to 0:00 a.m. of the next day.</p><p>・Split</p><p>Displays the average fuel consumption during the split measurement period.</p><p>Select the split to start the automatic measurement of fuel consumption.</p>');
            screen41.setScreen();
            screen41.setClickListener(fButtons);
        };
        screen41.f5 = function () {
            energyConfigurations.refresh();
        };
        screen41.f6 = function () {
            screen41.f5();
        };

        /* Energy saving guidance > Configurations > ECO Gauge Display */
        var screen43 = new Scroll();
        screen43.define([$('#s431'), $('#s432')]);
        screen43.refresh = function () {
            disp.setPanList([{
                name: 'Pre-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Configurations',
                function: function () {
                    energyConfigurations.refresh();
                }
                        }, {
                name: 'ECO Gauge Display',
                function: function () {
                    screen43.refresh();
                }
                        }]);
            disp.setNote('<p><b>Switching Display/Non-display of ECO Gauge</b></p><ul class="list"><li class="list">The ECO gauge display setting screen appears.</li><li class="list">・ON: Displays the ECO gauge on the standard screen.</li><li class="list">・ON: Displays the ECO gauge on the standard screen.</li></ul><ul class="list1"><li class="list1">F3: Selects the next item (a line down below the current one).<br>When on the last line, it moves to the top line on the next page.</li><li class="list1">F4: Moves to previous item (1 line up). <br>When on the top line, it moves to the last line on the previous page.</li><li class="list1">F5: Cancels the setting and returns to the display setting screen.</li><li class="list1">F6: Changes the setting and returns to the display setting screen.</li></ul>');
            screen43.setScreen();
            screen43.setClickListener(fButtons);
        };
        screen43.f5 = function () {
            energyConfigurations.refresh();
        };
        screen43.f6 = function () {
            screen43.f5();
        };

        /* Energy saving guidance > Configurations > ECO Gauge Display Fuel Target Value */
        var screen45 = new State();
        screen45.refresh = function () {
            disp.setPanList([{
                name: 'Pre-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Configurations',
                function: function () {
                    energyConfigurations.refresh();
                }
                        }, {
                name: 'ECO Gauge Display Fuel Target Value',
                function: function () {
                    screen45.refresh();
                }
                        }]);
            disp.setNote('<p><b>Setting the Target Fuel Consumption Value Displayed in the ECO Gauge</b></p><p>The target fuel consumption value displayed in ECO gauge setting screen appears.</p><p>On the display setting screen, it is possible to carry out the following operations with switches F3 to F6.</p><ul class="list1"><li class="list1">F3: Decreases the target fuel consumption value by 1 ｌ/h.</li><li class="list1">F4: Increases the target fuel consumption value by 1 ｌ/h.</li><li class="list1">F5: Cancels the setting and returns to the display setting screen.</li><li class="list1">F6: Changes the setting and returns to the display setting screen.</li></ul>');
            disp.setImage($('#s45'));
            screen45.setClickListener(fButtons);
        };
        screen45.f5 = function () {
            energyConfigurations.refresh();
        };
        screen45.f6 = function () {
            screen45.f5();
        };

        /* Energy saving guidance > Configurations > ECO Guidance Display */
        var screen47 = new Scroll();
        screen47.define([$('#s471'), $('#s472')]);
        screen47.refresh = function () {
            disp.setPanList([{
                name: 'Pre-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Configurations',
                function: function () {
                    energyConfigurations.refresh();
                }
                        }, {
                name: 'ECO Guidance Display',
                function: function () {
                    screen47.refresh();
                }
                        }]);
            disp.setNote($('#ecoguidancedisplaydetail').html());
            screen47.setScreen();
            screen47.setClickListener(fButtons);
        };
        screen47.f5 = function () {
            energyConfigurations.refresh();
        };
        screen47.f6 = function () {
            screen47.f5();
        };

        /* Energy saving guidance > Configurations > ECO Guidance Display at Key OFF */
        var screen49 = new Scroll();
        screen49.define([$('#s491'), $('#s492')]);
        screen49.refresh = function () {
            disp.setPanList([{
                name: 'Pre-Defined Monitoring',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Configurations',
                function: function () {
                    energyConfigurations.refresh();
                }
                        }, {
                name: 'ECO Guidance Display at Key OFF',
                function: function () {
                    screen47.refresh();
                }
                        }]);
            disp.setNote($('#ecoguidancedisplayatkeyoffdetail').html());
            screen49.setScreen();
            screen49.setClickListener(fButtons);
        };
        screen49.f5 = function () {
            energyConfigurations.refresh();
        };
        screen49.f6 = function () {
            screen49.f5();
        };

        /* Machine Setting > Economy Mode Adjustment */
        var economyModeAdjust = new Scroll();
        economyModeAdjust.define([$('#s511'), $('#s512'), $('#s513'), $('#s514')]);
        economyModeAdjust.refresh = function () {
            disp.setPanList([{
                name: 'Machine Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Economy Mode Adjustment',
                function: function () {
                    economyModeAdjust.refresh();
                }
                        }]);
            disp.setNote($('#notes #economymodeadjust').html());
            economyModeAdjust.pos = 0;
            economyModeAdjust.setScreen();
            economyModeAdjust.setClickListener(fButtons);
        };
        economyModeAdjust.f5 = function () {
            mainmenu.refresh();
        };
        economyModeAdjust.f6 = function () {
            economyModeAdjust.f5();
        };

        /* Machine Setting > Breaker Setting */
        var breaker = new Scroll();
        breaker.define([$('#s521'), $('#s522'), $('#s523'), $('#s524'), $('#s525')]);
        breaker.refresh = function () {
            breaker.pos = 0;
            breaker.setScreen();
            breaker.setClickListener(fButtons);
        };
        breaker.f5 = function () {
            mainmenu.refresh();
        };
        breaker.f6 = function () {
            breaker.f5();
        };
        breaker.f1 = function () {
            if (breaker.pos == 0) {
                screen54.refresh();
            }
        };
        breaker.f2 = function () {
            if (breaker.pos == 0) {
                screen53.refresh();
            }
        };

        /* Screen53 */
        var screen53 = new Value();
        screen53.a = [];
        for (var i = 0; i < 15; i++) {
            screen53.a[i] = $('#s53' + (-1 * (i - 15)));
        }
        screen53.define(screen53.a);
        screen53.refresh = function () {
            disp.setNote('This setting can be locked by Pass-cord. (Usage Limitation)');
            screen53.pos = 3;
            screen53.setScreen();
            screen53.setClickListener(fButtons);
        };
        screen53.f5 = function () {
            disp.clearNote();
            breaker.refresh();
        };
        screen53.f6 = function () {
            screen53.f5();
        };

        /* Screen54 */
        var screen54 = new State();
        screen54.refresh = function () {
            disp.setNote('This setting can be locked by Pass-cord. (Usage Limitation)');
            disp.setImage($('#s54'));
            screen54.setClickListener(fButtons);
        };
        screen54.f5 = function () {
            disp.clearNote();
            breaker.refresh();
        };
        screen54.f6 = function () {
            screen54.f5();
        };

        /* Machine Setting > Attachment Setting */
        var attachmentSetting = new Scroll();
        attachmentSetting.define([$('#s551'), $('#s552'), $('#s553'), $('#s554'), $('#s555'), $('#s556')]);
        attachmentSetting.refresh = function () {
            attachmentSetting.pos = 0;
            attachmentSetting.setScreen();
            attachmentSetting.setClickListener(fButtons);
        };
        attachmentSetting.f5 = function () {
            mainmenu.refresh();
        };
        attachmentSetting.f1 = function () {
            if (attachmentSetting.pos == 0) {
                screen57.refresh();
            }
        };
        attachmentSetting.f2 = function () {
            if (attachmentSetting.pos == 0) {
                screen56.refresh();
            }
        };

        /* Screen56 */
        var screen56 = new Value();
        screen56.a = [];
        for (var i = 0; i < 8; i++) {
            screen56.a[i] = $('#s56' + (-1 * (i - 8)));
        }
        screen56.define(screen56.a);
        screen56.refresh = function () {
            disp.setNote('This setting can be locked by Pass-cord. (Usage Limitation)');
            screen56.pos = 0;
            screen56.setScreen();
            screen56.setClickListener(fButtons);
        };
        screen56.f5 = function () {
            disp.clearNote();
            attachmentSetting.refresh();
        };
        screen56.f6 = function () {
            screen56.f5();
        };

        /* Screen57 */
        var screen57 = new State();
        screen57.refresh = function () {
            disp.setNote('This setting can be locked by Pass-cord. (Usage Limitation)');
            disp.setImage($('#s57'));
            screen57.setClickListener(fButtons);
        };
        screen57.f5 = function () {
            disp.clearNote();
            attachmentSetting.refresh();
        };
        screen57.f6 = function () {
            screen57.f5();
        };

        /* Machine Setting > Fan Reverse Mode */
        var fanReverse = new State();
        fanReverse.refresh = function () {
            disp.setNote('PC490-11 Only');
            disp.setImage($('#s58'));
            fanReverse.setClickListener(fButtons);
        };
        fanReverse.f5 = function () {
            disp.clearNote();
            mainmenu.refresh();
        };
        fanReverse.f6 = function () {
            fanReverse.f5();
        };

        /* Machine Setting > Auto Idle Stop Timer Setting */
        var autoIdleStop = new Scroll();
        autoIdleStop.a = [];
        for (var i = 0; i < 47; i++) {
            autoIdleStop.a[i] = $('#s59' + (i + 1));
        }
        autoIdleStop.define(autoIdleStop.a);
        autoIdleStop.refresh = function () {
            disp.setNote('When "Flexible"');
            autoIdleStop.pos = 0;
            autoIdleStop.setScreen();
            autoIdleStop.setClickListener(fButtons);
        };
        autoIdleStop.f5 = function () {
            disp.clearNote();
            mainmenu.refresh();
        };
        autoIdleStop.f6 = function () {
            autoIdleStop.f5()
        };

        /* Screen61 */
        var screen61 = new State();
        screen61.i = 0;
        screen61.refresh = function () {
            if (screen61.i == 0) {
                disp.setImage($('#s61'));
            } else {
                disp.setImage($('#s62'));
            }
            screen61.setClickListener(fButtons);
            screen61.startTimer();
            fButtons.f5.attr({
                href: 'index.html'
            });
        };
        screen61.setTimer(5, function () {
            screen61.i++;
            screen61.i %= 2;
            if (screen61.i == 0) {
                disp.setImage($('#s61'));
            } else {
                disp.setImage($('#s62'));
            }
            screen61.refresh();
        });
        screen61.f6 = function () {
            screen61.stopTimer();
            mainmenu.refresh();
            fButtons.f5.attr({
                href: '#'
            });
        };

        /* Screen63 */
        var screen63 = new State();
        screen63.refresh = function (num) {
            disp.setNote('This setting can be locked by Pass-cord.(Usage Limitation)');
            disp.setImage($('#s63'+num));
            screen63.setClickListener(fButtons);
        };
        screen63.f5 = function () {
            disp.clearNote();
            mainmenu.refresh();
        };
        screen63.f6 = function () {
            screen63.f5();
        };

        /* Monitor Setting > Screen Adjustment */
        var screenAdjust = new Value();
        screenAdjust.a = [];
        for (var i = 0; i < 11; i++) {
            screenAdjust.a[i] = $('#s65' + (-1 * (i - 11)));
        }
        screenAdjust.define(screenAdjust.a);
        screenAdjust.refresh = function () {
            disp.setPanList([{
                name: 'Monitor Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Screen Adjustment',
                function: function () {
                    screenAdjust.refresh();
                }
                        }]);
            disp.setNote($('#screenadjustdetail').html());
            screenAdjust.pos = 0;
            screenAdjust.setScreen();
            screenAdjust.setClickListener(fButtons);
        };
        screenAdjust.f2 = function () {
            screenAdjust.pos = 0;
            screenAdjust.setScreen();
        }
        screenAdjust.f5 = function () {
            mainmenu.refresh();
        };
        screenAdjust.f6 = function () {
            screenAdjust.f5();
        };

        /* Monitor Setting > Screen Adjustment (Camera) */
        var screenAdjustCamera = new Value();
        screenAdjustCamera.a = [];
        for (var i = 0; i < 11; i++) {
            screenAdjustCamera.a[i] = $('#s66' + (i + 1));
        }
        screenAdjustCamera.define(screenAdjustCamera.a);
        screenAdjustCamera.refresh = function () {
            disp.setPanList([{
                name: 'Monitor Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Screen Adjustment (Camera)',
                function: function () {
                    screenAdjustCamera.refresh();
                }
                        }]);
            disp.setNote($('#screenadjustcameradetail').html());
            screenAdjustCamera.pos = 0;
            screenAdjustCamera.setScreen();
            screenAdjustCamera.setClickListener(fButtons);
        };
        screenAdjustCamera.f2 = function () {
            screenAdjustCamera.pos = 0;
            screenAdjustCamera.setScreen();
        }
        screenAdjustCamera.f5 = function () {
            mainmenu.refresh();
        };
        screenAdjustCamera.f6 = function () {
            screenAdjustCamera.f5();
        };

        /* Monitor Setting > Clock Adjustment */
        var clockAdjust = new Scroll();
        clockAdjust.define([$('#s681'), $('#s682'), $('#s683'), $('#s684')]);
        clockAdjust.refresh = function () {
            disp.setPanList([{
                name: 'Monitor Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Clock Adjustment',
                function: function () {
                    clockAdjust.refresh();
                }
                        }]);
            clockAdjust.move();
            clockAdjust.setScreen();
            clockAdjust.setClickListener(fButtons);
        };
        clockAdjust.move = function () {
            switch (clockAdjust.pos) {
            case 0:
                disp.setNote($('#clockadjustcalendar').html());
                break;
            case 1:
                disp.setNote($('#clockadjusttime').html());
                break;
            case 2:
                disp.setNote($('#clockadjustmode').html());
                break;
            case 3:
                disp.setNote($('#clockadjustdaylight').html());
                break;
            }
        }
        clockAdjust.f5 = function () {
            mainmenu.refresh();
        };
        clockAdjust.f6 = function () {
            switch (clockAdjust.pos) {
            case 0:
                screen69.count = 0;
                screen69.refresh();
                break;
            case 1:
                screen70.count = 0;
                screen70.refresh();
                break;
            case 2:
                screen71.refresh();
                break;
            case 3:
                screen72.refresh();
                break;
            }
        };

        /* Monitor Setting > Clock Adjustment > Calendar */
        var screen69 = new State();
        screen69.count = 0;
        screen69.refresh = function () {
            switch (screen69.count) {
            case 0:
                disp.setPanList([{
                    name: 'Monitor Setting',
                    function: function () {
                        mainmenu.refresh();
                    }
                        }, {
                    name: 'Clock Adjustment',
                    function: function () {
                        clockAdjust.refresh();
                    }
                        }, {
                    name: 'Calendar',
                    function: function () {
                        screen69.refresh();
                    }
                        }]);
                disp.setNote($('#clockadjustcalendardetail').html());
                screen69.setClickListener(fButtons);
                disp.setImage($('#s691'));
                break;
            case 1:
                disp.setImage($('#s692'));
                break;
            case 2:
                disp.setImage($('#s693'));
                break;
            case 3:
                clockAdjust.refresh();
                break;
            }
        };
        screen69.f5 = function () {
            clockAdjust.refresh();
        };
        screen69.f6 = function () {
            screen69.count++;
            screen69.refresh();
        };

        /* Monitor Setting > Clock Adjustment > Time */
        var screen70 = new State();
        screen70.count = 0;
        screen70.refresh = function () {
            switch (screen70.count) {
            case 0:
                disp.setPanList([{
                    name: 'Monitor Setting',
                    function: function () {
                        mainmenu.refresh();
                    }
                        }, {
                    name: 'Clock Adjustment',
                    function: function () {
                        clockAdjust.refresh();
                    }
                        }, {
                    name: 'Time',
                    function: function () {
                        screen70.refresh();
                    }
                        }]);
                disp.setNote($('#clockadjusttimedetail').html());
                screen70.setClickListener(fButtons);
                disp.setImage($('#s701'));
                break;
            case 1:
                disp.setImage($('#s702'));
                break;
            case 2:
                clockAdjust.refresh();
                break;
            }
        };
        screen70.f5 = function () {
            clockAdjust.refresh();
        };
        screen70.f6 = function () {
            screen70.count++;
            screen70.refresh();
        };

        /* Monitor Setting > Clock Adjustment > 12h/24h Mode */
        var screen71 = new Scroll();
        screen71.define([$('#s711'), $('#s712')]);
        screen71.refresh = function () {
            disp.setPanList([{
                name: 'Monitor Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Clock Adjustment',
                function: function () {
                    clockAdjust.refresh();
                }
                        }, {
                name: '12h/24h Mode',
                function: function () {
                    screen71.refresh();
                }
                        }]);
            disp.setNote($('#clockadjustmodedetail').html());
            screen71.pos = 0;
            screen71.setScreen();
            screen71.setClickListener(fButtons);
        };
        screen71.f5 = function () {
            clockAdjust.refresh();
        };

        /* Monitor Setting > Clock Adjustment > Daylight Saving Time */
        var screen72 = new Scroll();
        screen72.define([$('#s721'), $('#s722')]);
        screen72.refresh = function () {
            disp.setPanList([{
                name: 'Monitor Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Clock Adjustment',
                function: function () {
                    clockAdjust.refresh();
                }
                        }, {
                name: 'Daylight Saving Time',
                function: function () {
                    screen71.refresh();
                }
                        }]);
            disp.setNote($('#clockadjustdaylightdetail').html());
            screen72.pos = 0;
            screen72.setScreen();
            screen72.setClickListener(fButtons);
        };
        screen72.f5 = function () {
            clockAdjust.refresh();
        };

        /* Monitor Setting > Language */
        var language = new Scroll();
        language.a = [];
        for (var i = 0; i < 27; i++) {
            language.a[i] = $('#s73' + (i + 1));
        }
        language.define(language.a);
        language.refresh = function () {
            disp.setPanList([{
                name: 'Monitor Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Language',
                function: function () {
                    language.refresh();
                }
                        }]);
            disp.setNote($('#languagedetail').html());
            language.setScreen();
            language.setClickListener(fButtons);
        };
        language.f5 = function () {
            mainmenu.refresh();
        };
        language.f6 = function () {
            language.f5();
        };

        /* Monitor Setting > Operator ID */
        var operator = new State();
        operator.refresh = function () {
            disp.setPanList([{
                name: 'Monitor Setting',
                function: function () {
                    mainmenu.refresh();
                }
                        }, {
                name: 'Operator ID',
                function: function () {
                    operator.refresh();
                }
                        }]);
            disp.setImage($('#s74'));
            operator.setClickListener(fButtons);
        };
        operator.f5 = function () {
            disp.clearNote();
            mainmenu.refresh();
        };
        operator.f1 = function () {
            operator.f5();
        };



        /* run user menu */
        mainmenu.refresh();
        mainmenu.setlongpress();
    };

    var running = new sg();

});