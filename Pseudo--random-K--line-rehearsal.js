// update akshare
// pip install --upgrade akshare
// Get elements
// ______元素变量 elements variables____________________________________________________________________________
// 代码输入口对象 code input port obj
// main chart window
const MAINcanvas = document.getElementById('Mainchart');
const MAINctx = MAINcanvas.getContext('2d');
// sub chart window
const SUBcanvas = document.getElementById('SUBchart');
const SUBctx = SUBcanvas.getContext('2d');
// mask chart window
const MASKcanvas = document.getElementById('MASKchart');
const MASKctx = MASKcanvas.getContext('2d');
// mins chart window
const MinsLinecanvas = document.getElementById('Minschart');
const MinsLinectx = MinsLinecanvas.getContext('2d');



// point date
const pointDate = document.getElementById("pointDate")
// point price
const pointPrice = document.getElementById("pointPrice")
// point price change rate
const pointPriceChange = document.getElementById("pointPriceChange")



// focus item info window
const CrossInfo = document.getElementById("CrossInfo")



// local_ip
const local_ip = document.getElementById("local_ip")




// ______指令变量 older variables____________________________________________________________________________
// IV V or W
const IVbase = 1;//IV w or not [1,10]

// ______限位变量 limit position variables____________________________________________________________________________
// basic variable1_________
// start draw honriztal position "left right gap"
var drawGap = 10;
// one chart items size
var chartItemWidth = 20;
var SimChartItemWidth = chartItemWidth/2;


// Mainchart size info
var MainchartWidth;
var MainchartHeight;
// Subchart size info
var SubchartWidth;
var SubchartHeight;
// MinsLinechart size info
var MaskchartHeight;


// basic variable2_________
// chart window length
var windowLength = 0;
// basic data length
var basicDataLength = 0;
// sub data length
var subDataLength = 0;
// FinalSub data length
var FinalSubDataLength = 0;//作废处理
// max start index limit
var maxStartIndex = 0;//indexable


// move limit variable__________
// start index for drag and ..
var startIndex = 0;//indexable//[-1,availableStartIndex]
// sub data index
var subEndIndex = 0;//indexable//[0,subDataLength]+1
// point index for show point info and visible vriable part
var pointIndex = 0;//indexable[-1,basicDataLength-1]
// available start index limit
var availableStartIndex = 0;//indexable//[-1,maxStartIndex]
// temp storagy variable__________
// use to show temp data carraier
let VisibleData = [];
// data from server temporarily staragy
let responseLocal =[];
// temporary IV data
let TempIv = [[]];
// other variable__________
let crossIdx = 0;
// 用于记录上次触摸的时间
let lastTouchTime = 0; 
// 双击时间阈值（毫秒）
const doubleTapThreshold = 300;
const longTapThreshold = 1100;

//current X of mouse and touch
// let currentX = 0;
//long press X of mouse and touch
let long_pressX = 0;

let offsetX = 0; // Horizontal offset for translation
let currentOffsetXFive = -1;//48*3+1=145

let currentOffsetXMaxForScroll = 0;
let offsetXMaxForScroll = 0;
let offsetXMaxForALL = 0;
let currentOffsetX = 0;
let VisibleMax = -1;

let UsedWidth = 0;

let isDragging = false; // Whether the user is dragging
let dragStartX = 0; // Where the drag started

let responseFiveCopy = {};
let responseFiveMinsLineCopy ={};
let KdataVisible;
let IVdataVisible;


var Price_Average_Line = []
var Price_Average_Line_H = []
var Volume_G_data = []
var KDJ_data = []


  var overlapRate = 0.01
  var overlapMinPrice = Math.floor(0.01/overlapRate*100)/100
  var YYXProiod = 30

var Bx_colors = ["white","#fc9219","aqua","red","red","green","green"]

let startDate = document.getElementById("startDate")
let ontime = document.getElementById("ontime")
let endDate = document.getElementById("endDate")

//////////////////////////////////  preOparation  ///////////////////
const opInfo = document.getElementById("opInfo")
const helpmodal = document.getElementById('helpmodal');
const decodeModal = document.getElementById('decodeModal');
const analyseButton = document.getElementById('analyseButton');
const cancelButton = document.getElementById('cancelButton');
const analyseResult = document.getElementById('analyseResult');
const analyseCode = document.getElementById('analyseCode');
// const infoOnPanel = document.getElementById('infoOnPanel');
// const waitModal = document.getElementById('waitModal');

let downloadList;
// let downloadList = document.getElementById("downloadList")

const codeDepth = 2
const codeUnitLength = 8
let preOpLength = 80

// const OneKGneStep = 20
const OneKCptStep = 4
const reportStep = 20
const POrepeatTimes = 5
var afterNK = [1,2,3,4,5,preOpLength/2,preOpLength]

var preOpStartIndex = 0;
let resetResponseLocal =[];
let refAvarage = 0
let refMin = 0
let refMinAvarage = [[null,null],null]
let guanLianInd = 0

let resetData = ""
let EditingData = ""
// 单选类 radioCL 
let radioCL = document.getElementsByClassName("radioCL")
                      //减半范围  关联     系统循环  空防  空攻  多攻  多防  geuss
                      //[0,      0,       2,       3,    4,   5,    6,    7]  
var radioCLValueArray = [0,      0,       0,       0,    1,   1,    0,    1] 
// 数字类 numCL
let numCL = document.getElementsByClassName("numCL")
                      //随机次数   最小步长   随时范围-  随机范围+  随机中值   Open    Close     High    Low     volume  preOpLength      timerInterval     多防半随机  定时器    分秒    全局涨跌    当下涨跌
                      //[0        1,         2,        3,        4,         5,        6,      7,      8,      9,       10，             11,              12,      13      14,     15          16]
var numCLValueArray =   [10,      1,         0,         2,        4995,     0,      1,        2,      3,      0,       preOpLength,     1000,            3,       0,       0,     0,           0]
   
// IndexsSwitch 类
                // VOL   MA   KDJ
var IndexsSwitch = [0,   1,   1] // 0:Volume 1:Price_Average 3:NKD_KDJ

// 操作预演类
                        //raw   随机   走高      走低    震荡走平
var preOparationMethod = [1,    1,     0,        0,     0]

// report values
let positive = 0
let positiveOld = 0
let negative = 0
let negativeOld = 0
let SumPositiveAndNegativeVals = 0
let SumPositiveAndNegativeValsOld = 0
let simple = []

let rpForK = []
let rpForMA = []
let rpForKDJ = []
let rpNK = []


// timer
let timer   = null;   // setInterval 句柄
let timerCount   = 0;      //
let timerInterval   = 1000;      //
numCLValueArray[11] = timerInterval;

const log   = document.getElementById('log');

// 禁止console.log输出
if (typeof console === 'undefined') window.console = {};
if (!console.log) console.log = () => {};
console.log = () => {};

// user guide
opInfo.innerHTML = "Tips："
      +"\n直接点击，关闭user guide"
      +"\n点击右下角“help”按钮，显示/关闭user guide"
      +"\n- 拖动：平移"
      +"\n- 悬停：显示十字线和数据"
      +"\n- 双击：关联当前悬停点数据到输入框"
      +"\n- 键盘b：执行一次随机预演并生成报告"
      +"\n- 键盘v：执行走高预演并生成报告"
      +"\n- 键盘c：执行走低预演并生成报告"
      +"\n- 键盘x：执行震荡走平预演并生成报告"
      +"\n- 键盘Alt：连续执行预定次数随机预演并生成完整报告"
      +"\n- 键盘contrl：开启/关闭：间隔指定时间连续生成数随机预演图形"
opInfo.innerHTML += "\n"
      +"\nClick directly to close user guide"
      +"\nClick the \"help\" button at the bottom right to show/close the user guide"
      +"\n- Drag: Pan"
      +"\n- Hover: Display crosshair and data"
      +"\n- Double-click: Link the currently hovered data point to the input box"
      +"\n- Key B: Execute a random rehearsal once and generate a report"
      +"\n- Key V: Execute a bullish (upward) rehearsal and generate a report"
      +"\n- Key C: Execute a bearish (downward) rehearsal and generate a report"
      +"\n- Key X: Execute a sideways (oscillating) rehearsal and generate a report"
      +"\n- Key Alt: Execute the preset number of random rehearsals continuously and generate a complete report"
      +"\n- Key Ctrl: Toggle on/off: Generate random rehearsal charts at specified intervals"
// ______鼠标事件处理 manager____________________________________________________________________________
{
//鼠标按下
// Mouse down event
MASKcanvas.addEventListener('mousedown', (e) => {
  isDragging = true;
  dragStartX = e.clientX; // Store where the drag started, taking into account current offset
  MAINcanvas.style.cursor = 'grabbing'; // Change cursor to grabbing when dragging starts on effect
});
//鼠标移动
// Mouse move event
MASKcanvas.addEventListener('mousemove', (e) => {
  if (isDragging) {
    // console.log((dragStartX - e.clientX)/1000,Num_round((dragStartX - e.clientX)/1000),0)
    // console.log("ok",dragStartX - e.clientX)
    if((dragStartX - e.clientX) >= 5){
      dragStartX = e.clientX
      if(startIndex>=availableStartIndex){startIndex = availableStartIndex}
      else{
        startIndex += 1
        refreshDraw(IndexsSwitch); // Redraw the canvas with the updated offset
      }
    }
    else if((dragStartX - e.clientX) <= -5){
      dragStartX = e.clientX
      if(startIndex<=0){}
      else{
        startIndex -= 1
        refreshDraw(IndexsSwitch);; // Redraw the canvas with the updated offset
      }
    }
    // offsetX = offsetX - Num_round((dragStartX - e.clientX)/10,0); // Calculate new offset based on mouse movement
    // dragStartX = e.clientX
    // refreshDraw(responseLocal,offsetX); // Redraw the canvas with the updated offset
  }
  else{
    crossLines(2*(e.clientX-12),2*(e.clientY-12),20)
  }
});
//鼠标抬起
// Mouse up event
MASKcanvas.addEventListener('mouseup', () => {
  isDragging = false; // Stop dragging
  MAINcanvas.style.cursor = 'grab'; // Reset cursor to grab
});
//鼠标移出
// Mouse out event
MASKcanvas.addEventListener('mouseout', () => {
  isDragging = false; // Stop dragging
  MAINcanvas.style.cursor = 'grab'; // Reset cursor to grab
  CrossInfo.innerHTML = ""
  crossIdx = -1
});
//鼠标双击
// Mouse dblclick event
MASKcanvas.addEventListener('dblclick', function(event) {
  console.log("crossIdx",crossIdx)//,"index",startIndex+crossIdx)
  guanLianInd = crossIdx + startIndex
  numCL[5].value = responseLocal[0][guanLianInd][0]
  numCLValueArray[5] = responseLocal[0][guanLianInd][0]
  numCL[6].value = responseLocal[0][guanLianInd][1]
  numCLValueArray[6] = responseLocal[0][guanLianInd][1]
  numCL[7].value = responseLocal[0][guanLianInd][2]
  numCLValueArray[7] = responseLocal[0][guanLianInd][2]
  numCL[8].value = responseLocal[0][guanLianInd][3]
  numCLValueArray[8] = responseLocal[0][guanLianInd][3]

  refreshDraw(IndexsSwitch);
  // if(crossIdx!=-1 && VisibleData[0][crossIdx][0] == VisibleData[1][crossIdx][0]){
  //   MinsLinectx.clearRect(0,0,MinsLinecanvas.width,MinsLinecanvas.height)
  //   cut = false
  //   if(VisibleData[0][crossIdx][0] == responseLocal[1][pointIndex][0]){cut = true}
  //   fiveMinsLine(VisibleData[0][crossIdx],1,cutout = cut)
  // }
});
}
// ______键盘事件处理 manager____________________________________________________________________________
{
  document.addEventListener('keydown', async function(event) {
    // console.log('event.keyCode:', event.keyCode);
    console.log('event.key:', event.key,event.keyCode);
    if (event.key === 'm') {
      console.log( event.key);
    } 
    if ((event.key === 'z' || event.key === 'b') || event.key === 'v' || event.key === 'c' || event.key === 'x') {
      preOpStartIndex = startIndex + crossIdx
      console.log("space",crossIdx,startIndex+crossIdx);
      if((event.key === 'z' || event.key === 'b'))
             {preOparationMethod = [1,    1,     0,        0,     0];dataPosition=1;}
      else if(event.key === 'v'){preOparationMethod = [1,    0,     1,        0,     0];dataPosition=2;}
      else if(event.key === 'c'){preOparationMethod = [1,    0,     0,        1,     0];dataPosition=3;}
      else if(event.key === 'x'){preOparationMethod = [1,    0,     0,        0,     1];dataPosition=4;}
      else{preOparationMethod = [1,    1,     0,        0,     0]}
      drawText(MAINctx, 'wait...', MainchartWidth/2, MainchartHeight/2, {
        font: 'bold 480px serif',
        color: 'white',
        stroke: true,
        align: 'center',
        baseline: 'middle',
        maxWidth: 0
      });
      refreshDraw(IndexsSwitch,true);
      if(event.key != 'z'){
        text = unitReport(dataPosition,reportStep)
        displayCanvasAsImage(MAINcanvas,SUBcanvas,"RandomModle",text)        
      }

      // text = generalReport(reportStep);

      // const p = document.createElement('p');
      // p.style.color = "white"
      // p.innerText = text;
      // downloadList.appendChild(p);
      // console.log(downloadList)
    }
    if (event.key === 'Alt') {
      preOpStartIndex = startIndex + crossIdx
      console.log("Alt",crossIdx,startIndex+crossIdx);

      preOparationMethod = [1,    1,     0,        0,     0]
      reset(true);
      drawText(MAINctx, 'wait...', MainchartWidth/2, MainchartHeight/2, {
        font: 'bold 480px serif',
        color: 'white',
        stroke: true,
        align: 'center',
        baseline: 'middle',
        maxWidth: 0
      });
      await new Promise(requestAnimationFrame); // 等一次渲染
      await new Promise(requestAnimationFrame); // 等一次渲染

      for (let index = 0; index < numCLValueArray[0]; index++) {
        // preOpStartIndex = startIndex + crossIdx
        // console.log("space",crossIdx,startIndex+crossIdx);
        refreshDraw(IndexsSwitch,true);
        text = unitReport(1,reportStep)
        displayCanvasAsImage(MAINcanvas,SUBcanvas,"RandomModle",text)
      }
      text = generalReport(reportStep);
      const divp = document.createElement('div');
      divp.style.color = "white";
      divp.style.display = "flex";
      divp.style.width = "100%";
      // p.innerText = text;
      divp.innerHTML = text.replace(/\n/g, '<br>');
      downloadList.appendChild(divp);
      downloadList.insertAdjacentElement('afterbegin', divp);     // 在最开头插入
    }
    if (event.key === 'Control') {
      event.preventDefault();                // 阻止浏览器默认行为（比如加书签）
      preOpStartIndex = startIndex + crossIdx
      console.log(timerInterval,"timerInterval set");

      if (timer === null) {              // 当前关着 -> 启动
        // timer = setInterval(tick, timerInterval*numCLValueArray[11]);
        timer = setInterval(tick, timerInterval);
        console.log('已启动');
      } else {                           // 当前开着 -> 暂停
        clearInterval(timer);
        timer = null;
        console.log('已暂停');
      }
    }
  });
}
function tick() {
  timerCount++;
  console.log(`运行中… 计数 = ${timerCount}`)
  // 这里写你要周期性干的活
  preOparationMethod = [1,    1,     0,        0,     0];dataPosition=1;
  drawText(MAINctx, 'wait...', MainchartWidth/2, MainchartHeight/2, {
    font: 'bold 480px serif',
    color: 'white',
    stroke: true,
    align: 'center',
    baseline: 'middle',
    maxWidth: 0
  });
  refreshDraw(IndexsSwitch,true);
}
// ______事件处理 函数____________________________________________________________________________
// 按钮点击事件
analyseButton.addEventListener('click', function() {
  var rt = doAnalyse();
  // if(rt==1){
  //   // decodeModal.style.display = 'none';
  //   analyseResult.textContent = "解析成功";
  // }else{
  //   analyseResult.textContent = "解析失败，请检查代码";
  // }
});

cancelButton.addEventListener('click', function() {
  //alert('你选择了“空”');
  decodeModal.style.display = 'none';
  geuss = -1;
});

// ______top manager____________________________________________________________________________
{
// ZOOMchange 作废
function zoomChange(value){
  chartItemWidth = chartItemWidth+value
  drawGap=chartItemWidth/3*2
  if(chartItemWidth<5){chartItemWidth=5;drawGap=chartItemWidth/3*2}
  else if(chartItemWidth>100){chartItemWidth=100;drawGap=chartItemWidth/3*2}
  else{refreshDraw(IndexsSwitch);}
}

// init limit position variables
function reinitVarialsForZoom(){
  // variations
  VWP = windowLength
  // change:windowLength,maxStartIndex,startIndex
  windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
  if(basicDataLength>windowLength){
    maxStartIndex = basicDataLength-windowLength;
  }
  else{
    maxStartIndex = 0;
  }
  // variations
  VWP = Math.abs(windowLength - VWP)
  D = pointIndex - startIndex
  console.log(VWP,D)
  // new startIndex
  if(D>windowLength-1){
    startIndex+=VWP
    availableStartIndex+=VWP
  }else{
    if(startIndex>0){
      startIndex-=VWP
      availableStartIndex-=VWP
      if(startIndex<0){startIndex=0;availableStartIndex=0;}
    }
  }
  PrintLimitPositionVariables("ZOOM")
}

// 生成要显示的数据generate the data of going to show
function generateVisablelData(reGenData){
  VisibleData = []
  var dataPosition = 0;
  // raw
  var Kdata = []
  if(preOparationMethod[dataPosition]==1){
    if(startIndex+windowLength>pointIndex){
      Kdata = deepCopyArray(responseLocal[0].slice(startIndex,pointIndex+1))
    }else{
      Kdata = deepCopyArray(responseLocal[0].slice(startIndex,startIndex+windowLength))
    }
    VisibleData.push(Kdata)
  }else{VisibleData.push([])}

  // 随机
  Kdata = []
  dataPosition++;
  if(preOparationMethod[dataPosition]==1){
    console.log("im fine")
    // for (let index = 0; index < responseLocal[0].length; index++) {
    //   Kdata = []
    //   for(let i = 0;i<responseLocal[0][index].length;i++){
    //     Kdata.push(responseLocal[0][index][i])
    //   }
    //   responseLocal[1].push(Kdata);
    // }
    var o = 0
    var c = 0 
    var h = 0
    var l = 0
    var kIncreace = 0
    var kin = 0
    var hlm = 0
    var llm = 0
    if(reGenData){
      responseLocal[dataPosition] = []
      responseLocal[dataPosition] = deepCopyArray(responseLocal[0]); 
      for (let index = preOpStartIndex+1; index < preOpStartIndex+preOpLength+1; index++) {
        kIncreace = 0
        responseLocal[dataPosition][index] = []
        // var ii = []
        for (let i = 0; i < OneKCptStep; i++) {
          kin = getRandomIntWithSign(numCLValueArray[2],numCLValueArray[3]); //系统随机
          if(radioCLValueArray[0] == 1){kin = kin/2;}
          // kIncreace += getRandomIntWithSign(numCLValueArray[1],numCLValueArray[2]); //系统随机           
          kIncreace += kin; //系统随机           
          simple.push(kin)
        }
        o = kIncreace
        l = kIncreace
        for (let i = 0; i < numCLValueArray[0]; i++) {
          kin = getRandomIntWithSign(numCLValueArray[2],numCLValueArray[3]); //系统随机
          kin = Num_round(kin/numCLValueArray[1],0)*numCLValueArray[1];
          if(radioCLValueArray[0] == 1){kin = kin/2;}
          // kIncreace += getRandomIntWithSign(numCLValueArray[1],numCLValueArray[2]); //系统随机           
          kIncreace += kin; //系统随机
          simple.push(kin)
          if(h<kIncreace){h = kIncreace} //高
          if(l>kIncreace){l = kIncreace} //低 
        }
        c = kIncreace;
        if(h<o){h=o}
        if(h<c){h=c}
        if(c<o){hlm=o;llm=c}
        else{hlm=c;llm=o}
        // if(getRandomIntWithSign(numCLValueArray[2],numCLValueArray[3])>0){
        //   h = Num_round((h)/2,0);
        // }else{
        //   h = Num_round((h)/3*2,0);
        // }
        console.log("H---",h,hlm);
        if(hlm>h){console.log("o",o,"c",c,"h",h,"l",l,"hlm",hlm);}

        if(getRandomIntWithSign(numCLValueArray[2],numCLValueArray[3])>0){
          h = hlm+Num_round((h-hlm)/2,0);
        }else{
          h = hlm+Num_round((h-hlm)/3,0);
        }
        if(getRandomIntWithSign(numCLValueArray[2],numCLValueArray[3])>0){
          l = llm-Num_round((llm-l)*2,0);
        }
        console.log("H",h);

        responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+o) //o
        responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+c) //c
        responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+h) //h
        responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+l) //l
        responseLocal[dataPosition][index].push(0) //v
        responseLocal[dataPosition][index].push(0) //p
        responseLocal[dataPosition][index].push("0000-00-00") //d
        responseLocal[dataPosition][index].push("00:00:00") //t
        // console.log(responseLocal[1][index],index);
        // ii.push(responseLocal[dataPosition][index-1][1dataPosition]+kIncreace) //c
        // ii.push(responseLocal[dataPosition][index-1][dataPosition]+h) //h
        // ii.push(responseLocal[dataPosition][index-1][dataPosition]+l) //l
        // ii.push(0) //v
        // console.log(ii);

        // responseLocal[dataPosition][index] = responseLocal[dataPosition][preOpStartIndex]
      }
      // console.log("responseLocal[dataPosition]",responseLocal[dataPosition],responseLocal[dataPosition].length);
    }
    Kdata = []
    if(startIndex+windowLength>pointIndex){
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,pointIndex+1))
    }else{
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,startIndex+windowLength))
    }
    VisibleData.push(Kdata)
    // console.log("VisibleData[dataPosition]",VisibleData[dataPosition].length,Kdata.length)
  }else{VisibleData.push([])}

  // 走高
  Kdata = []
  dataPosition++;
  if(preOparationMethod[dataPosition]==1){
    if(reGenData){
      responseLocal[dataPosition] = []
      responseLocal[dataPosition] = deepCopyArray(responseLocal[0]); 
      for (let index = preOpStartIndex+1; index < preOpStartIndex+preOpLength+1; index++) {
        responseLocal[dataPosition][index] = []
        if(radioCLValueArray[0] == 1){
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[2]/2) //o
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[3]/2) //c
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[3]/2+numCLValueArray[3]/4) //h
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[2]/2-numCLValueArray[3]/4) //l        
        }else{
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[2]) //o
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[3]) //c
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[3]+numCLValueArray[3]/2) //h
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]+numCLValueArray[2]-numCLValueArray[3]/2) //l
        }
        responseLocal[dataPosition][index].push(0) //v
        responseLocal[dataPosition][index].push(0) //p
        responseLocal[dataPosition][index].push("0000-00-00") //d
        responseLocal[dataPosition][index].push("00:00:00") //t
      }
    }
    // console.log("responseLocal[dataPosition]",responseLocal[dataPosition],responseLocal[dataPosition].length);

    Kdata = []
    if(startIndex+windowLength>pointIndex){
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,pointIndex+1))
    }else{
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,startIndex+windowLength))
    }
    VisibleData.push(Kdata)
    console.log("VisibleData[dataPosition]",dataPosition,VisibleData[dataPosition].length,Kdata.length,VisibleData[dataPosition])
  }else{VisibleData.push([])}
  // 走低
  Kdata = []
  dataPosition++;
  if(preOparationMethod[dataPosition]==1){
    if(reGenData){
      responseLocal[dataPosition] = []
      responseLocal[dataPosition] = deepCopyArray(responseLocal[0]); 

      for (let index = preOpStartIndex+1; index < preOpStartIndex+preOpLength+1; index++) {
        responseLocal[dataPosition][index] = []
        if(radioCLValueArray[0] == 1){
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[2]/2) //o
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[3]/2) //c
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[2]/2+numCLValueArray[3]/4) //h
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[3]/2-numCLValueArray[3]/4) //l         
        }else{
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[2]) //o
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[3]) //c
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[2]+numCLValueArray[3]/2) //h
          responseLocal[dataPosition][index].push(responseLocal[dataPosition][index-1][1]-numCLValueArray[3]-numCLValueArray[3]/2) //l
        }
        responseLocal[dataPosition][index].push(0) //v
        responseLocal[dataPosition][index].push(0) //p
        responseLocal[dataPosition][index].push("0000-00-00") //d
        responseLocal[dataPosition][index].push("00:00:00") //t
      }
    }
    // console.log("responseLocal[dataPosition]",responseLocal[dataPosition],responseLocal[dataPosition].length);

    Kdata = []
    if(startIndex+windowLength>pointIndex){
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,pointIndex+1))
    }else{
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,startIndex+windowLength))
    }
    VisibleData.push(Kdata)
    console.log("VisibleData[dataPosition]",dataPosition,VisibleData[dataPosition].length,Kdata.length,VisibleData[dataPosition])
  }else{VisibleData.push([])}
  // 走平
  Kdata = []
  dataPosition++;
  if(preOparationMethod[dataPosition]==1){
    if(reGenData){
      responseLocal[dataPosition] = []
      responseLocal[dataPosition] = deepCopyArray(responseLocal[0]); 
      var up = []
      up.push(responseLocal[dataPosition][preOpStartIndex][1]+numCLValueArray[2]) //o
      up.push(responseLocal[dataPosition][preOpStartIndex][1]+numCLValueArray[3]) //c
      up.push(responseLocal[dataPosition][preOpStartIndex][1]+numCLValueArray[3]+numCLValueArray[3]/2) //h
      up.push(responseLocal[dataPosition][preOpStartIndex][1]+numCLValueArray[2]-numCLValueArray[3]/2) //l
      up.push(0) //v
      up.push(0) //p
      up.push("0000-00-00") //d
      up.push("00:00:00") //t
    var down = []
      down.push(responseLocal[dataPosition][preOpStartIndex][1]-numCLValueArray[2]) //o
      down.push(responseLocal[dataPosition][preOpStartIndex][1]-numCLValueArray[3]) //c
      down.push(responseLocal[dataPosition][preOpStartIndex][1]-numCLValueArray[2]+numCLValueArray[3]/2) //h
      down.push(responseLocal[dataPosition][preOpStartIndex][1]-numCLValueArray[3]-numCLValueArray[3]/2) //l
      down.push(0) //v
      down.push(0) //p
      down.push("0000-00-00") //d
      down.push("00:00:00") //t

      for (let index = preOpStartIndex+1; index < preOpStartIndex+preOpLength+1; index++) {
        if(responseLocal[dataPosition][index-1][1]>responseLocal[dataPosition][index-1][0]){
          responseLocal[dataPosition][index] = down;
        }else{
          responseLocal[dataPosition][index] = up;
        }
      }
    }
    // console.log("responseLocal[dataPosition]",responseLocal[dataPosition],responseLocal[dataPosition].length);

    Kdata = []
    if(startIndex+windowLength>pointIndex){
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,pointIndex+1))
    }else{
      Kdata = deepCopyArray(responseLocal[dataPosition].slice(startIndex,startIndex+windowLength))
    }
    VisibleData.push(Kdata)
    console.log("VisibleData[dataPosition]",dataPosition,VisibleData[dataPosition].length,Kdata.length,VisibleData[dataPosition])
  }else{VisibleData.push([])}

  return VisibleData
}


function getRandomInt(min, max) { //[min,max]闭区间
  min = Math.ceil(min); // 向上取整
  max = Math.floor(max); // 向下取整
  var rtl = Math.floor(Math.random() * (max - min + 1)) + min;
  return rtl;
}
function getRandomIntWithSign(min, max) { //[min,max]闭区间
  min = Math.ceil(min); // 向上取整
  max = Math.floor(max); // 向下取整
  var rtl = Math.floor(Math.random() * (max - min + 1)) + min;
  // console.log(rtl,rtl);
  // if(simple.length<simpleCap){simple.push(rtl)}

  if(Math.random()>=numCLValueArray[4]/10000){
    // console.log("变号");
    rtl = -rtl;
    negative++
  }else{
    // console.log("不变");
    positive++
  }
  // simple.push(rtl)
  SumPositiveAndNegativeVals += rtl
  // console.log("rtl",rtl);
  return rtl;
}


function unitReport(dataPosition,step){

  for (let index = rpForK.length; index < step; index++) {
    rpForK.push([0,0,0])
  }
  for (let index = rpForMA.length; index < step; index++) {
    rpForMA.push([0,0])
  }
  for (let index = rpForKDJ.length; index < step; index++) {
    rpForKDJ.push([0,0])
  }
  for (let index = rpNK.length; index < afterNK.length; index++) {
    rpNK.push([])
    for (let index2 = rpNK[index].length; index2 < 3; index2++) {
      rpNK[index].push([0,0])
    }
  }

  var text = ""
  var tpText1 = ""
  text += "\nunitReport:"
  text += "\nFor BASIC:\n"
  text += "positive "+(positive-positiveOld)+"\n"
  text += "negative "+(negative-negativeOld)+"\n"
  // text += "SumPositiveAndNegativeVals "+(SumPositiveAndNegativeVals-SumPositiveAndNegativeValsOld)+"\n"
  text += "SPNVal "+(SumPositiveAndNegativeVals-SumPositiveAndNegativeValsOld)+"\n"
  var rpOpTime = rpForK[0][0]+rpForK[0][1]+rpForK[0][2]+1
  // console.log("rpForK",rpForK)
  text += "次数 "+(rpOpTime)+"\n"
  // text += "simple  "+simple+"\n\n"
  text += "\nFor K:\n"
  for (let index = 1; index <= step; index++) {
    // text += "第"+index+"步OC "
    tpText1 = ""
    tpText1 += "K"+index+" "
    if(responseLocal[dataPosition][preOpStartIndex+index-1][1]<responseLocal[dataPosition][preOpStartIndex+index][1]){
      tpText1 += " 涨"
      rpForK[index-1][0]++
    }else if(responseLocal[dataPosition][preOpStartIndex+index-1][1]>responseLocal[dataPosition][preOpStartIndex+index][1]){
      tpText1 += " 跌"
      rpForK[index-1][1]++
    }else{
      tpText1 += " 平"
      rpForK[index-1][2]++
    }   
    tpText1 += "  "+responseLocal[dataPosition][preOpStartIndex+index].slice(0,2)+"\n"
    if(index <= 3){text += tpText1}
  }
  text += "\nFor MA:\n"
  for (let index = 1; index <= step; index++) {
    tpText1 = ""
    // text += "第"+index+"步MA "
    tpText1 += "MA"+index+" "
    // console.log(Price_Average_Line);
    var a = (Price_Average_Line[dataPosition][0][1][preOpStartIndex]-Price_Average_Line[dataPosition][1][1][preOpStartIndex])
    if(a==0){
      a = (Price_Average_Line[dataPosition][0][1][preOpStartIndex+1]-Price_Average_Line[dataPosition][1][1][preOpStartIndex+1])
    }
    var b = (Price_Average_Line[dataPosition][0][1][preOpStartIndex+index]-Price_Average_Line[dataPosition][1][1][preOpStartIndex+index])
    if(a*b>0){
      tpText1 += "保持"
      rpForMA[index-1][0]++
    }else{
      tpText1 += "交叉"
      rpForMA[index-1][1]++
    }
    tpText1 += "  "+Price_Average_Line[dataPosition][0][1][preOpStartIndex+index]+"  "+Price_Average_Line[dataPosition][1][1][preOpStartIndex+index]+"\n"
    if(index <= 3){text += tpText1}
  }
  text += "\nFor KDJ:\n"
  for (let index = 1; index <= step; index++) {
    tpText1 = ""
    // text += "第"+index+"步KDJ "
    tpText1 += "KDJ"+index+" "
    var a = (KDJ_data[dataPosition][0][1][preOpStartIndex]-KDJ_data[dataPosition][0][3][preOpStartIndex])
    if(a==0){
      a = (KDJ_data[dataPosition][0][1][preOpStartIndex+1]-KDJ_data[dataPosition][0][3][preOpStartIndex+1])
    }
    var b = (KDJ_data[dataPosition][0][1][preOpStartIndex+index]-KDJ_data[dataPosition][0][3][preOpStartIndex+index])
    if(a*b>0){
      tpText1 += " 保持"
      rpForKDJ[index-1][0]++
    }else{
      tpText1 += " 交叉"
      rpForKDJ[index-1][1]++
    }
    tpText1 += "  "+KDJ_data[dataPosition][0][1][preOpStartIndex+index]+"  "+KDJ_data[dataPosition][0][2][preOpStartIndex+index]+"\n"
    if(index <= 3){text += tpText1}
  }
  {
    for (let index = 0; index < afterNK.length; index++) {
      text += "\nFor "+afterNK[index]+"K:\n"
      var changeR = Num_round((responseLocal[dataPosition][preOpStartIndex+afterNK[index]][1]-responseLocal[0][preOpStartIndex][1])/responseLocal[0][preOpStartIndex][1],4)*100
      if(changeR>0){
        rpNK[index][0][0]++
        rpNK[index][0][1]+= changeR
        text += " "+afterNK[index]+"K涨"+" "+changeR+"%"
      }else if(changeR<0){
        rpNK[index][1][0]++
        rpNK[index][1][1]+= changeR
        text += " "+afterNK[index]+"K跌"+" "+changeR+"%"
      }else{
        rpNK[index][2][0]++
        rpNK[index][2][1]+= changeR
        text += " "+afterNK[index]+"K平"+" "+changeR+"%"
      }
    }
  }
    // console.log("dataPosition",dataPosition)
    // console.log(responseLocal[0][preOpStartIndex][1],responseLocal[dataPosition][preOpStartIndex+10][1],changeR)
    // for (let index = 0; index < responseLocal.length; index++) {
    //   if(responseLocal[index].length>preOpStartIndex+10){
    //     console.log(responseLocal[index][preOpStartIndex+10],index)
    //   }
    // }
  
  // console.log(rpForK,rpForMA,rpForKDJ);

  // console.log(text);
  // console.log("simple",simple,"\n\n\n");

  // console.log("\n\n\nreport");
  // console.log("positive",positive-positiveOld);
  // console.log("negative",negative-negativeOld);
  // console.log("SumPositiveAndNegativeVals",SumPositiveAndNegativeVals-SumPositiveAndNegativeValsOld);
  // console.log("simple",simple);
  // console.log("\n\n");

  positiveOld = positive
  negativeOld = negative
  SumPositiveAndNegativeValsOld = SumPositiveAndNegativeVals
  // simple = []
  return text
}
function generalReport(step){
  // console.log(rpForK);
  if(step>30){step=30;}

  var text = ""
  var tpText1 = ""
  var tpText2 = ""
  var rates = [0,0,0,0,0,0,0,0,0]
  
  text += "<div style ='margin:25px;'>"
  text += "\ngeneralReport:"
  text += "\nFor BASIC:\n"
  text += "positive "+(positive)+"\n"
  text += "negative "+(negative)+"\n"
  text += "SPNVal "+(SumPositiveAndNegativeVals)+"\n"
  var rpOpTime = rpForK[0][0]+rpForK[0][1]+rpForK[0][2]
  text += "次数 "+(rpOpTime)+"\n\n"
  preOpStartIndex = startIndex + crossIdx
  if(preOpStartIndex<basicDataLength-preOpLength && basicDataLength>1){ 
    text += "次日最高 "+Num_round((responseLocal[0][preOpStartIndex+1][2]-
      responseLocal[0][preOpStartIndex][1])/responseLocal[0][preOpStartIndex][1],4)*100+"%\n"
    text += "次日最低 "+Num_round((responseLocal[0][preOpStartIndex+1][3]-
      responseLocal[0][preOpStartIndex][1])/responseLocal[0][preOpStartIndex][1],4)*100+"%\n"
    text += "次日收盘 "+Num_round((responseLocal[0][preOpStartIndex+1][1]-
      responseLocal[0][preOpStartIndex][1])/responseLocal[0][preOpStartIndex][1],4)*100+"%\n\n"         
  }
  if(preOpStartIndex<basicDataLength-preOpLength-1 && basicDataLength>2){ 
    text += "次二日最高 "+Num_round((responseLocal[0][preOpStartIndex+2][2]-
      responseLocal[0][preOpStartIndex][1])/responseLocal[0][preOpStartIndex][1],4)*100+"%\n"
    text += "次二日最低 "+Num_round((responseLocal[0][preOpStartIndex+2][3]-
      responseLocal[0][preOpStartIndex][1])/responseLocal[0][preOpStartIndex][1],4)*100+"%\n"
    text += "次二日收盘 "+Num_round((responseLocal[0][preOpStartIndex+2][1]-
      responseLocal[0][preOpStartIndex][1])/responseLocal[0][preOpStartIndex][1],4)*100+"%\n\n"   
    }

     text += "</div>"
 
  text += "<div style ='margin:25px;'>"
  text += "\nFor K:\n"
  tpText1 = ""
  tpText2 = ""
  for (let index = 1; index <= step; index++) {
    if(index==step+2){index=preOpLength;}
    rates[0] = Num_round(rpForK[index-1][0]/rpOpTime,4)*100;
    rates[1] = Num_round(rpForK[index-1][1]/rpOpTime,4)*100;
    rates[2] = Num_round(rpForK[index-1][2]/rpOpTime,4)*100;
    if(rates[0]>rates[1]){tpText1+=" ↑ ";}
    else if(rates[0]<rates[1]){tpText1+=" ↓ ";}
    else{tpText1+=" - ";}
    tpText2 += "|_ 第"+index+"步K: \n"
    // text += "|_OC"+index+": \n"
    tpText2 += "|_ _ _ 涨 _ _ " + rpForK[index-1][0] + " _ _ "+rates[0]+"%\n"
    tpText2 += "|_ _ _ 跌 _ _ " + rpForK[index-1][1] + " _ _ "+rates[1]+"%\n"
    tpText2 += "|_ _ _ 平 _ _ " + rpForK[index-1][2] + " _ _ "+rates[2]+"%\n"
    tpText2 += "|_ _ _ 差 _ _ " + Math.abs(rpForK[index-1][0]-rpForK[index-1][1]) + " _ _ _ _ "+Math.abs(rates[0]-rates[1])+"%\n"
  }
  text+= ""+tpText1+"\n";
  text+=tpText2;
  text += "</div>"
  
  text += "<div style ='margin:25px;'>"
  text += "\nFor MA:\n"
  tpText1 = ""
  tpText2 = ""
  for (let index = 1; index <= step; index++) {
    rates[0] = Num_round(rpForMA[index-1][0]/rpOpTime,4)*100;
    rates[1] = Num_round(rpForMA[index-1][1]/rpOpTime,4)*100;
    if(rates[0]>rates[1]){tpText1+=" ↑ ";}
    else if(rates[0]<rates[1]){tpText1+=" ↓ ";}
    else{tpText1+=" - ";}
    tpText2 += "|_ 第"+index+"步MA: \n"
    // text += "|_ MA"+index+": \n"
    tpText2 += "|_ _ _ 保持 _ _ " + rpForMA[index-1][0] + " _ _ "+rates[0]+"%\n"
    tpText2 += "|_ _ _ 交叉 _ _ " + rpForMA[index-1][1] + " _ _ "+rates[1]+"%\n"
    tpText2 += "|_ _ _ 差值 _ _ " + Math.abs(rpForMA[index-1][0]-rpForMA[index-1][1]) + " _ _ _ _ _ _ "+Math.abs(rates[0]-rates[1])+"%\n"
  }
  text+= ""+tpText1+"\n";
  text+=tpText2;
  text += "</div>"
  
  text += "<div style ='margin:25px;'>"
  text += "\nFor KDJ:\n"
  tpText1 = ""
  tpText2 = ""
  for (let index = 1; index <= step; index++) {
    rates[0] = Num_round(rpForKDJ[index-1][0]/rpOpTime,4)*100;
    rates[1] = Num_round(rpForKDJ[index-1][1]/rpOpTime,4)*100;
    if(rates[0]>rates[1]){tpText1+=" ↑ ";}
    else if(rates[0]<rates[1]){tpText1+=" ↓ ";}
    else{tpText1+=" - ";}
    tpText2 += "|_ 第"+index+"步KDJ: \n"
    // text += "|_ KDJ"+index+": \n"
    tpText2 += "|_ _ _ 保持 _ _ " + rpForKDJ[index-1][0] + " _ _ "+Num_round(rpForKDJ[index-1][0]/rpOpTime,4)*100+"%\n"
    tpText2 += "|_ _ _ 交叉 _ _ " + rpForKDJ[index-1][1] + " _ _ "+Num_round(rpForKDJ[index-1][1]/rpOpTime,4)*100+"%\n"
    tpText2 += "|_ _ _ 差值 _ _ " + Math.abs(rpForKDJ[index-1][0]-rpForKDJ[index-1][1]) + " _ _ _ _ _ _ "+Math.abs(rates[0]-rates[1])+"%\n"
  }
  text+= ""+tpText1+"\n";
  text+=tpText2;
  text += "</div>"


  text += "<div style ='margin:25px;'>"

  for(var i=0;i<afterNK.length;i++){
    var afterNKi = Math.floor(afterNK[i]);

    text += "\nFor "+afterNKi+"K:\n"
    rates[0] = Num_round(rpNK[i][0][0]/rpOpTime,4)*100;
    rates[1] = Num_round(rpNK[i][1][0]/rpOpTime,4)*100;
    rates[2] = Num_round(rpNK[i][2][0]/rpOpTime,4)*100;
    text += "|_ _ _ "+afterNKi+"K涨"+" _ _ "+rpNK[i][0][0]+" _ _ "+rates[0]+"% _ _ 平均："
    if(rpNK[i][0][0]>0){text += rpNK[i][0][1]/rpNK[i][0][0]+"%\n";}
    else{text += "0%\n";}
    text += "|_ _ _ "+afterNKi+"K跌"+" _ _ "+rpNK[i][1][0]+" _ _ "+rates[1]+"% _ _ 平均："
    if(rpNK[i][1][0]>0){text += rpNK[i][1][1]/rpNK[i][1][0]+"%\n";}
    else{text += "0%\n";}
    text += "|_ _ _ "+afterNKi+"K平"+" _ _ "+rpNK[i][2][0]+" _ _ "+rates[2]+"% _ _ 平均："
    if(rpNK[i][2][0]>0){text += rpNK[i][2][1]/rpNK[i][2][0]+"%\n";}
    else{text += "0%\n";}
    text += "|_ _ _ "+afterNKi+"K差 _ _ " + Math.abs(rpNK[i][0][0]-rpNK[i][1][0]) + " _ _ _ _ "+Math.abs(rates[0]-rates[1])+"%\n"
    text += "|_ _ _ "+afterNKi+"K期望 _ _ " + Num_round((rpNK[i][0][1]+rpNK[i][1][1]+rpNK[i][2][1])/rpOpTime,4) + "% _ _ _ _ "+"\n\n"
  }
  // text += rpNK
  text += "</div>"

  console.log(text);
  return text
}


function displayCanvasAsImage(canvas,scanvas,fileName,info) {
  const dataURL = canvas.toDataURL('image/png'); // 将 Canvas 内容转换为 Base64 编码的 PNG 图片
  const sdataURL = scanvas.toDataURL('image/png'); // 将 Canvas 内容转换为 Base64 编码的 PNG 图片

  // 创建图片元素
  const img = document.createElement('img');
  img.src = dataURL;
  img.alt = fileName || 'canvas_image.png';
  img.style.width = '43vw'; // 设置图片宽度为 86vw
  img.style.height = 'auto'; // 保持长宽比
  img.style.border = '1px solid white'; // 添加白色边框

  // 创建图片元素
  const simg = document.createElement('img');
  simg.src = sdataURL;
  simg.alt = fileName || 'canvas_image.png';
  simg.style.width = '43vw'; // 设置图片宽度为 86vw
  simg.style.height = 'auto'; // 保持长宽比
  simg.style.border = '1px solid white'; // 添加白色边框

  // 创建一个容器 div
  const imageBar = document.createElement('div');
  // infoBar.style.width = '48.5vw'; // 设置图片宽度为 86vw
  // infoBar.style.border = '1px solid white'; // 添加白色边框
  // infoBar.style.marginTop = '10px'; // 设置容器的上边距
  // infoBar.style.marginBottom = '10px'; // 设置容器的上边距
  imageBar.style.flexDirection = 'column';
  imageBar.style.display = 'flex';
  imageBar.style.alignItems = 'center';
  imageBar.appendChild(img);
  imageBar.appendChild(simg);
  //infoBar.appendChild(p);


  // 创建 a 标签
  const a = document.createElement('a');
  a.style.fontSize = "10px"
  a.href = dataURL;
  a.download = fileName || 'canvas_image.png';
  // a.textContent = fileName || 'canvas_image.png';
  a.textContent = "下载图片"
  // a.style.marginLeft = '10px'; // 设置 a 标签的左边距
  a.style.textAlign = 'left'; // 设置内容靠左对齐
  a.style.display = 'block'; // 确保 a 标签占满整行
  a.style.alignSelf = 'flex-start'; // 对齐方式

  // 创建 p 标签
  const p = document.createElement('p');
  p.style.fontSize = "10px"
  p.style.fontSize = "0.7vw"
  p.style.color = "white"
  // p.textContent = "ind\nio\nddddad"; // 设置 p 标签的文本内容
  // p.innerText = "ind\nio\nad"; // 设置 p 标签的文本内容
  p.innerText = info || 'Additional information'; // 设置 p 标签的文本内容
  p.style.marginLeft = '10px'; // 设置 p 标签的左边距
  //p.style.verticalAlign = 'left'; // 对齐方式


  // 创建一个infoBar容器 div
  const infoBar = document.createElement('div');
  // infoBar.style.width = '48.5vw'; // 设置图片宽度为 86vw
  // infoBar.style.border = '1px solid white'; // 添加白色边框
  // infoBar.style.marginTop = '10px'; // 设置容器的上边距
  // infoBar.style.marginBottom = '10px'; // 设置容器的上边距
  infoBar.style.flexDirection = 'column';
  infoBar.style.display = 'flex';
  infoBar.style.alignItems = 'center';
  infoBar.appendChild(a);
  infoBar.appendChild(p);
  //infoBar.appendChild(p);

  // 创建一个容器 div
  const container = document.createElement('div');
  container.style.width = '48.5vw'; // 设置图片宽度为 86vw
  container.style.border = '1px solid white'; // 添加白色边框
  container.style.marginTop = '10px'; // 设置容器的上边距
  container.style.marginBottom = '10px'; // 设置容器的上边距

  container.style.display = 'flex';
  container.style.alignItems = 'center';
  // container.appendChild(img);
  // container.appendChild(simg);
  //container.appendChild(a);
  //container.appendChild(p);
  
  container.appendChild(imageBar);
  container.appendChild(infoBar);

  // 获取或创建 downloadList
  if (!downloadList) {
      downloadList = document.createElement('div');
      downloadList.id = 'downloadList';
      document.body.appendChild(downloadList);
      // 1. 让子元素水平排列
      downloadList.style.display = 'flex';
      // 2. 装不下时自动换行
      downloadList.style.flexWrap = 'wrap';
  }
  // 将容器添加到 downloadList
  downloadList.appendChild(container);

  // 触发下载
  // a.click();
}

// wasted
function preOparation(){
  responseLocal = []
  responseLocal.push(deepCopyArray(resetResponseLocal[0]));

  windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
  basicDataLength = responseLocal[0].length
  subDataLength = (responseLocal[0][0].length-1)/5+1
  FinalSubDataLength = subDataLength
  for (let i = 0; i < subDataLength; i++) {
    FinalSubDataLength = i;
    if (responseLocal[0][responseLocal[0].length-1][i] == 0) {
      break
    }
  }
  if(basicDataLength>windowLength){
    maxStartIndex = basicDataLength-windowLength;//刚好对应下标
  }
  else{
    maxStartIndex = 0;
  }  

    startIndex = maxStartIndex;
    pointIndex = basicDataLength-1;
    subEndIndex = subDataLength;
    availableStartIndex = maxStartIndex;

  Price_Average_Line = []
  KDJ_data = []

  preOparationMethod[0] = 1

  PrintLimitPositionVariables("preOparation")
}
//总管理
// top manager function _____FUNCTION  fixed
function refreshDraw(IndexsSwitch,reGenData=false){
  console.log("refreshDraw()");
  generateVisablelData(reGenData);
  // console.log("visible",VisibleData);
//________________for main chart draw
{
  // static
  {
    MAINctx.clearRect(0,0,MAINcanvas.width,MAINcanvas.height)
    MAINcanvas.height = MainchartHeight
    MAINcanvas.width = MainchartWidth
    // pointPrice
    var pricechangeR = 0
    var pointPriceIdn = 0

    if(startIndex==availableStartIndex || true){
      if(startIndex + VisibleData[0].length>basicDataLength-preOpLength-1){
        pointPriceIdn = basicDataLength-preOpLength-1
      }else{
        pointPriceIdn = startIndex + VisibleData[0].length-1
      }
      pointPrice.textContent = responseLocal[0][pointPriceIdn][1]
      if(basicDataLength-preOpLength-1>0){
        pricechangeR = Num_round((responseLocal[0][pointPriceIdn][1]-responseLocal[0][pointPriceIdn-1][1])/responseLocal[0][pointPriceIdn-1][1]*100,2)
      }else{
        pricechangeR = Num_round((responseLocal[0][pointPriceIdn][1]-responseLocal[0][pointPriceIdn][0])/responseLocal[0][pointPriceIdn][0]*100,2)
      }
      pointPriceChange.textContent = pricechangeR+"%"
    }
    // set pointPrice color
    if(pricechangeR>0){
      pointPrice.style.color="#FF0021"
      pointPriceChange.style.color="#FF0021"
    }else if(pricechangeR<0){
      pointPrice.style.color="#00FFFF"
      pointPriceChange.style.color="#00FFFF"
    }else{
      pointPrice.style.color="white"
      pointPriceChange.style.color="white"
    }
  }

  // highest and lowest price
  maxPrice = 0
  minPrice = VisibleData[0][0][0]
  for (let j = 0; j < VisibleData[0].length; j++) {
    if(preOparationMethod[j]==1){
      for (let i = 0; i < VisibleData[0].length; i++) {
        if(VisibleData[j][i][2]>maxPrice){maxPrice = VisibleData[j][i][2]}
        if(VisibleData[j][i][3]<minPrice){minPrice = VisibleData[j][i][3]}
      }
    }    
  }  
  // get avrage height per pricce
  MCaverage = Num_round(MainchartHeight / (maxPrice - minPrice),4)
  // make it heighted
  VisibleHeighted = []
  for (let n = 0; n < VisibleData[0].length; n++) {
    VisibleHeighted.push([])
    if(preOparationMethod[n]==1){
      for(var i = 0;i<VisibleData[n].length;i++){
        temp = []
        for(var j = 0;j<4;j++){
          temp.push(Num_round(MainchartHeight - (VisibleData[n][i][j]-minPrice)*MCaverage,3))
        }
        // push date
        VisibleHeighted[n].push(temp)
      }
    }
  }
  // draw k
  // drawTest(100,0,300,500)
  for (let n = 0; n < VisibleData.length; n++) {
    if(preOparationMethod[n]==1){
      var colores = ["#00FFFF","#FF5C5C","white"]
      if(n != 0){colores = ["rgb(30, 255, 0)","rgb(252, 255, 132)","#c90c93"]}
      if(n == 0){
        // console.log("startIndex+i",startIndex+i,"basicDataLength+preOpLength-1)",basicDataLength-preOpLength-1)
        for(var i = 0;i<VisibleHeighted[n].length;i++){
          if(startIndex+i<=basicDataLength-preOpLength-1){
            drawK(VisibleHeighted[n][i].slice(0,4),drawGap+i*(drawGap+chartItemWidth),0,colores,false)
            // masking(preOpStartIndex-startIndex+1,preOpStartIndex-startIndex+preOpLength+1,MAINctx,MainchartHeight,"rgba(67, 67, 67, 0.05)")
          }
        } 
      }else{
        for(var i = 0;i<VisibleHeighted[n].length;i++){
          if(startIndex+i>preOpStartIndex && startIndex+i<preOpStartIndex+preOpLength+1){
            drawK(VisibleHeighted[n][i].slice(0,4),drawGap+i*(drawGap+chartItemWidth),0,colores,true)
          }
        }
      }
    }      
  }
}
//________________for sub chart draw
{
  // static
  {
    SUBctx.clearRect(0,0,SUBcanvas.width,SUBcanvas.height)
    SUBcanvas.height = SubchartHeight
    SUBcanvas.width = MainchartWidth
  }

  // VOLUME
    if(IndexsSwitch[0]==1){
      //*Volume(chartItemWidth,5,"draw",saveTo=Volume_G_data)
    }
  // anverage
  refMinAvarage = [[null,null],null]
  if(IndexsSwitch[1]==1){
      // Price_Average_Line.push([])
      for (let j = 0; j < VisibleData.length; j++) {
        if(preOparationMethod[j]==1){
          if(Price_Average_Line.length-1<j){Price_Average_Line.push([])}
          var colores = [["white"],["yellow"],["green"],["red"],["green"],["purple"]]
          if(j != 0){colores = [["rgb(214, 92, 21)"],["rgb(214, 92, 21)"],["rgb(214, 92, 21)"],["red"],["green"],["purple"]];Price_Average_Line[j]=[];}
          formulaRunner("Price_Average",j,1,Price_Average_Line[j],2,[4,18,30],colores,[null,null],[1],[minPrice,minPrice],MCaverage,MAINctx,MainchartHeight,checkAvaMin=false)
          refMinAvarage = [[null,null],null]
          if(j == 0){masking(preOpStartIndex-startIndex,preOpStartIndex-startIndex+preOpLength+1,MAINctx,MainchartHeight,"rgba(67, 67, 67, 0.3)");console.log("MA masking")}
        }
      }
    }
  // NKD / KDJ
    refMinAvarage = [[null,null],null]
    if(IndexsSwitch[2]==1){
      // KDJ_data.push([])
      for (let j = 0; j < VisibleData.length; j++) {
        if(preOparationMethod[j]==1){
          if(KDJ_data.length-1<j){KDJ_data.push([])}
          var colores = [["yellow","white","purple",]]
          if(j != 0){colores = [["rgb(214, 92, 21)","rgb(214, 92, 21)","rgb(214, 92, 21)",]];KDJ_data[j]=[];}
          // 基于最高低价
          // refMinAvarage = formulaRunner("KDJ",j,[1,2,3],KDJ_data[j],4,[[9,3,3]],colores,[1,2,3],[1,2,3],refMinAvarage[0],refMinAvarage[1],SUBctx,SubchartHeight,checkAvaMin=true)
          // 基于开收盘价
          refMinAvarage = formulaRunner("KDJ",j,[1,0,1],KDJ_data[j],4,[[18,6,6]],colores,[1,2,3],[1,2,3],refMinAvarage[0],refMinAvarage[1],SUBctx,SubchartHeight,checkAvaMin=true)
          if(j == 0){masking(preOpStartIndex-startIndex,preOpStartIndex-startIndex+preOpLength+1,SUBctx,SubchartHeight,"rgba(67, 67, 67, 0.3)");console.log("KDJ masking");}
        }    
      }
    }
}
  drawRefMidLine(guanLianInd,MAINctx,MainchartHeight,SUBctx,SubchartHeight,"gray")
  console.log("\n!-------------------分割线---------------------------------------------------\n")
}



}

// ______indexes chart draw functions____________________________________________________________________________
{
  // Volume(width,dataIndex,averangeDraw)
  // drawAverageLineVolume(data,dataIndex,maxPV,indexStart,heightAverage,sumAverage,boxWidth,color,fiveFlag)
  // drawAverageLine(sumPriod,dataPosition,dataIndex,Min,CAverage,color,Ctx,CtxHeight,drawFlag,type)
{
// Num_round_____FUNCTION
function Num_round(num,dgree){
  num = num*(10**dgree)
  num = Math.round(num)
  num = num/(10**dgree)
  // const fixed = num.toFixed(dgree);      // "7.00"  字符串
  // num   = Number(num.toFixed(dgree)); // 7
  // console.log("num",num);
  return num
}

// draw Iv_____FUNCTION
function MACD(data,dataIndex,indexStart,sumAverage1,sumAverage2,sumAverage3,fiveFlag,lastData,boxWidth,MACD_data){
  boxWidth = boxWidth/2
  // console.log("indexStart",indexStart)

  EMA1 = EMA(data,dataIndex,indexStart,sumAverage1,fiveFlag,0,MACD_data)[0]
  // console.log("MACD_data[0]",MACD_data[0])
  console.log("EMA1",EMA1)
  EMA2 = EMA(data,dataIndex,indexStart,sumAverage2,fiveFlag,1,MACD_data)
  DIF = EMA2[1]
  DEA = EMA2[2]
  EMA2 = EMA2[0]
  console.log("EMA2",EMA2)
  console.log("DIF", DIF)
  console.log("DEA", DEA)

  iStart = 0
  for(var i = 0;i<EMA2.length;i++){
    if(EMA2[i] == 0){iStart++;}
    else{break}
  }

  max = 0
  min = 0
  max = Math.max.apply(null, DIF.concat(DEA));
  min = Math.min.apply(null, DIF.concat(DEA));
  dict = Math.abs(parseInt((max-min).toFixed(4)*100000)/100000)
  console.log("max",max,"min",min,"dict",dict)






   
  lineDataDIF = []
  lineDataDEA = []

  DIF.forEach(element => {
    lineDataDIF.push(2*(Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,2)))
  });
  console.log("lineDataDIF",lineDataDIF)

  DEA.forEach(element => {
    lineDataDEA.push(2*(Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,2)))
  });
  console.log("lineDataDEA",lineDataDEA)









  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = "black";
  SUBctx.beginPath();
  dataIndex = 0
  console.log("iStart",iStart)
  SUBctx.moveTo(2*(5+iStart*20+boxWidth / 2),lineDataDIF[iStart])
  for(var i = iStart;i<lineDataDIF.length;i++){
      SUBctx.lineTo(2*(5+i*20+boxWidth / 2),lineDataDIF[i])
  };
  SUBctx.stroke();

  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = "green";
  SUBctx.beginPath();
  dataIndex = 0
  SUBctx.moveTo(2*(5+iStart*20+boxWidth / 2),lineDataDEA[iStart])
  for(var i = iStart;i<lineDataDEA.length;i++){
      SUBctx.lineTo(2*(5+i*20+boxWidth / 2),lineDataDEA[i])
  };
  SUBctx.stroke();


  // boxWidth = boxWidth*2
  SUBctx.fillStyle = "red"
  for(var i = iStart;i<lineDataDEA.length;i++){
    // SUBctx.fillStyle = volumeData[index][1];
    data = 2*(lineDataDIF[i]-lineDataDEA[i])
    // console.log("lineDataDIF",lineDataDIF[i],"lineDataDEA",lineDataDEA[i],"data",data)
    if(data<0){SUBctx.fillStyle = "red"}
    else{SUBctx.fillStyle = "blue"}
    data = Math.abs(data)
    // console.log("final",2*SubchartHeight-2*(lineDataDIF[i]-lineDataDEA[i]))
    // SUBctx.fillRect(2*(4.5+i*20), 2*SubchartHeight-data, 5,data);
    SUBctx.fillRect(2*(boxWidth-2.5+i*20), 2*SubchartHeight-data, 5,data);
    // console.log(2*(4.5+i*20), 2*SubchartHeight-data, boxWidth,data)
  }
}
// draw Iv_EMA_____FUNCTION 
// (Kdata,dataIndex=10,maxV,offsetX,average,sumAverage=5,20,"#0000FF",fiveFlag)
function EMA(data,dataIndex,indexStart,sumAverage,fiveFlag,MACDposition,MACD_data){
  // console.log(data)
  if(MACD_data[MACDposition].length<sumAverage){
    // console.log("push zeros")
    for(var i = 0;i<sumAverage-1;i++){
      MACD_data[MACDposition].push(0)
      if(MACDposition==1){
        MACD_data[2].push(0)
        MACD_data[3].push(0)
      }
    }
    MACD_data[MACDposition].push(data[sumAverage-1][dataIndex])
    if(MACDposition==1 && MACD_data[0].length >= sumAverage-1){
      // console.log("NNNNNN",MACD_data[0])
      // console.log("NNNNNN",MACD_data[0][sumAverage-1],MACD_data[1][sumAverage-1],MACD_data[0].length,MACD_data[1].length)
      // // MACD_data[2].push(100)
      // // MACD_data[2].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
      // // MACD_data[3].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
      MACD_data[2].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
      MACD_data[3].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
    }
  }
  // console.log("oooo",MACD_data[0].length,sumAverage)
  // console.log("MACD_dataM",MACD_data)

  if(MACDposition==1 && MACD_data[0].length == sumAverage){
    // console.log("NNMNNN",MACD_data[0][sumAverage-1],MACD_data[1][sumAverage-1])
    MACD_data[2].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
    MACD_data[3].push(MACD_data[0][sumAverage-1]-MACD_data[1][sumAverage-1])
  }

  indexEnd = offsetX+KdataVisible.length-1
  if(indexEnd>data.length-1){indexEnd = data.length-1}
  // console.log("EMA indexEnd",indexEnd)

  if(indexEnd>MACD_data[MACDposition].length-1){
    Kbase = sumAverage+1
    K2 = 2/Kbase
    K11 = 1-K2
    EMAData = []
    // console.log("EMA Kbase",Kbase)
    if(newIndexStart=MACD_data[MACDposition].length-1){
      // console.log("the",newIndexStart,MACD_data[MACDposition].length,indexEnd)
      newIndexStart = MACD_data[MACDposition].length
    }
    // console.log("new in section",newIndexStart,indexEnd)

    for( ;newIndexStart<=indexEnd;newIndexStart++){
      // console.log("rst:",data[newIndexStart][dataIndex]*K2+MACD_data[MACDposition][newIndexStart-1]*K11,"rsc:","two",data[newIndexStart][dataIndex],"eleven",MACD_data[newIndexStart-1],"on",data[newIndexStart])
      if(MACDposition==1){
      // console.log("EM2CHECK","r",data[newIndexStart][dataIndex]*K2+MACD_data[MACDposition][newIndexStart-1]*K11,"n",data[newIndexStart][dataIndex],"p",MACD_data[MACDposition][newIndexStart-1])
      }
      MACD_data[MACDposition].push(data[newIndexStart][dataIndex]*K2+MACD_data[MACDposition][newIndexStart-1]*K11)
      //DIF
      if(MACDposition==1){
        MACD_data[2].push(MACD_data[0][newIndexStart]-MACD_data[1][newIndexStart])
        MACD_data[3].push(MACD_data[2][newIndexStart]*0.2+MACD_data[2][newIndexStart-1]*0.8)
      }
    }
  }

  EMAData = deepCopyArray(MACD_data[MACDposition].slice(indexStart,indexEnd+1))
  dif = []
  dea = []
  if(MACDposition==1){
    dif = deepCopyArray(MACD_data[2].slice(indexStart,indexEnd+1))
    dea = deepCopyArray(MACD_data[3].slice(indexStart,indexEnd+1))
  }
  return [EMAData,dif,dea]
}
// draw IV_SMA_____ITEM FUNCTION
function SMA_wasted(data,dataIndex,indexStart,sumAverage,fiveFlag,lastData){
  SMAData = []
  indexEnd = offsetX+1+KdataVisible.length
  if(indexEnd>data.length+1){indexEnd = data.length+1}

  while(indexStart<sumAverage-1){
    SMAData.push(0)
    indexStart += 1
  }
  if(fiveFlag){indexEnd--}
  while(indexStart<indexEnd-1){
    sum = 0
    for(var i = indexStart+1-sumAverage;i<indexStart+1;i++){
      sum += data[i][dataIndex]
    }
    SMAData.push(sum)
    indexStart+=1
  }
  if(fiveFlag && dataIndex<5){
    indexEnd++
    if(indexStart<indexEnd-1){
      sum = 0
      for(var i = indexStart+1-sumAverage;i<indexStart;i++){
        sum += data[i][dataIndex]
      }
      sum += lastData[dataIndex]
      SMAData.push(sum)
    }
  }
  return SMAData
}

// 聚焦信息
// draw focus item info_____FUNCTION
function crossInfo(crossIdx,visibleMax){
  // print("0,date,  1,open,  2,close,  3,high,  4,low,    5,volume,
  //        6,turn,  7,pctChg,  8,peTTM, 9,pbMRQ, 10,psTTM,
  //        11,pcfNcfTTM, 12,isST, 13,preclose")
  // console.log(VisibleData[1][crossIdx])

  var text = ""
  for (let index = 0; index < VisibleData.length; index++) {
    // console.log(startIndex+crossIdx,preOpStartIndex,preOpStartIndex+preOpLength)
    if(preOparationMethod[index]==1 && ((index>0 && startIndex+crossIdx>preOpStartIndex && startIndex+crossIdx<=preOpStartIndex+preOpLength) || index == 0)){
      text += "<div><b>"+index
      if(index == 0){text +=" 原始"}
      else if(index == 1){text +=" 随机"}
      else if(index == 2){text +=" 走高"}
      else if(index == 3){text +=" 走低"}
      else if(index == 4){text +=" 走平"}
      text += ": "
      text += "\n日期："+VisibleData[index][crossIdx][6]  
      text += "\n时间："+VisibleData[index][crossIdx][7]

      text += "\n\n开盘："+VisibleData[index][crossIdx][0]
      text += "\n收盘："+VisibleData[index][crossIdx][1]
      text += "\n最高："+VisibleData[index][crossIdx][2]
      text += "\n最低："+VisibleData[index][crossIdx][3]  
      text += "\n成交量："+VisibleData[index][crossIdx][4]  
      text += "\n持仓量："+VisibleData[index][crossIdx][5]  


      var pricechange = 0
      var pricechangeR = 0
      if(crossIdx>0){
        pricechange = (VisibleData[index][crossIdx][1]-VisibleData[index][crossIdx-1][1]);
        pricechangeR = Num_round(pricechange/VisibleData[index][crossIdx-1][1]*100,2)
      }else{
        pricechange = (VisibleData[index][crossIdx][1]-VisibleData[index][crossIdx][0]);
        pricechangeR = Num_round(pricechange/VisibleData[index][crossIdx][0]*100,2)
      }

      if (pricechangeR > 0) {
          text += '<span style="color: #FF2222;">';
      } else if (pricechangeR < 0) {
          text += '<span style="color: rgb(41, 158, 12);">';
      } else {
          text += '<span style="color: gray;">';
      }

      text += "\n\n涨跌："+ pricechangeR + "%"
      text += "\n收盘："+VisibleData[index][crossIdx][1]
      text += "\n差值："+pricechange +"</span>" + "</div>"
    }
  }
  // text += "<div>\n\nQ  1："+VisibleData[2][crossIdx][Bx_On_Use[0]]
  // text += '<span style="color: rgb(188, 146, 7);">'+"\nMDL："+VisibleData[2][crossIdx][Bx_On_Use[1]]+"</span>"
  // text += "\nQ  3："+VisibleData[2][crossIdx][Bx_On_Use[2]]
  // text += "\nMIN："+VisibleData[2][crossIdx][Bx_On_Use[3]]
  // text += "\nMAX："+VisibleData[2][crossIdx][Bx_On_Use[4]] + "</div>"
  // text += "\n成交："+VisibleData[0][crossIdx][5]
  // text += "\n换手："+VisibleData[0][crossIdx][6] + "%"
  // // print("0,date,  1,open,  2,close,  3,high,  4,low,    5,volume,
  // //        6,turn,  7,pctChg,  8,peTTM, 9,pbMRQ, 10,psTTM,
  // //        11,pcfNcfTTM, 12,isST, 13,preclose")
  // switch (true) {
  //   case VisibleData[0][crossIdx][13]<20:
  //     text += '<span style="color: red;">\n市盈：'+VisibleData[0][crossIdx][13] +"</span>"
  //     break
  //   case VisibleData[0][crossIdx][13]>20 && VisibleData[0][crossIdx][13]<40:
  //     text += '<span style="color: orangered;">\n市盈：'+VisibleData[0][crossIdx][13] +"</span>"
  //     break
  //   default:
  //     text += '<span style="color: rgb(41, 158, 12);">\n市盈：'+VisibleData[0][crossIdx][13] +"<b></span>"
  // }
  // text += "\n市盈："+VisibleData[0][crossIdx][8] + "%"
  // text += "\n市净："+VisibleData[0][crossIdx][9] + "%"
  // text += "\n市销："+VisibleData[0][crossIdx][10] + "%"

  if(crossIdx>=(windowLength/2)){
    CrossInfo.style.right = ""
    CrossInfo.style.left = "0"
    CrossInfo.innerHTML = text
  }else{
    // CrossInfo.style.whiteSpace = 'pre';
    CrossInfo.style.left = ""
    CrossInfo.style.right = "0"
    CrossInfo.innerHTML = text
  }
}

function clearMChart(){
  CrossInfo.innerHTML = ""
  MinsLinectx.fillRect(0,0,MainchartWidth,MainchartHeight)
}

// volume成交量
// draw volume line_____FUNCTION
function Volume(width,dataIndex,averangeDraw,saveTo=Volume_G_data){
  console.log("Volume start:+++++++++++++++++++++++")
  Volume_G_data = []
  var volumeData = []
  for(var i = 0;i<VisibleData[1].length;i++){
    volumeData.push(VisibleData[1][i][dataIndex])
  }
  // console.log("volumeData",volumeData)
  max = Math.max.apply(null, volumeData);
  for(var i = 0;i<volumeData.length;i++){
    color = (function(){
      if(VisibleData[1][i][2]>=VisibleData[1][i][1])return "#DD1144"
      else return "#00FFFF"
    })()
    var heightData = Num_round((volumeData[i]/max)*SubchartHeight,2)
    // console.log("heightData",heightData,"i",i)
    SUBctx.fillStyle = color;
    SUBctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2, SubchartHeight-heightData, width,heightData);
  }
  Volume_G_data.push(volumeData)
  if(averangeDraw == "draw"){
    Vaverage = Num_round(SubchartHeight / (max - 0),15)
    // console.log("Vaverage",Vaverage,"SubchartHeight",SubchartHeight,(max - 0),(max - 0));
    drawAverageLine(5,1,5,0,Vaverage,"#FFFF00",SUBctx,SubchartHeight,"draw","normal",saveTo=Volume_G_data)
    drawAverageLine(10,1,5,0,Vaverage,"#FF00FF",SUBctx,SubchartHeight,"draw","normal",saveTo=Volume_G_data)
  }
  console.log("Volume end:--------------------------")
  // console.log("Volume_G_data volumeData",volumeData)
  return max
}
// volume average line 成交量均线
// draw volume average line_____FUNCTION
function drawAverageLineVolume(data,dataIndex,maxPV,indexStart,heightAverage,sumAverage,boxWidth,color,fiveFlag){
  boxWidth = boxWidth/2
  lineData = []
  indexEnd = offsetX+1+KdataVisible.length
  if(indexEnd>data.length+1){indexEnd = data.length+1}

  while(indexStart<sumAverage-1){
    lineData.push(0)
    indexStart += 1
  }
  if(fiveFlag){indexEnd--}
  while(indexStart<indexEnd-1){
    sum = 0
    for(var i = indexStart+1-sumAverage;i<indexStart+1;i++){
      sum += data[i][dataIndex]
    }
    lineData.push(2*(Num_round(SubchartHeight - SubchartHeight*(sum/sumAverage)/maxPV,2)))
    indexStart+=1
  }

  SUBctx.lineWidth = 2;
  SUBctx.strokeStyle = color;
  SUBctx.beginPath();
  dataIndex = 0
  // console.log("4th",lineData)
  while(lineData[dataIndex]==0){dataIndex+=1}
  SUBctx.moveTo(2*(5+dataIndex*20+boxWidth / 2),lineData[dataIndex])
  dataIndex+=1
  while(dataIndex<lineData.length){
    SUBctx.lineTo(2*(5+dataIndex*20+boxWidth / 2),lineData[dataIndex])
    dataIndex+=1
  }
  SUBctx.stroke();
}
// average line 均线
// draw price average line_____FUNCTION
function drawAverageLine(sumPriod,dataPosition,dataIndex,Min,CAverage,color,Ctx,CtxHeight,drawFlag,type,saveTo=null){
  console.log("drawAverageLine "+drawFlag+"  "+type+" start:+++++++++++++++++++++++")
{
  dataRaw = []
  if(type == "normal"){
    sum = 0  
    // get raw data as array
    for(var i = startIndex;i<=pointIndex;i++){
      sum = 0
      if(i>=sumPriod-1){
        for(var ii=i-sumPriod+1;ii<=i;ii++){
          sum+=responseLocal[dataPosition][ii][dataIndex]
          // console.log("anverage plus",responseLocal[dataPosition][ii],responseLocal[dataPosition][ii][dataIndex])
        }
      }
      if(i==pointIndex && i>=sumPriod-1){
        sum -= responseLocal[dataPosition][pointIndex][dataIndex]
        sum += VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]
        // console.log("anverage replace",VisibleData[dataPosition][VisibleData[dataPosition].length-1])
      }
      // console.log("sum/sumPriod",Num_round(sum,3)/sumPriod,"sum",sum,"sumPriod",sumPriod)
      // console.log("\n!??????????????????????????????##########################\n")
      dataRaw.push(Num_round(sum,3)/sumPriod)
    }
      // lineDataIIF.push((Num_round(SubchartHeight - SubchartHeight*(element-min)/dict,3)))
      // temp.push(Num_round(MainchartHeight - (VisibleData[1][i][j]-minPrice)*MCaverage,1))
  }
  else if(type == "bbi"){dataRaw = BBI(3,6,12,24,1,2)}
}
// select
if (!(saveTo == null)) {
  saveTo.push(dataRaw)
}
if(drawFlag=="draw"){
  // drawLineToCTX(dataRaw,Min,Ctx,CtxHeight,CAverage,color)

  // heighted
  var lineData = []
  for(var i = 0;i<dataRaw.length;i++){
    if(dataRaw[i]!=0){
      lineData.push(Num_round(CtxHeight - (dataRaw[i]-Min)*CAverage,3))
    }else{lineData.push(0)}
  };
  // console.log("dataRaw",dataRaw,"lineData",lineData,"Min",Min,"CAverage",CAverage)
  // istart
  var iStart = 0
  for(var i = 0;i<dataRaw.length;i++){
    if(dataRaw[i] == 0){iStart++;}
    else{break}
  }
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;
  Ctx.beginPath();
  Ctx.moveTo(drawGap+iStart*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  dataIndex+=1
  for(var i = iStart;i<dataRaw.length;i++){
    Ctx.lineTo(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  };Ctx.stroke();
}
  console.log("drawAverageLine end:--------------------------")
  return dataRaw
}

function drawLineToCTX(data,Min,Ctx,CtxHeight,CAverage,color,offset){
  // heighted
  var lineData = []
  var iStart = 0
    // console.log("Min",Min,"CAverage",CAverage,"CtxHeight",CtxHeight)
  for(var i = 0;i<data.length;i++){
    if(Number.isNaN(data[i])){lineData.push(NaN)}
    else{lineData.push(Num_round(CtxHeight - (data[i]-Min)*CAverage,3))}
  };
  // iStart
  for(var i = 0;i<data.length;i++){
    if(!Number.isNaN(data[i])){iStart = i;break;}
  };
  // console.log("data",data,"lineData",lineData,"Min",Min,"CAverage",CAverage,"iStart",iStart)
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;//#FF5C5C
  // console.log("Ctx",Ctx)
  Ctx.beginPath();
  Ctx.moveTo(drawGap+(iStart+offset)*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  for(var i = iStart;i<lineData.length;i++){
    Ctx.lineTo(drawGap+(i+offset)*(drawGap+chartItemWidth)+chartItemWidth/2,lineData[i])
  };Ctx.stroke();
}
function drawStickToCTX(data,Ctx,CtxHeight,CAverage,colors,times,width,offset){
  // heighted
  var stickData = 0
  var iStart = 0
  // for(var i = 0;i<data.length;i++){
  //   if(Number.isNaN(data[i])){stickData.push(NaN)}
  //   else{stickData.push(Num_round((CtxHeight - (data[i]-Min)*CAverage),3))}
  // };
  // iStart
  for(var i = 0;i<data.length;i++){
    if(!Number.isNaN(data[i])){iStart = i;break;}
  };
  // console.log("stickData",stickData,"Min",Min,"CAverage",CAverage,"iStart",iStart)
  // console.log("colors",colors)
  for(var i = iStart;i<data.length;i++){
    stickData = data[i]
    // color
    if(stickData>0){Ctx.fillStyle = colors[2]}
    else if(stickData==0){Ctx.fillStyle = colors[1]}
    else{Ctx.fillStyle = colors[0]}    
    stickData = Math.abs(Num_round(((data[i])*CAverage*times),3))
    // console.log("stickData",stickData)
    // ++++
    // +++-
    // ++--
    // +---
    // ----
    Ctx.fillRect(drawGap+i*(drawGap+chartItemWidth)+chartItemWidth/2-width/2+offset,CtxHeight-stickData, width,stickData);

  }

}
function drawRefMidLine(index,Ctx,CtxHeight,Ctx2,CtxHeight2,color){
  // console.log("drawRefMidLine",index,drawGap+index*(drawGap+chartItemWidth)+chartItemWidth/2)
  index = index - startIndex;
  Ctx.lineWidth = 2;
  Ctx.strokeStyle = color;//#FF5C5C
  Ctx.beginPath();
  Ctx.moveTo(drawGap+index*(drawGap+chartItemWidth),0)
  Ctx.lineTo(drawGap+index*(drawGap+chartItemWidth),CtxHeight)
  Ctx.stroke();

  Ctx2.lineWidth = 2;
  Ctx2.strokeStyle = color;//#FF5C5C
  Ctx2.beginPath();
  Ctx2.moveTo(drawGap+index*(drawGap+chartItemWidth)+chartItemWidth/2,0)
  Ctx2.lineTo(drawGap+index*(drawGap+chartItemWidth)+chartItemWidth/2,CtxHeight2)
  Ctx2.stroke();
}
/**
 * 在 canvas 上写字
 * @param {HTMLCanvasElement|string} target   - canvas 元素或其 id
 * @param {string}  text                      - 要写的文字
 * @param {number}  x                         - 起始 x
 * @param {number}  y                         - 起始 y
 * @param {object}  [opts]                    - 可选配置
 * @param {string}  [opts.font='16px Arial']  - 字体
 * @param {string}  [opts.color='#000']       - 填充色
 * @param {boolean} [opts.stroke=false]       - true = 描边，false = 实心
 * @param {string}  [opts.align='left']       - 水平对齐 left|center|right
 * @param {string}  [opts.baseline='top']     - 垂直基线 top|middle|bottom
 * @param {number}  [opts.maxWidth]           - 最大宽度（自动压缩）
 *  // 1. 简单用法
    drawText('myCanvas', 'Hello Canvas', 20, 30);

    // 2. 居中 + 描边 + 限制最大宽度
    drawText('myCanvas', 'Center Stroke Text', 200, 100, {
      font: 'bold 24px serif',
      color: '#007acc',
      stroke: true,
      align: 'center',
      baseline: 'middle',
      maxWidth: 180
    });
 */
function drawText(ctx, text, x, y, opts = {}) {
  // const canvas = typeof target === 'string' ? document.getElementById(target) : target;
  // const ctx = canvas.getContext('2d');
  // 默认配置
  const {
    font = '16px Arial',
    color = '#000',
    stroke = false,
    align = 'left',
    baseline = 'top',
    maxWidth = undefined
  } = opts;
  // 保存现场
  ctx.save();
  // 设置属性
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.strokeStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = baseline;
  // 绘制
  if (stroke) {
    if(maxWidth == 0){ctx.strokeText(text, x, y);}
    else{ctx.strokeText(text, x, y, maxWidth);}
  } else {
    if(maxWidth == 0){ctx.fillText(text, x, y);}
    else{ctx.fillText(text, x, y, maxWidth);}
  }
  // 恢复现场
  ctx.restore();
}
// masking  0-widowLength
function masking(from,to,Ctx,CtxHeight,color){  
  Ctx.fillStyle = color;//#FF5C5C
  Ctx.beginPath();
  Ctx.fillRect(drawGap+(from)*(drawGap+chartItemWidth)+chartItemWidth/2,0, drawGap+(to-from)*(drawGap+chartItemWidth)-chartItemWidth,CtxHeight);
  Ctx.fill();
}

// RSV
function RSV(dataPosition,InnerDataIndex,slice1,Tslice1,slice2,Tslice2,priod){
  // console.log("dataPosition",dataPosition,"InnerDataIndex",InnerDataIndex,"slice1",slice1,Tslice1,"slice2",slice2,Tslice2)
  console.log("\n\nRSV start ++++++++++++++++++++++++++++++++++++++++++++")

  var dataR = []
  for(var i = startIndex-priod-1;i<startIndex+VisibleData[dataPosition].length-1;i++){
    if(i>=0){
      dataR = dataR.concat(responseLocal[dataPosition][i].slice(slice1,Tslice1))
      dataR = dataR.concat(responseLocal[dataPosition][i].slice(slice2,Tslice2))
    }else{
      dataR = dataR.concat(responseLocal[dataPosition][0].slice(slice1,Tslice1))
      dataR = dataR.concat(responseLocal[dataPosition][0].slice(slice2,Tslice2))
    }
  }
  dataR = dataR.concat(VisibleData[dataPosition][VisibleData[dataPosition].length-1].slice(slice1,Tslice1))
  dataR = dataR.concat(VisibleData[dataPosition][VisibleData[dataPosition].length-1].slice(slice2,Tslice2))

  var RSV_ = []
  var Cn = 0
  var Ln = 0
  var Hn = 0
  var itemLength = Tslice1-slice1+Tslice2-slice2
  // console.log("dataR",dataR,"itemLength",itemLength)
  // console.log("first ------",dataR.slice((priod+1)*itemLength,(priod+1)*itemLength+4))
  for(var i = (priod+1)*itemLength;i<dataR.length;i=i+itemLength){
    // console.log("FROM i",i-40,"TO i+priod*itemLength",i,"Cn ON",i+InnerDataIndex)
    Cn = dataR[i+InnerDataIndex]
    Ln = Math.min.apply(null, dataR.slice(i-40,i));
    Hn = Math.max.apply(null, dataR.slice(i-40,i));
    // console.log("Cn",Cn,"Ln",Ln,"Hn",Hn,"(Cn-Ln)/(Hn-Ln)*100",Num_round((Cn-Ln)/(Hn-Ln)*100,3))
    RSV_.push(Num_round((Cn-Ln)/(Hn-Ln)*100,3))
    // console.log("Cn",Cn,"Hn",Hn,"Ln",Ln)

  }
  // console.log("RSV_",RSV_)

  console.log("RSV end --------------------------------------------")
  return RSV_
}
// KD
function NKD(dataPosition,InnerDataIndex,slice1,Tslice1,slice2,Tslice2,priod,priod2,color1,color2,color3,color4){
  console.log("\n\nKD start ++++++++++++++++++++++++++++++++++++++++++++")

  var RSV_ = RSV(dataPosition,InnerDataIndex,slice1,Tslice1,slice2,Tslice2,priod)
  // console.log("RSV_",RSV_)
  var K = [50]
  var D = [50]
  var J = [50]
  var S = [50,50,50,50,50]

  // D.push(RSV_[0])
  var seconedThree = Num_round((priod2-1)/priod2,4)
  var firstThree = 1-seconedThree
  // var seconedThree = 0.6667
  // var firstThree = 0.3333
  for(var i =1;i<RSV_.length;i++){
    K.push(Num_round(seconedThree*RSV_[i-1]+firstThree*RSV_[i],2))
    D.push(Num_round(seconedThree*D[i-1]+firstThree*K[i],2))
    J.push(Num_round((priod2)*K[i]-(priod2-1)*D[i],2))
  }
  for(var i =5;i<K.length;i++){
    Ksum = K[i-2]+K[i-1]+K[i]
    S.push(Num_round(Ksum/3,2))
  }
  // console.log("K",K)
  // console.log("D",D)
  // console.log("J",J)
  // console.log("S",S)
  {
    // K.shift()
    // D.shift()
    var Min = Math.min.apply(null, K);
    var avrg = Math.min.apply(null, D)
    if(Min>avrg){Min=avrg}
    // var avrg = Math.min.apply(null, J)
    // if(Min>avrg){Min=avrg}
    var avrg = Math.min.apply(null, S)
    if(Min>avrg){Min=avrg}

    var Max = Math.max.apply(null, K);
    avrg = Math.max.apply(null, D)
    if(Max<avrg){Max=avrg}
    // avrg = Math.max.apply(null, J)
    // if(Max<avrg){Max=avrg}
    avrg = Math.max.apply(null, S)
    if(Max<avrg){Max=avrg}

    avrg = Num_round(SubchartHeight / (Max - Min),4)

    // console.log("Min",Min,"Max",Max,"avrg",avrg)

    drawLineToCTX_old(K,Min,5,SUBctx,SubchartHeight,avrg,color1)
    drawLineToCTX_old(D,Min,5,SUBctx,SubchartHeight,avrg,color2)
    drawLineToCTX_old(J,Min,5,SUBctx,SubchartHeight,avrg,color3)
    drawLineToCTX_old(S,Min,5,SUBctx,SubchartHeight,avrg,color4)

    NKD_RSV = []
    NKD_RSV.push(K)
    NKD_RSV.push(D)
    NKD_RSV.push(J)
    NKD_RSV.push(S)
  }
  console.log("KD end --------------------------------------------")
}

// KD
function KDJ_Runner(dataPosition,dataIndex,priods,saveLibrary,indH,indL){
  console.log("XZC start ++++++++++++++++++++++++++++++++++++++++++++")  
  // console.log("attrs:",dataPosition,dataIndex,priods,saveLibrary)
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________
    {
      // var CG = 0
      // var lastEMA = 0
      var Kn = 1/(priods[1])
      var Kl = 1-Kn
      var Kn2 = 1/(priods[2])
      var Kl2 = 1-Kn2
      // console.log("property",Kn,Kl,Kn2,Kl2);
      // var KL = 2/(priods[1]+1)
      // var KL2 = 1-KL
      // var KMID = 2/(priods[2]+1)
      // var KMID2 = 1-KMID
      //always abandon the last one
      var lh = []
      // var LLV = 1000000000
      // var HHV = 0
      // console.log("LLV",LLV,"HHV",HHV);
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 loop
    // RSV
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      lh = LLVHHV(priods[0],dataPosition,indH,indL,i)
      // if (LLV>lh[0]){LLV = lh[0]}
      // if (HHV<lh[1]){HHV = lh[1]}
      // console.log("LLV",LLV,"HHV",HHV,"i",i,responseLocal[dataPosition][i][dataIndex]);
      if(i==pointIndex){
        saveLibrary[0].push(Num_round((VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]-lh[0])/(lh[1]-lh[0])*100,4))
      }else{
        saveLibrary[0].push(Num_round((responseLocal[dataPosition][i][dataIndex]-lh[0])/(lh[1]-lh[0])*100,4))
        // console.log("LLV",LLV,"HHV",HHV);
        // console.log("responseLocal",responseLocal[dataPosition][i][dataIndex],Num_round((responseLocal[dataPosition][i][dataIndex]-LLV)/(HHV-LLV)*100,2))
      }
    }
    // LEVEL 2 loop
    // K
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[1].push(NaN)
      }else if(i==priods[1]-1){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[0][j]
          }
          // console.log("sum",sum,priods[1],saveLibrary[1]);
          saveLibrary[1].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[1].push(General_EMA(saveLibrary[1][i-1],saveLibrary[0][i],Kn,Kl))
      }
    }
    // LEVEL 3 loop
    // D
    for(var i = saveLibrary[2].length;i<=pointIndex;i++){
      //zeroth value
      if(i<priods[1]-1){
        saveLibrary[2].push(NaN)
      }else if(i==2*(priods[1]-1)){
        var sum = 0
          for(var j = i-priods[1]+1;j<i+1;j++){
            sum += saveLibrary[1][j]
          }
          saveLibrary[2].push(General_MA(sum,priods[1]))
      }else{// normal values
        // console.log("i",i);
        saveLibrary[2].push(General_EMA(saveLibrary[2][i-1],saveLibrary[1][i],Kn2,Kl2))
      }
    }
    // LEVEL 4 loop
    // VAR4
    for(var i = saveLibrary[3].length;i<=pointIndex;i++){
      saveLibrary[3].push(3*saveLibrary[1][i]-2*saveLibrary[2][i])
    }
    // console.log("saveLibrary",saveLibrary);
  }
  console.log("XZC end --------------------------------------------")
}

}

// formulaRunner
function formulaRunner(kind,dataPosition,dataIndex,saveLibrary,levels,priods,colors,MaxMins,draws,MinMax,average,Targetctx,TargetHeight,checkAvaMin){
  console.log("\n\nformulaRunner start ++++++++++++++++++++++++++++++++++++++++++++",kind,dataPosition)
  // creaate new stack
  for(var i =saveLibrary.length;i<priods.length;i++){
    saveLibrary.push([])
    for(var j =0;j<levels;j++){
      saveLibrary[i].push([])
    }
  }
  // console.log("creaate new stack:",saveLibrary,saveLibrary[0]);
  // run
  for(var i =0;i<priods.length;i++){
    switch(kind){
      case "Price_Average":Price_Average_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "BIAS_QL":BIAS_QL_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "BBI":BBI_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "RSI":RSI(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "PRE":PRE_Runner(dataPosition,null,null,saveLibrary[i]);break
      case "XZC":XZC_Runner(dataPosition,dataIndex[0],priods[i],saveLibrary[i],dataIndex[1],dataIndex[2]);dataIndex = dataIndex[0];break
      case "KDJ":KDJ_Runner(dataPosition,dataIndex[0],priods[i],saveLibrary[i],dataIndex[1],dataIndex[2]);break
      case "YYX":YYX_Runner(dataPosition,dataIndex,priods[i],saveLibrary[i]);break
      case "UN":TST_Runner(dataPosition,null,null,saveLibrary[i]);break
    }
  }

  // console.log("after run saveLibrary:",saveLibrary)

  // draw
  {   
    var Max = 0
    var Min = NaN
    var MaxN = 0
    var MinN = 0
    var startInd = startIndex
    var endInd = 0

    // section indexes endpoints
    // set endInd
    if(pointIndex-startIndex+1>windowLength)(endInd = startIndex+windowLength-1)
    else{endInd = pointIndex}

    if(dataPosition == 0){
      startInd = startIndex
      if(endInd>basicDataLength-preOpLength-1){
        endInd = basicDataLength-preOpLength-1        
      }

    }else{
      startInd = preOpStartIndex
      endInd = basicDataLength-1
      if(endInd>startInd+preOpLength){
        endInd = startInd+preOpLength
      }
    }

    // console.log("Max:",Max,"Min:",Min,"average:",average,"startInd",startInd,startIndex,preOpStartIndex)

    // MaxMins  average
    var tempLib = []
    // console.log("MinMax",MinMax,"average",average,"checkAvaMin",checkAvaMin,((MinMax[0] == null || MinMax[1] == null || average == null) || checkAvaMin))

    if((MinMax[0] == null || MinMax[1] == null || average == null) || checkAvaMin){
      // MaxMins
      for(var j =0;j<saveLibrary.length;j++){
        for(var i =0;i<MaxMins.length;i++){
          // startInd = startIndex
          // if(startIndex<priods[i]-1){startInd=priods[i]-1}
          for(var k = startInd;k<=endInd;k++){
            if(!Number.isNaN(saveLibrary[j][MaxMins[i]][k])){
              // console.log("MaxMins on:",saveLibrary[j][MaxMins[i]].slice(k,endInd+1))
              tempLib = saveLibrary[j][MaxMins[i]].slice(k,endInd+1)
              tempLib = tempLib.filter(item => !isNaN(item))

              MaxN = Math.max.apply(null, tempLib);
              if(Number.isNaN(Min)){Min=MaxN;}//console.log("Min init:",Min)
              MinN = Math.min.apply(null, tempLib);
              if(MaxN>Max){Max=MaxN}
              if(MinN<Min){Min=MinN}
              break
            }
          }
        }
      }
    
      // average 
      // average = 0    //var average = Num_round(SubchartHeight / (Max - Min),4)
      // console.log("old ref",MinMax,average,checkAvaMin,"new ref",[Min,Max])
      // console.log("gen MinMax",[Min,Max],"average",Num_round(TargetHeight / (Max - Min),4))

      if(average == null){
        average = Num_round(TargetHeight / (Max - Min),4)
        // console.log("average",average,"direct Draw index",0,dataPosition-1)
      }else if((average != null && (MinMax[1]<Max || MinMax[0]>Min)) || checkAvaMin){
        if(Max<MinMax[1]){Max = MinMax[1];}
        if(Min>MinMax[0]){Min = MinMax[0];}
        average = Num_round(TargetHeight / (Max - Min),4)
        refMinAvarage = [[Min,Max],average]
        console.log("reDraw:")
        // console.log("reDraw: MinMax",MinMax,"average",average,TargetHeight,Max,Min,Num_round(TargetHeight / (Max - Min),4))
        SUBctx.clearRect(0,0,SUBcanvas.width,SUBcanvas.height)
        for (let j = 0; j < dataPosition; j++) {
          if(preOparationMethod[j]==1){
            if(KDJ_data.length-1<j){KDJ_data.push([])}
            // key code
            console.log("reDraw index",kind,"start-------------------")

            var colores = [["yellow","white","purple",]]
            if(j != 0){colores = [["rgb(214, 92, 21)","rgb(214, 92, 21)","rgb(214, 92, 21)",]];KDJ_data[j]=[];}
            refMinAvarage = formulaRunner("KDJ",j,[1,2,3],KDJ_data[j],4,[[9,3,3]],colores,[1,2,3],[1,2,3],refMinAvarage[0],refMinAvarage[1],SUBctx,SubchartHeight,checkAvaMin=false)
            // formulaRunner("KDJ",j,[1,2,3],KDJ_data[j],4,[[9,3,3]],[["yellow","white","purple",]],[1,2,3],[1,2,3],null,average,SUBctx,SubchartHeight,checkAvaMin=false)
            if(kind == "KDJ" && j == 0){masking(preOpStartIndex-startIndex,preOpStartIndex-startIndex+preOpLength+1,SUBctx,SubchartHeight,"rgba(67, 67, 67, 0.5)");console.log("KDJ masking");}
            console.log("reDraw index",kind,"finish+++++++++++++++++++")
          }    
        }
      }else{
        // console.log("average",average,"no need to fix average",0,dataPosition-1)
        Min = MinMax[0]
      }
      // for(var i =0;i<priods.length;i++){
      //   switch(kind){
      //     case "BIAS_QL":average = Num_round(TargetHeight / (Max - Min),4);break
      //     case "RSI":console.log("RSI");break
      //     case "":
      //     case "":
      //   }
      // }
      // console.log("Max:",Max,"Min:",Min,"average:",average,"startInd",startInd)
    }else{
      Min = MinMax[0]
    }

    // start_gap and draw
    console.log("kind",kind);
    for(var j =0;j<saveLibrary.length;j++){
      for(var i =0;i<draws.length;i++){
        // if(dataPosition == 0 && startIndex>availableStartIndex-preOpLength){
        //   drawLineToCTX(saveLibrary[j][draws[i]].slice(startIndex,endInd+1),Min,Targetctx,TargetHeight,average,colors[j][i])
        //   console.log(kind,"specail");
         //   // console.log(saveLibrary[j][draws[i]].slice(startIndex,endInd+1-(startIndex-(availableStartIndex-preOpLength))),"specail");
        // }else{
        //   drawLineToCTX(saveLibrary[j][draws[i]].slice(startIndex,endInd+1),Min,Targetctx,TargetHeight,average,colors[j][i])
        //   console.log(kind,"normal");
        //   // console.log(saveLibrary[j][draws[i]],"normal");
        // }
        // drawLineToCTX(saveLibrary[j][draws[i]].slice(startInd,endInd+1),Min,Targetctx,TargetHeight,average,colors[j][i],startInd-startIndex)
        // console.log(saveLibrary[j][draws[i]].slice(startInd,endInd+1));

        // if(dataPosition == 0){console.log(kind,"im fine",startInd,endInd+1,saveLibrary[j][draws[i]].slice(startInd,endInd+1))};
        drawLineToCTX(saveLibrary[j][draws[i]].slice(startInd,endInd+1),Min,Targetctx,TargetHeight,average,colors[j][i],startInd-startIndex)
      }
      // special
      switch(kind){
        case "PRE":
            drawStickToCTX(saveLibrary[j][0].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][0],colors[0][0],colors[0][0]],1,8,0);
            // drawStickToCTX(saveLibrary[j][1].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][1],colors[0][0]],1,8);break
            drawStickToCTX(saveLibrary[j][1].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][1],colors[0][1],colors[0][1]],3,8,8);
            drawStickToCTX(saveLibrary[j][2].slice(startIndex,endInd+1),Targetctx,TargetHeight,average,[colors[0][2],colors[0][2],colors[0][2]],3,8,8);
            // drawAverageLine_op(3,Min,startIndex,saveLibrary[0][0],average,"yellow",SUBctx,SubchartHeight)
            // drawAverageLine_op(6,Min,startIndex,saveLibrary[0][0],average,"blue",SUBctx,SubchartHeight)
            break;
        case "XZC":
          drawHorizontalLine(80,"yellow",Targetctx,TargetHeight,100,average,Min);
          drawHorizontalLine(90,"red",Targetctx,TargetHeight,100,average,Min);
          drawHorizontalLine(20,"green",Targetctx,TargetHeight,100,average,Min);

          break
        case "TST":break;
      }      
    }
    console.log("formulaRunner end --------------------------------------------")
    return [[Min,Max],average]
  }
}

// Price_Average_line 均线
function Price_Average_Runner(dataPosition,dataIndex,priod,saveLibrary){
  console.log("Price_Average_Run start ++++++++++++++++++++++++++++++++++++++++++++")
  // 
  if(saveLibrary[0].length<=pointIndex+1){
    // PREPARE_________________
    {
      var CG = 0
      //always abandon the last one
      if(saveLibrary[0].length>0){
        for(var i=0;i<saveLibrary.length;i++){
          if(!Number.isNaN(saveLibrary[saveLibrary[i].length-1])){saveLibrary[i].pop();}
        }
      }
    }
    // LEVEL 1 loop
    // sum
    for(var i = saveLibrary[0].length;i<=pointIndex;i++){
      //zeroth value
      if(saveLibrary[0].length==0){
        // console.log(dataPosition,responseLocal)
        if(pointIndex == 0){saveLibrary[0].push(VisibleData[dataPosition][0][dataIndex])}
        else{saveLibrary[0].push(responseLocal[dataPosition][0][dataIndex])}
      }
      //other value
      else{
        //CG equals the will be abandon negative value
        if(saveLibrary[0].length<priod){CG = 0}
        else{CG = -responseLocal[dataPosition][i-priod][dataIndex]}

        if(i==pointIndex){
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+(VisibleData[dataPosition][VisibleData[dataPosition].length-1][dataIndex]),2))
        }else{
          saveLibrary[0].push(Num_round(CG+saveLibrary[0][i-1]+responseLocal[dataPosition][i][dataIndex],2))
        }
      }
    }
    // LEVEL 2 loop
    // ma
    for(var i = saveLibrary[1].length;i<=pointIndex;i++){
      // former values
      if(saveLibrary[1].length<priod-1){
        saveLibrary[1].push(NaN)
      }
      // normal values
      else{
        saveLibrary[1].push(Num_round(saveLibrary[0][i]/priod,4))
      }
    }
  }
  // console.log("saveLibrary",saveLibrary,responseLocal[dataPosition]);
  // console.log("Price_Average_Line",Price_Average_Line);
  console.log("Price_Average_Run end --------------------------------------------")
}

// General_SMA ane EMA_____FUNCTION
// General_SMA
function General_EMA(lastEMA,newOneItem,Kn,Kl){
  return Num_round((newOneItem*Kn+lastEMA*Kl),4) 
}
// General_MA_____FUNCTION
function General_MA(newSum,K){
  return Num_round(newSum/K,4) 
}
// get high and low in a range of data
function LLVHHV(period,dataPosition,indH,indL,onIndex){
  var LHdata = []
  var start = onIndex-period+1
  if(start<0){start = 0}
  // console.log("LLVHHV attrs",period,dataPosition,indH,indL,start,onIndex)

  for(var i = start;i<onIndex;i++){
    LHdata.push(responseLocal[dataPosition][i][indL])
    LHdata.push(responseLocal[dataPosition][i][indH])
  }
  if(i == pointIndex){
    LHdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][indL])
    LHdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][indH])    
  }else{
    LHdata.push(responseLocal[dataPosition][i][indL])
    LHdata.push(responseLocal[dataPosition][i][indH])
  }
  // console.log("LLVHHV",LHdata)
  return [Math.min(...LHdata),Math.max(...LHdata)]
}
// get high and low in a range of oc of a range data
function LLocHHoc(period,dataPosition,indH,indL,onIndex){
  var LHdata = []
  var start = onIndex-period+1
  if(start<0){start = 0}
  // console.log("LLVHHV attrs",period,dataPosition,indH,indL,start,onIndex)

  for(var i = start;i<onIndex;i++){
    LHdata.push(responseLocal[dataPosition][i][indL])
    LHdata.push(responseLocal[dataPosition][i][indH])
  }
  if(i == pointIndex){
    LHdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][indL])
    LHdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][indH])    
  }else{
    LHdata.push(responseLocal[dataPosition][i][indL])
    LHdata.push(responseLocal[dataPosition][i][indH])
  }
  // console.log("LLVHHV",LHdata)
  return [Math.min(...LHdata),Math.max(...LHdata)]
}
// get up and down in a range of data
function UPDOWN(period,dataPosition,index,onIndex){
  var UDdata = []
  var start = onIndex-period+1
  if(start<0){start = 0}
  // console.log("LLVHHV attrs",period,dataPosition,indH,indL,start,onIndex)
  for(var i = start;i<onIndex;i++){
    UDdata.push(responseLocal[dataPosition][i][index])
  }
  if(i == pointIndex){
    UDdata.push(VisibleData[dataPosition][VisibleData[dataPosition].length-1][index])
  }else{
    UDdata.push(responseLocal[dataPosition][i][index])
  }
  // console.log("LLVHHV",LHdata)
  var count = [0,0,0]; // [positiveCount, negativeCount]
  for (var i = 0; i < UDdata.length; i++) {
    if (UDdata[i] > 0) {
      count[0]++;
    } else if (UDdata[i] < 0) {
      count[1]++;
    }else{
      count[2]++;
    }
  }
  count.push(UDdata[UDdata.length-1])
  // console.log("UDdata",UDdata)
  return count
  
}


}


// _______basic draw fun___________________________________________________________________________
{
//十字标
// draw cross Lines line_____FUNCTION
function crossLines(x,y){
  MASKcanvas.height = MaskchartHeight
  MASKcanvas.width = MainchartWidth

  MASKctx.clearRect(0,0,MASKcanvas.width,MASKcanvas.height)

  MASKctx.beginPath()
  MASKctx.strokeRect = "#000000"
  MASKctx.strokeStyle = "#FFFFFF"
  MASKctx.lineWidth = 1
  MASKctx.moveTo(x,0)
  MASKctx.lineTo(x,MASKcanvas.height)
  MASKctx.moveTo(0,y)
  MASKctx.lineTo(MASKcanvas.width,y)
  MASKctx.stroke()
  temp = Math.floor((x-(1*drawGap))/(drawGap + chartItemWidth))
  if(crossIdx!=temp && temp>=0 && responseLocal.length!=0 && temp<VisibleData[0].length){
    crossIdx = temp 
    // console.log(crossIdx,VisibleData[1][crossIdx])

    crossInfo(crossIdx)

    // }else{
    //   crossIdx = -1
    // }
  }
}
// draw K image_____FUNCTION  fixed
//open,close,high,low
//0      1    2   3
function drawK(ohlcYData,offsetx,day,colores,hollowOut){
  // color
  color = (function(){
    if(ohlcYData[1]>ohlcYData[0])return colores[0]
    else if(ohlcYData[1]<ohlcYData[0])return colores[1]
    else return colores[2]
  })()

  MAINctx.fillStyle = color
  MAINctx.strokeStyle = color
  MAINctx.lineWidth = 1.5;
  // MAINctx.globalAlpha = 1;  // 确保透明度为1
  // MAINctx.globalCompositeOperation = 'source-over';  // 默认混合模式
  temp1 = 0
  temp2 = 1
  if (ohlcYData[1]<ohlcYData[0]){temp1 = 1;temp2 = 0}
  MAINctx.beginPath();
  MAINctx.moveTo(offsetx+SimChartItemWidth, ohlcYData[2]); // 从最高价
  MAINctx.lineTo(offsetx+SimChartItemWidth, ohlcYData[temp1]);
  MAINctx.moveTo(offsetx+SimChartItemWidth, ohlcYData[temp2]);
  MAINctx.lineTo(offsetx+SimChartItemWidth, ohlcYData[3]);  // 到最低价
  MAINctx.moveTo(offsetx+SimChartItemWidth, 0); // 从最高价
  if(day == 5){
    MAINctx.arc(offsetx+SimChartItemWidth,0, 4, 0, 2 * Math.PI); // 圆心 (100, 100)，半径 50
  }
  MAINctx.stroke();  

  if(ohlcYData[1]>ohlcYData[0] && !hollowOut){
    MAINctx.fillRect(offsetx, ohlcYData[0], chartItemWidth, ohlcYData[1]-ohlcYData[0]);
  }else if(ohlcYData[1]<ohlcYData[0]){
    MAINctx.strokeRect(offsetx, ohlcYData[0], chartItemWidth, ohlcYData[1]-ohlcYData[0]);
  }else{
  MAINctx.strokeRect(offsetx, ohlcYData[0], chartItemWidth, ohlcYData[1]-ohlcYData[0]);
  }
}

function drawHorizontalLine(level,color,Ctx,CtxHeight,width,CAverage,Min){
    // heighted
    level = Num_round(CtxHeight - (level-Min)*CAverage,3)
    Ctx.lineWidth = 2;
    Ctx.strokeStyle = color;//#FF5C5C
    // console.log("Ctx",Ctx)
    Ctx.beginPath();
    Ctx.moveTo(0,level)
    Ctx.lineTo(width,level)
    Ctx.stroke();
}

}


// _____ menu_____________________________________________________________________________
{
function analyse(){
  if(decodeModal.style.display == 'block'){
    console.log("analyse blocked")
    // analyseCode.value = responseLocal[0].slice(0,responseLocal[0].length-preOpLength)
  }else{
    console.log("analyse block")
    // console.log(EditingData,responseLocal[0])
    var val = "["
    for (let index = 0; index < responseLocal[0].length-preOpLength; index++) {
      // val += "["+responseLocal[0][index]+"],\n"
      // console.log(responseLocal[0][index])
      val += "["+responseLocal[0][index].slice(0,6)+',"'+responseLocal[0][index][6]+' '+responseLocal[0][index][7]+'"],\n'
    }
    val = val.slice(0, -2);
    val += "]"

    analyseCode.value = val;
    // console.log("val",val,responseLocal[0][responseLocal[0].length-preOpLength-1][6],responseLocal[0][responseLocal[0].length-preOpLength-1])

    decodeModal.style.display = 'block';
  }

}
function convertChinesePunctuationToEnglish(str) {
  const punctuationMap = {
      '，': ',',
      '。': '.',
      '！': '!',
      '？': '?',
      '；': ';',
      '：': ':',
      '“': '"',
      '”': '"',
      '‘': "'",
      '’': "'",
      '（': '(',
      '）': ')',
      '【': '[',
      '】': ']',
      '｛': '{',
      '｝': '}',
      '《': '<',
      '》': '>'
  };

  // 使用正则表达式匹配中文标点符号，并将其转换为英文标点符号
  return str.replace(/[\u3000-\u303F]/g, (char) => {
      return punctuationMap[char] || char;
  });
}
function AnalyseTextToArray(text) {
  // 清理文本，去除所有空白字符
  // const cleanedText = convertChinesePunctuationToEnglish(text.replace(/\s+/g, ''));
  const cleanedText = text
  .replace(/\s+/g, '')
  .replace(/，/g, ',')
  .replace(/】/g, ']')
  .replace(/【/g, '[')
  // 1. 把所有 {} 改成 []
  .replace(/{/g, '[')
  .replace(/}/g, ']')

  // 2. 去掉所有 "xx": 这类键名（含冒号、可能的空格）
  //    注意：日期那项 "d": "2025-01-23 10:00:00" 也在这里被处理成 "2025-01-23 10:00:00"
  .replace(/"\w+"\s*:\s*/g, '')

  // 3. 去掉剩余的所有双引号，但把日期时间里的引号补回来
  // .replace(/"([^"\d-]+)"/g, '$1')   // 先去掉非日期的引号
  .replace(/'/g, '')
  .replace(/"/g, '')
  .replace(/(\d{4}-\d{2}-\d{2}\d{2}:\d{2}:\d{2})/g, '"$1"'); // 重新给日期加引号
    
  // console.log("cleanedText",cleanedText);
  // 用于解析嵌套数组的函数
  function parseArray(str) {
      const result = [];
      let numBuffer = '';
      let depth = 0;
      let currentChar;

      for (let i = 0; i < str.length; i++) {
          currentChar = str[i];

          if (currentChar === '[') {
              // 遇到左括号，递归解析子数组
              depth++;
              let subArrayStr = '';
              let subArrayDepth = 1;
              i++;

              while (i < str.length) {
                  currentChar = str[i];
                  subArrayStr += currentChar;

                  if (currentChar === '[') {
                      subArrayDepth++;
                  } else if (currentChar === ']') {
                      subArrayDepth--;
                      if (subArrayDepth === 0) {
                          break;
                      }
                  }
                  i++;
              }

              result.push(parseArray(subArrayStr));
              depth--;
          } else if (currentChar === ',' || currentChar === ']') {
              // 遇到逗号或右括号，结束当前数字
              if (numBuffer) {
                  if(numBuffer[0][0]=='"'){result.push((numBuffer.slice(1, 11)));result.push((numBuffer.slice(11, -1)));}
                  else{result.push(parseFloat(numBuffer));}
                    // console.log("numBuffer",numBuffer,currentChar);
                  numBuffer = '';
              }
              if (currentChar === ']' && depth === 0) {
                  break;
              }
          } else {
              // 当前字符是数字的一部分
              numBuffer += currentChar;
          }
      }
      // console.log(result);
      // console.log(result[0][0].isNaN,'2025-03-0715:00:00'.isNaN,(56).isNaN);

      // if(result[0][0].isNaN){
      //   console.log(result[0][0].isNaN,'2025-03-0715:00:00'.isNaN,(56).isNaN);
        
      // }
      // console.log(result,str)
      return result;
  }
  const rawArrayData = parseArray(cleanedText)

  if(typeof(rawArrayData[0][0][0]) == "string"){
    console.log("[0][0][0]string");
    var newArrayData = [[]]

    for (let j = 0; j < rawArrayData[0].length; j++) {
      newArrayData[0].push([
        rawArrayData[0][j][2],
        rawArrayData[0][j][5],
        rawArrayData[0][j][3],
        rawArrayData[0][j][4],
        rawArrayData[0][j][6],
        rawArrayData[0][j][7],
        rawArrayData[0][j][0],
        rawArrayData[0][j][1],
      ])
    }
console.log(rawArrayData,newArrayData)
    return newArrayData;
  }else{
    return rawArrayData;
  }
}
function getMaxDepth(arr) {
  // 检查输入是否为数组
  if (!Array.isArray(arr)) {
      throw new Error('Input must be an array');
  }

  // 递归函数，用于计算嵌套层数
  function getDepth(arr, currentDepth) {
      // 如果当前数组为空，返回当前深度
      if (arr.length === 0) {
          return currentDepth;
      }

      // 初始化最大深度为当前深度
      let maxDepth = currentDepth;

      // 遍历数组中的每个元素
      for (let i = 0; i < arr.length; i++) {
          const element = arr[i];
          // 如果元素是数组，递归计算其深度
          if (Array.isArray(element)) {
              const elementDepth = getDepth(element, currentDepth + 1);
              // 更新最大深度
              if (elementDepth > maxDepth) {
                  maxDepth = elementDepth;
              }
          }
      }

      return maxDepth;
  }
  // 从第一层开始计算
  return getDepth(arr, 1);
}
function doAnalyse(code="",gLInd = -1){
  // analyseCode.value = 12;
  var rawCode = ""
  if(code == ""){
    rawCode = analyseCode.value;
  }else{
    rawCode = code;
  }

  // console.log("rawCode",rawCode)
  const array = AnalyseTextToArray(rawCode)
  console.log("Result array",array,array[0].length);
  var info = [0,0,""];
  info[0] = getMaxDepth(array[0])
  // console.log("getMaxDepth(arr)",getMaxDepth(array[0]));
  // console.log("getMaxDepth(arr)",getMaxDepth([[1,2],[3,4],[3,4,[3,4]]]));
  if (info[0] == codeDepth) {
    for (let i = 0; i < array[0].length; i++) {
      if (array[0][i].length != codeUnitLength) {
        info[1] = array[0][i].length; 
        info[2] = i; 
        analyseResult.textContent = "解析失败，子数组长度问题["+info+"],,["+array[0][i]+"]";
        console.log("解析失败，子数组长度问题["+info+"],,["+array[0][i]+"]");
        return 0;
      }
    }
    analyseResult.textContent = "解析成功["+info+"]";
    console.log("解析成功["+info+"]");
    // resetResponseLocal = []
    // resetResponseLocal.push(array[0]);
    // responseLocal.push(array[0]);
    if(code == ""){
      var val = "["
      for (let index = 0; index < array[0].length; index++) {
        // console.log("array[0][index][6]",array[0][index][6])

        val += "["+array[0][index].slice(0,6)+',"'+array[0][index][6]+' '+array[0][index][7]+'"],\n'
        // console.log(array[0][index],"["+array[0][index].slice(0,6)+',"'+array[0][index][6]+'"'+',"'+array[0][index][7]+"],\n")
      }
      val = val.slice(0, -2);
      val += "]"
      resetData = val;
      EditingData = val;
      // console.log("EditingData",EditingData)
      // resetData   = structuredClone(val);
      // EditingData = structuredClone(val);
    }else{
      rawCode = code;
    }

    // console.log("doAnalyse",val);

    if(gLInd == -1){guanLianInd = array[0].length-1}
    
    numCL[5].value = array[0][array[0].length-1][0]
    numCLValueArray[5] = array[0][array[0].length-1][0]
    numCL[6].value = array[0][array[0].length-1][1]
    numCLValueArray[6] = array[0][array[0].length-1][1]
    numCL[7].value = array[0][array[0].length-1][2]
    numCLValueArray[7] = array[0][array[0].length-1][2]
    numCL[8].value = array[0][array[0].length-1][3]
    numCLValueArray[8] = array[0][array[0].length-1][3]
    // console.log("doAnalyse",numCLValueArray);

    var lastI = array[0][array[0].length-1][1]
    for (let index = 0; index < preOpLength; index++) {
      array[0].push([lastI,lastI,lastI,lastI,0,0,"0000-00-00","00:00:00"])     
    }
    responseLocal[0] = deepCopyArray(array[0]);
    // VisibleData.push(deepCopyArray(array[0]));
    // console.log(responseLocal,VisibleData);
    // console.log(responseLocal);

    windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
    basicDataLength = responseLocal[0].length
    subDataLength = (responseLocal[0][0].length-1)/5+1
    FinalSubDataLength = subDataLength
    for (let i = 0; i < subDataLength; i++) {
      FinalSubDataLength = i;
      if (responseLocal[0][responseLocal[0].length-1][i] == 0) {
        break
      }
    }
    if(basicDataLength>windowLength){
      maxStartIndex = basicDataLength-windowLength;//刚好对应下标
    }
    else{
      maxStartIndex = 0;
    }  

      startIndex = maxStartIndex;
      pointIndex = basicDataLength-1;
      subEndIndex = subDataLength;
      availableStartIndex = maxStartIndex;

    Price_Average_Line = []
    KDJ_data = []

    preOpStartIndex = basicDataLength -1 - preOpLength;

    PrintLimitPositionVariables("doAnalyse")

    refreshDraw(IndexsSwitch,true);
    decodeModal.style.display = 'none';

    return 1;
  }else{
    analyseResult.textContent = "解析失败，数组层数问题["+info+"]";
    return 0;
  }
}
function reset(simReset = true){
  if (!downloadList) {
    downloadList = document.createElement('div');
    downloadList.id = 'downloadList';
    document.body.appendChild(downloadList);
    // 1. 让子元素水平排列
    downloadList.style.display = 'flex';
    // 2. 装不下时自动换行
    downloadList.style.flexWrap = 'wrap';
  }
  downloadList.innerHTML = ""
  console.log("simReset",simReset,preOpStartIndex);

  resetResponseLocal =[];
  refAvarage = 0
  refMin = 0
  refMinAvarage = [[null,null],null]

  // report values
  positive = 0
  positiveOld = 0
  negative = 0
  negativeOld = 0
  SumPositiveAndNegativeVals = 0
  SumPositiveAndNegativeValsOld = 0
  simple = []

  rpForK = []
  rpForMA = []
  rpForKDJ = []
  rpNK = []
  if(!simReset){
    preOpStartIndex = 0;
    EditingData = resetData;
    doAnalyse(EditingData)
    console.log("simReset");
  }
  console.log("reset",responseLocal[0].length)
}

function addK(){
  numCLValueArray[7] = Math.max.apply(null, numCLValueArray.slice(5,9));
  numCLValueArray[8] = Math.min.apply(null, numCLValueArray.slice(5,9));
  
  EditingData = EditingData.slice(0, -1);
  EditingData += ",\n["+numCLValueArray.slice(5,10)+',0,"0000-00-00 00:00:00"]'
  EditingData += "]"
  console.log("addK",numCLValueArray.slice(5,10));
  // console.log(EditingData);
  doAnalyse(EditingData)
  console.log("addK",EditingData.length,resetData.length,numCLValueArray.slice(5,10),Math.max.apply(null, numCLValueArray.slice(5,10)),Math.min.apply(null, numCLValueArray.slice(5,10)))
  // console.log(EditingData,responseLocal[0]);
}
function minusK(){
  // console.log(responseLocal[0]);
  
  var val = "["
  for (let index = 0; index < responseLocal[0].length-preOpLength-1; index++) {
    // val += "["+responseLocal[0][index]+"],\n"
    val += "["+responseLocal[0][index].slice(0,6)+',"'+responseLocal[0][index][6]+' '+responseLocal[0][index][7]+'"],\n'
  }
  val = val.slice(0, -2);
  val += "]"
  EditingData = val;
  doAnalyse(EditingData)
}
function save(){
  resetData = EditingData;
  doAnalyse(resetData)

    // 创建一个 Blob 对象，指定类型为文本
    const blob = new Blob([resetData], { type: 'text/plain;charset=utf-8' });
  
    // 创建一个下载链接
    const link = document.createElement('a');
  
    // 设置下载链接的 href 属性为 Blob 对象的 URL
    link.href = URL.createObjectURL(blob);
  
    // 设置下载文件的名称
    link.download = "save" || 'output.txt';
  
    // 触发点击事件，模拟用户点击下载
    document.body.appendChild(link);
    link.click();
  
    // 下载完成后移除链接
    document.body.removeChild(link);
  
    // 释放 Blob 对象的 URL
    URL.revokeObjectURL(link.href);
}
function show_help_tips(){
  if(helpmodal.style.display == "none"){
    helpmodal.style.display = "block"
  }else{
    helpmodal.style.display = "none"
  }
}
helpmodal.addEventListener("click", function(){
  if(helpmodal.style.display !== "none"){
    helpmodal.style.display = "none"
  }
})
// get day data    FUNCTION  fixed
function getSoketData(){
  refreshBtn.style.border =  "1px solid rgb(214, 92, 21)"
  refreshBtn.style.color =  "rgb(214, 92, 21)"
  refreshBtn.onclick = null;
  MAINctx.clearRect(0,0,MAINcanvas.width,MAINcanvas.height)
  responseLocal = []
  VisibleData = []
$.ajax({
    url: '/getSoketData',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({"code":codeShort.value,"fromDate":dateFromChoice,"type":dayWeekChoice}),  // 打包为JSON格式
    success: function(response) {
      refreshBtn.style.border =  "1px solid aqua"
      refreshBtn.style.color =  "aqua"
      refreshBtn.onclick = getSoketData;

      console.log("response",response)
      responseLocal = response
      console.log(responseLocal);
      windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
      basicDataLength = responseLocal[1].length
      subDataLength = (responseLocal[0][0].length-1)/5+1
      FinalSubDataLength = subDataLength
      for (let i = 0; i < subDataLength; i++) {
        FinalSubDataLength = i;
        if (responseLocal[0][responseLocal[0].length-1][i] == 0) {
          break
        }
      }
      if(basicDataLength>windowLength){
        maxStartIndex = basicDataLength-windowLength;//刚好对应下标
      }
      else{
        maxStartIndex = 0;
      }  
      if(reviewModleCheckbox.checked){
        startIndex = -1;
        subEndIndex = 0;
        pointIndex = -1;
        availableStartIndex = -1;
      }else{
        startIndex = maxStartIndex;
        pointIndex = basicDataLength-1;
        subEndIndex = subDataLength;
        availableStartIndex = maxStartIndex;
      }

      RSI_SMA = []
      BIAS_QLs_S_MA = []
      Price_Average_Line = []
      BB_Index = []
      BB_Index2 = []
      NKD_RSV = []
      PRE_data = []
      Price_Average_Line_H = []
      XZC_data = []
      KDJ_data = []
      YYX_data = []

      //trade machine
      chatgedMoney = 0;
      CanBuy = 0;
      ToltalCapitalisation = 0;
      ToltalCost = 0;
      useableMoney = 0;
      ToltalValue = 0;
      UnlockedNum = 0;
      LockedNum = 0;
      UnlockedNum = 0;
      RawMoney = 0;
      TodayStartMoney = 0;
      //     UnlockTheNum(true)
      EleChangeUseableMoney.value = 10000
      // PrintLimitT_MachineVariables("rezero")
      initTradeZero()


      changeOnUseableMoney(0,true)

      PrintLimitPositionVariables("getSoketData")
      // refreshDraw()
      selectrefreshDraw(select__,1,"green")
      limitPriceSale()
    },
    error: function(error) {
        refreshBtn.style.border =  "1px solid aqua"
        refreshBtn.style.color =  "aqua"
        refreshBtn.onclick = getSoketData;
        // $('#result').text('Error:', error);
        console.log("getSoketData wrong",error)
    }
  });
}
// get local ip
function exploreSimpleReqest(type,data){//pickup,open
  // console.log("exploreSimpleReqest(type,data,ele)",type,data,ele)
  $.ajax({
      url: '/explore/exploreSimpleReqest',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({"agent":"explore","type":type,"data":data}),  // 打包为JSON格式
      success: function(response) {
          // console.log(response)
          if(response[0]=="successfully!"){
            var ip = "http://"+response[1]+":5000/chart"
            console.log(ip);
            local_ip.textContent = ip
            copyToClipboard(ip)
          }else{
            local_ip.textContent = "fail"
          }
      },
      error: function(error) {
      }
  })
}

}


// ______others____________________________________________________________________________
{
function IndexSwitch(ind,target){
  if(IndexsSwitch[ind] == 1){
    IndexsSwitch[ind] = 0
    target.style.background = '';
    target.style.color = 'white';
  }else{
    IndexsSwitch[ind] = 1
    target.style.color = 'black';
    target.style.background = 'white';
  }
  refreshDraw(IndexsSwitch)
}
function deepCopyArray(arr) {
  // deep copy slice array
  return arr.map(item => {
    if (Array.isArray(item)) {
      return deepCopyArray(item);
    } else if (item && typeof item === 'object') {
      return JSON.parse(JSON.stringify(item));
    } else {
      return item;
    }
  });
}
// add Event listener to element    FUNCTION  fixed
// buy and sale listener
document.addEventListener('DOMContentLoaded', function() {
  // date from where
  var dateFromContiner = document.getElementById("dateFromContiner")
  dateFromContiner.addEventListener("click",function(event){
      // 检查是否点击了容器内的子元素
    if (event.target !== dayWeekContiner) {
      dateFromContiner.querySelectorAll('*').forEach(child => {
          child.style.background = '';
          child.style.color = 'white';
      });
      event.target.style.color = 'black';
      event.target.style.background = 'white';
      dateFromChoice = event.target.textContent
      // var dateFrom = ["2025-01-01","2024-06-01","2024-01-01","2023-06-01","2023-01-01","2022-06-01","2022-01-01","2021-01-01","2020-06-01"]
      switch(dateFromChoice){
        case "25.1":dateFromChoice = "2025-01-01";break
        case "24.6":dateFromChoice = "2024-06-01";break
        case "24.1":dateFromChoice = "2024-01-01";break
        case "23.6":dateFromChoice = "2023-06-01";break
        case "23.1":dateFromChoice = "2023-01-01";break
        case "22.6":dateFromChoice = "2022-06-01";break
        case "22.1":dateFromChoice = "2022-01-01";break
        case "21.6":dateFromChoice = "2021-06-01";break
        case "21.1":dateFromChoice = "2021-01-01";break
        case "20.6":dateFromChoice = "2020-06-01";break
        default:dateFromChoice = "2025-01-01"
      }
      console.log(dateFromChoice);
    }
  })
  
  // 遍历元素集合，为每个元素添加事件监听器
  for (let i = 0; i < radioCL.length; i++) {
    radioCL[i].addEventListener('change', function() {
      if(radioCL[i].checked){
        radioCLValueArray[i] = 1;
      }else{
        radioCLValueArray[i] = 0;
      }
      console.log(radioCL[i].id, "No.", i,radioCLValueArray,radioCL[i].checked);
    });
  }
  //let numCL = document.getElementsByClassName("numCL")
  for (let i = 0; i < numCL.length; i++) {
    numCL[i].addEventListener('wheel', function(event) {      
        // 阻止默认行为，防止页面滚动
        event.preventDefault();
        // 获取当前值
        let currentValue = parseInt(numCL[i].value, 10);
        // 根据滚轮方向调整值
        if (event.deltaY < 0) {
            // 向上滚动，增加值
            currentValue += 1;
        } else {
            // 向下滚动，减少值
            currentValue -= 1;
        }
        // 确保值在 min 和 max 之间
        //currentValue = Math.max(parseInt(numCL[i].min, 10), Math.min(currentValue, parseInt(numCL[i].max, 10)));
        // 更新输入框的值
        console.log("numCL[i].id",numCL[i].id,"No.",i,"numCL[i].value",numCL[i].value,"currentValue",currentValue,"numCL.length",numCL.length);
        
        numCL[i].value = currentValue;
        numCLValueArray[i] = currentValue;
        if(i>4 && i<10 && radioCLValueArray[1] == 1){
          console.log("changeData")

          responseLocal[0][guanLianInd][i-5] = currentValue
          responseLocal[0][guanLianInd][2] = Math.max.apply(null, numCLValueArray.slice(5,9));
          responseLocal[0][guanLianInd][3] = Math.min.apply(null, numCLValueArray.slice(5,9));

          var val = "["
          for (let index = 0; index < responseLocal[0].length-preOpLength; index++) {
            // val += "["+responseLocal[0][index]+"],\n"
            val += "["+responseLocal[0][index].slice(0,6)+',"'+responseLocal[0][index][6]+' '+responseLocal[0][index][7]+'"],\n'
          }
          val = val.slice(0, -2);
          val += "]"
          
          preOparationMethod = [1,    0,     0,        0,     0]

          Price_Average_Line = []
          KDJ_data = []

          EditingData = val;
          // doAnalyse(EditingData,0)
          
          refreshDraw(IndexsSwitch)
        }
        if(i==10){
          preOpLength = currentValue;
          afterNK[5] = Math.floor(currentValue/2)
          afterNK[6] = Math.floor(currentValue)
          // console.log("currentValue",currentValue);
          // console.log(preOpLength);
          // console.log(afterNK);
          // console.log("numCLValueArray[10]",numCLValueArray[10]);
        }
        if(i==11){
          timerInterval = currentValue;
          console.log(timerInterval,"timerInterval set");
          if (timer !== null) {      
            clearInterval(timer);
            timer = null;
            console.log('已暂停--变速');
            timer = setInterval(tick, timerInterval);
            console.log('timer 已重启动--变速');
          }
        }
    });
    numCL[i].addEventListener('input', function(event) {
      // 获取当前值
      let currentValue = parseInt(numCL[i].value, 10);
      // 确保值在 min 和 max 之间
      //currentValue = Math.max(parseInt(numCL[i].min, 10), Math.min(currentValue, parseInt(numCL[i].max, 10)));
      // 更新输入框的值
      console.log("numCL[i].id",numCL[i].id,"No.",i,"numCL[i].value",numCL[i].value,"currentValue",currentValue,"numCL.length",numCL.length);
      // numCL[i].value = currentValue;
      numCLValueArray[i] = currentValue;
      if(i==10){
        preOpLength = currentValue;
        afterNK[5] = Math.floor(currentValue/2)
        afterNK[6] = Math.floor(currentValue)
        
        // console.log("currentValue",currentValue);
        // console.log(preOpLength);
        // console.log(afterNK);
        // console.log("numCLValueArray[10]",numCLValueArray[10]);
      }
      if(i==11){
        timerInterval = currentValue;
        console.log(timerInterval,"timerInterval set");
        if (timer !== null) {      
          clearInterval(timer);
          timer = null;
          console.log('已暂停--变速');
          timer = setInterval(tick, timerInterval);
          console.log('timer 已重启动--变速');
        }
      }
  });
  }
});
// run when open    FUNCTION  fixed
window.onload = function() {
  // 监听图标容器变化
  // 选择需要监听的元素
  // const element = document.getElementById('Mainchart');
  // 创建 ResizeObserver 实例
  const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
      const { width, height } = entry.contentRect;
      console.log(`Width: ${width}, Height: ${height}`);
      MainchartWidth = 2*width;
      MainchartHeight = 2*height;
      SubchartWidth = MainchartWidth
      SubchartHeight = Num_round(MainchartHeight/74*18.5,2)
      MaskchartHeight = MainchartHeight/74*97
      if(responseLocal.length!=0){
        console.log("change window size refreshDraw()");
        reinitVarialsForZoom();
        refreshDraw(IndexsSwitch)
      }
      windowLength = Math.floor((MainchartWidth-(2*drawGap))/(drawGap + chartItemWidth))
      console.log(`Width: ${width}, Height: ${height}`,"windowLength:",windowLength);
      PrintLimitPositionVariables("init",true)
      doAnalyse();
      // getSoketData()
    }
  });
  // 监听该元素
  resizeObserver.observe(Mainchart);
  //getSoketData()

  // 遍历元素集合，为每个元素添加事件监听器
  for (let i = 0; i < radioCL.length; i++) {
    if(radioCLValueArray[i] == 1){
      radioCL[i].checked = true;
    }
  } 
  for (let i = 0; i < numCL.length; i++) {
    numCL[i].value = numCLValueArray[i];
  }

  analyse()
}

// draw test    FUNCTION
function drawTest(x,y,ofX,ofY){
  console.log("drawtest",x,y,ofX,ofY)
  MAINctx.strokeRect(x,y,ofX,ofY);
  MAINctx.stroke()
}
// console log the conmmon variable    FUNCTION
function InfoOfOffsetX(flag){
  console.log(flag)
  console.log(
    "offsetX",offsetX,"\n",
    "currentOffsetXFive",currentOffsetXFive,"\n",
    "currentOffsetXMaxForScroll",currentOffsetXMaxForScroll,"\n",
    "offsetXMaxForScroll",offsetXMaxForScroll,"\n",
    "offsetXMaxForALL",offsetXMaxForALL,"\n",
    "currentOffsetX",currentOffsetX,"\n",
    "VisibleMax",VisibleMax,"\n",
    )
}
// console log Limi tPosition Variables    FUNCTION
function PrintLimitPositionVariables(info,shortflag=false){
  console.log(info+" start:+++++++++++++++++++++++")
  if(shortflag){
    console.log(
      "drawGap",drawGap,"\n",
      "chartItemWidth",chartItemWidth,"\n",
      "MainchartHeight",MainchartHeight,"\n",
      "MainchartWidth",MainchartWidth,"\n",
      "SubchartHeight",SubchartHeight,"",
    )
  }
  console.log(
    "windowLength",windowLength,"\n",
    "basicDataLength",basicDataLength,"\n",
    "subDataLength",subDataLength,"\n",
    "FinalSubDataLength",FinalSubDataLength,"\n",
    "maxStartIndex",maxStartIndex,"\n",
    "startIndex",startIndex,"\n",
    "subEndIndex",subEndIndex,"\n",
    "pointIndex",pointIndex,"\n",
    "availableStartIndex",availableStartIndex,"\n",
    )
    console.log(info+" end:------------------------")
}
function PrintLimitT_MachineVariables(info,shortflag=true){
  console.log(info+" start:+++++++++++++++++++++++")
  if(shortflag){
    console.log(
      "chatgedMoney",chatgedMoney,"\n",
      "CanBuy",CanBuy,"\n",
      "ToltalCapitalisation",ToltalCapitalisation,"\n",
      "ToltalCost",ToltalCost,"\n",
      "useableMoney",useableMoney,"\n",
      "ToltalValue",ToltalValue,"\n",
      "LockedNum",LockedNum,"\n",
      "UnlockedNum",UnlockedNum,"\n",
      "brokerage",brokerage,"\n",
      "RawMoney",RawMoney,"","\n",
      "TodayStartMoney",TodayStartMoney,"\n"
    )
  }
  console.log(
    )
    console.log(info+" end:------------------------")
}
}