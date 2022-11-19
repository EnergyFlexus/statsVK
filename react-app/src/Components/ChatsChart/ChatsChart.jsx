import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
} from "chart.js";
    import React, { useState} from "react";
    import { Container, Row, Col, ToggleButton, ToggleButtonGroup} from 'react-bootstrap'
    import { useEffect } from "react";
    import { Line } from "react-chartjs-2";

   
ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
  );
   
 

  

function ChatsChart() {
    const [value, setValue] = useState([1,3])
    const handleChange = (val) => setValue(val)
    
    const[first, firstB] = useState(false)
    const[second, secondB] = useState(false)
    const[third, thirdB] = useState(false)
    
    const [chartData, setChartData] = useState({
      datasets: [],
    });
    
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
      setChartData({
        labels: [1,46,7,32],
        datasets: [
          {
            label: "Количество посещений",
            data: [1,2,3,4,5,6],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.4)",
          },
        ],
      });
        setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Статистика",
          },
        },
    });
    }, [first]);
    
    useEffect(() => {
        setChartData({
          labels: [14,465,76,321],
          datasets: [
            {
              label: "Количество посещений",
              data: [146,82,73,4,5,6],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.4)",
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Статистика",
            },
          },
        });
      }, [second]);

      useEffect(() => {
        setChartData({
          labels: [614,465,76,321],
          datasets: [
            {
              label: "Количество посещений",
              data: [7146,82,73,4,5,6],
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.4)",
            },
          ],
        });
        setChartOptions({
          responsive: true,
          plugins: {
            legend: {
              position: "top",
            },
            title: {
              display: true,
              text: "Статистика",
            },
          },
        });
      }, [third]);


    return (
        <Container>
            <Row>
                <Col>
                    <ToggleButtonGroup className="mt-2" type="radio" name = 'options' value={value} onChange={handleChange}>
                        <ToggleButton id="tgb-radio-1" value={1} onClick={event => {firstB(!first)}}>
                            Статистика за неделю
                        </ToggleButton>
                        <ToggleButton id="tgb-radio-2" value={2} onClick={event => {secondB(!second)}}>
                            Статистика за месяц
                        </ToggleButton>
                        <ToggleButton id="tgb-radio-3" value={3} onClick={event => {thirdB(!third)}}>
                            Статистика за год
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Line options={chartOptions} data={chartData} />
                </Col>
            </Row>
        </Container>
    );
  }

export default ChatsChart;