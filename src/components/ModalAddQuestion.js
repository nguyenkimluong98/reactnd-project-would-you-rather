import {
	Button,
	FormControl,
	LinearProgress,
	Modal,
	TextField,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "white",
	boxShadow: 24,
	p: 4,
};

const ModalAddQuestion = (props) => {
	const [options, setOptions] = useState({ one: "", two: "" });
	const [errors, setErrors] = useState({ one: false, two: false });
	const [submiting, setSubmiting] = useState(false);

	const onSubmit = async () => {
		setErrors({ one: false, two: false });

		const optionOne = options.one.trim();
		const optionTwo = options.two.trim();

		if (!optionOne || !optionTwo) {
			return setErrors({ one: !optionOne, two: !optionTwo });
		}

		setSubmiting(true);

		await props.onSubmit({ optionOne, optionTwo });

		setSubmiting(false);
	};

	const onClose = () => {
		setOptions({ one: "", two: "" });
		props.onClose();
	};

	return (
		<Modal
			open={props.open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Box sx={style}>
				<Typography variant="h6" component="h2">
					Create a New question
				</Typography>
				<Typography sx={{ mt: 2 }}>Would you rather...</Typography>
				<FormControl sx={{ mt: 1, minWidth: 400 }}>
					<TextField
						required
						label="Option One"
						value={options.one}
						onChange={(e) => setOptions({ ...options, one: e.target.value })}
						error={errors.one}
						helperText={errors.one && "Please input option one"}
					/>
					<TextField
						required
						label="Option Two"
						value={options.two}
						onChange={(e) => setOptions({ ...options, two: e.target.value })}
						sx={{ my: 2 }}
						error={errors.two}
						helperText={errors.two && "Please input option two"}
					/>
					<Button
						variant="contained"
						color="error"
						onClick={onSubmit}
						disabled={submiting}
					>
						Submit
					</Button>
					{submiting && <LinearProgress color="error" />}
				</FormControl>
			</Box>
		</Modal>
	);
};

export default ModalAddQuestion;
