import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import CanvasRouter from './router/CanvasRouter';
import canvasReducer from './store/index';
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={canvasReducer}>
            <RouterProvider router={CanvasRouter} />
        </Provider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
