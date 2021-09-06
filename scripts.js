

//let metroDep, busDep, trainDep, tramDep, shipDep;

//let partialDepUrl = 'https://api.sl.se/api2/realtimedeparturesV4.json?key=f6d2a1fd4d7441d596c305f072497e8c&'
let siteId;
let stationName;
let timeWindow = '10';
let metroShow, busShow, trainShow, tramShow, distance, searchInput;

//const stationList = siteIdList.json;
//console.log(stationList);
const realTimeKey = 'f6d2a1fd4d7441d596c305f072497e8c';
const searchSiteKey = '9a0e6f17b01c4f019cde70e0db5feed5'; 


//API URL builders

function buildUrlSiteID() {
    let url = `https://api.sl.se/api2/realtimedeparturesV4.json?key=${realTimeKey}&siteid=${siteId}&timewindow=${timeWindow}`;
    return url;
}

function buildUrlSearch() {
    let url = `https://api.sl.se/api2/typeahead.json?key=${searchSiteKey}&searchstring=${searchInput}&stationsonly=true&maxresults=1`;
    return url;
}



// Print

function print3(dep) {

    //const resultList = document.createElement('ul')

    let li = document.createElement('li'),
    spanLineNr = document.createElement('span'),
    spanDest = document.createElement('span'),
    spanCount = document.createElement('span');
    spanTotalTime = document.createElement('span')

    
    spanLineNr.innerHTML = dep.LineNumber;
    spanDest.innerHTML = dep.Destination;
    spanCount.innerHTML = dep.DisplayTime;

    //Behöver ordna med DateTimeNow för att räkna ut exakt hur lång tid det är kvar
    if(dep.DisplayTime != 'Nu') {
        
    }
    else {
        spanTotalTime.innerHTML = dep.DisplayTime + distance;
    }
    
    li.appendChild(spanLineNr);
    li.appendChild(spanDest)
    li.appendChild(spanCount);
    //li.appendChild(spanTotalTime);
    
    return li;
}

function setLegend() {
    let legend = document.createElement('li');
    let line = document.createElement('span');
    let destination = document.createElement('span');
    let count = document.createElement('span');
    let totalCount = document.createElement('span');

    line.innerHTML = "Linje";
    destination.innerHTML = "Åker mot";
    count.innerHTML = "Går om";
    totalCount.innerHTML = "Din tid";

    legend.setAttribute("class", "legend");

    legend.appendChild(line);
    legend.appendChild(destination);
    legend.appendChild(count);
    legend.appendChild(totalCount);

    return legend;
}


//Get departures

function getDepartures3() {
    fetch(buildUrlSiteID())
        .then((resp) => resp.json())
        .then(function (data) {

            const metroUl = document.getElementById("metroUl");
            const busUl = document.getElementById("busUl"); 
            const resultDiv = document.getElementById("resultDiv");
            console.log(resultDiv);

            if(metroUl.hasChildNodes) {
                metroUl.innerHTML = '';
            }

            if(busUl.hasChildNodes) {
                busUl.innerHTML = '';
            }

            // let ul = document.createElement('ul');
            // ul.setAttribute('id', 'resultList')

            //Funkar update???? Använda GetDepartures3 eller UpdateDep?
            resultDiv.setAttribute('onload', setInterval('UpdateDep()', 30000))
            //resultDiv.appendChild(ul)
            let result = data.ResponseData;
            console.log(result);

            let metroDep = result.Metros;
            console.log(metroDep);
            let busDep = result.Buses;
            console.log(busDep);
            // let trainDep = data.ResponseData.Trains;
            // let tramDep = data.ResponseData.Trams;
            // let shipDep = data.ResponseData.Ships;
    
            if(metroDep.length != 0 && metroShow === true) {
                let metroBanner = document.getElementById('metroBanner');
                metroBanner.innerHTML = `Tunnelbana från ${stationName}`;
                metroBanner.removeAttribute('hidden');
                
                metroUl.appendChild(setLegend());
                
                metroDep.map(function (dep) {
                    
                    metroUl.appendChild(print3(dep));

                })

            }
            else {
                document.getElementById('metroBanner').setAttribute('hidden', 'true');
            }
            
            if(busDep.length != 0 && busShow === true) {
                let busBanner = document.getElementById('busBanner')
                busBanner.innerHTML = `Buss från ${stationName}`;
                busBanner.removeAttribute('hidden');

                busUl.appendChild(setLegend());
                    
                busDep.map(function (dep) {
                    
                    busUl.appendChild(print3(dep));

                })

            }
            else {
                document.getElementById('busBanner').setAttribute('hidden', 'true');
            }
        
        
        })

    
}


async function handleForm() {

    let searchElement = document.getElementById('depInput');
    searchInput = searchElement.value;
    console.log(searchInput);
    searchElement.value = null;

    if(document.getElementById("metroBox").checked == true) {
        metroShow = true;
        console.log(metroShow);
    }
    else {
        metroShow = false;
        console.log(metroShow);
    }

    if(document.getElementById("busBox").checked == true) {
        busShow = true;
    }
    else {
        busShow = false;
    }

    distance = document.getElementById("dist").value;
    console.log(distance);

    if(searchInput != null) {

        console.log(searchInput);

        let stationGet = await this.getApi(buildUrlSearch());
        let station = stationGet.ResponseData;

        console.log('station!!!')
        console.log(station);
        // let station = stationList.find(x => x.Name == searchInput);
        // console.log(station);

        station.map(function (stat) {
            siteId = stat.SiteId;
            console.log(siteId);
            stationName = stat.Name;
            console.log(stationName);
        })


        // fetch(buildUrlSearch())
        // .then((resp) => resp.json())
        // .then(function (data) {
            
        //     let station = data.ResponseData;
        //     console.log('station!!!')
        //     console.log(station);
        //     // let station = stationList.find(x => x.Name == searchInput);
        //     // console.log(station);

        //     station.map(function (stat) {
        //         siteId = stat.SiteId;
        //         console.log(siteId);
        //         stationName = stat.Name;
        //         console.log(stationName);
        //     })
            
        // })


    }

    // metroShow = document.getElementById("metroBox").getAttribute("checked");
    // console.log(metroShow);
     
    getDepartures3();
    
}

async function getApi(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {return data});
}

async function getApiSearch(url) {
    return fetch(url)
        .then((response) => response.json())
        .then((data) => {return data});
}



function updateDep() {

    fetch(buildUrlSiteID())
        .then((resp) => resp.json())
        .then(function (data) {

            const resultDiv = document.getElementById("resultDiv");
            const metroDiv = document.getElementById("metroDiv");
            const busDiv = document.getElementById("busDiv");
            
            if(resultDiv.hasChildNodes()) {

                let resultList = document.getElementById('resultList');
                resultList.innerHTML = '';
                let result = data.ResponseData;
                console.log(result);

                let metroDep = result.Metros;
                console.log(metroDep);
                let busDep = result.Buses;
                console.log(busDep);
                // let trainDep = data.ResponseData.Trains;
                // let tramDep = data.ResponseData.Trams;
                // let shipDep = data.ResponseData.Ships;
        
                if(metroDep.length != 0) {
                    metroDep.map(function (dep) {
                        
                        resultDiv.appendChild(print3(dep));

                    })
                }
                
                if(busDep.length != 0) {
                    busDep.map(function (dep) {

                        resultDiv.appendChild(print3(dep));
                        
                    })
                }
                
            }

        
        })

    
}


function updateDist() {
    let distRange = document.getElementById('dist');
    let distLabel = document.getElementById('distMin');

    distLabel.innerHTML = distRange.value;
}




//Async functions

//Stoppa avgångshållplats i parametern

// async function getDepartures() {
//     let response = await fetch(buildUrlSiteID());
//     result = await response.json();
//     console.log(result);
    

    // let users = data.results;
    //             users.map(function (user) {
    //                 let li = createNode('li'),
    //                     img = createNode('img'),
    //                     span = createNode('span');
    //                 img.src = user.picture.medium;
    //                 span.innerHTML = user.name.first + " " + user.name.last;
    //                 append(li, img);
    //                 append(li, span);
    //                 append(ul, li);
    //             })

    //document.getElementById("resultDiv").innerHTML = result.ResponseData.Metros;
// }

//Saftey
// async function getDepartures() {
//     const response = await fetch('https://api.sl.se/api2/realtimedeparturesV4.json?key=f6d2a1fd4d7441d596c305f072497e8c&siteid=9192&timewindow=15');
//     const result = await response.json();
//     document.getElementById("resultDiv").innerHTML = result.ResponseData.Metros;
// }

// function getRealTimeDepartures() {
//     const url = 'https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.json?key=f6d2a1fd4d7441d596c305f072497e8c&siteid=9192&timewindow=15'
//     fetch(url).then((resp) => resp.json()).then(function (data) {
//         //const resultArray = data.ResponseData.Metros;
//         document.getElementById("result").innerHTML = data.ResponseData.Metros;

//         //Använd map, for eller foreach på "data".

//     });
// }

//let result;

// function getDep() {
//     getDepartures().catch(error => {
//         console.log('Error!');
//         console.error(error);
//     });
// }

// function createNode(element) {
//     return document.createElement(element);
// }

// function append(parent, el) {
//     return parent.appendChild(el);
// }

// function getDep() {
//     getDepartures().catch(error => {
//         console.log('Error!');
//         console.error(error);

//     });


// }


// function getDepartures2() {
//     fetch(buildUrlSiteID())
//         .then((resp) => resp.json())
//         .then(function (data) {

//             const resultDiv = document.getElementById("resultDiv");
            
//             //const resultList = document.getElementById("resultList");
            
//             if(resultDiv.hasChildNodes()) {
                
//                 resultDiv.removeChild(resultDiv.firstChild);

//                 let result = data.ResponseData;
//                 console.log(result);

//                 let metroDep = result.Metros;
//                 console.log(metroDep);
//                 let busDep = result.Buses;
//                 console.log(busDep);
//                 // let trainDep = data.ResponseData.Trains;
//                 // let tramDep = data.ResponseData.Trams;
//                 // let shipDep = data.ResponseData.Ships;
        
//                 if(metroDep != null) {
//                     metroDep.map(function (dep) {
//                         print(dep);
//                     })
//                 }
                
//                 if(busDep != null) {
//                     busDep.map(function (dep) {
//                         print(dep);
//                     })
//             }
//             }
            

//         })
// }

// function print(dep) {
    
//     const resultDiv = document.getElementById("resultDiv");

//     let ul = document.createElement('ul'),
//     li = document.createElement('li'),
//     spanLineNr = document.createElement('span'),
//     spanDest = document.createElement('span'),
//     spanCount = document.createElement('span');

//     ul.setAttribute("onload", "setInterval('getDepartures2', 30000)")
//     spanLineNr.innerHTML = dep.LineNumber;
//     spanDest.innerHTML = dep.Destination;
//     spanCount.innerHTML = dep.DisplayTime;
//     li.appendChild(spanLineNr);
//     li.appendChild(spanDest)
//     li.appendChild(spanCount);
//     ul.appendChild(li);
//     resultDiv.appendChild(ul);
// }

// function print2(dep) {
    
//     const resultList = document.getElementById("resultList");

//     let li = document.createElement('li'),
//     spanLineNr = document.createElement('span'),
//     spanDest = document.createElement('span'),
//     spanCount = document.createElement('span');

    
//     spanLineNr.innerHTML = dep.LineNumber;
//     spanDest.innerHTML = dep.Destination;
//     spanCount.innerHTML = dep.DisplayTime;
//     li.appendChild(spanLineNr);
//     li.appendChild(spanDest)
//     li.appendChild(spanCount);
//     resultList.appendChild(li);
//     return resultList;
// }