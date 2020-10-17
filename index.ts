const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3 
const strokeFactor : number = 90 
const sizeFactor : number = 9.9 
const backColor : string = "#BDBDBD"
const delay : number = 20 
const flagHFactor : number = 1.6
const colors : Array<string> = [
    "#F44336",
    "#3F51B5",
    "#2196F3",
    "#009688",
    "#FF9800"
]

class ScaleUtil {

    static maxScale(scale : number, i : number, n : number) : number {
        return Math.max(0, scale - i / n)
    }

    static divideScale(scale : number, i : number, n : number) : number {
        return Math.min(1 / n, ScaleUtil.maxScale(scale, i, n)) * n 
    }

    static sinify(scale : number) : number {
        return Math.sin(scale * Math.PI)
    }
}

class DrawingUtil {

    static drawLine(context : CanvasRenderingContext2D, x1 : number, y1 : number, x2 : number, y2 : number) {
        context.beginPath()
        context.moveTo(x1, y1)
        context.lineTo(x2, y2)
        context.stroke()
    }

    static drawFlagBanner(context : CanvasRenderingContext2D, scale : number) {
        const size : number = Math.min(w, h) / sizeFactor  
        const hSize : number = h / flagHFactor 
        const sf : number = ScaleUtil.sinify(scale)
        const sf1 : number = ScaleUtil.divideScale(sf, 0, parts)
        const sf2 : number = ScaleUtil.divideScale(sf, 1, parts)
        const sf3 : number = ScaleUtil.divideScale(sf, 2, parts)    
        context.save()
        context.translate(w / 2, h)
        DrawingUtil.drawLine(context, 0, 0, 0, -h * .5 * sf1)
        for (var j = 0; j < 2; j++) {
            context.save()
            context.translate(0, -h / 2)
            DrawingUtil.drawLine(context, 0, 0, size * sf2, 0)
            context.fillRect(0, 0, size, hSize * sf3)
            context.restore()
        }
        context.restore()
    }

    static drawFBNode(context : CanvasRenderingContext2D, i : number, scale : number) {
        context.lineCap = 'round'
        context.lineWidth = Math.min(w, h) / strokeFactor 
        context.strokeStyle = colors[i]
        DrawingUtil.drawFlagBanner(context, scale)
    }
}

class Stage {

    canvas : HTMLCanvasElement = document.createElement('canvas')
    context : CanvasRenderingContext2D 

    initCanvas() {
        this.canvas.width = w 
        this.canvas.height = h 
        this.context = this.canvas.getContext('2d')
        document.body.appendChild(this.canvas)
    }

    render() {
        this.context.fillStyle = backColor 
        this.context.fillRect(0, 0, w, h)
    }

    handleTap() {
        this.canvas.onmousedown = () => {

        }
    }

    static init() {
        const stage : Stage = new Stage()
        stage.initCanvas()
        stage.render()
        stage.handleTap()
    }
}