import React, { useCallback, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { SetupMixFetchOps, mixFetch } from '@nymproject/mix-fetch-full-fat';
import Button from '@mui/material/Button';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';

const defaultUrl = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd';
//const defaultUrl = 'https://nymtech.net/favicon.svg'
const args = { mode: 'unsafe-ignore-cors' };
const mixFetchOptions: SetupMixFetchOps = {
	preferredGateway: '3B7PsbXFuqq6rerYFLw5HPbQb4UmBqAhfWURRovMmWoj',
	preferredNetworkRequester:
		'AQRRAs9oc8QWXAFBs44YhCKUny7AyLsfLy91pwmGgxuf.CWUKoKA1afSKyw5BnFJJg19UDgnaVATupsFhQpyTEBHJ@EBT8jTD8o4tKng2NXrrcrzVhJiBnKpT1bJy5CMeArt2w',
	mixFetchOverride: {
		requestTimeoutMs: 60_0000
	},
	extra: {},
	forceTls: false
};


function App() {
	const [url, setUrl] = useState<string>(defaultUrl);
	const [data, setData] = useState<any>();
	const [alreadyRun, setRun] = useState<boolean>();

	const handleFetch = useCallback(async () => {
		try {
			setData(undefined);
			const response = await mixFetch(url, args, mixFetchOptions);
			console.log(response);
			const resHtml = await response.text();
			setData(JSON.parse(resHtml));
		} catch (err) {
			console.log(err);
		}
	},[data, url]);

	useEffect(() => {
		//handleFetch()
	}, [])

{console.log(data)}

if (data !== undefined) data.forEach(element => {
	console.log(data.element)
});

	return (
  
  <>
  <Button variant="outlined" sx={{ marginLeft: '1rem' }} onClick={handleFetch}>
          Fetch
      </Button>
	  <br/>
	  {data}

	  <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                      {data && data.map( (ele) => {
                        <TableRow>
                            <TableCell>{ele.bitcoin.usd}</TableCell>
                            <TableCell>{}</TableCell>
                        </TableRow>
						})}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
  </>
  )
}

export default App;
