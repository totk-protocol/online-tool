import React, { useEffect, useState } from "react";
import { Progress } from "./Progress";
import { totk } from "./totk"

export function App() {
	const [privateKey, setPrivateKey] = useState("")
	const [publicKey, setPublicKey] = useState("")
	const [totkVal, setTotk] = useState("******")
	const [ts, setTs] = useState(0)

	async function tryTotk(p1: string, p2: string) {
		if (/^[a-f0-9]{64}$/i.test(p1) && /^[a-f0-9]{64}$/i.test(p2)) {
			try {
				const t = await totk(p1, p2)
				setTotk(t)
			} catch (err) {
				console.error(err)
				setTotk("******")
			}
		}
	}

	useEffect(() => {
		tryTotk(privateKey, publicKey)
	}, [privateKey, publicKey, ts])

	useEffect(() => {
		const now = new Date()
		now.setSeconds(now.getSeconds() >= 30 ? 60 : 30)

		setTimeout(() => setTs(~~(Date.now() / 30000)), now.getTime() - Date.now())
	}, [ts])

	return <div className="p-4 flex flex-col justify-center min-h-screen bg-amber-100">
		<div className="text-center text-3xl mb-6">TOTK Online Tool</div>

		<label className="block" htmlFor="pkey">
			Private Key
			<input type="text" placeholder="Your private key, 32 bytes with hex encoded" id="pkey" value={privateKey}
				onChange={(e) => setPrivateKey(e.target.value.toLowerCase())}
				className="block outline-none border-b-2 w-full px-2 py-1 font-mono focus:border-teal-600 mt-2" />
		</label>

		<div className="my-4 flex">
			<button className="bg-teal-600 mx-auto px-3 py-1 text-white rounded"
				onClick={() => setPrivateKey(toHex(crypto.getRandomValues(new Uint8Array(32))))}>
				Generate</button>
		</div>

		<label className="block my-4" htmlFor="pubkey">
			Public key
			<input type="text" placeholder="eg. totk.example.com" id="pubkey"
				className="block outline-none border-b-2 w-full px-2 py-1 font-mono focus:border-teal-600 mt-2"
				value={publicKey}
				onChange={(e) => setPublicKey(e.target.value.toLowerCase())} />
		</label>

		<Progress />

		<div className="my-4 text-teal-600 text-center text-7xl">{totkVal}</div>
	</div>
}

function toHex(buf: Uint8Array) {
	return [...buf].map(i => i.toString(16).padStart(2, "0")).join("")
}
