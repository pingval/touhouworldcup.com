let language = "en-GB";

function getCookie(name) {
    const decodedCookies = decodeURIComponent(document.cookie);
    let cookieArray = decodedCookies.split(';');
    name += '=';

    for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(name) === 0) {
            try {
                return JSON.parse(cookie.substring(name.length, cookie.length));
            } catch (err) {
                return JSON.parse("\"" + cookie.substring(name.length, cookie.length) + "\"");
            }
        }
    }

    return "";
}

function showResults(event) {
    const spoilerOl = document.getElementById("spoiler_ol");
    const results = document.getElementsByClassName("spoiler");
    document.getElementById(event.target.id).style.display = "none";
    document.getElementById(event.target.id.replace("show", "hide")).style.display = "inline";

    if (spoilerOl) {
        spoilerOl.style.display = "block";
    }

    for (const result of results) {
        if (result.tagName == "P") {
            result.style.display = "block";
        } else {
            result.style.display = "table-cell";
        }
    }
}

function hideResults(event) {
    const spoilerOl = document.getElementById("spoiler_ol");
    const results = document.getElementsByClassName("spoiler");
    document.getElementById(event.target.id).style.display = "none";
    document.getElementById(event.target.id.replace("hide", "show")).style.display = "inline";

    if (spoilerOl) {
        spoilerOl.style.display = "none";
    }

    for (const result of results) {
        result.style.display = "none";
    }
}

function getClientTimeZone() {
    return "UTC" + new Date().toString().split("GMT")[1];
}

function toDateString(dateTime) {
    const date = new Date(dateTime);
    return date.toLocaleString(language, {"dateStyle": "full"}) + ", " + date.toLocaleTimeString(language);
}

function convertDateTimes(year) {
    const loop = true;
    let index = 0;

    while (loop) {
        const dateElement = document.getElementById(`date_${year}_${index}`);

        if (!dateElement) {
            break;
        }

        const dateString = toDateString(dateElement.innerHTML + " UTC");
        dateElement.innerHTML = `<td class='noborders'>${dateString}</td>`;
        index++;
    }
}

function init() {
    if (getCookie("lang") == "en_US") {
        language = "en-US";
    } else if (getCookie("lang") == "ja_JP") {
        language = "ja-JP";
    } else if (getCookie("lang") == "zh_CN") {
        language = "zh-CN";
    } else if (getCookie("lang") == "ru_RU") {
        language = "ru-RU";
    } else if (getCookie("lang") == "de_DE") {
        language = "de-DE";
    } else if (getCookie("lang") == "es_ES") {
        language = "es-ES";
    }

    const showButton = document.getElementById("show_results");
    const hideButton = document.getElementById("hide_results");

    if (showButton) {
        showButton.addEventListener("click", showResults, false);
        hideButton.addEventListener("click", hideResults, false);
        showButton.style.display = "inline";
    }
    
    document.getElementById("timezone").innerHTML = getClientTimeZone();

    if (location.pathname == "/schedule") {
        convertDateTimes("/json/schedule.json");
    } else {
        convertDateTimes("2023");
        convertDateTimes("2022");
        convertDateTimes("2021");
        convertDateTimes("2020");
    }
}

window.addEventListener("DOMContentLoaded", init, false);
