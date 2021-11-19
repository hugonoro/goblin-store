import { render, RenderResult } from '@testing-library/react';
import { createMemoryHistory, MemoryHistory } from 'history';
import React, { ReactChild, ReactFragment, ReactPortal } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Router } from 'react-router-dom';

type RenderWithRouter = (
    renderComponent: () => React.ReactNode,
    route?: string
) => RenderResult & { history: MemoryHistory }

type RenderWithFormHook = (
    ui: React.ReactElement<any, string | React.JSXElementConstructor<any>>
) => RenderResult

declare global {
    var renderWithRouter: RenderWithRouter;
    var renderWithFormHook: RenderWithFormHook;
}

global.renderWithRouter = (renderComponent, route) => {
    const history = createMemoryHistory();
    if (route) {
        history.push(route);
    }
    return {
        ...render(
            <Router history={ history }>{ renderComponent() }</Router>
        ),
        history
    };
};

global.renderWithFormHook = (ui) => {
    const Wrapper: React.FC = ({ children }) => {
        const methods = useForm();
        return <FormProvider { ...methods }>{ children }</FormProvider>;
    };

    return {
        ...render(ui, { wrapper: Wrapper })
    };
};
