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
        r = imageHeight / 8;

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
            .style('visibilty', 'visible')
        ;

        opGroup
            .append('circle')
            .attr('class', 'nodeRight')
            //.attr('id', nodeId)
            .attr('cx', x_right)
            .attr('cy', y)
            .attr('r', r)
            .style('fill', 'red')
            .style('visibilty', 'visible')
    }


}