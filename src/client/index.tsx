import App from '../shared/App'
import React from 'react'
import ReactDOM from 'react-dom'

console.log(document.getElementById('root'))

ReactDOM.hydrate(<App></App>, document.getElementById('root'));