let boxs = document.querySelector('.box');
let myChart = echarts.init(boxs);
let dataArr = [BJData,SHData,GZData];
let newArr = [BJData[0]];
myChart.setOption(option);
let seriesModel = myChart.getModel().getSeriesByIndex(0);
let coordSys = seriesModel.coordinateSystem;
//let point = coordSys.dataToPoint(geoCoordMap['北京']);
//let coord = coordSys.dataToPoint(point);
