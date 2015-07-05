/**
 * Created by Mohammed on 7/2/2015.
 */



var opsInQueryBox = {};

var queryBoxZones = [];

var drawingZone = [

    {
        id: 'drawingArea',
        x: drawingRectConfig.x,
        y: drawingRectConfig.y,
        height: drawingRectConfig.height,
        width: drawingRectConfig.width
    }

];

function updateNodes(opId){

    console.log(opId);

    var elem = d3.select('#'+opId);

    var group = elem.select(function () {

        return this.parentNode;
    });

    var node_left = group.select('.nodeLeft');
    var node_right = group.select('.nodeRight');

    node_left.attr('cx', elem.attr('x'));
    node_left.attr('cy', parseFloat(elem.attr('y'))+parseFloat(elem.attr('height'))/2);

    node_right.attr('cx', parseFloat(elem.attr('x')) + parseFloat(elem.attr('width')));
    node_right.attr('cy', parseFloat(elem.attr('y'))+parseFloat(elem.attr('height'))/2);

}

function isInDragZone(zoneArray, x, y) {

    for (var i = 0; i < zoneArray.length; i++) {

        var elem = zoneArray[i];

        if (x >= parseFloat(elem.x) &&
            x <= ( parseFloat(elem.x) + parseFloat(elem.width) ) &&
            y >= parseFloat(elem.y) &&
            y <= ( parseFloat(elem.y) + parseFloat(elem.height))
        ) {
            //return true;
            return elem.id;
        }

    }

    return false;

}


var operatorDrag = d3.behavior.drag()
        .on('drag', function () {

        if(d3.event.sourceEvent.button == 0){

            var currentElem = d3.select(this);
            var mouseLoc = d3.mouse(this);
            currentElem.attr('x', mouseLoc[0]);
            currentElem.attr('y', mouseLoc[1]);

        }




        })
        .on('dragend', function () {


        if(d3.event.sourceEvent.button == 0) {

            var mouseLoc = d3.mouse(this);
            var elem = d3.select(this);

            if (isInDragZone(drawingZone, mouseLoc[0], mouseLoc[1])) {

                //console.log('dropped in drag zone');

                //copy operator if it is a query
                if (elem.attr('type') == 'query') {

                    var queryElem = mainLayout
                            .append('g')
                            .attr('class', 'query-group')
                            .append('svg:image')
                            .attr('id', function () {
                                return "query-" + (queryBoxZones.length + 1)
                            })
                            .attr('xlink:href', elem.attr('href'))
                            .attr('type', elem.attr('type'))
                            .attr('width', elem.attr('width') * 3)
                            .attr('height', elem.attr('height') * 3)
                            .attr('x', mouseLoc[0])
                            .attr('initial-x', mouseLoc[0])
                            .attr('y', mouseLoc[1])
                            .attr('initial-y', mouseLoc[1])
                            .call(queryBoxDragonDrawing)
                            .on('contextmenu', function () {
                                d3.stopPropagation();
                                return null;
                            })
                        ;

                    queryBoxZones.push({
                        id: queryElem.attr('id'),
                        x: queryElem.attr('x'),
                        y: queryElem.attr('y'),
                        width: queryElem.attr('width'),
                        height: queryElem.attr('height')
                    })
                    ;

                    opsInQueryBox[queryElem.attr('id')] = [];


                }
                //else if the operator dropeed inside the query, copy it as well
                else {

                    if (isInDragZone(queryBoxZones, mouseLoc[0], mouseLoc[1])) {

                        var queryBoxId = isInDragZone(queryBoxZones, mouseLoc[0], mouseLoc[1]);
                        var count = 0;
                        if (opsInQueryBox.hasOwnProperty(queryBoxId)) {
                            count = (opsInQueryBox[queryBoxId]).length;
                            opsInQueryBox[queryBoxId].push('op-' + queryBoxId + (count + 1));
                        } else {
                            opsInQueryBox[queryBoxId] = [];
                            opsInQueryBox[queryBoxId].push('op-' + queryBoxId + (count + 1));

                        }

                        var q = d3.select('#' + queryBoxId);
                        var op =
                            //mainLayout
                            q.select(function () {
                                return this.parentNode;
                            })
                                //q.node().parentNode
                                .append('g')
                                .attr('class', 'op-group')
                                .append('image')
                                .attr('id', 'op-' + queryBoxId + (count + 1))
                                .attr('xlink:href', elem.attr('href'))
                                .attr('type', elem.attr('type'))
                                .attr('width', elem.attr('width') * 0.75)
                                .attr('height', elem.attr('height') * 0.75)
                                .attr('x', mouseLoc[0])
                                .attr('initial-x', mouseLoc[0])
                                .attr('y', mouseLoc[1])
                                .attr('initial-y', mouseLoc[1])
                                .call(operatorDragOnQueryBox)


                        drawCircle('op-' + queryBoxId + (count + 1));

                        var queryBox = d3.select('#' + queryBoxId);
                        queryBox.attr('width', parseFloat(queryBox.attr('width')) * 1.1);
                        queryBox.attr('height', parseFloat(queryBox.attr('height')) * 1.1);

                        queryBoxZones.forEach(function (d, i) {
                            if (d.id == queryBoxId) {
                                queryBoxZones[i]['width'] = queryBox.attr('width');
                                queryBoxZones[i]['height'] = queryBox.attr('height');
                            }
                        });


                        console.log(opsInQueryBox);


                    }

                }
                //otherwise do nothing


            }
            var currentElem = d3.select(this);
            currentElem.attr('x', currentElem.attr('initial-x'));
            currentElem.attr('y', currentElem.attr('initial-y'));

        }

        })

    ;


var streamsDrag = d3.behavior.drag()
        .on('drag', function () {

        if(d3.event.sourceEvent.button == 0){
            var currentGroup = d3.select(this);
            var rect = currentGroup.select('rect');
            var text = currentGroup.select('text');

            var mouseLoc = d3.mouse(this);

            rect.attr('x', mouseLoc[0]);
            rect.attr('y', mouseLoc[1]);

            text.attr('x', mouseLoc[0] + 10);
            text.attr('y', mouseLoc[1] + parseFloat(rect.attr('height')) / 2);

        }

        })
        .on('dragend', function () {

        if(d3.event.sourceEvent.button == 0) {


            var currentGroup = d3.select(this);
            var rect = currentGroup.select('rect');
            var text = currentGroup.select('text');
            var title = currentGroup.select('title');
            var mouseLoc = d3.mouse(this);


            rect.attr('x', rect.attr('initial-x'));
            rect.attr('y', rect.attr('initial-y'));

            text.attr('x', text.attr('initial-x'));
            text.attr('y', text.attr('initial-y'));

            if (isInDragZone(drawingZone, mouseLoc[0], mouseLoc[1])) {

                var newGroup = mainLayout.append('g')
                    .call(streamsDragOnDrawing);

                var newRect = newGroup.append('rect')
                        .attr('id', function () {
                            return title.text()
                        })
                        .attr('x', mouseLoc[0])
                        .attr('initial-x', mouseLoc[0])
                        .attr('y', mouseLoc[1])
                        .attr('initial-y', mouseLoc[1])
                        .attr('height', rect.attr('height'))
                        .attr('width', rect.attr('width'))
                        .style('fill', 'white')
                        .on('mouseover', function () {
                            var group = d3.select(this.parentNode);
                            //console.log(group.attr('class'));
                            var circles = group.selectAll('circle').style('visibility', 'visible');
                        })
                        .on('mouseout', function () {
                            var group = d3.select(this.parentNode);
                            //console.log(group.attr('class'));
                            var circles = group.selectAll('circle').style('visibility', 'hidden');
                        })

                    ;

                var newText = newGroup.append('text')
                        .attr('x', mouseLoc[0] + 10)
                        .attr('initial-x', mouseLoc[0] + 10)
                        .attr('y', mouseLoc[1] + newRect.attr('height') / 2)
                        .attr('initial-y', mouseLoc[1] + newRect.attr('height') / 2)
                        .text(function () {
                            var stream_name = title.text();
                            if (stream_name.length <= 18) {
                                return stream_name;
                            }
                            return stream_name.substr(0, 18) + '...';
                        })
                        .on('mouseover', function () {
                            var group = d3.select(this.parentNode);
                            //console.log(group.attr('class'));
                            var circles = group.selectAll('circle').style('visibility', 'visible');
                        })
                        .append('svg:title')
                        .text(function () {
                            return title.text();
                        })
                    ;

                drawCircle(title.text());
            }

        }
        })

    ;

var streamsDragOnDrawing = d3.behavior.drag()
    .on('drag', function () {

        if(d3.event.sourceEvent.button == 0) {

            var currentGroup = d3.select(this);
            var rect = currentGroup.select('rect');
            var text = currentGroup.select('text');

            var mouseLoc = d3.mouse(this);

            rect.attr('x', mouseLoc[0]);
            rect.attr('y', mouseLoc[1]);

            text.attr('x', mouseLoc[0] + 10);
            text.attr('y', mouseLoc[1] + parseFloat(rect.attr('height')) / 2);

            updateNodes(rect.attr('id'));

        }
    })
    .on('dragend', function () {

        if(d3.event.sourceEvent.button == 0) {

            var currentGroup = d3.select(this);
            var rect = currentGroup.select('rect');
            var text = currentGroup.select('text');

            var mouseLoc = d3.mouse(this);
            if (isInDragZone(drawingZone, mouseLoc[0], mouseLoc[1])) {

                rect.attr('initial-x', mouseLoc[0]);
                rect.attr('initial-y', mouseLoc[1]);

                text.attr('initial-x', mouseLoc[0] + 10);
                text.attr('initial-y', mouseLoc[1] + parseFloat(rect.attr('height')) / 2);

            } else {
                //console.log('not in drag zone');
                //console.log('x : ' + rect.attr('x'));
                //console.log('y : ' + rect.attr('y'));
                rect.attr('x', rect.attr('initial-x'));
                rect.attr('y', rect.attr('initial-y'));

                text.attr('x', text.attr('initial-x'));
                text.attr('y', text.attr('initial-y'));

            }

            updateNodes(rect.attr('id'));

        }
    });


var queryBoxDragonDrawing = d3.behavior.drag()
    .on('drag', function () {

        if(d3.event.sourceEvent.button == 0) {

            var queryBox = d3.select(this);
            var mouseLoc = d3.mouse(this);

            queryBox.attr('x', mouseLoc[0]);
            queryBox.attr('y', mouseLoc[1]);

            var arr = opsInQueryBox[queryBox.attr('id')];

            arr.forEach(function (d) {
                var elem = d3.select('#' + d);
                elem.attr('x', mouseLoc[0] - parseFloat(queryBox.attr('initial-x')) + parseFloat(elem.attr('initial-x')));
                elem.attr('y', mouseLoc[1] - parseFloat(queryBox.attr('initial-y')) + parseFloat(elem.attr('initial-y')));

                updateNodes(d);


            });

        }
        //console.log('dragging query box : ' + arr.length );
        //console.log(opsInQueryBox);

    })
    .on('dragend', function () {

        if(d3.event.sourceEvent.button == 0) {

            var queryBox = d3.select(this);
            var mouseLoc = d3.mouse(this);

            if (isInDragZone(drawingZone, mouseLoc[0], mouseLoc[1])) {
                queryBox.attr('x', mouseLoc[0]);
                queryBox.attr('initial-x', mouseLoc[0]);
                queryBox.attr('y', mouseLoc[1]);
                queryBox.attr('initial-y', mouseLoc[1]);


                var arr = opsInQueryBox[queryBox.attr('id')];

                arr.forEach(function (d) {
                    var elem = d3.select('#' + d);
                    //elem.attr('initial-x', mouseLoc[0] - parseFloat(queryBox.attr('initial-x')) + parseFloat(elem.attr('initial-x')));
                    //elem.attr('initial-y', mouseLoc[1] - parseFloat(queryBox.attr('initial-y')) + parseFloat(elem.attr('initial-y')));

                    elem.attr('initial-x', elem.attr('x'));
                    elem.attr('initial-y', elem.attr('y'));
                    updateNodes(d);


                });

                console.log('q : ' + queryBox.attr('id'));
                queryBoxZones.forEach(function (d, i) {
                    if (d.id == queryBox.attr('id')) {

                        queryBoxZones[i]['x'] = queryBox.attr('x');
                        queryBoxZones[i]['y'] = queryBox.attr('y');
                        queryBoxZones[i]['initial-x'] = queryBox.attr('x');
                        queryBoxZones[i]['initial-y'] = queryBox.attr('y');
                    }
                });

                //console.log('q bbb: '+JSON.stringify(queryBoxZones));


            } else {
                queryBox.attr('x', queryBox.attr('initial-x'));
                queryBox.attr('y', queryBox.attr('initial-y'));
                var arr = opsInQueryBox[queryBox.attr('id')];

                arr.forEach(function (d) {
                    var elem = d3.select('#' + d);
                    //elem.attr('initial-x', mouseLoc[0] - parseFloat(queryBox.attr('initial-x')) + parseFloat(elem.attr('initial-x')));
                    //elem.attr('initial-y', mouseLoc[1] - parseFloat(queryBox.attr('initial-y')) + parseFloat(elem.attr('initial-y')));

                    elem.attr('x', elem.attr('initial-x'));
                    elem.attr('y', elem.attr('initial-y'));

                    updateNodes(d);

                });


            }

        }
    });


var operatorDragOnQueryBox = d3.behavior.drag()
    .on('drag', function () {

        if(d3.event.sourceEvent.button == 0) {

            var elem = d3.select(this);
            var mouseLoc = d3.mouse(this);
            elem.attr('x', mouseLoc[0]);
            elem.attr('y', mouseLoc[1]);


            updateNodes(elem.attr('id'));
        }

    })
    .on('dragend', function () {

        if(d3.event.sourceEvent.button == 0) {


            var elem = d3.select(this);
            var mouseLoc = d3.mouse(this);

            if (isInDragZone(queryBoxZones, mouseLoc[0], mouseLoc[1])) {
                elem.attr('x', mouseLoc[0]);
                elem.attr('y', mouseLoc[1]);
                elem.attr('initial-x', mouseLoc[0]);
                elem.attr('initial-y', mouseLoc[1]);
            } else {

                elem.attr('x', elem.attr('initial-x'));
                elem.attr('y', elem.attr('initial-y'));
                updateNodes(elem.attr('id'));

            }
        }
    });


