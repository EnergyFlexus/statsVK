import { Container, Row, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

import SortDropDown from './SortDropDown';

function SearchPanel(props) {
	const setSearch = props.setSearch;
	const sortType = props.sortType
	const setSort = props.setSort;
	return (
    	<Container className='mt-4 px-2.5'>
			<Row>
				<Col>
					<Form.Control placeholder="Начните вводить название чата" onChange={(event) => {setSearch(event.target.value)}}/>
				</Col>
				<Col md="auto">
					<SortDropDown sortType={sortType} setSort={setSort}/>
				</Col>
			</Row>
    	</Container>
  	)
}

export default SearchPanel;
