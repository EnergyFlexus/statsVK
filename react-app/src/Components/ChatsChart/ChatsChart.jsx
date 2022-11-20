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

const chartOptions = {
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
};
// Тестоыые данные, в будущем они будут браться из fetch
const chartData1 = {
	labels: [1,46,7,32],
	datasets: [
		{
		label: "Количество посещений",
		data: [1,2,3,4,5,6],
		borderColor: "rgb(53, 162, 235)",
		backgroundColor: "rgba(53, 162, 235, 0.4)",
		},
	],
};

const chartData2 = {
	labels: [1,2,3,4],
	datasets: [
		{
		label: "Количество посещений",
		data: [1,2,3,4],
		borderColor: "rgb(53, 162, 235)",
		backgroundColor: "rgba(53, 162, 235, 0.4)",
		},
	],
};

const chartData3 = {
	labels: [1,2,5,33],
	datasets: [
		{
		label: "Количество посещений",
		data: [1,2,3,4,5,67],
		borderColor: "rgb(53, 162, 235)",
		backgroundColor: "rgba(53, 162, 235, 0.4)",
		},
	],
};

const showChartAs = {
	Week: 0,
	Month: 1,
	Year: 2
};

function ChatsChart() {
    const [value, setValue] = useState([1,3])
    const handleChange = (val) => setValue(val)   
	
	const [showAs, setShowAs] = useState(showChartAs.Week)
	let chart;
	switch (showAs) {
		case showChartAs.Week:
			chart = <Line options={chartOptions} data={chartData1} />
		break;
		case showChartAs.Month:
			chart = <Line options={chartOptions} data={chartData2} />
		break;
		case showChartAs.Year:
			chart = <Line options={chartOptions} data={chartData3} />
		break;
		default:
		break;
	}
    return (
        <Container>
            <Row>
                <Col>
                    <ToggleButtonGroup className="mt-2" type="radio" name = 'options' value={value} onChange={handleChange}>
                        <ToggleButton id="tgb-radio-1" value={1} onClick={event => {setShowAs(showChartAs.Week)}}>
                            Статистика за неделю
                        </ToggleButton>
                        <ToggleButton id="tgb-radio-2" value={2} onClick={event => {setShowAs(showChartAs.Month)}}>
                            Статистика за месяц
                        </ToggleButton>
                        <ToggleButton id="tgb-radio-3" value={3} onClick={event => {setShowAs(showChartAs.Year)}}>
                            Статистика за год
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Col>
            </Row>
            <Row>
                <Col>
                    {chart}
                </Col>
            </Row>
        </Container>
    );
  }

export default ChatsChart;