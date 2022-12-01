var ROOTURRL = "https://localhost:44344/"; //local
//var ROOTURRL = "http://123.30.106.114/"; // sv dev
var g = {
    copy: function (_id) {
        // Get the text field
        var el = $(_id);
        // Select the text field
        el.select();
        // Copy the text inside the text field
        navigator.clipboard.writeText(el.text());
        $(".textc").css("background", "transparent");
        $(".textc").css("color", "inherit");
        el.css("background", "rgb(37 170 225)");
        el.css("color", "white");
    },
    validateForm: function () {
        var isValid = true;
        $(".form-control").each(function (index) { //required      
            if ($(this).val() == "") {
                $(this).addClass("is-invalid");
                isValid = false;
                if ($(this).attr("name") == "OTP") {
                    if ($("input[name=Type]:checked").val() === undefined) {
                        $(".form-check-input").first().addClass("is-invalid");
                        isValid = false;
                    } else {
                        if ($("input[name=Type]:checked").val() != "2") {
                            isValid = true;
                        } else {
                            $(this).addClass("is-invalid");
                            isValid = false;
                        }
                    }
                } else {
                    $(this).addClass("is-invalid");
                    isValid = false;
                }
            }
            else if ($(this).attr("name") == "Username") {
                if ($(this).val().length < 6) {
                    $(this).addClass("is-invalid");
                    $(this).next().empty();
                    $(this).next().append("<span class='field-validation-error alert-error'>Enter username, email or phone number</span>");
                    isValid = false;
                }
            }
            else if ($(this).attr("name") == "Password") {
                if ($(this).val().length < 6) {
                    $(this).addClass("is-invalid");
                    $(this).next().empty();
                    $(this).next().append("<span class='field-validation-error alert-error'>Password needs at least 6 letters</span>");
                    isValid = false;
                }
            }
            else if ($(this).attr("name") == "ConfirmPassword") {
                if ($(this).val() != $('#Password').val()) {
                    $(this).addClass("is-invalid");
                    $(this).next().empty();
                    $(this).next().append("<span class='field-validation-error alert-error'>Password and re-enter password must be the same </span>");
                    isValid = false;
                }
            }
        });
        if (!isValid) {
            g.loadding(false);

        }

        return isValid;
    },
    openpopup: function (_url) {
        var newWindow = window.open(_url, '_blank', 'height=500,width=500,left=400, top=180 ', 'resizable=yes', 'scrollbars=no', 'toolbar=no', 'status=no');
        return newWindow;
    },
    checkemailavailability: function (_this, content) {
        var pushData = {
            Email: _this.val()
        };
        $(content).gSend({
            url: ROOTURRL + "Account/ValidateEmail",
            data: pushData,
            loader: true
        });
    },
    CheckAvailability: function (_this, content) {
        var pushData = {
            UserName: _this.val()
        };
        $(content).gSend({
            url: ROOTURRL + "Account/ValidateUser",
            data: pushData,
            loader: true
        });
    },
    CheckPhoneAvailability: function (_this, content) {
        var pushData = {
            PhoneNumber: _this.val()
        };
        $(content).gSend({
            url: ROOTURRL + "Account/ValidatePhoneNumber",
            data: pushData,
            loader: true
        });
    },
    goBack: function () {
        window.history.back();
    },
    pickGame: function (gameID) {
        var pushData = {
            GameID: gameID
        };
        gSendRedirect({
            url: ROOTURRL + "game/pickGame",
            data: pushData,
            loader: true,
            urlDest: ROOTURRL + "game/billing?GameID=" + gameID
        });
    },
    pickCharacter: function (gameID, serverID, content) {
        var pushData = {
            GameID: gameID,
            ServerID: serverID,
            loader: true
        };
        $(content).gSend({
            url: ROOTURRL + "api/getroles",
            data: pushData,
            loader: true
        });
    },
    pickItemList: function (gameID, serverID, charID, content) {
        var pushData = {
            GameID: gameID,
            ServerID: serverID,
            CharID: charID,
            loader: true
        };
        $(content).gSend({
            url: ROOTURRL + "game/getItemList",
            data: pushData,
            loader: true
        });
    },
    pickPList: function (allowType, amount, content) {
        var pushData = {
            allowType: allowType,
            amount: amount
        };
        $(content).gSend({
            url: ROOTURRL + "api/getPayByAllow",
            data: pushData,
            loader: true
        });
    }, 
    pickPchild: function (chanelID, topupType,allowType, amount, content, childContent) {
        var pushData = {
            chanelID: chanelID,
            topupType: topupType,
            allowType: allowType,
            amount: amount
        };

        $(content).gSend({
            url: ROOTURRL + "api/getPayChanelChild",
            data: pushData,
            loader: true,
            childContent: childContent
        });

        //var a = $(this).attr("ref");
        //var growDiv = $(a);
        //var h = 0;
        //growDiv.find('.level1').each(function (index) { //required
        //    h += $(this).height();
        //});
        //alert(h);
        //growDiv.height(h + 30);


    },
    getHistory: function (chanelid, gameid, dateRanger, currentPage, content) {
        var pushData = {
            ChannelID: chanelid,
            gameID: gameid,
            dateRanger: dateRanger,
            currentPage: currentPage
        };
        $(content).gSend({
            url: ROOTURRL + "payment/gethistory",
            data: pushData,
            loader: true
        });
    },
    topupGame: function (gameID, chanelID, chanelChildID, productID, serial, pinCode, content) {
        var pushData = {
            gameID: gameID,
            chanelID: chanelID,
            chanelChildID: chanelChildID,
            productID: productID,
            serial: serial,
            pinCode : pinCode
        };
        $(content).gSend({
            url: ROOTURRL + "game/" + gameID +"/topupGame",
            data: pushData,
            loader: true
        });
    },
    topupWallet: function (chanelID, chanelChildID, amount, serial, pinCode, bankID, phoneNumber, content) {
        var pushData = {          
            channelID: chanelID,
            chanelChildID: chanelChildID,           
            serial: serial,
            pinCode: pinCode,
            amount: amount,
            bankID: bankID,
            phoneNumber: phoneNumber
        };
        $(content).gSend({
            url: ROOTURRL + "payment/topup",
            data: pushData,
            loader: true

        });
    },
    setChar: function (gameID, _objServer, _objCharacter) {
        var pushData = {
            GameID: gameID,
            ServerID: _objServer.val(),
            ServerName: $(_objServer.find("option:selected")).text(),
            CharacterID: _objCharacter.val(),
            CharacterName: $(_objCharacter.find("option:selected")).text(),
            loader: true
        };
        if (pushData.ServerID == "") {
            _objServer.addClass("is-invalid");
        } else if (pushData.CharacterID == "") {
            _objCharacter.addClass("is-invalid");
        }
        else {
            gSendRedirect({
                url: ROOTURRL + "api/setChar",
                data: pushData,
                loader: true,
                urlDest: ROOTURRL + "game/" + gameID
            });
        }
    },
    resetChar: function (gameID) {
        var pushData = {
            GameID: gameID,
            loader: true
        };
        gSendRedirect({
            url: ROOTURRL + "api/resetChar",
            data: pushData,
            loader: true,
            urlDest: ROOTURRL + "game/" + gameID
        });
    },
    pickLang: function (langID) {
        var pushData = {
            langID: langID
        };
        gSendRedirect({
            url: ROOTURRL + "api/pickLang",
            data: pushData,
            urlDest: window.location.href,
            loader: false
        });
    },
    pickCurrency: function (CurrencyID) {
        var pushData = {
            CurrencyID: CurrencyID
        };
        gSendRedirect({
            url: ROOTURRL + "api/pickCurrency",
            data: pushData,
            urlDest: window.location.href,
            loader: false
        });
    },
    pickNational: function (nationalID) {
        var pushData = {
            nationalID: nationalID
        };
        gSendRedirect({
            url: ROOTURRL + "api/pickNational",
            data: pushData,
            urlDest: window.location.href,
            loader: false
        });
    },      
    loadding: function (_show) {
        if (_show == true) {
            $("#loadding").show();
        } else {
            $("#loadding").hide();
            $("#loadding").css({ "display": "none" });
        }
    },
    tab: function (tab, container, isResetDeafaulChild, isDefault = false) {
        $(tab).click(function (e) {
            if (isDefault) {
                e.preventDefault();
            }
            $(tab).removeClass("active");
            $(this).addClass("active");
            var hrefContainer = $(this).find("a").attr("href");
            $(container).removeClass("active");
            $(hrefContainer).addClass("active");
            if (isResetDeafaulChild) {
                $(container).children().removeClass("active");
                $(hrefContainer).first().addClass("active");
                $(hrefContainer).find("input[type='radio']").first().click();
            }
        });
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

var dataGsend = {
    url: "xxxxxx",
    data: "yyyyy",
    loader: true,
    childContent : ""
};
$.fn.gSend = function (options) {
    var result;
    //do stuff
    d = $.extend(dataGsend, options);
    if (d.loader) {
        g.loadding(true);
    }
    $.ajax({
        url: d.url,
        type: "POST",
        data: d.data,
        async: false,
        beforeSend: function () {
            if (d.loader) {
                g.loadding(true);
            }
        },
        complete: function () {
        },
        error: function () {
            g.loadding(false);
            alert("Your request is not valid!");
        },
        success: function (data) {
            g.loadding(false);
            result = data;
        }
    });
    return $(this).each(function () {
        $(this).empty();
        $(this).html(result);      
        if (d.childContent != "") {          
            $(d.childContent).height(0);
            $(this).show();
        }
    });
    //return methods;
};

var dataGSendRedirect = {
    url: "xxxxxx",
    data: "yyyyy",
    loader: true,
    urlDest: ""
};
gSendRedirect = function (options) {
    //do stuff
    d = $.extend(dataGSendRedirect, options);
    if (d.loader) {
        g.loadding(true);
    }
    $.ajax({
        url: d.url,
        type: "POST",
        data: d.data,
        async: false,
        complete: function () {
        },
        error: function () {
            alert("Your request is not valid!");
            g.loadding(false);
        },
        success: function (data) {
            g.loadding(false);
            if (data.code == 1) {
                window.location.href = d.urlDest;
            } else {
                $("#alert").show();
                $("#alert-content").append("<span class='p'>" + data.msg + "</span>");
            }
        }
    });
    g.loadding(false);
};


var dataGSendAlert = {
    url: "xxxxxx",
    data: "yyyyy",
    loader: true,
    urlDest: ""
};
gSendAlert = function (options) {
    //do stuff
    d = $.extend(dataGSendAlert, options);
    if (d.loader) {
        g.loadding(true);
    }
    $.ajax({
        url: d.url,
        type: "POST",
        data: d.data,
        async: false,
        complete: function () {
        },
        error: function () {
            alert("Your request is not valid!");
            g.loadding(false);
        },
        success: function (data) {
            g.loadding(false);
            if (data.code == 1) {
                $("#alert").show();
                $("#alert-content").append("<span class='p'>" + data.msg + "</span>");
            } else {
                $("#alert").show();
                $("#alert-content").append("<span class='p'>" + data.msg + "</span>");
            }
        }
    });
    g.loadding(false);
};


var items = document.getElementsByClassName("form-control");
for (var i = 0; i < items.length; i++) {
    items[i].addEventListener('click', function (e) {
        this.classList.remove("is-invalid")
        
    });
}

function hover(_element) {
    var items = document.getElementsByClassName(_element);
    if (items != null) {
        for (var i = 0; i < items.length; i++) {
            items[i].addEventListener("mouseover", function (event, key) { /*hover in mouseenter*/
                var elementactivecurrent = document.querySelector("." + _element + ".active");
                elementactivecurrent.classList.remove("active");
                this.classList.add('active');
            }, false);
        }
    }
}


/*menu*/
function openNav(_this) {
    _this.classList.add('active');
    document.getElementById("navbar-nav").style.width = "80%";
    document.getElementById("menu-overlay").style.display = "block";
    document.getElementById("header").style.position = "unset";
    document.getElementById("main").style.marginTop = "0px";
    document.documentElement.style.overflow = "hidden";
}
function closeNav() {
    document.getElementById("navbar-nav").style.width = "0";
    document.getElementById("menu-overlay").style.display = "none";
    document.getElementById("header").style.position = "fixed";
    document.documentElement.style.overflow = "unset";
}

function closeNavfilter() {
    document.getElementById("wrap-menu-filter").style.width = "0";
}
function openNavfilter() {
    document.getElementById("wrap-menu-filter").style.width = "100%";
}


function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function popupInit(_elementID) {
    var w = window,
        d = document,
        e = d.documentElement,
        g = d.getElementsByTagName('body')[0],
        y = w.innerHeight || e.clientHeight || g.clientHeight,
        x = w.innerWidth || e.clientWidth || g.clientWidth;

    var element = document.getElementById(_elementID);
    var wElement = element.clientWidth;
    var hElement = element.clientHeight;

    document.getElementById("contain_popup").style.opacity = "1";
    document.getElementById("contain_popup").style.transition = "opacity 0.3s";
    document.getElementById("contain_popup").style.display = "block";
}
function closePopup() {
    document.getElementById("contain_popup").style.display = "none";
}


//function ScrollFunction() {
//    var w = window,
//        d = document,
//        e = d.documentElement,
//        g = d.getElementsByTagName('body')[0],
//        y = w.innerHeight || e.clientHeight || g.clientHeight,
//        x = w.innerWidth || e.clientWidth || g.clientWidth;
//    window.onscroll = function () {
//        //document.documentElement.scrollTop < y ? document.getElementById("totop").style.display = "none" : document.getElementById("totop").style.display = "block" ;

//        if (document.documentElement.scrollTop > 0) {
//            document.getElementById("header").style.top = "0px";
//            document.getElementById("header").style.zIndex = "11";
//            document.getElementById("header").style.boxShadow = "0 2px 4px 0 rgba(0, 0, 0, 0.2)";
//            document.getElementById("header").style.background = "linear-gradient(to right, #25aae1, #0070C0)";
//        } else {
//            document.getElementById("main").style.marginTop = "0px";
//            document.getElementById("header").style.boxShadow = "unset";
//            document.getElementById("header").style.background = "transparent";

//        }

//    };
//}


//ScrollFunction();

function numberWithCommas(number) {
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
}


$(".isloading").click(function () {
    g.loadding(true);
});
$(".close,.fadealert").click(function () {
    $(".modal").hide();
})