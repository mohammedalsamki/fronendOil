import React, { Component } from "react";
import axios from "axios";
import { Row } from "react-bootstrap";
import FavouriteCards from "./FavouriteCards";
import Form from "./Form";
export class Favourite extends Component {
	constructor(props) {
		super(props);
		this.state = {
			watchFavApiData: [],
			showFavWatchData: false,
			id: "",
			OilUsageAr: "",
			OilUsageEn: "",
			showForm: false,
		};
	}
	componentDidMount = async () => {
		const requet = await axios.get(
			`https://backendoil.vercel.app/api/oil/oilUseg`
		);
		this.setState({
			watchFavApiData: requet.data,
			showFavWatchData: true,
		});
	};


	showFormUpdate = async ( id, OilUsageAr, OilUsageEn) => {
		this.setState({
			id: id,
			OilUsageAr: OilUsageAr,
			OilUsageEn: OilUsageEn,
			showForm: true,
		});
        console.log(id)
	};

	updateData = async (e) => {
		e.preventDefault();

		const update = {
			id: this.state.id,
			OilUsageAr: this.state.OilUsageAr,
			OilUsageEn: this.state.OilUsageEn,

		};
		console.log(update);
		const request = await axios.put(
			`https://backendoil.vercel.app/api/oil/oilUseg/${this.state.id}`,
			update
		);
		this.setState({
			watchFavApiData: request.data,
			showFavWatchData: true,
		});
	};
	updateID = (e) => {
		this.setState({
			id: e.target.value,
		});
	};
	updateOilUsageAr = (e) => {
		this.setState({
			OilUsageAr: e.target.value,
		});
	};

	updateOilUsageEn = (e) => {
		this.setState({
			OilUsageEn: e.target.value,
		});
	};

	handleClose = () => {
		this.setState({
			showForm: false,
		});
	};
	render() {
		return (
			<Row>
				{this.state.showForm && (
					<Form
						handleClose={this.handleClose}
						showForm={this.state.showForm}
						id={this.state.id}
						OilUsageAr={this.state.OilUsageAr}
						OilUsageEn={this.state.OilUsageEn}
						updateData={this.updateData}
						updateID={this.updateID}
						updateOilUsageAr={this.updateOilUsageAr}
						updateOilUsageEn={this.updateOilUsageEn}
					/>
				)}
				{this.state.showFavWatchData && (
					<FavouriteCards
						watchFavApiData={this.state.watchFavApiData}
						deleteFavourite={this.deleteFavourite}
						showFormUpdate={this.showFormUpdate}
					/>
				)}
			</Row>
		);
	}
}

export default Favourite;   