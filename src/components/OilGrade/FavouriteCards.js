import React, { Component } from "react";
import {  Button } from "react-bootstrap";
export class FavouriteCards extends Component {
	render() {
		return this.props.watchFavApiData.map((obj) => {
			return (



							<Button
								variant="danger"
								onClick={(e) => {
                                    e.preventDefault()
									this.props.showFormUpdate(
										obj._id,
										obj.OilUsageAr,
										obj.OilUsageEn
									);
								}}
							>
								update
							</Button>

			);
		});
	}
}

export default FavouriteCards;