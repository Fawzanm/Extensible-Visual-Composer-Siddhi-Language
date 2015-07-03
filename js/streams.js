/**
 * Created by Mohammed on 7/2/2015.
 */
var nodeAlpha =

{
    connectionName : 'StockQuoteStream',
    connectionType :'Stream',
    connectionTypeDetails : 'para1:string, para2:int'

};


var nodeBeta =

{
    connectionName : 'SecureStockQuoteStream',
    connectionType :'Stream',
    connectionTypeDetails : 'para1:string, para2:int'

};var nodeGamma =

{
    connectionName : 'SecureStockLargeName',
    connectionType :'Stream',
    connectionTypeDetails : 'para1:string, para2:int'

};var nodeTheta =

{
    connectionName : 'StreamWithVeryVeryLargeName',
    connectionType :'Stream',
    connectionTypeDetails : 'para1:string, para2:int'

};

var Streams = [nodeAlpha, nodeBeta,nodeGamma,nodeTheta,nodeTheta];

