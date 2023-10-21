import React, { useCallback, useEffect, useState } from 'react';
import './App.css';
import { SetupMixFetchOps, mixFetch } from '@nymproject/mix-fetch-full-fat';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import { Box, CssBaseline, Typography } from '@mui/material';

const defaultUrl =
	'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,nym&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en';
//const defaultUrl = 'https://nymtech.net/favicon.svg'
const args = { mode: 'unsafe-ignore-cors' };
const mixFetchOptions: SetupMixFetchOps = {
	preferredGateway: '3B7PsbXFuqq6rerYFLw5HPbQb4UmBqAhfWURRovMmWoj',
	preferredNetworkRequester:
		'AQRRAs9oc8QWXAFBs44YhCKUny7AyLsfLy91pwmGgxuf.CWUKoKA1afSKyw5BnFJJg19UDgnaVATupsFhQpyTEBHJ@EBT8jTD8o4tKng2NXrrcrzVhJiBnKpT1bJy5CMeArt2w',
	mixFetchOverride: {
		requestTimeoutMs: 60_000
	},
	extra: {},
	forceTls: false
};

let alreadyRun = false;

function App() {
	const [url, setUrl] = useState<string>(defaultUrl);
	const [data, setData] = useState<any>();

	const handleFetch = useCallback(async () => {
		try {
			setData(undefined);
			const response = await mixFetch(url, args, mixFetchOptions);
			console.log(response);
			const resHtml = await response.text();
			setData(JSON.parse(resHtml));
		} catch (err) {
			setData({"error": err})
			console.log(JSON.stringify(err))
			console.log(err);
		}
	}, [url]);

	useEffect(() => {
		if (!alreadyRun) {
			handleFetch();
			alreadyRun = true;
		}
	}, []);


	return (
		<>
			<br/>
			<Typography variant="h4">Privacy preserved Cryptocurrency Prices</Typography>
			<div>
				{
					data && data.hasOwnProperty("error") && <>Error with application: {JSON.stringify(data.error)}</> 
				}
				{
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>Name</TableCell>
									<TableCell>Price</TableCell>
									<TableCell>High (24h)</TableCell>
									<TableCell>Low (24h)</TableCell>
									<TableCell>Price Change (24h)</TableCell>

								</TableRow>
							</TableHead>
							<TableBody>
								{data && !data.hasOwnProperty("error") &&
									data.map(ticker => {
										return (
											<TableRow key={ticker.id}>
												<TableCell>{ticker.id.charAt(0).toUpperCase() + ticker.id.slice(1)}</TableCell>
												<TableCell>${ticker.current_price}</TableCell>
												<TableCell>${ticker.high_24h}</TableCell>
												<TableCell>${ticker.low_24h}</TableCell>
												<TableCell>{ticker.price_change_percentage_24h}%</TableCell>
											</TableRow>
										);
									})}
							</TableBody>
						</Table>
					</TableContainer>
				}
			</div>
			<Box
				sx={{
					position: 'fixed',
					bottom: 0,
					width: '100%',
					height: 60,
					textAlign: 'center',
				}}
			>
				<Typography align="center">Developed by <a href='https://notrustverify.ch'>No Trust Verify</a>, powered by <a href="https://nymtech.net/">Nym</a></Typography>
			</Box>
		</>
	);
}

export default App;
