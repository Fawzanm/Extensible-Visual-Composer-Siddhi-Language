/**
 * Created by Mohammed on 7/3/2015.
 */

function drawCircle(imageId){

    //console.log('hover on operator != type');
    var image = d3.select('#'+imageId);
    var opGroup = image.select(function () {
        return this.parentNode;
    });
    var queryGroup = opGroup.select(function () {
        return this.parentNode;
    });
    //console.log(opGroup.attr('class'));
    //console.log(queryGroup.attr('class'));

    if(opGroup.select('circle').empty()) {

        var x_left, x_right, y, r = 0;
        var imageHeight, imageWidth, imageX, imageY;

        imageHeight = parseFloat(image.attr('height'));
        imageWidth = parseFloat(image.attr('width'));
        imageX = parseFloat(image.attr('x'));
        imageY = parseFloat(image.attr('y'));

        y = imageY + imageHeight / 2;
        r = imageHeight / 4;

        x_left = imageX;
        x_right = imageX + imageWidth;

        opGroup
            .append('circle')
            .attr('class', 'nodeLeft')
            //.attr('id', nodeId)
            .attr('cx', x_left)
            .attr('cy', y)
            .attr('r', r)
            .style('fill', 'red')
            .style('visibility', 'visible')
            .on('mouseover', function(){
                d3.select(this)
                    .style('visibility', 'visible');
            })
            .on('mousemove', function(){
                d3.select(this)
                    .style('visibility', 'visible');
            })
            .on('click', function(){
                d3.select(this)
                    .style('visibility', 'visible');
                d3.stopPropagation();
            })
        ;

        opGroup
            .append('circle')
            .attr('class', 'nodeRight')
            //.attr('id', nodeId)
            .attr('cx', x_right)
            .attr('cy', y)
            .attr('r', r)
            .style('fill', 'red')
            .style('visiblity', 'visible')
            .on('mouseover', function(){
                d3.select(this)
                    .style('visibility', 'visible');
            })
            .on('mousemove', function(){
                d3.select(this)
                    .style('visibility', 'visible');
            })
            .on('click', function(){
                d3.select(this)
                    .style('visibility', 'visible');
                d3.stopPropagation();
            })
    }


}


