import React, { useEffect, useState } from 'react';
import { Box, Input, Button } from '@mui/material';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getCookie } from 'src/api/cookie';

const History = ({ cardSelected }) => {
  const [historyData, setHistoryData] = useState(null);
  const [file, setFile] = useState(null);
  const access = getCookie('access');

  useEffect(() => {
    const fetchData = async () => {
      if (cardSelected) {
        try {
          const response = await axios.get(`/api/history/admin/${cardSelected}/`, {
            headers: {
              Authorization: `Bearer ${access}`,
              'Content-Type': 'multipart/form-data',

            },
          });
          setHistoryData(response.data);
          console.log(response.data);
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [cardSelected, access]);

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append('file', file || '');

    try {
      const response = await axios.post(`/api/history/admin/${cardSelected}/`, formData, {
        headers: {
          Authorization: `Bearer ${access}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setHistoryData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        padding: '0 16px',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '900px',
          padding: 3,
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          marginTop: 3,
        }}
      >
        <div className="bg-gray-200 w-full text-white rounded-t-3xl p-6 text-center mb-8">
          <h1 className="text-5xl font-bold text-gray-700">سوپیشینه</h1>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <form className="w-full">
            <Box
              sx={{
                padding: '20px',
                border: '1px solid #ccc',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                marginBottom: '16px',
              }}
            >
              {/* <div style={{ display: 'flex' }}>
                <Switch checked={file.Lock_file}/>
              </div> */}

              <Box sx={{ marginBottom: '16px' }}>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  sx={{
                    borderRadius: '8px',
                    width: '100%',
                    color: '#424242',
                    '&:focus': {
                      outline: 'none',
                      borderColor: '#3f51b5',
                      boxShadow: '0 0 4px rgba(63, 81, 181, 0.5)',
                    },
                  }}
                />
              </Box>
              {historyData && historyData.file && (
                <Box sx={{ marginTop: '16px', textAlign: 'center' }}>
                  <a
                    href={historyData.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#3f51b5',
                      textDecoration: 'underline',
                    }}
                  >
                    مشاهده فایل سابقه
                  </a>
                </Box>
              )}
            </Box>
            <Button
              onClick={handleFileUpload}
              fullWidth
              variant="contained"
              color="primary"
              sx={{ marginTop: 2 }}
            >
              ارسال
            </Button>
          </form>
        </div>
      </Box>
    </div>
  );
};

History.propTypes = {
  cardSelected: PropTypes.string.isRequired,
};

export default History;
