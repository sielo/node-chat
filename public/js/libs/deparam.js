/// Funkcja zamienia listę parametrów z URL na obiekt z nazwami i wartościami:
/// window.location.search = "?name=233223&room=eweweew"
/// zostanie zwrócone:
/// {name: "233223", room: "eweweew"}

var deparam = function (uri) {
    if (uri === undefined) {
        uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
        new RegExp(
            "([^?=&]+)(=([^&#]*))?", "g"),
        function ($0, $1, $2, $3) {
            queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
        }
    );
    return queryString;
};