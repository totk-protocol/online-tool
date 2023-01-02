import React, { useEffect, useState } from "react";

export function Progress() {
	const [val, setVal] = useState(0)
	useEffect(() => {
		setInterval(() => setVal(~~(Date.now() % 30000 / 1000)), 1000)
	}, [])
	return <div className="flex rounded overflow-hidden">
		<div className="h-2 bg-lime-700"
			style={{ width: `${(val + 1) / 30 * 100}%` }}></div>
	</div>
}
