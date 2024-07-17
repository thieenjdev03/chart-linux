import React, { useEffect, useState } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '23593512302-6sdb4307m1j9c1d2j8v3eg1e9g7lqrpe.apps.googleusercontent.com';
const API_KEY = 'AIzaSyCEELEyeZoYneQGZimLSs8NLEHhsjEuIxI';
const SPREADSHEET_ID = '11qCDaSQSC4ifh3I5bPU7iiu549xk9E7mLLdeR1SWmtc';
const SCOPE = 'https://www.googleapis.com/auth/spreadsheets.readonly';

const GoogleSheetsApi = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
        scope: SCOPE,
      }).then(() => {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen((isSignedIn) => {
          if (isSignedIn) {
            loadSheetData();
          } else {
            // Handle sign-out here if needed.
          }
        });

        // Handle initial sign-in state.
        if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
          gapi.auth2.getAuthInstance().signIn();
        } else {
          loadSheetData();
        }
      }).catch((error) => {
        console.error('Error initializing Google Sheets API:', error);
        setError('Error initializing Google Sheets API: ' + error.message);
      });
    };

    gapi.load('client:auth2', initClient);
  }, []);

  const loadSheetData = () => {
    gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: 'CrawData!A1:F56',
      }).then(response => {
        const data = response.result.values;
        if (data) {
          setData(data);
        } else {
          setError('Không tìm thấy dữ liệu trong Google Sheets');
        }
      }).catch(error => {
        setError('Lỗi khi truy xuất dữ liệu từ Google Sheets: ' + error.message);
      });
      
  };
  const convertToJSONAndStore = (data, storageKey) => {
    const headers = data[0];
    const result = [];

    for (let i = 1; i < data.length; i++) {
      const obj = {};
      for (let j = 0; j < headers.length; j++) {
        obj[headers[j]] = data[i][j];
      }
      result.push(obj);
    }

    const jsonData = JSON.stringify(result, null, 2);
    localStorage.setItem(storageKey, jsonData);
    return jsonData;
  };
  useEffect(() =>{ 
    localStorage.setItem('storageKey', convertToJSONAndStore(data, 'storageKey'));
  })
  return (
    <div className='hidden'>
      <h1>Google Sheets Data</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <button onClick={loadSheetData}>Load Data</button>
      <ul>
        {data.map((row, index) => (
          <li key={index}>{row.join(', ')}</li>
        ))}
      </ul>
    </div>
  );
};

export default GoogleSheetsApi;
