
document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const calcularBtn = document.getElementById('calcular');
    const resultado = document.getElementById('resultado');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    function updateVisualization() {
        const alturaGeometrica = parseFloat(document.getElementById('alturaGeometrica').value) || 0;
        const alturaSuccao = parseFloat(document.getElementById('alturaSuccao').value) || 0;
        const temperaturaFluido = parseFloat(document.getElementById('temperaturaFluido').value) || 0;
        const unidadeTemperatura = document.getElementById('unidadeTemperatura').value;
        const densidadeFluido = parseFloat(document.getElementById('densidadeFluido').value) || 0;
        const pressaoFluido = parseFloat(document.getElementById('pressaoFluido').value) || 0;
        const perdaCargaSuccao = parseFloat(document.getElementById('perdaCargaSuccao').value) || 0;
        const perdaCargaBomba = parseFloat(document.getElementById('perdaCargaBomba').value) || 0;

        // Atualizar a visualização SVG
        const suctionPipe = document.getElementById('suctionPipe');
        const dischargePipe = document.getElementById('dischargePipe');
        const waterLevel = document.getElementById('waterLevel');

        // Ajustar a altura da sucção
        suctionPipe.setAttribute('y2', 300 - alturaSuccao * 2);
        
        // Ajustar a altura de descarga
        dischargePipe.setAttribute('d', `M180 180 Q400 ${180 - alturaGeometrica} 400 ${50 - alturaGeometrica} L700 ${50 - alturaGeometrica}`);

        // Ajustar o nível de água no reservatório
        waterLevel.setAttribute('y', 400 - alturaSuccao * 2);
        waterLevel.setAttribute('height', alturaSuccao * 2);

        // Atualizar textos informativos
        document.getElementById('altitudeText').textContent = `Altura Geométrica: ${alturaGeometrica}m`;
        document.getElementById('flowRateText').textContent = `Temperatura: ${temperaturaFluido}${unidadeTemperatura}`;
        document.getElementById('headText').textContent = `Densidade: ${densidadeFluido}kg/m³`;

        // Adicionar animação à bomba baseada na perda de carga
        const pump = document.getElementById('pump');
        const animationDuration = 2 - (perdaCargaBomba / 10); // Quanto maior a perda, mais lenta a animação
        pump.style.animation = `pumpAnimation ${animationDuration}s ease-in-out infinite`;
    }

    // Adicionar event listeners para os campos
    document.querySelectorAll('#parametros-basicos input, #parametros-basicos select').forEach(input => {
        input.addEventListener('input', updateVisualization);
    });

    calcularBtn.addEventListener('click', function () {
        const valores = {};
        
        document.querySelectorAll('input, select').forEach(input => {
            valores[input.id] = input.value;
        });

        let resultadoHTML = '<h2>Resultados do Sistema:</h2>';
        
        for (let [key, value] of Object.entries(valores)) {
            if (value) {
                const formattedKey = key.replace(/([A-Z])/g, ' $1').toLowerCase();
                resultadoHTML += `<p><strong>${formattedKey.charAt(0).toUpperCase() + formattedKey.slice(1)}:</strong> ${value}</p>`;
            }
        }

        resultado.innerHTML = resultadoHTML;
        resultado.style.display = 'block';
        
        resultado.scrollIntoView({ behavior: 'smooth' });

        updateVisualization();
    });

    // Adicionar validação de entrada
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', function() {
            if (this.value < 0) {
                this.value = 0;
            }
        });
    });

    // Adicionar efeitos de hover aos cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mouseover', () => {
            card.style.transform = 'scale(1.05)';
        });
        card.addEventListener('mouseout', () => {
            card.style.transform = 'scale(1)';
        });
    });

    // Chamar updateVisualization inicialmente para configurar a visualização
    updateVisualization();
});