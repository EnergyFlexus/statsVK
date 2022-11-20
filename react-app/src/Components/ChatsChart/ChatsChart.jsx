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
import { Container, Row, Col, ToggleButton, ToggleButtonGroup, Dropdown} from 'react-bootstrap'
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
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
	const [showAs, setShowAs] = useState(showChartAs.Week);
	const [text, setText] = useState("Статистика за неделю");
	let chart;
	
	const changeText = ((showAs, text) => {
		setShowAs(showAs);
		setText(text);
	});

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
					<Dropdown>
						<DropdownToggle variant="secondary" className="mt-2">
							{text}
						</DropdownToggle>
						<DropdownMenu variant="dark">
							<Dropdown.Item onClick={event => {changeText(showChartAs.Week, 'Статистика за неделю')}}>
								Статистика за неделю
							</Dropdown.Item>
							<Dropdown.Item onClick={event => {changeText(showChartAs.Month, 'Статистика за месяц')}}>
								Статистика за месяц
							</Dropdown.Item>
							<Dropdown.Item onClick={event => {changeText(showChartAs.Year, 'Статистика за год')}}>
								Статистика за год
							</Dropdown.Item>
							
						</DropdownMenu>
					</Dropdown>
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