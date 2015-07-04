/**
 * Created by Mohammed on 7/2/2015.
 */


function getCoordinatesForOperators(parentConfig, operatorConfig, noOfIcons){

    var W = parentConfig.width, H=parentConfig.height;

    var x = operatorConfig.horMargin, y=operatorConfig.vertMargin , w=operatorConfig.icon_width, h=operatorConfig.icon_height;

    n = Math.round((W-x)/(w+x));
    m = Math.round((H-y)/(h+y));

    var coordinates = [];
    var row = 0, col=0;
    var i;
    for(i=0; i<noOfIcons; i++){

        var x_i = (col+1)*x + col*x;
        var y_i = (row+1)*y + row*y + 30;
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

function getConfigsForStreams(parentConfig, streamsConfig, noOfStreams){
    var H=parentConfig.height;
    var W=parentConfig.width;

    var h = (H - 30 - noOfStreams*streamsConfig.vertMargin) / noOfStreams;
    var w = (W - 10)*0.6;
    var coordinates = [];

    for(var i=0; i<noOfStreams; i++){

        var x = parentConfig.x + 10;
        var y = parentConfig.y + 30 + i*(h+streamsConfig.vertMargin);
        var obj = {x:x, y:y, height:h, width:w};
        coordinates.push(obj);

    }

    return coordinates;
}


function drawOperators(operators, operatorsConfig, operatorRectConfig){

    var coordinates = getCoordinatesForOperators(operatorRectConfig, operatorsConfig, operators.length);

    mainLayout.selectAll('image')
        .data(operators)
        .enter()
        .append('svg:image')
        .attr('xlink:href', function(d){
            //console.log(d);
            return "images/"+ d.icon;
        })
        .attr('type', function(d){
            return d.type;
        })
        .attr('width',  operatorsConfig.icon_width)
        .attr('height',  operatorsConfig.icon_height)
        .attr('x', function(d, i){
            return coordinates[i][0];
        })
        .attr('initial-x', function(d, i){
            return coordinates[i][0];
        })
        .attr('y', function(d, i){
            return coordinates[i][1];

        })
        .attr('initial-y', function(d, i){
            return coordinates[i][1];

        })
        .call(operatorDrag)
        .append('svg:title')
        .text(function (d, i) {
            return d.type;
        })



    ;

}
function drawStreams(streams, streamsConfig, streamRectConfig){

    var coordinates = getConfigsForStreams(streamRectConfig, streamsConfig, streams.length);

    //console.log(streams);

    var myGroup = mainLayout.selectAll('rect.streams')
        .data(streams)
        .enter()
        .append('g')
        .attr('class', 'streams')
        .call(streamsDrag);


    myGroup.append('rect')
        .attr('class', 'streams')
        .style('fill', 'white')
        .attr('width', function(d, i){
            return coordinates[i].width;
        })
        .attr('height',  function(d,i){
            return coordinates[i].height;
        })
        .attr('x', function(d, i){
            return coordinates[i].x;
        })
        .attr('initial-x', function(d, i){
            return coordinates[i].x;
        })
        .attr('y', function(d, i){
            return coordinates[i].y;

        })
        .attr('initial-y', function(d, i){
            return coordinates[i].y;

        })
    ;

    myGroup.append('text')
        .text(function(d, i){
            var stream_name = streams[i].connectionName;
            if(stream_name.length <= 18){
                return stream_name;
            }
            return streams[i].connectionName.substr(0, 18)+'...';
        })
        .attr('x', function(d, i){
            return coordinates[i].x + 10;
        })

        .attr('initial-x', function(d, i){
            return coordinates[i].x + 10;
        })
        .attr('y', function(d, i){
            return coordinates[i].y + coordinates[i].height/2;
        })

        .attr('initial-y', function(d, i){
            return coordinates[i].y + coordinates[i].height/2;
        })
        .attr('width', function (d, i) {
            return coordinates[i].width;
        })
        .attr('height', function (d, i) {
            return coordinates[i].height;
        })
        .append('svg:title')
        .text(function(d, i){
            return streams[i].connectionName;
        })
    ;

}

