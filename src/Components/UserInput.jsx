import React from "react";

const UserInput = (props) => {
	return (
		<>
			<label className="text-orange-500 font-bold mt-2 mb-1 text-lg " htmlFor={props.name}>
				{props.placeholder}
			</label>
			<input className="text-lg px-2 outline-none rounded-md" type={props.type} name={props.name} id={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
			<p className="text-sm font-semibold py-1 mx-3 text-red-500">{props.error}</p>
		</>
	);
};

export default UserInput;
