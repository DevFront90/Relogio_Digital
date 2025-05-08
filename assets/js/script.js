//Pegando os elementos do html

const hoursEl = document.getElementById('hours');
const minsEl = document.getElementById('mins');
const secondsEl = document.getElementById('seconds');
const ampmEl = document.getElementById('ampm');

// Carrega o som do alarme

const alarmSound = new Audio('./assets/audio/alarm.mp3');

let alarmHour = null;
let alarmMinute = null;

// Função para atualizar o relógio

function updateClock() {
     // Pega a hora atual do sistema
    const now = new Date();

    // Pega as horas, minutos e segundos
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();
    let ampm = hours >= 12 ? "PM" : "AM";

    // Atualiza o HTML com os valores

    hoursEl.querySelector('h3').textContent = formatTime(hours);
    minsEl.querySelector('h3').textContent = formatTime(minutes);
    secondsEl.querySelector('h3').textContent = formatTime(seconds);
    ampmEl.querySelector('h3').textContent = ampm;

    if(alarmHour !== null && alarmMinute !== null) {
        if(hours === alarmHour && minutes === alarmMinute && seconds === 0) {
            //Toca o som
            alarmSound.play();

            Swal.fire({
                title: '⏰ Alarme!',
                text: 'Seu alarme disparou!',
                icon: 'success',
                confirmButtonText: 'OK',
                background: '#03152e',
                color: '#00ff00',
                confirmButtonColor: '#00ff00'
            }).then((result) => {
                if(result.isConfirmed) {
                    alarmSound.pause();
                    alarmSound.currentTime = 0;
                }
            });
            
            alarmHour = null;
            alarmMinute = null;
        }
    }
}

// Função para adicionar zero na frente se for menor que 10

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Atualiza o relógio a cada 1 segundo

setInterval(updateClock, 1000);


// Chama a função uma vez ao carregar a página
updateClock();


// Função para mostrar a data atual

function updateDate() {
    const dateElement = document.getElementById('date');
    const nowDate =  new Date();

    const dayOfweek = [
        'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira','Quinta-feira',
        'Sexta-feira', 'Sábado'
    ];
    
    const months = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    const dayName = dayOfweek[nowDate.getDay()];
    const dayNumber = nowDate.getDate();
    const  monthName = months[nowDate.getMonth()];
    const year = nowDate.getFullYear();

    dateElement.textContent = `${dayName},${dayNumber} de ${monthName} de ${year}`;
}

updateDate();




// Pega o botão e adiciona evento de clique

document.getElementById('setAlarm').addEventListener('click', () => {
   alarmHour = parseInt(document.getElementById('alarmHour').value);
   alarmMinute = parseInt(document.getElementById('alarmMinute').value);

   if(isNaN(alarmHour) || isNaN(alarmMinute)) {
    Swal.fire({
        title: '⚠️ Atenção!',
        text: 'Por favor, preencha a hora e o minuto corretamente!',
        icon: 'warning',
        confirmButtonText: 'OK',
        background: '#03152e',
        color: '#ffcc00',
        confirmButtonColor: '#ffcc00'
    });
   } else {
    Swal.fire({
        title: '✅ Alarme definido!',
        text: `Para ${alarmHour.toString().padStart(2, '0')}:${alarmMinute.toString().padStart(2, '0')}`,
        icon: 'success',
        confirmButtonText: 'OK',
        background: '#03152e',
        color: '#00ff00',
        confirmButtonColor: '#00ff00'
    });
   }
});

['click', 'touchstart'].forEach(event => {
    document.body.addEventListener(event, () => {
        alarmSound.play().then(() => {
            alarmSound.pause();
            alarmSound.currentTime = 0;
         }).catch((erro) => {
            console.log('Erro ao desbloquear áudio', erro);
         });
    }, {once: true});
});



