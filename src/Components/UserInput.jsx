import React from "react";

const UserInput = (props) => {
	return (
		<>
			<label className="text-orange-500 font-bold mt-1 mb-1 text-base md:text-lg " htmlFor={props.name}>
				{props.placeholder}
			</label>
			<input className="text-base px-2 outline-none rounded-md md:text-lg " type={props.type} name={props.name} id={props.name} value={props.value} placeholder={props.placeholder} onChange={props.onChange} />
			<p className="text-xs font-semibold py-1 mx-3 text-red-500 md:mb-3">{props.error}</p>
		</>
	);
};

export default UserInput;
