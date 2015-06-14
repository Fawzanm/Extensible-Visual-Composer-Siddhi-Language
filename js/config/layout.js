/**
 * Created by Mohammed on 6/12/2015.
 */


var svgCanvasH = 560, svgCanvasW = 1024;

var operatorsRectConfig = {
    height: 250,
    width: 300,
    x: 10,
    y: 20,
    background: 'grey'

};

var streamsRectConfig = {
    height: 250,
    width: 300,
    x: 10,
    y: 280,
    background: 'grey'

};

var drawingRectConfig = {
    height: 510,
    width: 690,
    x: 320,
    y: 20,
    background: 'grey'

};

operatorsConfig = {
    horMargin: 25,
    vertMargin: 50,
    icon_width: 35,
    icon_height: 35
};


//draw the layout
var mainLayout = d3.select("body")
    .append('svg')
    .attr('height', svgCanvasH)
    .attr('width', svgCanvasW)
    //.style('background', '#aaffff')
    ;

//draw the operators region
var operators = mainLayout
        .append('rect')
        .attr('x', operatorsRectConfig.x)
        .attr('y', operatorsRectConfig.y)
        .attr('height', operatorsRectConfig.height)
        .attr('width', operatorsRectConfig.width)
        .style('fill', operatorsRectConfig.background)


    ;

//append the title to the operators region
var operatorsTitle = mainLayout
    .append('text')
    .attr('x', operatorsRectConfig.x + 20)
    .attr('y', operatorsRectConfig.y + 22)
    .text('Operators')
    .style({
        'font-size': 20,
        'fill': 'blue'
    });

//draw the streams layout
var streams = mainLayout
    .append('rect')
    .attr('id', 'streams')
    .attr('x', streamsRectConfig.x)
    .attr('y', streamsRectConfig.y)
    .attr('height', streamsRectConfig.height)
    .attr('width', streamsRectConfig.width)
    .style('fill', streamsRectConfig.background);


//append the title to the streams layout
var streamsTitle = mainLayout
    .append('text')
    .attr('x', streamsRectConfig.x + 20)
    .attr('y', streamsRectConfig.y + 22)
    .text('Streams')
    .style({
        'font-size': 20,
        'fill': 'blue'
    });


//draw the drawing layout
var drawings = mainLayout
    .append('rect')
    .attr('x', drawingRectConfig.x)
    .attr('y', drawingRectConfig.y)
    .attr('height', drawingRectConfig.height)
    .attr('width', drawingRectConfig.width)
    //.style('fill', drawingRectConfig.background)
    .style('fill', 'blue')

     ;


drawOperators(Operators, operatorsRectConfig,operatorsConfig,mainLayout);
drawTree(InputOutputNodes, streamsRectConfig,mainLayout);
//getRectObjects(streamsRectConfig,['tree','leaf']);