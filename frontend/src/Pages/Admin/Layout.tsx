import React from 'react'
import { Outlet } from "react-router-dom";
import { styled } from 'styled-components';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import SideBar from './components/SideBar';
import Header from './components/Header';

const theme = createTheme({
    palette: {
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
                    <div className='p-14 h-full w-3/4'>
                        <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden pb-7">
                            <Outlet />
                        </div>
                    </div>
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