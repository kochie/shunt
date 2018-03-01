function getRenderContext(id_name) {
    const canvas = document.getElementById(id_name);
    const ctx = canvas.getContext('2d');
    return ctx
}

function drawThermometer() {
    const ctx = getRenderContext('thermometer')
    ctx.fillStyle = 'rgb(200, 0, 0)';
        ctx.fillRect(10, 10, 50, 50);

        ctx.fillStyle = 'rgba(0, 0, 200, 0.5)';
        ctx.fillRect(30, 30, 50, 50);
}

function resize() {
    ['thermometer', 'shunt'].forEach(element => {
        document.getElementById(element).width = window.innerWidth
        document.getElementById(element).height = window.innerHeight
    })    
}

(function main() {
    resize() && (window.onresize = resize)
    const thermo_ctx = getRenderContext('thermometer')
    drawThermometer()
})()