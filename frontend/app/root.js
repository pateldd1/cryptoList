import React from 'react'
import { Provider } from 'react-redux'
import MainRoutes from './routes'

const Root = ({ store }) => (
    <Provider store={store}>
        <MainRoutes />
    </Provider>
);

export default Root
