(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        var c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 1000);
        
        function updateClock() {
            
            var date = new Date();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            
            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }
            
             //kui kell on pealelõuna, st tunnid on > 12, on pl, enne el.
            var pl_el = (h >= 12)? 'pl' : 'el';

            //kui on pl, tuleb tundidest maha lahutada 12, et saada 12-tunni kella aeg
            h = (h > 12)? h -12 : h;

            //Kui kell on öösel kell 00:00 --> on juba 12el 
            h = (h == '00')? 12 : h;

            c.innerHTML = h + ":" + m + ":" + s + pl_el;
            
        };
        
    });
    
    // forms
    
    document.getElementById("form").addEventListener("submit", estimateDelivery);
    
    var e = document.getElementById("delivery");
    e.innerHTML = "0,00 &euro;";
    
    function estimateDelivery(event) {
        event.preventDefault();
        
        var eesnimi = document.getElementById("fname");
        var perenimi = document.getElementById("lname");
        //var nimed = document.getElementById("input-fields")
        
        var linn = document.getElementById("linn");
        var ost1 = document.getElementById("v1");
        var ost2 = document.getElementById("v2");
        
        var hind = 0;
        
        
        if ((linn.value === "") || (eesnimi.value === "") || (perenimi.value === "")) {
            
            if (linn.value === ""){
                alert("Palun valige linn nimekirjast!");
            
                linn.focus();

                return;
                }
            
            else if (!(eesnimi.value) || !(perenimi.value)) {
                alert("Palun sisestage oma nimi!");
            
                eesnimi.focus();
                perenimi.focus();

                return;
            }
            
               
        } else {
            
            if (ost1.checked || ost2.checked){
                if ((ost1.checked) && (ost2.checked)) {
                hind += 6;
                }
                
                else if (ost1.checked){
                    hind +=5;
                    }

                else if (ost2.checked){
                    hind +=1;
                }
            }
            
            
            if ((linn.value == "trt") || (linn.value=="nrv")){
                hind += 2.5;
             } else if (linn.value == "prn"){
                    hind += 3;
             }              
                    
            e.innerHTML = hind + "&euro;";
            
        }
    
        
        console.log("Tarne hind on arvutatud");
    }
    
})();

// map

var mapAPIKey = "AqLLRE37SJGqIxXEYxezPUa6fF2oCzl3cvG4n05FtFIVBrotBYxchpMYYpwuxBak";

var map;

function GetMap() {
    
    "use strict";

    var centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );
    
    
    var loss = new Microsoft.Maps.Location(
            58.60241,
            27.1266
    );
    

    map = new Microsoft.Maps.Map("#map", {
        credentials: mapAPIKey,
        center: centerPoint, loss,
        zoom: 8,
        mapTypeId: Microsoft.Maps.MapTypeId.road,
        disablePanning: true
    });
    
    /*
    infobox = new Microsoft.Maps.Infobox(map.getCenter(), {
        visible: false
    });
    
    
    infobox.setMap(map);
    */
    
    
    
    var pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
            title: 'Tartu Ülikool',
            description: 'Hea koht',
            //text: 'UT'
        });
    
    /*
    Microsoft.Maps.Events.addHandler(pushpin2, 'click', pushpin_klikitud);
    */
    
    map.entities.push(pushpin);
    
    
    var pushpin2 = new Microsoft.Maps.Pushpin(loss, {
        title: 'Alatskivi Loss',
        description: 'ilus loss'
    });

    map.entities.push(pushpin2);
    
}

/*
function pushpin_klikitud(e){
    if (e.target.metadata){
        infobox.setOptions({
            location = loss,
            title: e.target.metadata.title,
            description: e.target.metadata.description,
            visible: true
            
        });
    }
}
*/


//form2 - ei saanud seda õigesti tööle...

document.getElementById("form2").addEventListener("submit", kasutaja_sugu);

var e = document.getElementById("n2ita");
e.innerHTML = "Te olete: " ;

function kasutaja_sugu(event) {
    event.preventDefault();
    var sugu_mees = document.getElementById("r1").required;
    var sugu_naine = document.getElementById("r2").required;
    
    var sugu_valitud = " ";

    if (sugu_mees.checked == "true"){
        sugu_mees.value = 1;
        sugu_naine.value = 0;
        sugu_valitud = "mees";
    } else  {
        sugu_mees.value = 0;
        sugu_naine.value = 1;
        sugu_valitud = "naine";
    }

    e.innerHTML = "Te olete: " + sugu_valitud;

}
console.log("Valik on tehtud.");
        
    





// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

