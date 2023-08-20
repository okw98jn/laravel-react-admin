import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const Loading: React.FC = React.memo(() => {
    return (
        <Dimmer active>
            <Loader size='large'>Loading</Loader>
        </Dimmer>
    )
})

export default Loading