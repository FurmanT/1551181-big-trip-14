import dayjs from 'dayjs';
import AbstractView from './abstract';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TYPES, BAR_HEIGHT}   from '../const';
import {getDurationbyMilisec} from '../utils/common';

const renderMoneyChart = (moneyCtx, points) => {
  const map = new Map();
  TYPES.forEach((type) => {
    const filterPoint = points.slice().filter((point) => {
      return point.type === type;
    });
    const price = filterPoint.reduce((sum , point) => {
      return sum  + point.price;
    }, 0);
    map.set(type, price);
  });
  const mapSort = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  for (const [key, value] of mapSort) {
    if (value === 0){
      mapSort.delete(key);
    }
  }
  moneyCtx.height = BAR_HEIGHT * mapSort.size;

  const moneyChart = new Chart(moneyCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Array.from(mapSort.keys()),
      datasets: [{
        data: Array.from(mapSort.values()),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `€ ${val}`,
        },
      },
      title: {
        display: true,
        text: 'MONEY',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return moneyChart;
};

const renderTypeChart = (typeCtx, points) => {


  const map = new Map();
  TYPES.forEach((type) => {
    const filterPoint = points.slice().filter((point) => {
      return point.type === type;
    });
    map.set(type, filterPoint.length);
  });

  const mapSort = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  for (const [key, value] of mapSort) {
    if (value === 0){
      mapSort.delete(key);
    }
  }

  typeCtx.height = BAR_HEIGHT * mapSort.size;

  const typeChart = new Chart(typeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Array.from(mapSort.keys()) ,
      datasets: [{
        data:  Array.from(mapSort.values()),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${val}x`,
        },
      },
      title: {
        display: true,
        text: 'TYPE',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return typeChart;
};

const renderTimeSpendChart = (timeCtx, points) => {
  const map = new Map();
  TYPES.forEach((type) => {
    const filterPoint = points.slice().filter((point) => {
      return point.type === type;
    });

    const time = filterPoint.reduce((sum , point) => {
      return sum  + dayjs(point.endDate).diff(dayjs(point.startDate));
    }, 0);
    map.set(type, time);
  });

  for (const [key, value] of map) {
    if (value === 0){
      map.delete(key);
    }
  }

  const mapSort = new Map([...map.entries()].sort((a, b) => b[1] - a[1]));
  timeCtx.height = BAR_HEIGHT * mapSort.size;
  const typeChart = new Chart(timeCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Array.from(mapSort.keys()),
      datasets: [{
        data: Array.from(mapSort.values()),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${getDurationbyMilisec(val)}`,
        },
      },
      title: {
        display: true,
        text: 'Time Spend',
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 50,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
  return typeChart;
};

const createStatisticsTemplate = () => {
  return `<section class="statistics">
          <h2>Trip statistics</h2>

          <div class="statistics__item statistics__item--money">
            <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--transport">
            <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
          </div>

          <div class="statistics__item statistics__item--time-spend">
            <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
          </div>
        </section>`;
};

export default class Statistics extends AbstractView {
  constructor(points) {
    super();
    this._points = points;
    this._chartMoney = null;
    this._chartType = null;
    this._chartTime = null;
    this._setCharts();
  }

  getTemplate() {
    return createStatisticsTemplate();
  }

  _setCharts() {
    if (this._chartMoney !== null || this._chartType !== null || this._chartTime!== null) {
      this._chartMoney = null;
      this._chartType = null;
      this._chartTime = null;
    }

    const elementMoneyCtx = this.getElement().querySelector('.statistics__chart--money');
    this._chartMoney = renderMoneyChart(elementMoneyCtx, this._points);

    const elementTypeCtx = this.getElement().querySelector('.statistics__chart--transport');
    this._chartType = renderTypeChart(elementTypeCtx, this._points);

    const elementTimeCtx = this.getElement().querySelector('.statistics__chart--time');
    this._chartType = renderTimeSpendChart(elementTimeCtx, this._points);
  }
}
