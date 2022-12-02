import React, { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Spinner } from 'react-bootstrap';

ChartJS.register(ArcElement, Tooltip, Legend);


const chartOptions = {
	responsive: true,
	plugins: {
		legend: {
            position: 'right',
			display: true,
            labels: {
                boxHeight: 30,
                boxWidth: 30,
                usePointStyle: true,
            }
		},
		title: {
			display: false,
		},
	},
    layout: {
        padding: 5
    },
    hoverBorderWidth: 0,
    hoverOffset: 10,
    maintainAspectRatio: false
};

/*
props:
    usersName          : array      - Массив имён пользователей
    usersCountMessages : array      - Массив количество сообщений пользователей 
*/
function ChatChartMembersMessages(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        if(props.usersCountMessages && props.usersName) {
            setChartData({
                labels: props.usersName,
                datasets: [
					{
                        label: 'Сообщений',
						data: props.usersCountMessages,
						backgroundColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
                                'rgba(153, 102, 255, 1)',
                                'rgba(255, 159, 64, 1)',
                            ],
                            borderColor: [
                                '#FFFFFF',
                                '#FFFFFF',
                                '#FFFFFF',
                                '#FFFFFF',
                                '#FFFFFF',
                                '#FFFFFF',
                            ],
                        borderWidth: 5,
					},
				],
            });
            setIsLoading(false);
        }
    }, [props.usersCountMessages, props.usersName]);

    if(isLoading) {
        return (
            <div className='h-100 d-flex align-items-center justify-content-center'>
                <Spinner animation="border"/>
            </div>
        ) 
    } else {
        return (
            <div className='h-100'>
                <Pie
                    data={chartData}
                    options={chartOptions}
                    width={'100%'}
                /> 
            </div>
        ) 
    }
    
}

export default ChatChartMembersMessages