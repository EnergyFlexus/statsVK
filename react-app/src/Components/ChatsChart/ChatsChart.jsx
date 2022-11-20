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
import { useEffect } from "react";
import { Container, Row, Col, ToggleButton, ToggleButtonGroup, Dropdown} from 'react-bootstrap'
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Line } from "react-chartjs-2";
import Loading from "../Loading";
import test from "./Test";

   
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

const showChartAs = {
	Week: 0,
	Month: 1,
	Year: 2
};

const unixTime = {
	Day: 86400,
	Week: 604800,
	Month: 2629743,
	Year: 31556926 
}
const testUrl = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';

function ChatsChart(props) {
	const [showAs, setShowAs] = useState(showChartAs.Week);
	const [text, setText] = useState("Статистика за неделю");
	const [isLoaded, setIsLoaded] = useState(false);
	const now = Date.now();

	let border;
	
		
	let chart;
	let chartData1 = {
		labels: [124123,124355],
		datasets: [
			{
			label: "Количество сообщений",
			data: [1,56,4,3],
			borderColor: "rgb(53, 162, 235)",
			backgroundColor: "rgba(53, 162, 235, 0.4)",
			},
		],
	};
	
	
	const changeText = ((showAs, text) => {
		setIsLoaded(false);
		setShowAs(showAs);
		setText(text);
	});
	let charData;
	useEffect(() => {
		const fetching = (async () => {
			let res;
			let border;
			switch (showAs) {
				case showChartAs.Week:
					res = await fetch(testUrl);
					res = await res.json();
					border = Date.now() - unixTime.Week;
				break;
				case showChartAs.Month:
					res = await fetch(testUrl);
					res = await res.json();
					border = Date.now() - unixTime.Month;
				break;
				case showChartAs.Year:
					res = await fetch(testUrl);
					res = await res.json();
					border = Date.now() - unixTime.Year;
				break;
				default:
				break;
			}
			setIsLoaded(true);
		}); 
		fetching();
	},[showAs]);

	if(isLoaded) {
		switch (showAs) {
			case showChartAs.Week:
				chart = <Line options={chartOptions} data={chartData1} />
			break;
			case showChartAs.Month:
				//chart = <Line options={chartOptions} data={chartData2} />
			break;
			case showChartAs.Year:
				//chart = <Line options={chartOptions} data={chartData3} />
			break;
			default:
			break;
		}
	} else {
		chart = <Loading/>
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