import React, { useState, useEffect } from 'react';

import Header from '../../components/Header';
import { Container, List, ListItem, Avatar, ItemFooter, ItemTitle, Modal, Dialog, DialogTitle, CloseButton, DialogAvatar, DialogAvatarSwitch, ChangeButton, StatsTable } from './styles';

import api from '../../services/api';

export default function Main() {
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [pokemon, setPokemon] = useState(null);
    const [pokemonImg, setPokemonImg] = useState(null);

    const [offset, setOffset] = useState(0);

    useEffect(() => {
        async function loadData() {
            setIsLoading(true);
            const response = await api.get(`/pokemon?offset=${offset}&limit=45`);

            if (response.data) {
                const { data } = response;

                const pokemonData = [];

                for (const item of data.results) {
                    const itemResponse = await api.get(item.url);

                    if (itemResponse.data) {
                        pokemonData.push(itemResponse.data);
                    }
                }

                setResults(results.concat(pokemonData));
                setIsLoading(false);
            }
        }
        loadData();
    }, [offset]);


    useEffect(() => {
        function handleScroll() {
            const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
            const body = document.body;
            const html = document.documentElement;
            const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
            const windowBottom = windowHeight + window.pageYOffset;

            if (windowBottom >= docHeight) {
                setOffset(results.length);
            }
        }

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [results]);

    function handleShow(item) {
        setPokemonImg(item.sprites[Object.keys(item.sprites)[0]]);
        setPokemon(item);
    }

    function handleClose() {
        setPokemon(null);
    }

    function handleNext(item) {
        const listSprites = Object.keys(item.sprites).map(key => item.sprites[key]).filter(value => value);
        const index = listSprites.indexOf(pokemonImg);

        if (index < (listSprites.length - 1)) {
            const newImg = listSprites[index + 1];

            if (newImg) {
                setPokemonImg(newImg)
            }
        }
    }

    function handleBack(item) {
        const listSprites = Object.keys(item.sprites).map(key => item.sprites[key]).filter(value => value);
        const index = listSprites.indexOf(pokemonImg);

        if (index > 0) {
            const newImg = listSprites[index - 1];

            if (newImg) {
                setPokemonImg(newImg)
            }
        }
    }

    return (
        <div>
            <Header />
            <Container>
                <List>
                    {results.map((item, index) => (
                        <ListItem key={item.name}>
                            <Avatar src={item.sprites['front_default']} onClick={() => handleShow(item)} />

                            <ItemFooter>
                                <ItemTitle>{item.name}</ItemTitle>
                            </ItemFooter>
                        </ListItem>
                    ))}
                </List>
            </Container>
            {isLoading && (
                <Modal>
                    <Dialog>
                        <DialogTitle>Carregando... </DialogTitle>
                    </Dialog>
                </Modal>
            )}
            {pokemon && (<Modal>
                <Dialog>
                    <DialogTitle>{pokemon.name}</DialogTitle>
                    <p>{pokemon.types.map(t => `${t.type.name} `)}</p>

                    <DialogAvatarSwitch>
                        <ChangeButton onClick={() => handleBack(pokemon)}>{'<'}</ChangeButton>
                        <DialogAvatar src={pokemonImg} />
                        <ChangeButton onClick={() => handleNext(pokemon)}>{'>'}</ChangeButton>
                    </DialogAvatarSwitch>

                    <StatsTable>
                        {pokemon.stats.map(st => (
                            <tr>
                                <td>{st.stat.name.replace('-', ' ')}</td>
                                <td>{st.base_stat}</td>
                            </tr>
                        ))}
                    </StatsTable>

                    <CloseButton onClick={handleClose}>Close</CloseButton>
                </Dialog>
            </Modal>)}
        </div>
    );
}
