import React, { useContext, useState, useEffect } from 'react';
import { Context } from '..';
import { Search } from 'react-bootstrap-icons';
import { Button, Container, Form, Navbar, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { fetchClients } from '../http/clientAPI';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { observer } from 'mobx-react-lite';
import CreateClient from '../components/modals/CreateClient';
import { CLIENT_ROUTE } from '../utils/consts';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const NavBar = observer(() => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const { client, user } = useContext(Context);
  const [clientVisible, setClientVisible] = useState(false);

  const navigate = useNavigate();

  const handleAddClient = async () => {
    try {
      setClientVisible(true);
      await fetchClients().then(data => {
        if (client) {
          client.setClients(data.rows)
        }
      })
    } catch (e) {
      console.log(e);

    }
  };

  const handleCloseModal = () => {
    setClientVisible(false);
  };

  const fetchData = async () => {
    const clientsData = await fetchClients();
    if (client) {
      let filteredClients = clientsData.rows.filter((client) => {
        const fullName = `${client.name} ${client.surname}`;
        return fullName.toLowerCase().includes(searchQuery.toLowerCase());
      });
      setSearchResults(filteredClients);
      setSelectedClient(null);
      client.setClients(clientsData.rows);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchQuery]);

  const handleClientClick = (clientId) => {
    setSelectedClient(clientId);
    navigate(CLIENT_ROUTE + '/' + clientId);
  };

  return (
    <Navbar className="mb-3 mt-3">
      <Container>
        {user.isAuth && (
          <Row className="w-100">
            <Col md={9}>
              <Form className="d-flex w-100" onSubmit={(e) => e.preventDefault()}>
                <Autocomplete
                  freeSolo
                  style={{ backgroundColor: '#EAF1FB', borderRadius: '50px' }}
                  options={searchResults.map((client) => `${client.name} ${client.surname}`)}
                  value={searchQuery}
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
                        }}
                      />
                    </ThemeProvider>
                  )}
                />
              </Form>
              {searchResults.length > 0 && (
                <ul className="dropdown-menu">
                  {searchResults.map((client) => (
                    <li key={client.id} onClick={() => handleClientClick(client.id)}>
                      <Button variant="link">
                        {client.name} {client.surname}
                      </Button>
                    </li>
                  ))}
                </ul>
              )}


            </Col>
            <Col md={3} className="d-flex justify-content-end">
              <Button variant="primary" onClick={handleAddClient}>
                Добавить клиента
              </Button>
              <CreateClient show={clientVisible} onHide={handleCloseModal} />
            </Col>
          </Row>
        )}
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
