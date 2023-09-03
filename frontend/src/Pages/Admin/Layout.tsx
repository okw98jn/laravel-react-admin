import React from 'react'
import { Outlet } from "react-router-dom";
import { styled } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SideBar from './components/SideBar';
import Header from './components/Header';

const theme = createTheme({
    palette: {
        primary: {
            main: '#435eb8',
        },
        info: {
            main: '#696969',
        },
    },
    typography: {
        fontFamily: [
            'Noto Sans JP',
        ].join(','),
    },
});

const Layout: React.FC = React.memo(() => {
    return (
        <ThemeProvider theme={theme}>
            <Wrap>
                <SideBar />
                <FlexColumn>
                    <Header />
                    <Outlet />
                </FlexColumn>
            </Wrap>
        </ThemeProvider>
    )
})

const Wrap = styled.div`
    background-color: #F7F7F7;
    min-height: 100vh;
    height: 100%;
    width: 100%;
    display: flex;
`

const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
`

export default Layout