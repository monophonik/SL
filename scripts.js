// function getRealTimeDepartures() {
//     const url = 'https://cors-anywhere.herokuapp.com/https://api.sl.se/api2/realtimedeparturesV4.json?key=f6d2a1fd4d7441d596c305f072497e8c&siteid=9192&timewindow=15'
//     fetch(url).then((resp) => resp.json()).then(function (data) {
//         //const resultArray = data.ResponseData.Metros;
//         document.getElementById("result").innerHTML = data.ResponseData.Metros;

//         //Använd map, for eller foreach på "data".

//     });
// }

//let result;

//let metroDep, busDep, trainDep, tramDep, shipDep;
let partialDepUrl = 'https://api.sl.se/api2/realtimedeparturesV4.json?key=f6d2a1fd4d7441d596c305f072497e8c&'
const resultDiv = document.getElementById("resultDiv");


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

function getDep() {
    getDepartures().catch(error => {
        console.log('Error!');
        console.error(error);

    });


}



//API URL builders

//SiteId som parameter - dvs ta bort 1002
function buildUrlSiteID() {
    let url = partialDepUrl + 'siteid=' + '1002' + '&timewindow=10';
    return url;
}



// Print

function print(dep) {
    
    const resultList = document.getElementById("resultList");

    let li = document.createElement('li'),
    spanLineNr = document.createElement('span'),
    spanDest = document.createElement('span'),
    spanCount = document.createElement('span');

    spanLineNr.innerHTML = dep.LineNumber;
    spanDest.innerHTML = dep.Destination;
    spanCount.innerHTML = dep.DisplayTime;
    li.appendChild(spanLineNr);
    li.appendChild(spanDest)
    li.appendChild(spanCount);
    resultList.appendChild(li);
    //resultDiv.appendChild(resultList);
    
}


function getDepartures2() {
    fetch(buildUrlSiteID())
        .then((resp) => resp.json())
        .then(function (data) {
            
            const resultList = document.getElementById("resultList");
            resultList.innerHTML = null;

            let result = data.ResponseData;
            console.log(result);

            let metroDep = result.Metros;
            console.log(metroDep);
            let busDep = result.Buses;
            console.log(busDep);
            // let trainDep = data.ResponseData.Trains;
            // let tramDep = data.ResponseData.Trams;
            // let shipDep = data.ResponseData.Ships;
    
            if(metroDep != null) {
                metroDep.map(function (dep) {
                    print(dep);
                })
            }
            
            if(busDep != null) {
                busDep.map(function (dep) {
                    print(dep);
                })
            }
            

        })
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