function getRenderContext(id_name) {
    const canvas = document.getElementById(id_name);
    const ctx = canvas.getContext('2d');
    return ctx
}

function drawThermometer({
    center=window.innerWidth/2,
    middle=window.innerHeight/2-window.innerHeight*.10,
    length=200,
    scale = 1.4 
}={}) {
    const ctx = getRenderContext('thermometer')
    const margin = 25*Math.SQRT2
    ctx.beginPath();
    ctx.moveTo(scale*margin+center, middle-length-margin);
    ctx.lineTo(scale*margin+center, scale*(middle+length-margin));
    ctx.arc(center, scale*(middle+length), scale*50, -Math.PI/4, Math.PI+Math.PI/4);
    ctx.lineTo(center-scale*margin, middle-length-margin);
    ctx.arc(center,middle-length-margin,scale*margin, Math.PI, 0)
    ctx.stroke()
}

function fillThermometer(percentage=.5, {
    center=window.innerWidth/2,
    middle=window.innerHeight/2-window.innerHeight*.10,
    length=200,
    scale = 1.4 
}={}) {
    const ctx = getRenderContext('thermometer')
    const margin = 25*Math.SQRT2
    ctx.fillStyle = '#D40000';
    const height = scale*(50+length+2*margin)
    function fillBulb(percentage){
        const bulbHeight = (1-percentage)*3*Math.PI/4
        ctx.beginPath();
        ctx.arc(center, scale*(middle+length), scale*50, -Math.PI/4+bulbHeight, Math.PI+Math.PI/4-bulbHeight);
        ctx.fill()
    }
    function fillShaft(percentage) {
        ctx.beginPath();
        const height = (scale*(middle+length-margin) - (middle-length-margin))
        const top = (middle-length-margin)+height*(1-percentage)
        ctx.moveTo(center+scale*margin, scale*(middle+length-margin));
        ctx.lineTo(center+scale*margin, top)  
        ctx.lineTo(center-scale*margin, top)
        ctx.lineTo(center-scale*margin, scale*(middle+length-margin));
        ctx.fill()
    }
    function fillTop(percentage) {
        ctx.beginPath()
        ctx.moveTo(scale*margin+center, middle-length-margin);
    }

    // fillBulb(percentage)
    // fillShaft(percentage)
    fillTop(percentage)
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
    thermo_ctx.save()
    drawThermometer()
    const x = {
        currentValue: 0,
        valueOf: function(){
            return this.currentValue += 0.001
        } 
    }
    // setInterval(()=>{
    //     fillThermometer(x)
    //     // drawThermometer()
    // }, 1)
    fillThermometer()
    
})()