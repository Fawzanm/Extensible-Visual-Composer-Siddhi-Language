/**
 * Created by Mohammed on 6/11/2015.
 */

var filter =
{
    NodeType: 'Filter',
    inputConnections: [['input', 'Stream']],
    outputConnection: [['output', 'Stream']],
    inputConfigs: [['filterExpression',
        'TextArea'
    ]],
    templateQuery: 'from $input[$filterExpression] insert into $output',
    icon: 'filter.png'

};

var join =
{
    NodeType: 'Join',
    inputConnections: [['input', 'Stream']],
    outputConnection: [['output', 'Stream']],
    inputConfigs: [['filterExpression',
        'TextArea'
    ]],
    templateQuery: 'from $input[$filterExpression] insert into $output',
    icon: 'join.png'

};

var windows =
{
    NodeType: 'Window',
    inputConnections: [['input', 'Stream']],
    outputConnection: [['output', 'Stream']],
    inputConfigs: [['filterExpression',
        'TextArea'
    ]],
    templateQuery: 'from $input[$filterExpression] insert into $output',
    icon: 'windows.png'

};

var pattern =
{
    NodeType: 'Pattern',
    inputConnections: [['input', 'Stream']],
    outputConnection: [['output', 'Stream']],
    inputConfigs: [['filterExpression',
        'TextArea'
    ]],
    templateQuery: 'from $input[$filterExpression] insert into $output',
    icon: 'pattern.png'

};

var sequence =
{
    NodeType: 'Sequence',
    inputConnections: [['input', 'Stream']],
    outputConnection: [['output', 'Stream']],
    inputConfigs: [['filterExpression',
        'TextArea'
    ]],
    templateQuery: 'from $input[$filterExpression] insert into $output',
    icon: 'sequence.png'

};

var Operators = [filter, join, sequence, pattern, windows];