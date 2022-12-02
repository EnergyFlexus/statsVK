import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
	Filler,
} from "chart.js";

import React, { useState} from "react";
import { useEffect } from "react";
import { Container, Row, Col, Dropdown} from 'react-bootstrap'
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Line } from "react-chartjs-2";
import Loading from "../../Loading";

   
ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Filler,
	Title,
	Tooltip,
	Legend
);

const chartOptions = {
	responsive: true,
	plugins: {
		legend: {
			display: false,
		},
		title: {
			display: false,
		},
	},
	maintainAspectRatio: false
};

const showChartAs = {
	Day: 0,
	Week: 1,
	Month: 2
};

const unixTime = {
	Hour: 3600000,
	Day: 86400000,
	Week: 604800000,
	Month: 2592000000,
}

function ChatChartCountMessages(props) {
	const [showAs, setShowAs] = useState(showChartAs.Day);
	const [text, setText] = useState("Статистика за день");
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState();
	const [chartData, setChartData] = useState({});
	const id = props.id;
	let chart;
	const changeText = ((showAs, text) => {
		setIsLoaded(false);
		setShowAs(showAs);
		setText(text);
	});
	useEffect(() => {
		const getUrl = (interval ,date1, date2) => (`/api/MessagesCountsByChatIdDateIntervals/${id}/${interval}/${date1}/${date2}`);
		const fetching = (async (interval, date1, date2) => {
			try {
				let res = await fetch(getUrl(interval, date1, date2));
				res = await res.json();
				return res;
			} catch (error) {
				setError(error);
			}
		});
		const getChartData = (async () => {
			let border = Date.now();
			let res = [];
			let labels = [];
			switch (showAs) {
				case showChartAs.Day:
					border -= unixTime.Day;
					res = await fetching(unixTime.Hour / 1000, Math.floor(border / 1000), 0);
					border += unixTime.Hour;
					for (let i = 0; i < 24; i += 1) {
						labels[i] = new Date(border).toLocaleTimeString();
						border += unixTime.Hour;
					}
				break;
				case showChartAs.Week:
					border = border - unixTime.Week;
					res = await fetching(unixTime.Day / 1000, Math.floor(border / 1000), 0);
					border += unixTime.Day;
					for (let i = 0; i < 7; i += 1) {
						labels[i] = new Date(border).toLocaleDateString();
						border += unixTime.Day;
					}
				break;
				case showChartAs.Month:
					border = border - unixTime.Month;
					res = await fetching(unixTime.Day / 1000, Math.floor(border / 1000), 0);
					border += unixTime.Day;
					for (let i = 0; i < 30; i += 1) {
						labels[i] = new Date(border).toLocaleDateString();
						border += unixTime.Day;
					}
				break;
				default:
				break;
			}
			setIsLoaded(true);
			setChartData({
				labels: labels,
				datasets: [
					{
						fill: true,
						data: res,
						borderColor: "rgb(53, 162, 235)",
						backgroundColor: "rgba(53, 162, 235, 0.5)"
					},
				],
			});
		});
		getChartData();
	}, [showAs, id]);

	if(error) {
		chart = <>Error: {error.message} </>
	} else if(isLoaded) {
		chart = <Line options={chartOptions} data={chartData} />
	} else {
		chart = <Loading/>
	}
    return (
        <Container>
            <Row>
                <Col>
					<Dropdown>
						<DropdownToggle variant="secondary" className="mb-3">
							{text}
						</DropdownToggle>
						<DropdownMenu variant="dark">
							<Dropdown.Item onClick={event => {changeText(showChartAs.Day, 'Статистика за день')}}>
								Статистика за день
							</Dropdown.Item>
							<Dropdown.Item onClick={event => {changeText(showChartAs.Week, 'Статистика за неделю')}}>
								Статистика за неделю
							</Dropdown.Item>
							<Dropdown.Item onClick={event => {changeText(showChartAs.Month, 'Статистика за месяц')}}>
								Статистика за месяц
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

export default ChatChartCountMessages;