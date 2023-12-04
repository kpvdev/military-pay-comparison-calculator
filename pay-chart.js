const chartBackgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--background-color');

Highcharts.chart('chart-container', {
    chart: {
      type: 'bar',
      events: {
        load: function() {
          this.chartBackground.attr({ fill: chartBackgroundColor });
        }
      }
    },
    title: {
      text: 'Income Comparison'
    },
    xAxis: {
      className: 'x-axis',
      reversed: true,
      categories: ['Career 1', 'Career 2']
    },
    yAxis: {
      className: 'y-axis',
      title: {
        text: 'Amount'
      }
    },
    series: [{
      name: 'Income',
      data: [78967, 124567]
    }]
  });