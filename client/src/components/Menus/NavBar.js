import React, { useContext, useState, useEffect } from 'react';
import { Context } from '../..';
import { Search } from 'react-bootstrap-icons';
import { Button, Container, Form, Navbar, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { searchAll } from '../../http/searchAPI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import CreateClient from '../modals/CreateClient';
import { CLIENT_ROUTE } from '../../utils/consts';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { v4 as uuidv4 } from 'uuid';

const NavBar = observer(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { client, ship } = useContext(Context);
  const [clientVisible, setClientVisible] = useState(false);

  const navigate = useNavigate();

  const handleAddClient = async () => {
    try {
      setClientVisible(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleCloseModal = () => {
    setClientVisible(false);
  };

  const fetchData = async () => {
    try {
      const searchData = await searchAll(searchQuery);
      const resultsWithTableName = searchData.map(item => {
        if (item.tableName === 'Client') {
          return { ...item, label: `${item.surname} ${item.name} ${item.fathersName}` };
        } else if (item.tableName === 'Ship') {
          return { ...item, label: `${item.name} ${item.number} место:${item.parkingNumber}` };
        }
        return item;
      });
      setSearchResults(resultsWithTableName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleItemClick = (itemId, tableName) => {
    if (tableName === 'Client') {
      navigate(CLIENT_ROUTE + '/' + itemId);
    }
  };

  return (
    <Navbar className="mb-3 mt-3">
      <Container>
        <Row className="w-100">
          <Col md={9}>
            <Form className="d-flex w-100" onSubmit={(e) => e.preventDefault()}>
              <Autocomplete
                freeSolo
                style={{ backgroundColor: '#EAF1FB', borderRadius: '50px' }}
                options={searchResults.map((item) => ({
                  label: item.label,
                  value: item,
                  key: uuidv4(),
                  id: item.id
                }))}
                getOptionLabel={(option) => option.label}
                value={null}
                onChange={(event, value) => {
                  if (value && value.id && value.tableName) {
                    handleItemClick(value.id, value.tableName);
                  }
                }}
                
                onInputChange={(e, value) => setSearchQuery(value)}
                renderInput={(params) => (
                  <ThemeProvider theme={theme}>
                    <TextField
                      {...params}
                      label=""
                      InputLabelProps={{
                        shrink: true,
                        style: { display: 'none' },
                      }}
                      placeholder="Найти клиента, судно"
                      style={{
                        width: '40vw',
                        backgroundColor: '#EAF1FB',
                        borderRadius: '50px',
                        border: 'none',
                      }}
                      InputProps={{
                        ...params.InputProps,
                        startAdornment: (
                          <>
                            <Search style={{ marginRight: '0.5rem' }} />
                            {params.InputProps.startAdornment}
                          </>
                        ),
                        classes: {
                          notchedOutline: 'no-border',
                        },
                        onClick: (event) => {
                          if (params.inputProps.value) {
                            event.stopPropagation();
                          }
                        },
                      }}
                    />
                  </ThemeProvider>
                )}
              />
            </Form>
          </Col>
          <Col md={3} className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleAddClient}>
              Добавить клиента
            </Button>
            <CreateClient show={clientVisible} onHide={handleCloseModal} />
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
});

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          border: 'none',
          '& .no-border': {
            border: 'none',
          },
        },
      },
    },
  },
});

export default NavBar;
