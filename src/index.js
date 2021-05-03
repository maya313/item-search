import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class Main extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			itemList: [],
			query: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.search = this.search.bind(this);
	}

	handleChange(event) {
		this.setState({query: event.target.value});
	}

	search() {
		const appid = 'appid';
		const query = this.state.query;
		const url = 'https://shopping.yahooapis.jp/ShoppingWebService/V3/itemSearch?appid='+appid+'&query='+query;
		axios.get(url)
			.then((res) => {
				if(res['status'] === 200){
					let jsonList = [];
					res['data']['hits'].forEach(function(element){
						jsonList.push({
							'id':element.index,
							'name':element.name,
							'price':element.price,
							'url':element.url
						});
					});
					this.setState({
						itemList: jsonList
					});
					console.log(res['data']['hits']);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const { itemList } = this.state;

		return (
			<div>
				<h1>Item Search</h1>
				<div>
					<input type="text" onChange={this.handleChange} />
					<button onClick={this.search}>search</button>
				</div>
				{
					itemList.length ?
						<div>
							<table border="1">
								<thead>
									<tr>
										<th>ID</th>
										<th>Name</th>
										<th>Price</th>
										<th>URL</th>
									</tr>
								</thead>
								<tbody>
									{itemList.map(item => (
										<tr key={item.id}>
											<td>{item.id}</td>
											<td>{item.name}</td>
											<td>{item.price}</td>
											<td>{item.url}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
						:
						<div>None</div>
				}
			</div>
		)
	}
}

ReactDOM.render(
	<Main />,
	document.getElementById('root')
);
