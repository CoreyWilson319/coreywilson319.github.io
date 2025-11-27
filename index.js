class DOM {
    constructor() {
        this.quotes = [new Audio("./resources/1.mp3"), new Audio("./resources/we-have-to-stand-on-our-own-2-feet.mp3"), new Audio("./resources/i-am-zero.mp3")]
        this.bubbleIntervals = []
        this.greeting1 = document.createElement("p")
        this.greeting2 = document.createElement("p")
        this.form = document.getElementById("name-form")
        this.user = localStorage.getItem("name")
        this.initialGreeting;
        this.characterPics = document.getElementsByClassName("character-pic")
        this.characterNames = document.getElementsByClassName("character-name")
        this.bubblesOn = false
        this.bubblesButton = document.getElementById("bubblesButton")
    }
    async fetchWeather() {
        const headers = new Headers();
        headers.append('Access-Control-Allow-Origin', '*')
        headers.append('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7')
        headers.append('User-Agent', 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Mobile Safari/537.36')
        const url = "https://api.open-meteo.com/v1/forecast?latitude=42.3314&longitude=-83.0457&models=gfs_seamless&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,precipitation,cloud_cover,relative_humidity_2m&timezone=America%2FNew_York&temperature_unit=fahrenheit"
        let response = await fetch(url, {
            "method": 'GET',
        })

        return await response.json()
    }
    makeBubbles() {
        let newInterval = setInterval(() => {
            for (let i = 0; i < 1; i++) {
            let newOrb = new Orb()
            newOrb.create()
            newOrb.animate()
            newOrb.pop()

        }
        }, 500)
        this.bubbleIntervals.push(newInterval)
}
    bubbleEventListener() {
        this.bubblesButton.addEventListener("click", ()=> {
            if (this.bubblesOn === true) {
                for(let i = 0; i < this.bubbleIntervals.length; i++) {
                    clearInterval(this.bubbleIntervals[i])
                }
                this.bubblesOn = false
                this.bubbleIntervals = []
                this.bubblesButton.innerText = "Click To start bubbles!"
            } else if (this.bubblesOn === false) {
                this.bubblesOn = true
                this.makeBubbles()
                this.bubblesButton.innerText = "Click to stop the bubbles."
            }
            
        })
    }

    characterEventListeners() {
        for (let i = 0; i < this.characterPics.length; i++) {
            this.characterPics[i].addEventListener("mouseover", ()=> {
                this.characterPics[i].style.height = 350+"px"
                this.characterPics[i].style.width = 350+"px"
                this.characterNames[i].style.fontSize = 50 + "px"
                this.characterPics[i].style.borderColor = "yellow";
                this.characterPics[i].style.borderWidth = "5px" 
            });
        this.characterPics[i].addEventListener("click", ()=> {
            this.quotes[i].play()});
        this.characterPics[i].addEventListener("mouseout", ()=> {
                this.characterPics[i].style.height = 250+"px"
                this.characterPics[i].style.width = 250+"px"
                this.characterNames[i].style.fontSize = 30 + "px"
                this.characterPics[i].style.borderColor = "black";
                this.characterPics[i].style.borderWidth = "1px"
        });
    }}

    initialGreeting() {
        // console.log(document.getElementsByTagName("title")[0].innerText)
        if (document.getElementsByTagName("title")[0].innerText === "C. Wilson Project") {
            this.initialGreeting = setInterval(() => {this.greeting1.innerText = `${!this.user ? "Anonymous" : this.user}  don't forget to work hard, study well and eat and sleep plenty. That's the Turtle Hermit way to learn. ${!localStorage.getItem("lasthere") ?  "This must be your first time, welcome!" : `The last time you were here was ${localStorage.getItem("lasthere")}` }`})
            this.greeting1.classList.add("greeting")
            document.getElementById("greetings").append(this.greeting1)
        }
    }

    formEventListeners(time) {
        if (document.getElementsByTagName("title")[0].innerText === "C. Wilson Project") {
        this.form.addEventListener("submit", async (event) => {
        clearInterval(this.initialGreeting)
        event.preventDefault()
        let weather = await this.fetchWeather()
        let userCheck = document.getElementById("name").value
        if (userCheck === "" && !localStorage.getItem("name")){
            this.user = "Anonymous"
        } else if (userCheck !== "" && !localStorage.getItem("name")) {
            this.user = userCheck
            localStorage.setItem("name", this.user)
        } else if (localStorage.getItem("name") == "") {
            this.user = localStorage.getItem("name")
        }

        let weatherCodes = {
            0: "clear skies",
            1: "mainly clear",
            2: "partly cloudy",
            3: "overcast",
            45: "fog",
            48: "depositing rime fog",
            51: "lightly drizzling",
            53: "moderately drizzling",
            55: "heavy drizzling",
            56: "light freezing drizzling", 
            57: "heavily freezing drizzling",
            61: "raining slightly",
            63: "moderately raining",
            65: "heavily raining",
            66: "lightly freezing raining",
            67: "heavyily freezing raining",
            71: "slightly snowing",
            73: "moderately snowing",
            75: "heavily snowing",
            76: "snow grains",
            80: "slight rain showers",
            81: "moderate rain showers",
            82: "heavy rain showers",
            85: "slight snow showers",
            86: "heavy snow showers",
            95: "slight or moderate thunderstorms",
            96: "thunderstorms with slight hail",
            99: "thunderstorms with heavy hail"
        }

        setInterval(() => {this.greeting1.innerText = `${time.greetingMessage} ${this.user} it is ${time.currentTime} don't forget to work hard, study well and eat and sleep plenty. That's the Turtle Hermit way to learn.`})
        this.greeting1.classList.add("greeting")
        this.greeting2.innerText = `Today is ${time.fullDate} the current temperature is ${weather.current.temperature_2m}${weather.current_units.temperature_2m} and the current weather forecast is ${weatherCodes[weather.current.weather_code]} with ${parseInt(weather.current.wind_speed_10m * 0.621371)} mph winds.`
        this.greeting2.classList.add("greeting")
        let greetingParent = document.getElementById("greetings")
        greetingParent.append(this.greeting1, this.greeting2)
    })}
    }
    getUser() {
    this.user = localStorage.getItem("name")
    return this.user
    }

}

class Clock {
    constructor() {
        this.date = new Date()
        this.hour = this.date.getHours()
        this.minutes = this.date.getMinutes()
        this.seconds = this.date.getSeconds()
        this.amPM;
        this.month = this.date.getMonth() + 1
        this.day = this.date.getDate()
        this.year = this.date.getFullYear()
        this.currentTime = this.get_time()
        this.fullDate = `${this.month}/${this.day}/${this.year}`
        this.greetingMessage;
    }
    set_time() {
        setInterval(() => {
            this.date = new Date()
        }, 1000)
    }

    get_time() {
        this.set_time()
        if (this.date.getHours() > 12) {
            this.hours = this.date.getHours() - 12
        } else {this.hours = this.date.getHours()}
        if (this.date.getMinutes() < 10) {
            this.minutes = "0"+this.date.getMinutes().toString()
        } else {this.minutes = this.date.getMinutes()}
        if (this.date.getSeconds() < 10) {
            this.seconds = "0"+this.date.getSeconds().toString()
        } else {this.seconds = this.date.getSeconds()}

        if (this.hour >= 12 && this.hour < 18) {
            this.amPM = "PM"
            this.greetingMessage = "Good Afternoon "
                } else if (this.hour < 12) {
            this.amPM = "AM"
            this.greetingMessage = "Good Morning"
        } else if (this.hour >= 18) {
            this.amPM = "PM"
            this.greetingMessage = "Good Evening"
        }
        this.currentTime = `${this.hour}:${this.minutes}:${this.seconds}${this.amPM}`
        return this.currentTime
        }

    

}

class Orb {
    constructor() {
        this.body = document.getElementsByTagName("body")
        this.backgroundOrb = document.createElement("div")
        this.radius = 160
        this.x = Math.floor(Math.random() * this.body[0].scrollWidth) - this.radius
        this.y =  Math.floor(Math.random() * this.body[0].scrollHeight) - this.radius
        this.xspeed = 1;
        this.yspeed = 1;
        this.animationID;
    }
    create = () => {
        this.backgroundOrb.setAttribute("class", "orb")
        this.backgroundOrb.style.backgroundColor = "#ADD8E6"
        this.body[0].append(this.backgroundOrb)
        this.backgroundOrb.style.left = this.x+"px"
        this.backgroundOrb.style.top = this.y+"px"
        // this.backgroundOrb.addEventListener("click", () =>{
        // })

    }
    animate = () => {
        this.x += this.xspeed
        this.y += this.yspeed
        this.backgroundOrb.style.left = this.x + "px"
        this.backgroundOrb.style.top = this.y + "px"

        // Colision detection
        if (this.y + this.radius > this.body[0].scrollHeight || this.y - this.radius < 0)
        {
            this.yspeed = -this.yspeed
        } 
        if (this.x + this.radius > this.body[0].scrollWidth || this.x - this.radius < 0)
        {
            this.xspeed = -this.xspeed
        }         

        this.animationID = requestAnimationFrame(this.animate)
    }
    pop = () => {
        this.backgroundOrb.addEventListener("click", () => {
            this.backgroundOrb.classList.add("puff-out-center")
            setInterval(() => this.backgroundOrb.remove(), 3000)
        })
        setInterval(() => {
            this.backgroundOrb.classList.add('puff-out-center')
        }, 5000)
        setInterval(() => this.backgroundOrb.remove(), 7000)
        setInterval(() => cancelAnimationFrame(this.animationID),  8000)


        


}
}

let todaysDate = new Date()
let time = new Clock
let website = new DOM()
// website.makeBubbles() // Good
website.characterEventListeners() // Good
website.initialGreeting() // Good
website.formEventListeners(time) // Good
website.bubbleEventListener() // Good
setInterval(() => time.get_time(), 1000) // Update Timer every second

window.onbeforeunload = () => {
    if (localStorage.getItem("name")) {
        localStorage.setItem("lasthere", time.currentTime)
    }
}

    // To Do

    // Update weather to use weather codes