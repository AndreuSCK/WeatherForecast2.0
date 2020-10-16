// 'use strict';
const weatherURL = 'http://api.openweathermap.org/data/2.5/';




const getWeather = async (props) => {
    const country = "es";
    const apiKey = "84dbcf8c3480649bce9d4bb58da44b4e";
    if (props === "city") {
        let cityForm = document.querySelector("#cityForm").value
        fetch(weatherURL + `forecast?q=${cityForm},${country}&APPID=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => dataFilter(data))
            .catch(error => console.log(error))
        document.querySelector("#cityForm").value = ""
        // return cityWeather
    } else if (props === "zipcode") {
        let zipForm = document.querySelector("#zipcodeForm").value

        fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${zipForm},${country}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => dataFilter(data))
            .catch(error => console.log(error))
        document.querySelector("#zipcodeForm").value = ""
    }

    // console.log(weather)

}

const dataFilter = (data) => {
    // console.log(data)

    weatherData = {
        date: data.list[0].dt_txt,

        // City
        city: data.city.name,
        // Current
        temperatureNow: data.list[0].main.temp,
        conditionsID: data.list[0].weather[0].main,
        currentDT: data.list[0].dt,
        currentDTtxt: data.list[0].dt_txt,
        conditionsToday: data.list[0].weather[0].description,
        humedadToday: data.list[0].main.humidity,
        tempMaxToday: data.list[0].main.temp_max,
        tempMinToday: data.list[0].main.temp_min,
        windToday: data.list[0].wind.speed,



        // Tomorrow
        conditionsIDfuture1: data.list[7].weather[0].main,
        currentDTtxtfuture1: data.list[7].dt_txt,
        currentDTfuture1: data.list[7].dt,
        tempMaxFuture1: data.list[7].main.temp_max,
        tempMinFuture1: data.list[7].main.temp_min,


        // Past tomorrow
        conditionsIDfuture2: data.list[15].weather[0].main,
        currentDTtxtfuture2: data.list[15].dt_txt,
        currentDTfuture2: data.list[15].dt,
        tempMaxFuture2: data.list[15].main.temp_max,
        tempMinFuture2: data.list[15].main.temp_min,


        // Past past tomorrow
        conditionsIDfuture3: data.list[23].weather[0].main,
        currentDTtxtfuture3: data.list[23].dt_txt,
        currentDTfuture3: data.list[23].dt,
        tempMaxFuture3: data.list[23].main.temp_max,
        tempMinFuture3: data.list[23].main.temp_min,


    }
    console.log(weatherData)

    updateUI(weatherData)
}


const updateUI = (weatherData) => {
    document.querySelector('#formSection').style.display = 'none'
    document.querySelector('#singleSection').style.display = 'grid'
    document.querySelector('#singleSectionTri').style.display = 'grid'
    document.querySelector('#singleSectiontriImg').style.display = 'flex'
    document.querySelector('#singleSectionFuture').style.display = 'flex'


    let hour = (Number(weatherData.currentDTtxt.split(" ")[1].split(":")[0]))
    let hourFuture1 = (Number(weatherData.currentDTtxtfuture1.split(" ")[1].split(":")[0]))
    let hourFuture2 = (Number(weatherData.currentDTtxtfuture2.split(" ")[1].split(":")[0]))
    let hourFuture3 = (Number(weatherData.currentDTtxtfuture3.split(" ")[1].split(":")[0]))




    let dayNight = hour > 7 && hour < 20 ? true : false
    let dayNightFuture1 = hourFuture1 > 7 && hourFuture1 < 20 ? true : false
    let dayNightFuture2 = hourFuture2 > 7 && hourFuture2 < 20 ? true : false
    let dayNightFuture3 = hourFuture3 > 7 && hourFuture3 < 20 ? true : false




    console.log(weatherData)
    let currentIMG = currentImgFunction(weatherData.conditionID, dayNight)


    console.log(weatherData.city)


    currentDay(weatherData.currentDT)

    document.querySelector('#formSection')
    let img = document.createElement('img')
    img.src = `../img/${currentIMG}.png`
    document.getElementById('imgContainer').appendChild(img)

    // let text = document.createElement('p')
    // text.innerText = `${weatherData.city}`
    // document.getElementById('singleCity').appendChild(text)

    document.getElementById('singleCity').innerText = `${weatherData.city}`;
    document.querySelector('#singleTemperatura').innerText = `${weatherData.temperatureNow}ºC`
    document.querySelector('#singleDescripcion').innerText = `${weatherData.conditionsToday}`
    // document.querySelector('#singleDayWeek').innerText = `${dayName}`
    console.log(weatherData.conditionsToday)
    document.querySelector('#singleTri1Info').innerText = `${weatherData.humedadToday}%`
    document.querySelector('#singleTri2Info').innerText = `${weatherData.tempMaxToday}º ${weatherData.tempMinToday}º`
    document.querySelector('#singleTri3Info').innerText = `${weatherData.windToday}`

    let future1Img = currentImgFunction(weatherData.conditionsIDfuture1, dayNightFuture1)
    let future2Img = currentImgFunction(weatherData.conditionsIDfuture2, dayNightFuture2)
    let future3Img = currentImgFunction(weatherData.conditionsIDfuture3, dayNightFuture3)
    console.log("aaa" + weatherData.conditionsIDfuture3, dayNightFuture3)
    let img1 = document.createElement('img')
    let img2 = document.createElement('img')
    let img3 = document.createElement('img')
    img1.src = `../img/${future1Img}.png`
    img2.src = `../img/${future2Img}.png`
    img3.src = `../img/${future3Img}.png`



    img.classList.add("images")
    img1.classList.add("image1")
    img2.classList.add("image2")
    img3.classList.add("image3")


    document.getElementById('future1img').appendChild(img1)
    document.getElementById('future2img').appendChild(img2)
    document.getElementById('future3img').appendChild(img3)

    let dayFuture1 = currentDay(weatherData.currentDTfuture1)
    let dayFuture2 = currentDay(weatherData.currentDTfuture2)
    let dayFuture3 = currentDay(weatherData.currentDTfuture3)

    document.querySelector('#futureDays1').innerText = `${dayFuture1}`
    document.querySelector('#futureDays2').innerText = `${dayFuture2}`
    document.querySelector('#futureDays3').innerText = `${dayFuture3}`


    document.querySelector('#futureTemp1').innerText = `${weatherData.tempMinFuture1}º`
    document.querySelector('#futureTemp2').innerText = `${weatherData.tempMinFuture2}º`
    document.querySelector('#futureTemp3').innerText = `${weatherData.tempMinFuture3}º`


}

const currentDay = (currentDT) => {
    var allDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    var dateTime = new Date(currentDT * 1000)
    var dayName = allDays[dateTime.getDay()]
    return dayName
}
const currentImgFunction = (condition, dayorNight) => {
    let currentIMG
    let daynight = dayorNight
    if (condition === "Clear" && daynight) {
        currentIMG = "Clear"
    } else if (condition === "Clear" && daynight === false) {
        currentIMG = "ClearNight"
    } else if (condition === "Clouds" && daynight) {
        currentIMG = "Clouds"
    } else if (condition === "Clouds" && daynight === false) {
        currentIMG = "CloudsNight"
    } else if (condition === "Rain" && daynight || condition === "Drizzle" && daynight) {
        currentIMG = "Rain"
    } else if (condition === "Rain" && daynight === false || condition === "Drizzle" && daynight === false) {
        currentIMG = "RainNight"
    } else if (condition === "Atmosphere") {
        currentIMG = "Atmosphere"
    } else if (condition === "Snow") {
        currentIMG = "Snow"
    } else if (condition === "Thunderstorm") {
        currentIMG = "Thunderstorm"
    } else {
        currentIMG = "Clouds"
    }
    console.log(condition, daynight)
    return currentIMG
}
const reload = () => {

    document.querySelector('#formSection').style.display = 'block'
    document.querySelector('#singleSection').style.display = 'none'
    document.querySelector('#singleSectionTri').style.display = 'none'
    document.querySelector('#singleSectiontriImg').style.display = 'none'
    document.querySelector('#singleSectionFuture').style.display = 'none'

    let elem = document.querySelector('.images');
    elem.parentNode.removeChild(elem);
    let elem1 = document.querySelector('.image1');
    elem1.parentNode.removeChild(elem1);
    let elem2 = document.querySelector('.image2');
    elem2.parentNode.removeChild(elem2);
    let elem3 = document.querySelector('.image3');
    elem3.parentNode.removeChild(elem3);

    // let images = document.getElementsByClassName("images")
    // document.getElementsByClassName("images").remove()
    // images.remove()

}


window.addEventListener('load', async (event) => {
    let menu = false
    let menuLogin = false
    let signupS = false
    // document.querySelector('#singleSection').style.display = 'none'
    // document.querySelector('#singleSectionTri').style.display = 'none'
    let formS
    let singleS
    let singleStri
    let singleStriImg
    let singleSectionFuture

    let loginS
    if (document.querySelector('#search')) {
        document.querySelector('#search').addEventListener('click', (e) => {
            e.preventDefault()
            reload()
        })
    }
    if (document.querySelector('#menu')) {
        document.querySelector('#menu').addEventListener('click', (e) => {
            e.preventDefault()

            if (menu === false) {
                formS = document.querySelector('#formSection').style.display
                singleS = document.querySelector('#singleSection').style.display
                singleStri = document.querySelector('#singleSectionTri').style.display
                singleStriImg = document.querySelector('#singleSectiontriImg').style.display
                singleSectionFuture = document.querySelector('#singleSectionFuture').style.display
                menu = true
                document.querySelector('#formSection').style.display = 'none'
                document.querySelector('#singleSection').style.display = 'none'
                document.querySelector('#singleSectionTri').style.display = 'none'
                document.querySelector('#singleSectiontriImg').style.display = 'none'
                document.querySelector('#singleSectionFuture').style.display = 'none'

                document.querySelector('#menuSection').style.display = 'flex'
            } else {
                menu = false
                document.querySelector('#formSection').style.display = formS
                document.querySelector('#singleSection').style.display = singleS
                document.querySelector('#singleSectionTri').style.display = singleStri
                document.querySelector('#singleSectiontriImg').style.display = singleStriImg
                document.querySelector('#singleSectionFuture').style.display = singleSectionFuture

                document.querySelector('#menuSection').style.display = 'none'
            }

        })
    }
    if (document.querySelector('#menuLogin')) {
        document.querySelector('#menuLogin').addEventListener('click', (e) => {
            e.preventDefault()

            if (menu === false) {
                menu = true
                loginS = document.querySelector('#loginSection').style.display

                document.querySelector('#loginSection').style.display = 'none'
                document.querySelector('#menuSection').style.display = 'flex'
            } else {
                menu = false
                document.querySelector('#loginSection').style.display = loginS
                document.querySelector('#menuSection').style.display = 'none'
            }

        })
    }
    if (document.querySelector('#signupSection')) {
        document.querySelector('#menuSignup').addEventListener('click', (e) => {
            e.preventDefault()

            if (menu === false) {
                menu = true
                signupS = document.querySelector('#signupSection').style.display

                document.querySelector('#signupSection').style.display = 'none'
                document.querySelector('#menuSection').style.display = 'flex'
            } else {
                menu = false
                document.querySelector('#signupSection').style.display = signupS
                document.querySelector('#menuSection').style.display = 'none'
            }

        })
    }


    if (document.querySelector('#citySend')) {
        document.querySelector('#citySend').addEventListener('click', (e) => {
            e.preventDefault()
            getWeather("city")
        })
    }
    if (document.querySelector('#zipcodeSend')) {
        document.querySelector('#zipcodeSend').addEventListener('click', (e) => {
            e.preventDefault()

            getWeather("zipcode")
        })
    }

    // const weather = await getWeather()
    // dataFilter(weather)


})