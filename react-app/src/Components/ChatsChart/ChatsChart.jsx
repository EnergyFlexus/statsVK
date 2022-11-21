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
import { Container, Row, Col, Dropdown} from 'react-bootstrap'
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownToggle from "react-bootstrap/esm/DropdownToggle";
import { Line } from "react-chartjs-2";
import Loading from "../Loading";

   
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
	Day: 86400000,
	Week: 604800000,
	Month: 2629743000,
	Year: 31556926000 
}

function ChatsChart(props) {
	const [showAs, setShowAs] = useState(showChartAs.Week);
	const [text, setText] = useState("Статистика за неделю");
	const [isLoaded, setIsLoaded] = useState(false);
	const [error, setError] = useState();
	const [chartData, setChartData] = useState({});
	// Убрать || 8 как будут пропсы
	const id = props.id || 8;
	let chart;
	const changeText = ((showAs, text) => {
		setIsLoaded(false);
		setShowAs(showAs);
		setText(text);
	});
	useEffect(() => {
		const getUrl = (date1, date2) => (`/api/MessagesCountsByChatIdDate/${id}/${date1}/${date2}`);
		const fetching = (async (date1, date2) => {
			try {
				let res = await fetch(getUrl(date1, date2));
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
				case showChartAs.Week:
					border = border - unixTime.Week;
					for (let i = 0; i < 7; i += 1) {
						res.push(await fetching(Math.floor(border / 1000), Math.floor((border + unixTime.Day * i) / 1000)));
						labels[i] = new Date(border + unixTime.Day * i).toLocaleDateString();
					}
				break;
				case showChartAs.Month:
					border = border - unixTime.Month;
					for (let i = 0; i < 4; i += 1) {
						res.push(await fetching(Math.floor(border / 1000), Math.floor((border + unixTime.Week * i) / 1000)));
						labels[i] = new Date(border + unixTime.Week * i).toLocaleDateString();
					}
				break;
				case showChartAs.Year:
					border = border - unixTime.Year;
					for (let i = 0; i < 12; i += 1) {
						res.push(await fetching(Math.floor(border / 1000), Math.floor((border + unixTime.Month * i) / 1000)));
						labels[i] = new Date(border + unixTime.Month * i).toLocaleDateString();
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
					label: "Количество сообщений",
					data: res,
					borderColor: "rgb(53, 162, 235)",
					backgroundColor: "rgba(53, 162, 235, 0.4)",
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