import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
export class Form extends Component {
	render() {
		return (
			<div>
				<Modal show={this.props.showForm} onHide={this.props.handleClose}>
					<Modal.Header closeButton>
						<Modal.Title>Modal heading</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<form onSubmit={this.props.updateData}>
							<input
								type="text"
								onChange={this.props.updateID}
								value={this.props.id}
							/>
							<br />
							<input
								type="text"
								onChange={this.props.updateOilUsageEn}
								value={this.props.OilUsageEn}
							/>
							<br />
							<input
								type="text"
								onChange={this.props.updateOilUsageAr}
								value={this.props.OilUsageAr}
							/>

							<br />
							

							<input type="submit" value="update" />
						</form>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={this.props.handleClose}>
							Close
						</Button>
						<Button variant="primary" onClick={this.props.handleClose}>
							Save Changes
						</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default Form;