import * as React from 'react'

const RedText = (props) => {
    const text = props.message.text
    console.log('\n\n~~~~ text : ' + text);
    return (
        <span style={{ color: 'red' }}>
            {text}
        </span>
    )
}

const redTextPlugin = {
    match: 'red-text',
    component: RedText
}

if (!window.cognigyWebchatMessagePlugins) {
    window.cognigyWebchatMessagePlugins = []
}

window.cognigyWebchatMessagePlugins.push(redTextPlugin);