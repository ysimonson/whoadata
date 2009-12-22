function formatNumber(num) {
    var strNum = num + '';
    var pattern = /(\d+)(\d{3})/;
    
    while(pattern.test(strNum)) {
        strNum = strNum.replace(pattern, '$1' + ',' + '$2');
    }
    
    return strNum;
}

function addData(table, datasource) {
    table.addRows(datasource.length);
    
    for(var row=0; row<datasource.length; row++) {
        for(var column=0; column<datasource[row].length; column++) {
            table.setValue(row, column, datasource[row][column]);
        }
    }
}

function updateAmtSpent() {
    var endDate = new Date();
    var beginDate = new Date(endDate.getFullYear(), 1, 1, 0, 0, 0, 0);
    
    var diff = endDate.getTime() - beginDate.getTime();
    var spent = Math.round(71.66 * diff)
    
    $('#amtSpent').text('$' + formatNumber(spent));
    setTimeout('updateAmtSpent()', 100);
}

function drawSpendingChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'year');
    data.addColumn('number', 'out-of-pocket');
    data.addColumn('number', 'private insurance');
    data.addColumn('number', 'medicare');
    data.addColumn('number', 'medicaid');
    data.addColumn('number', 'other');
    addData(data, spendingData);
    
    var chart = new google.visualization.AreaChart(document.getElementById('spendingChart'));
    chart.draw(data, {width: 940, height: 400, legend: 'right', isStacked: true, titleY: 'Expenditures ($)', axisFontSize: 12});
}

function drawHealthChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'country');
    data.addColumn('number', 'YPLL ranking');
    data.addColumn('number', 'life expectancy ranking');
    data.addColumn('number', 'infant mortality ranking');
    data.addColumn('number', 'WHO ranking (2000)');
    addData(data, healthData);
    
    var chart = new google.visualization.BarChart(document.getElementById('healthChart'));
    chart.draw(data, {width: 940, height: 940, legend: 'right', isStacked: true, is3D: true, axisFontSize: 12});
}

var initializedCount = 0;
function checkFullyReady() {
    if(++initializedCount >= 2) {
        drawSpendingChart();
        drawHealthChart();
    }
}

$(function() {
    updateAmtSpent();
    $('#amtSpentDescriptor').text('spent this year on health care');
    $('#spendingHeader').text('the past, present and future of spending');
    checkFullyReady();
});

google.load("visualization", "1", {packages:["areachart", "barchart"]});
google.setOnLoadCallback(checkFullyReady);