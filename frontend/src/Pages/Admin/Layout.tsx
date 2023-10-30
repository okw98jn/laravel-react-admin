import React from 'react'
import { Outlet } from "react-router-dom";
import { styled } from 'styled-components';

import Header from './components/Header';

const Layout: React.FC = React.memo(() => {
    return (
        <Wrap>
            <FlexColumn>
                <Header />
                <Outlet />
            </FlexColumn>
        </Wrap>
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