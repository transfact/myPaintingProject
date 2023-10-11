import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
import Main from '../page/Main';
import PaintBoard from '../page/PaintBoard';
import NotFound from '../page/NotFound';

//createBrowserRouter Ver
const CanvasRouter = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [],
        errorElement: <NotFound />,
    },
    {
        path: '/paintBoard',
        element: <PaintBoard></PaintBoard>,
        children: [],
    },
]);
export default CanvasRouter;
