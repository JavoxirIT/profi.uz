import { useEffect } from "react";
import { Chart } from "chart.js";
import { Layout } from "antd";
import css from "../../styles/Statistics.module.css";
function StatisticsChart({t}) {
  useEffect(() => {
    let ctx = document.getElementById("myChart").getContext("2d");
    let myChart = new Chart(ctx, {
      type: "bar",
      // data: {
      //   labels: [
      //     "Sunday",
      //     "Monday",
      //     "Tuesday",
      //     "Wednesday",
      //     "Thursday",
      //     "Friday",
      //     "Saturday",
      //   ],
      //
      //   datasets: [
      //     {
      //       data: [66, 144, 146, 116, 107, 131, 43],
      //       label: t.kurilgan,
      //       borderColor: "rgb(109, 253, 181)",
      //       backgroundColor: "rgb(109, 253, 181,0.5)",
      //       borderWidth: 0.5,
      //     },
      //     {
      //       data: [40, 100, 44, 70, 63, 30, 10],
      //       label: t.saqlangan,
      //       borderColor: "rgb(75, 192, 192)",
      //       backgroundColor: "rgb(75, 192, 192,0.5)",
      //       borderWidth: 0.5,
      //     },
      //     {
      //       data: [20, 24, 50, 34, 33, 23, 12],
      //       label: t.boglangan,
      //       borderColor: "rgb(255, 205, 86)",
      //       backgroundColor: "rgb(255, 205, 86,0.5)",
      //       borderWidth: 0.5,
      //     },
      //     {
      //       data: [6, 20, 52, 12, 11, 78, 21],
      //       label: t.bekorqilgan,
      //       borderColor: "rgb(255, 99, 132)",
      //       backgroundColor: "rgb(255, 99, 132,0.5)",
      //       borderWidth: 0.5,
      //     },
      //   ],
      // },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        resizeDelay: 3, //задержка перед изминением размера

        scales: {
          xAxes: [
            {
              //   display: false,
              //   stacked: true,
              //   scaleLabel: {
              //     display: true,
              //     labelString: "Xafta Kunlari",
              //   },
            },
          ],
          yAxes: [
            {
              //   display: false,
              //   stacked: true,
              //   scaleLabel: {
              //     display: true,
              //     labelString: "Farq",
              //   },
            },
          ],
        },
      },
    });
  }, [t.bekorqilgan, t.boglangan, t.kurilgan, t.saqlangan]);

  return (
    <div className={css.StatisticsChart}>
      {/* Bar chart */}
      {/* <h1 className="w-[150px] mx-auto mt-10 text-xl font-semibold capitalize ">
        Bar Chart
      </h1> */}
      <canvas id="myChart" />
    </div>
  );
}

export default StatisticsChart;
