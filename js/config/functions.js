/**
 * Created by Mohammed on 6/12/2015.
 */


/***
 *
 * @param parentConfig : JSON obj with the parent elements config
 * @param operatorConfig : JSON obj with the margin propeties
 * @param icons : string array with icon names
 */
function getCoordinatesForOperators(parentConfig, operatorConfig, icons){

    var W = parentConfig.width, H=parentConfig.height;

    var x = operatorConfig.horMargin, y=operatorConfig.vertMargin, w=operatorConfig.icon_width, h=operatorConfig.icon_height;

    n = Math.round((W-x)/(w+x));
    m = Math.round((H-y)/(h+y));

    var coordinates = [];
    var row = 0, col=0;
    var i;
    for(i=0; i<icons.length; i++){

        var x_i = (col+1)*x + col*x;
        var y_i = (row+1)*y + row*y;
        var alpha = [x_i, y_i];

        coordinates.push(alpha);
        col+=1;

        if(col==n){
            row+=1;
            col=0
        }

    }

    return coordinates;

}

/**
 *
 * @param operatorNodes
 * @returns {Array} with operator names
 */
function getIconNames(operatorNodes){

    names = [];

    for(var i=0; i<operatorNodes.length; i++){
        //console.log(operatorNodes[i]);
        names.push(operatorNodes[i].icon);
    }

    return names;
}

function move() {
    d3.select(this)
        .attr('x', d3.event.x - parseInt(d3.select(this).attr("width")) / 2)
        .attr('y', d3.event.y - parseInt(d3.select(this).attr("height")) / 2)
}

function drawOperators(operatorsObject, operatorsRectConfig, operatorsConfig,  targetSvg){


    var drag = d3.behavior.drag()
            .on("drag", move)
            .on("dragend", function(d){

                var elem = d3.select(this);

                //bring the element to its original location
                elem.attr('x', elem.attr('initial-x'));
                elem.attr('y', elem.attr('initial-y'));

                //get the current mouse coordinates
                var mouseLoc = d3.mouse(this);
                var x = mouseLoc[0], y = mouseLoc[1];

                //if mouse pointer is in drawing area
                if(mouseLoc[0] > 320){
                    mainLayout
                        .append('svg:image')
                        .attr('width', elem.attr('width'))
                        .attr('height', elem.attr('height'))
                        .attr('x', x)
                        .attr('initial-x', x)
                        .attr('y', y)
                        .attr('initial-y', y)
                        .attr('xlink:href', elem.attr('href'))
                        .on("mouseover", function(){
                            console.log('hello world');
                           mainLayout
                                .append('rect')
                                .attr('id', 'nodeIco')
                                .attr('width', 10)
                                .attr('height', 10)
                                .style('fill', 'red')
                                .attr('x', parseFloat( d3.select(this).attr('x'))+parseFloat(elem.attr('width'))-10)
                                .attr('y', parseFloat( d3.select(this).attr('y')))
                        })
                        .on("mouseout", function(){
                            console.log('out');
                            d3.select('#nodeIco')
                                .remove()
                        })

                        .on('contextmenu', function(d, i){

                            var curElem = d3.select(this);
                            d3.event.preventDefault();
                            var position = d3.mouse(this);
                            d3.select('#elem-right-click')
                                .style('position', 'absolute')
                                .style('left', position[0] + "px")
                                .style('top', position[1] + "px")
                                .style('display', 'block')
                                .on('click', function(d, i){

                                    var conf = confirm('Confiem Delete?');
                                    if(conf){
                                        curElem.remove();
                                    }
                                    d3.select(this).style('display', 'none');


                                })
                            ;


                        })
                        .call(d3.behavior.drag()
                            .on('drag', move)
                            .on('dragend', function(){
                                var mouseCoordinates = d3.mouse(this);
                                if(mouseCoordinates[0]<320 || mouseCoordinates[1]<=44 || mouseCoordinates[0]>= 980 || mouseCoordinates[1]>= 500){
                                    var elem = d3.select(this);
                                    elem.attr("x",elem.attr("initial-x"));
                                    elem.attr("y",elem.attr("initial-y"));
                                }
                            })

                    )

                    ;

                }

            })
        ;

    var icons = getIconNames(operatorsObject);
    var iconsCoordinates = getCoordinatesForOperators(operatorsRectConfig, operatorsConfig, icons);
    var mainLayout = targetSvg;


    console.log(icons);

    mainLayout.selectAll("image")

        .data(icons)
        .enter()
        .append("svg:image")
        .attr("xlink:href", function(d){
            return "images/icons/"+d;
        })

        .attr('class','drg')
        .attr("width", operatorsConfig.icon_width)
        .attr("height", operatorsConfig.icon_height)
        .attr("x", function(d, i){
            return iconsCoordinates[i][0];
//                                            return i*10;
        })
        .attr("initial-x", function(d, i){
            return iconsCoordinates[i][0];
        })
        .attr("y",function(d, i){
            return iconsCoordinates[i][1];
//                                            return i*10;
        })
        .attr('initial-y', function(d, i){
            return iconsCoordinates[i][1];
        })


        .call(drag)

        .append('svg:title')
        .text(function(d){
            //console.log(d);
            return d.split('.')[0];
        })


    ;

}

function getRectObjects(rectElementObj, tree){

    //Initial point
    var x0 = Number(rectElementObj.x)+ 20;
    var y0 = Number(rectElementObj.y) + 30;
    var height = Number(rectElementObj.height) - 40;
    var width = Number(rectElementObj.width) - 30;


    tree.unshift('InputOutputStream');

    var streamNames = tree;


    var len = streamNames.length;

    var rectangles = len;
    var gaps = rectangles - 1;
    var sizeOfGap = 5;
    var heightOfRect = Math.round((height - (sizeOfGap * gaps)) / rectangles);
    var widthOfRect = Math.round(width * 0.5);


    var streams = [{},{},{},
        {
            x : x0,
            y : y0,
            width : widthOfRect,
            height : heightOfRect,
            drag : 'false'

        }];

    var children = [];
    for (var i = 0; i < len - 1; i++) {
        children[i] =
        {
            x: x0 + widthOfRect,
            y: y0 + ((i + 1 ) * heightOfRect) + ((i + 1) * sizeOfGap),
            width: widthOfRect,
            height: heightOfRect,
            drag : 'true'
        }
    }


    var rectObj = streams.concat(children);

    var vertLine =[];

    if(len==1){
        vertLine = [
            {   x1: x0 + Math.round(widthOfRect/2),
                x2: x0 + Math.round(widthOfRect/2),
                y1: y0 + heightOfRect,
                y2: y0 + heightOfRect
            }
        ];
    }
    else{
        vertLine = [
            {   x1: x0 + Math.round(widthOfRect/2),
                x2: x0 + Math.round(widthOfRect/2),
                y1: y0 + heightOfRect,
                y2: y0 + ((len - 1) * sizeOfGap) + ((( 2* len) - 1 ) * Math.round(heightOfRect/2))
            }
        ];
    }



    var horiLines =[];

    for (var j = 0; j < len - 1; j++) {
        horiLines[j] =
        {
            x1: x0 + Math.round(widthOfRect/2),
            x2: x0 + widthOfRect,
            y1: y0 + ((j + 1) *(sizeOfGap)) + ((j + 1) * (heightOfRect)) + Math.round(heightOfRect/2),
            y2: y0 + ((j + 1) *(sizeOfGap)) + ((j + 1) * (heightOfRect)) + Math.round(heightOfRect/2)
        }
    }

    var lineObj = vertLine.concat(horiLines);

    return [rectObj,lineObj];


}

function getTextObjects(rectElementObj, tree){

    //Initial point
    var x0 = Number(rectElementObj.x)+ 20;
    var y0 = Number(rectElementObj.y) + 30;
    var height = Number(rectElementObj.height) - 40;
    var width = Number(rectElementObj.width) - 30;

    var stream = tree;


    var len = stream.length;

    var rectangles = len;
    var gaps = rectangles - 1;
    var sizeOfGap = 5;
    var heightOfRect = Math.round((height - (sizeOfGap * gaps)) / rectangles);
    var widthOfRect = Math.round(width * 0.5);

    var streams = [{},{},

        {
            text : stream[0],
            x : x0+sizeOfGap,
            y : y0 +  Math.round( 2 * heightOfRect/3)

        }];

    var children = [];
    for (var i = 1; i < len; i++) {
        children[i-1] =
        {
            text: checkLengthText(stream[i]),
            x: x0 + widthOfRect + sizeOfGap,
            y: y0 + ((i ) *(sizeOfGap)) + ((i) * (heightOfRect)) + Math.round(heightOfRect/2),
            fulltext: stream[i]

        }
    }

    return streams.concat(children);

}

function checkLengthText(text){
    if(text.length > 16){
        var temp = text.substring(0,12);
        var cont = '....';
        return temp.concat(cont);
    }
    else{
        return text;
    }
}

function getStreamNames(InputOutputNodes){

    var streams = [];

    InputOutputNodes.forEach(function(d){
        streams.push(d.connectionName);
    });

    return streams;
    //window.alert(streams);
}
function dragmove() {
    var x = d3.event.x;
    var y = d3.event.y;
    //d3.select(this).attr("transform", "translate(" + x/8 + " " + y/8 + ")").style("visibility", "visible");;
    //console.log(d3.select(this).select('rect').attr('width'));
    //console.log(d3.select(this).select('text').text());
    var rect = d3.select(this).select('rect');
    var text = d3.select(this).select('text');
    var title = d3.select(this).select('text').select('title').text();
    //console.log(title);

    rect.attr('x', d3.mouse(this)[0]);
    rect.attr('y', d3.mouse(this)[1]);
    text.attr('x', d3.mouse(this)[0]+5);
    text.attr('y', d3.mouse(this)[1]+25);

}

function drawTree(InputOutputNodes, streamsRectConfig,mainLayout){


    var dragGroup = d3.behavior.drag()
        .on("drag", dragmove)
        //.on("dragend", dropHandler)
        ;


    var drag= d3.behavior.drag()
            .on('drag', function(d,i){
                var elem = d3.select(this);

                if(elem.attr('draggable') == 'true'){
                    console.log('true');
                    //if(d3.select(this).datum().drag) move.call(this, d, i);
                    if(d3.select(this).datum().drag) move.call(this, d, i);
                }

            })
            .on('dragend', function(){

                var elem = d3.select(this);
                if(elem.attr('draggable') == 'false'){
                    return 0;
                }

                //
                elem.attr('x', elem.attr('initial-x'));
                elem.attr('y', elem.attr('initial-y'));

                console.log(d3.select(this.parentNode).select('text').select('title').text());

                var mouseLoc = d3.mouse(this);

                var grp = mainLayout.append('g').call(dragGroup);

                if(mouseLoc[0] > 320){
                    grp
                        .append('rect')
                        .attr('width', elem.attr('width'))
                        .attr('height', elem.attr('height'))
                        .attr('x', mouseLoc[0])
                        //.attr('txt', d3.select())
                        .attr('initial-x', mouseLoc[0])
                        .attr('y', mouseLoc[1])
                        .attr('initial-y', mouseLoc[1])
                        .style('fill', 'white')
                        //.on('contextmenu', function(d, i){
                        //    var curElem = d3.select(this);
                        //    d3.event.preventDefault();
                        //    var position = d3.mouse(this);
                        //    d3.select('#elem-right-click')
                        //        .style('position', 'absolute')
                        //        .style('left', position[0] + "px")
                        //        .style('top', position[1] + "px")
                        //        .style('display', 'block')
                        //        .on('click', function(d, i){
                        //
                        //            var conf = confirm('Confiem Delete?');
                        //            if(conf){
                        //                curElem.remove();
                        //            }
                        //
                        //            d3.select(this).style('display', 'none');
                        //
                        //
                        //        })
                        //    ;
                        //
                        //
                        //})
                        .call(d3.behavior.drag()
                            .on('drag', drag)
                            .on('dragend', function(){
                                var mouseCoordinates = d3.mouse(this);
                                if(mouseCoordinates[0]<320 || mouseCoordinates[1]<=44 || mouseCoordinates[0]>= 980 || mouseCoordinates[1]>= 500){
                                    var elem = d3.select(this);
                                    elem.attr("x",elem.attr("initial-x"));
                                    elem.attr("y",elem.attr("initial-y"));
                                }
                            })
                    );

                    var inText = d3.select(this.parentNode).select('text');
                    var title = d3.select(this.parentNode).select('text');

                    grp.append('text')
                        .text(inText.text().substring(0,16))
                        .attr('x', mouseLoc[0]+5)
                        .attr('y', mouseLoc[1]+25)
                        .append('svg:title')
                        .text(title.text().substring(16))

                    ;




                }


            })
        ;



    var tree = getStreamNames(InputOutputNodes);

    var allObjects = getRectObjects(streamsRectConfig,tree);
    var textObjects = getTextObjects(streamsRectConfig,tree);
    var rectObjects = allObjects[0];
    var lineObjects = allObjects[1];

    //var Group = mainLayout.append('g');

    for(i=3; i < rectObjects.length; i++){

        var groupName = 'grp'.concat((i-2).toString());

        var Group = mainLayout.append('g')
            ;

        Group.
            attr('id',groupName);

        var rectangles = Group
            .selectAll('rect')
            .data([rectObjects[i]])
            .enter()
            .append('rect');
    //
        rectangles
            .attr("x", function (d) { return d.x; })
            .attr("initial-x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .attr("initial-y", function (d) { return d.y; })
            .attr("height", function (d) { return d.height; })
            .attr("width", function (d) { return d.width; })
            .attr("fill", function () { return "white"; })
            .attr("stroke", function () { return "black"; })
            .style("stroke-width", function() { return "1 px"; })
            .attr("draggable",function(d){return d.drag;})
            .call(drag)

        ;

        var texts = Group
            .selectAll('text')
            .data([textObjects[i-1]])
            .enter();

        texts.append("text")
            .text(function(d){        return d.text; })
            .attr("x", function (d) { return d.x; })
            .attr("y", function (d) { return d.y; })
            .append('svg:title')
            .text(function(d){
                return d.fulltext;
            })
        ;

        //console.log(textObjects[i-1]);

    }


    var lines = mainLayout.selectAll("line")
        .data(lineObjects)
        .enter()
        .append("line");

    var lineAttributes = lines
        .attr("x1", function (d) { return d.x1; })
        .attr("x2", function (d) { return d.x2; })
        .attr("y1", function (d) { return d.y1; })
        .attr("y2", function (d) { return d.y2; })
        .attr("stroke", function (d) { return "black"; })
        .style("stroke-width", function(d) { return "1 px"; });






}