const w : number = window.innerWidth 
const h : number = window.innerHeight 
const parts : number = 3 
const strokeFactor : number = 90 
const sizeFactor : number = 9.9 
const backColor : string = "#BDBDBD"
const delay : number = 20 
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