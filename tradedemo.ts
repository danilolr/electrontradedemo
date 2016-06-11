function rectOnColor(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
    var backColor = ctx.fillStyle;
    var backLineWidth = ctx.lineWidth;
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fillStyle = "#" + color;
    ctx.fill();
    ctx.fillStyle = backColor;
    ctx.lineWidth = backLineWidth;
}

function lineColorWidth(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number, color: string, width: any) {
    var backColor = ctx.fillStyle;
    var backLineWidth = ctx.lineWidth;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.strokeStyle = "#" + color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.fillStyle = backColor;
    ctx.lineWidth = backLineWidth;
}

class CandleChart {

    private ctx: CanvasRenderingContext2D
    private min: number;
    private max: number;
    private dx: number;
    private prevMx: number;
    private candleWidth: number;
    private candleSpace: number;
    private mouseDown:boolean;

    constructor(planCanvas: HTMLCanvasElement, public width: number, public height: number, public recs: any[]) {
        this.mouseDown = false;
        this.ctx = planCanvas.getContext("2d");
        this.min = 1e10;
        this.max = -1;
        this.dx = 0;
        this.candleWidth = 12;
        this.candleSpace = 3;
        this.prevMx = -1;
        for (let rec of this.recs) {
            if (rec.min < this.min)
                this.min = rec.min;
            if (rec.max > this.max)
                this.max = rec.max;
        }

        let th = this;
        
        planCanvas.onmousedown = function() {
            th.prevMx = -1;
            th.mouseDown = true;
        }
        
        planCanvas.onmouseup = function() {
            th.mouseDown = false;
        }

        planCanvas.onmousemove = function (ev: MouseEvent) {
            if (!th.mouseDown)
            return;
            if (th.prevMx == -1) {
                th.prevMx = ev.clientX;
            } else {
                th.dx = th.dx - (th.prevMx - ev.clientX);
                th.prevMx = ev.clientX;
            }
            th.draw();
        }

        this.draw();
    }

    private draw() {
        rectOnColor(this.ctx, 0, 0, this.width, this.height, "FFFFFF");
        
        let x = this.candleWidth / 2;
        for (let n: number = this.recs.length - 1; n >= 0; n--) {
            let rec = this.recs[n];
            lineColorWidth(this.ctx, this.dx + x + this.candleWidth / 2, 10 + this.converteValor(this.max - rec.max), this.dx + x + this.candleWidth / 2, 10 + this.converteValor(this.max - rec.min), "000000", 1);
            if (rec.open > rec.close)
                rectOnColor(this.ctx, this.dx + x, 10 + this.converteValor(this.max - rec.open), this.candleWidth, this.converteValor(rec.open - rec.close), "D75442");
            else
                rectOnColor(this.ctx, this.dx + x, 10 + this.converteValor(this.max - rec.close), this.candleWidth, this.converteValor(rec.close - rec.open), "6BA583");
            x = x + this.candleWidth + this.candleSpace;
        }
    }

    private converteValor(valor: number): number {
        let hpx = (this.height - 20) / (this.max - this.min);
        return valor * hpx;
    }


}

function drawBar(recs: any[], planCanvas : HTMLCanvasElement) {
    var w = window, d = document, e = d.documentElement, g = d.getElementsByTagName('body')[0], x = w.innerWidth || e.clientWidth || g.clientWidth, y = w.innerHeight || e.clientHeight || g.clientHeight;
    let candleChat = new CandleChart(planCanvas, x, y, recs);
}

function load() {
  let planCanvas = <HTMLCanvasElement>document.createElement("canvas");
            planCanvas.setAttribute('width', '770');
            planCanvas.setAttribute('height', '540');
            planCanvas.setAttribute('style', 'margin: 0');
            document.getElementsByTagName("body")[0].appendChild(planCanvas);
    let json = '{"ok":true,"result":[{"close":49490,"data":"2016- 05 - 27T18: 00:00Z","max":49490,"min":49490,"neg":156059,"open":49490,"qtt":1095,"status":"","volume":5.419155e+07},{"close":49455,"data":"2016- 05 - 27T17: 50:00Z","max":49460,"min":49410,"neg":155855,"open":49430,"qtt":935,"status":"","volume":4.62209e+07},{"close":49435,"data":"2016- 05 - 27T17: 45:00Z","max":49460,"min":49390,"neg":155521,"open":49395,"qtt":1905,"status":"","volume":9.416107e+07},{"close":49395,"data":"2016- 05 - 27T17: 40:00Z","max":49420,"min":49370,"neg":154821,"open":49380,"qtt":1407,"status":"","volume":6.949824e+07},{"close":49375,"data":"2016- 05 - 27T17: 35:00Z","max":49445,"min":49355,"neg":154319,"open":49440,"qtt":1326,"status":"","volume":6.5504236e+07},{"close":49440,"data":"2016- 05 - 27T17: 30:00Z","max":49445,"min":49395,"neg":153872,"open":49395,"qtt":1102,"status":"","volume":5.4463204e+07},{"close":49395,"data":"2016- 05 - 27T17: 25:00Z","max":49425,"min":49365,"neg":153433,"open":49365,"qtt":1769,"status":"","volume":8.738439e+07},{"close":49365,"data":"2016- 05 - 27T17: 20:00Z","max":49370,"min":49350,"neg":152730,"open":49360,"qtt":498,"status":"","volume":2.458176e+07},{"close":49365,"data":"2016- 05 - 27T17: 15:00Z","max":49385,"min":49350,"neg":152527,"open":49375,"qtt":774,"status":"","volume":3.821173e+07},{"close":49370,"data":"2016- 05 - 27T17: 10:00Z","max":49395,"min":49335,"neg":152254,"open":49345,"qtt":2181,"status":"","volume":1.0768458e+08},{"close":49350,"data":"2016- 05 - 27T17: 05:00Z","max":49350,"min":49235,"neg":151365,"open":49295,"qtt":3625,"status":"","volume":1.7865098e+08},{"close":49290,"data":"2016- 05 - 27T17: 00:00Z","max":49360,"min":49270,"neg":150324,"open":49335,"qtt":2656,"status":"","volume":1.3097882e+08},{"close":49325,"data":"2016- 05 - 27T16: 55:00Z","max":49370,"min":49255,"neg":149459,"open":49270,"qtt":4023,"status":"","volume":1.9847053e+08},{"close":49270,"data":"2016- 05 - 27T16: 50:00Z","max":49320,"min":49255,"neg":148046,"open":49285,"qtt":2210,"status":"","volume":1.0892429e+08},{"close":49285,"data":"2016- 05 - 27T16: 45:00Z","max":49330,"min":49215,"neg":147180,"open":49220,"qtt":5505,"status":"","volume":2.713506e+08},{"close":49220,"data":"2016- 05 - 27T16: 40:00Z","max":49255,"min":49200,"neg":145155,"open":49245,"qtt":2509,"status":"","volume":1.2351207e+08},{"close":49250,"data":"2016- 05 - 27T16: 35:00Z","max":49255,"min":49200,"neg":144298,"open":49240,"qtt":2293,"status":"","volume":1.128868e+08},{"close":49245,"data":"2016- 05 - 27T16: 30:00Z","max":49270,"min":49215,"neg":143409,"open":49250,"qtt":2619,"status":"","volume":1.2896131e+08},{"close":49255,"data":"2016- 05 - 27T16: 25:00Z","max":49260,"min":49175,"neg":142400,"open":49195,"qtt":3818,"status":"","volume":1.8794109e+08},{"close":49195,"data":"2016- 05 - 27T16: 20:00Z","max":49195,"min":49135,"neg":140925,"open":49185,"qtt":2872,"status":"","volume":1.4118382e+08},{"close":49185,"data":"2016- 05 - 27T16: 15:00Z","max":49220,"min":49165,"neg":139832,"open":49215,"qtt":3247,"status":"","volume":1.5972704e+08},{"close":49215,"data":"2016- 05 - 27T16: 10:00Z","max":49285,"min":49205,"neg":138656,"open":49265,"qtt":2791,"status":"","volume":1.3742074e+08},{"close":49265,"data":"2016- 05 - 27T16: 05:00Z","max":49300,"min":49235,"neg":137642,"open":49280,"qtt":2107,"status":"","volume":1.0381225e+08},{"close":49275,"data":"2016- 05 - 27T16: 00:00Z","max":49300,"min":49260,"neg":136764,"open":49295,"qtt":1665,"status":"","volume":8.205392e+07},{"close":49300,"data":"2016- 05 - 27T15: 55:00Z","max":49320,"min":49260,"neg":136093,"open":49295,"qtt":2760,"status":"","volume":1.3605848e+08},{"close":49290,"data":"2016- 05 - 27T15: 50:00Z","max":49380,"min":49270,"neg":135051,"open":49370,"qtt":3382,"status":"","volume":1.6675342e+08},{"close":49375,"data":"2016- 05 - 27T15: 45:00Z","max":49385,"min":49315,"neg":133778,"open":49325,"qtt":2034,"status":"","volume":1.0037679e+08},{"close":49320,"data":"2016- 05 - 27T15: 40:00Z","max":49395,"min":49305,"neg":132940,"open":49370,"qtt":3580,"status":"","volume":1.7665325e+08},{"close":49365,"data":"2016- 05 - 27T15: 35:00Z","max":49405,"min":49325,"neg":131559,"open":49355,"qtt":3690,"status":"","volume":1.8213638e+08},{"close":49355,"data":"2016- 05 - 27T15: 30:00Z","max":49480,"min":49350,"neg":130092,"open":49445,"qtt":4475,"status":"","volume":2.2112379e+08},{"close":49450,"data":"2016- 05 - 27T15: 25:00Z","max":49500,"min":49440,"neg":128489,"open":49465,"qtt":2542,"status":"","volume":1.2574394e+08},{"close":49460,"data":"2016- 05 - 27T15: 20:00Z","max":49485,"min":49365,"neg":127505,"open":49365,"qtt":2924,"status":"","volume":1.4453354e+08},{"close":49370,"data":"2016- 05 - 27T15: 15:00Z","max":49440,"min":49355,"neg":126339,"open":49440,"qtt":3029,"status":"","volume":1.4960939e+08},{"close":49440,"data":"2016- 05 - 27T15: 10:00Z","max":49470,"min":49400,"neg":125116,"open":49410,"qtt":2217,"status":"","volume":1.0960282e+08},{"close":49420,"data":"2016- 05 - 27T15: 05:00Z","max":49465,"min":49390,"neg":124209,"open":49445,"qtt":3595,"status":"","volume":1.7766486e+08},{"close":49450,"data":"2016- 05 - 27T15: 00:00Z","max":49465,"min":49370,"neg":122912,"open":49405,"qtt":5525,"status":"","volume":2.7302074e+08},{"close":49410,"data":"2016- 05 - 27T14: 55:00Z","max":49490,"min":49400,"neg":120844,"open":49470,"qtt":3131,"status":"","volume":1.547752e+08},{"close":49470,"data":"2016- 05 - 27T14: 50:00Z","max":49495,"min":49425,"neg":119584,"open":49470,"qtt":3693,"status":"","volume":1.8265109e+08},{"close":49475,"data":"2016- 05 - 27T14: 45:00Z","max":49580,"min":49465,"neg":118180,"open":49525,"qtt":3644,"status":"","volume":1.8047162e+08},{"close":49525,"data":"2016- 05 - 27T14: 40:00Z","max":49565,"min":49390,"neg":116728,"open":49445,"qtt":6939,"status":"","volume":3.4331574e+08},{"close":49450,"data":"2016- 05 - 27T14: 35:00Z","max":49625,"min":49440,"neg":113949,"open":49605,"qtt":7951,"status":"","volume":3.9364755e+08},{"close":49610,"data":"2016- 05 - 27T14: 30:00Z","max":49640,"min":49580,"neg":110904,"open":49595,"qtt":1317,"status":"","volume":6.5334104e+07},{"close":49590,"data":"2016- 05 - 27T14: 25:00Z","max":49675,"min":49580,"neg":110352,"open":49620,"qtt":2834,"stastus":"","volume":1.4066152e+08},{"close":49610,"data":"2016- 05 - 27T14: 20:00Z","max":49630,"min":49585,"neg":109243,"open":49620,"qtt":1032,"status":"","volume":5.119792e+07},{"close":49615,"data":"2016- 05 - 27T14: 15:00Z","max":49640,"min":49555,"neg":108802,"open":49570,"qtt":1555,"status":"","volume":7.713119e+07},{"close":49565,"data":"2016- 05 - 27T14: 10:00Z","max":49590,"min":49540,"neg":108117,"open":49540,"qtt":1570,"status":"","volume":7.782628e+07},{"close":49550,"data":"2016- 05 - 27T14: 05:00Z","max":49570,"min":49510,"neg":107393,"open":49515,"qtt":1576,"status":"","volume":7.8085896e+07},{"close":49515,"data":"2016- 05 - 27T14: 00:00Z","max":49570,"min":49500,"neg":106737,"open":49570,"qtt":3162,"status":"","volume":1.5662266e+08},{"close":49575,"data":"2016- 05 - 27T13: 55:00Z","max":49580,"min":49520,"neg":105409,"open":49555,"qtt":2315,"status":"","volume":1.1470621e+08},{"close":49560,"data":"2016- 05 - 27T13: 50:00Z","max":49590,"min":49525,"neg":104409,"open":49590,"qtt":2804,"status":"","volume":1.3894038e+08},{"close":49590,"data":"2016- 05 - 27T13: 45:00Z","max":49660,"min":49575,"neg":103193,"open":49620,"qtt":2176,"status":"","volume":1.07949416e+08},{"close":49620,"data":"2016- 05 - 27T13: 40:00Z","max":49690,"min":49620,"neg":102202,"open":49660,"qtt":1801,"status":"","volume":8.94201e+07},{"close":49660,"data":"2016- 05 - 27T13: 35:00Z","max":49690,"min":49635,"neg":101417,"open":49635,"qtt":1783,"status":"","volume":8.854519e+07},{"close":49640,"data":"2016- 05 - 27T13: 30:00Z","max":49655,"min":49590,"neg":100619,"open":49650,"qtt":1850,"status":"","volume":9.179035e+07},{"close":49645,"data":"2016- 05 - 27T13: 25:00Z","max":49685,"min":49640,"neg":99832,"open":49665,"qtt":1816,"status":"","volume":9.018703e+07},{"close":49660,"data":"2016- 05 - 27T13: 20:00Z","max":49675,"min":49585,"neg":99079,"open":49615,"qtt":2203,"status":"","volume":1.0932927e+08},{"close":49610,"data":"2016- 05 - 27T13: 15:00Z","max":49635,"min":49575,"neg":98126,"open":49580,"qtt":2084,"status":"","volume":1.0339187e+08},{"close":49575,"data":"2016- 05 - 27T13: 10:00Z","max":49590,"min":49545,"neg":97247,"open":49565,"qtt":1378,"status":"","volume":6.830581e+07},{"close":49560,"data":"2016- 05 - 27T13: 05:00Z","max":49625,"min":49545,"neg":96659,"open":49600,"qtt":2159,"status":"","volume":1.0704573e+08},{"close":49600,"data":"2016- 05 - 27T13: 00:00Z","max":49655,"min":49555,"neg":95717,"open":49655,"qtt":5165,"status":"","volume":2.5614003e+08},{"close":49655,"data":"2016- 05 - 27T12: 55:00Z","max":49660,"min":49625,"neg":93790,"open":49640,"qtt":1178,"status":"","volume":5.848161e+07},{"close":49645,"data":"2016- 05 - 27T12: 50:00Z","max":49700,"min":49625,"neg":93276,"open":49685,"qtt":2130,"status":"","volume":1.0575809e+08},{"close":49690,"data":"2016- 05 - 27T12: 45:00Z","max":49695,"min":49630,"neg":92372,"open":49635,"qtt":2403,"status":"","volume":1.1933459e+08},{"close":49635,"data":"2016- 05 - 27T12: 40:00Z","max":49735,"min":49620,"neg":91364,"open":49725,"qtt":4117,"status":"","volume":2.0447058e+08},{"close":49735,"data":"2016- 05 - 27T12: 35:00Z","max":49735,"min":49685,"neg":89832,"open":49710,"qtt":1945,"status":"","volume":9.668122e+07},{"close":49705,"data":"2016- 05 - 27T12: 30:00Z","max":49785,"min":49695,"neg":88964,"open":49730,"qtt":3633,"status":"","volume":1.8068877e+08},{"close":49730,"data":"2016- 05 - 27T12: 25:00Z","max":49790,"min":49705,"neg":87629,"open":49755,"qtt":3808,"status":"","volume":1.8944371e+08},{"close":49755,"data":"2016- 05 - 27T12: 20:00Z","max":49770,"min":49705,"neg":86123,"open":49760,"qtt":2810,"status":"","volume":1.3975373e+08},{"close":49770,"data":"2016- 05 - 27T12: 15:00Z","max":49790,"min":49715,"neg":84856,"open":49775,"qtt":3816,"status":"","volume":1.8986598e+08},{"close":49780,"data":"2016- 05 - 27T12: 10:00Z","max":49825,"min":49740,"neg":83299,"open":49820,"qtt":5660,"status":"","volume":2.8176672e+08},{"close":49820,"data":"2016- 05 - 27T12: 05:00Z","max":49940,"min":49810,"neg":81090,"open":49930,"qtt":3864,"status":"","volume":1.9268432e+08},{"close":49935,"data":"2016- 05 - 27T12: 00:00Z","max":49960,"min":49900,"neg":79593,"open":49930,"qtt":2401,"status":"","volume":1.19886616e+08},{"close":49935,"data":"2016- 05 - 27T11: 55:00Z","max":49945,"min":49860,"neg":78617,"open":49905,"qtt":3030,"status":"","volume":1.5120853e+08},{"close":49900,"data":"2016- 05 - 27T11: 50:00Z","max":49970,"min":49890,"neg":77388,"open":49950,"qtt":3346,"status":"","volume":1.6706109e+08},{"close":49950,"data":"2016- 05 - 27T11: 45:00Z","max":49960,"min":49835,"neg":76127,"open":49860,"qtt":3920,"status":"","volume":1.9564762e+08},{"close":49870,"data":"2016- 05 - 27T11: 40:00Z","max":49890,"min":49810,"neg":74425,"open":49870,"qtt":2458,"status":"","volume":1.2252215e+08},{"close":49865,"data":"2016- 05 - 27T11: 35:00Z","max":49925,"min":49850,"neg":73352,"open":49865,"qtt":2728,"status":"","volume":1.3608746e+08},{"close":49865,"data":"2016- 05 - 27T11: 30:00Z","max":49950,"min":49815,"neg":72176,"open":49930,"qtt":4404,"status":"","volume":2.1960758e+08},{"close":49925,"data":"2016- 05 - 27T11: 25:00Z","max":49950,"min":49870,"neg":70344,"open":49925,"qtt":2979,"status":"","volume":1.4869362e+08},{"close":49925,"data":"2016- 05 - 27T11: 20:00Z","max":49995,"min":49830,"neg":69079,"open":49880,"qtt":5345,"status":"","volume":2.6677318e+08},{"close":49880,"data":"2016- 05 - 27T11: 15:00Z","max":50010,"min":49870,"neg":66632,"open":49925,"qtt":4661,"status":"","volume":2.3278557e+08},{"close":49935,"data":"2016- 05 - 27T11: 10:00Z","max":50030,"min":49880,"neg":64504,"open":49960,"qtt":8398,"status":"","volume":4.195775e+08},{"close":49955,"data":"2016- 05 - 27T11: 05:00Z","max":49970,"min":49880,"neg":61119,"open":49935,"qtt":5527,"status":"","volume":2.759291e+08},{"close":49930,"data":"2016- 05 - 27T11: 00:00Z","max":49945,"min":49785,"neg":58799,"open":49795,"qtt":6731,"status":"","volume":3.357186e+08},{"close":49795,"data":"2016- 05 - 27T10: 55:00Z","max":49810,"min":49700,"neg":55996,"open":49705,"qtt":4914,"status":"","volume":2.4454162e+08},{"close":49700,"data":"2016- 05 - 27T10: 50:00Z","max":49805,"min":49650,"neg":54009,"open":49800,"qtt":11779,"status":"","volume":5.855282e+08},{"close":49800,"data":"2016- 05 - 27T10: 45:00Z","max":49915,"min":49740,"neg":49375,"open":49745,"qtt":7922,"status":"","volume":3.94805e+08},{"close":49740,"data":"2016- 05 - 27T10: 40:00Z","max":49825,"min":49700,"neg":45949,"open":49770,"qtt":10777,"status":"","volume":5.362698e+08},{"close":49770,"data":"2016- 05 - 27T10: 35:00Z","max":49995,"min":49755,"neg":41374,"open":49945,"qtt":11226,"status":"","volume":5.597628e+08},{"close":49940,"data":"2016- 05 - 27T10: 30:00Z","max":50140,"min":49910,"neg":36576,"open":49985,"qtt":13273,"status":"","volume":6.638897e+08},{"close":49980,"data":"2016- 05 - 27T10: 25:00Z","max":49985,"min":49880,"neg":31017,"open":49960,"qtt":3867,"status":"","volume":1.930701e+08},{"close":49955,"data":"2016- 05 - 27T10: 20:00Z","max":50025,"min":49840,"neg":29373,"open":49865,"qtt":6741,"status":"","volume":3.3667875e+08},{"close":49865,"data":"2016- 05 - 27T10: 15:00Z","max":49890,"min":49780,"neg":26378,"open":49810,"qtt":4337,"status":"","volume":2.1609653e+08},{"close":49800,"data":"2016- 05 - 27T10: 10:00Z","max":49935,"min":49795,"neg":24470,"open":49890,"qtt":7112,"status":"","volume":3.5457782e+08},{"close":49885,"data":"2016- 05 - 27T10: 05:00Z","max":49915,"min":49800,"neg":21509,"open":49835,"qtt":5988,"status":"","volume":2.9858867e+08},{"close":49835,"data":"2016- 05 - 27T10: 00:00Z","max":49845,"min":49735,"neg":19166,"open":49785,"qtt":4358,"status":"","volume":2.1702395e+08},{"close":49790,"data":"2016- 05 - 27T09: 55:00Z","max":49825,"min":49760,"neg":17318,"open":49815,"qtt":3955,"status":"","volume":1.9693546e+08},{"close":49815,"data":"2016- 05 - 27T09: 50:00Z","max":49880,"min":49810,"neg":15773,"open":49855,"qtt":3965,"status":"","volume":1.9761717e+08},{"close":49855,"data":"2016- 05 - 27T09: 45:00Z","max":49985,"min":49830,"neg":14143,"open":49975,"qtt":5951,"status":"","volume":2.9694285e+08},{"close":49980,"data":"2016- 05 - 27T09: 40:00Z","max":50045,"min":49950,"neg":11588,"open":50040,"qtt":3388,"status":"","volume":1.6938427e+08},{"close":50045,"data":"2016- 05 - 27T09: 35:00Z","max":50110,"min":50025,"neg":10072,"open":50075,"qtt":2991,"status":"","volume":1.4976277e+08},{"close":50065,"data":"2016- 05 - 27T09: 30:00Z","max":50115,"min":50010,"neg":8804,"open":50015,"qtt":4620,"status":"","volume":2.3138326e+08},{"close":50015,"data":"2016- 05 - 27T09: 25:00Z","max":50040,"min":49935,"neg":6882,"open":49950,"qtt":2222,"status":"","volume":1.1109245e+08},{"close":49955,"data":"2016- 05 - 27T09: 20:00Z","max":49970,"min":49905,"neg":5901,"open":49935,"qtt":2065,"status":"","volume":1.03123064e+08},{"close":49935,"data":"2016- 05 - 27T09: 15:00Z","max":49990,"min":49890,"neg":5037,"open":49920,"qtt":2772,"status":"","volume":1.3841965e+08},{"close":49925,"data":"2016- 05 - 27T09: 10:00Z","max":50025,"min":49900,"neg":3762,"open":49990,"qtt":2846,"status":"","volume":1.4218835e+08},{"close":49980,"data":"2016- 05 - 27T09: 05:00Z","max":50015,"min":49900,"neg":2639,"open":49965,"qtt":3389,"status":"","volume":1.6930507e+08},{"close":49965,"data":"2016- 05 - 27T09: 00:00Z","max":50065,"min":49830,"neg":1380,"open":50000,"qtt":4209,"status":"","volume":2.1024024e+08}]}';

    var result = JSON.parse(json);
    drawBar(result.result, planCanvas);
}