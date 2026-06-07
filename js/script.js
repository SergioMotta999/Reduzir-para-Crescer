document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('calculator-form');
    
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const ageInput = document.getElementById('age').value;
            const hoursInput = document.getElementById('hours').value;
            const minutesInput = document.getElementById('minutes').value;

            const age = parseInt(ageInput);
            const hours = parseInt(hoursInput) || 0;
            const minutes = parseInt(minutesInput) || 0;

            const totalMinutes = (hours * 60) + minutes;
            
            let maxHours = 0;
            let idealText = "";

            if (age < 2) {
                maxHours = 0;
                idealText = "zero horas de tela";
            } else if (age >= 2 && age <= 4) {
                maxHours = 1;
                idealText = "até 1h por dia";
            } else {
                maxHours = 2;
                idealText = "até 2h por dia";
            }

            const maxMinutes = maxHours * 60;
            const isExceeding = totalMinutes > maxMinutes;

            let timeString = "";
            if (hours > 0) timeString += `${hours}h`;
            if (minutes > 0) timeString += (hours > 0 ? ` e ${minutes}min` : `${minutes}min`);
            if (totalMinutes === 0) timeString = "0h";

            let resultMessage = "";
            let title = "";
            let iconClass = "";

            if (isExceeding) {
                title = "Atenção ao tempo!";
                iconClass = "fa-solid fa-circle-exclamation text-brand-accent";
                resultMessage = `Seu filho está <strong>${timeString}</strong> por dia frente à tela. Para a idade de ${age} anos, o ideal é <strong>${idealText}</strong>. Considere equilibrar o tempo com atividades físicas e brincadeiras offline.`;
            } else {
                if (totalMinutes === 0 && age < 2) {
                    title = "Excelente!";
                    iconClass = "fa-solid fa-star text-brand-green";
                    resultMessage = `Parabéns! Crianças de ${age} anos não devem ter tempo de tela. Você está cuidando muito bem do desenvolvimento do seu filho.`;
                } else {
                    title = "Hábito Saudável!";
                    iconClass = "fa-solid fa-circle-check text-brand-green";
                    resultMessage = `Seu filho passa <strong>${timeString}</strong> por dia nas telas. Isso está dentro das recomendações da OMS para a idade de ${age} anos (${idealText}). Continue equilibrando com brincadeiras offline!`;
                }
            }

            document.getElementById('result-title').textContent = title;
            document.getElementById('result-message').innerHTML = resultMessage;
            document.getElementById('result-icon').className = iconClass;

            document.getElementById('empty-state').classList.add('hidden');
            const resultArea = document.getElementById('result-area');
            resultArea.classList.remove('hidden-result');
            
            resultArea.classList.remove('fade-in');
            void resultArea.offsetWidth;
            resultArea.classList.add('fade-in');
        });
    }
});

// Tornando a função de reset acessível globalmente
window.resetCalculator = function() {
    document.getElementById('calculator-form').reset();
    document.getElementById('result-area').classList.add('hidden-result');
    document.getElementById('empty-state').classList.remove('hidden');
    document.getElementById('age').focus();
}