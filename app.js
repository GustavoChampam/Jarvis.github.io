const btn = document.querySelector('.talk');
const content = document.querySelector('.content');

function speak(text) {
    const text_speak = new SpeechSynthesisUtterance(text);

    text_speak.rate = 1;
    text_speak.volume = 1;
    text_speak.pitch = 1;

    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    var day = new Date(); 
    var hour = day.getHours();

    if (hour >= 0 && hour < 12) {
        speak("Bom dia Senhor...");
    } else if (hour >= 12 && hour < 17) {
        speak("Boa tarde senhor...");
    } else {
        speak("Boa noite senhor...");
    }
}

window.addEventListener('load', () => {
    speak("Iniciando JARVIS...");
    wishMe();
});

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.onresult = (event) => {
    const currentIndex = event.resultIndex;
    const transcript = event.results[currentIndex][0].transcript;
    content.textContent = transcript;
    takeCommand(transcript.toLowerCase());
};

btn.addEventListener('click', () => {
    content.textContent = "Listening...";
    recognition.start();
});

function takeCommand(message) {
    if (message.includes('hey') || message.includes('hello')) {
        speak("Olá Senhor, Como posso te ajudar ?");
    } else if (message.includes("Abra o google")) {
        window.open("https://google.com", "_blank");
        speak("Abrindo Google...");
    } else if (message.includes("Abra youtube")) {
        window.open("https://youtube.com", "_blank");
        speak("Abrindo Youtube...");
    } else if (message.includes("Abra facebook")) {
        window.open("https://facebook.com", "_blank");
        speak("Abrindo Facebook...");
    } else if (message.includes('what is') || message.includes('who is') || message.includes('what are')) {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "This is what I found on the internet regarding " + message;
        speak(finalText);
    } else if (message.includes('wikipedia')) {
        window.open(`https://en.wikipedia.org/wiki/${message.replace("wikipedia", "").trim()}`, "_blank");
        const finalText = "This is what I found on Wikipedia regarding " + message;
        speak(finalText);
    } else if (message.includes('time')) {
        const time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        const finalText = "The current time is " + time;
        speak(finalText);
    } else if (message.includes('date')) {
        const date = new Date().toLocaleString(undefined, { month: "short", day: "numeric" });
        const finalText = "Today's date is " + date;
        speak(finalText);
    } else if (message.includes('calculator')) {
        window.open('Calculator:///');
        const finalText = "Opening Calculator";
        speak(finalText);
    } else if (message.includes('weather')) {
        getWeather();
    } else if (message.includes('news')) {
        getNews();
    } else if (message.includes('set reminder')) {
        setReminder(message);
    } else if (message.includes('play music')) {
        playMusic(message);
    } else {
        window.open(`https://www.google.com/search?q=${message.replace(" ", "+")}`, "_blank");
        const finalText = "I found some information for " + message + " on Google";
        speak(finalText);
    }
}

function getWeather() {
    // API call to a weather service to get current weather information
    const weatherInfo = "The current weather is sunny with a temperature of 25 degrees Celsius.";
    speak(weatherInfo);
}

function getNews() {
    // API call to a news service to get the latest news
    const newsInfo = "Here are the latest headlines: ...";
    speak(newsInfo);
}

function setReminder(message) {
    // Extract date and time from message and set a reminder
    const reminderInfo = "Reminder has been set.";
    speak(reminderInfo);
}

function playMusic(message) {
    // Integrate with a music streaming service to play music
    const musicInfo = "Tocando sua música favorita.";
    speak(musicInfo);
}
