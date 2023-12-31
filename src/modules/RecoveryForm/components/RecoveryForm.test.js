import React from "react";
import {render, screen} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import RecoveryForm from "./RecoveryForm";
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/react';
import '@testing-library/jest-dom';
import 'setimmediate';
const data={
  values:{
    email:''
  },
  touched:{
    email:''
  },
  errors:{
    email:''
  },
  handleChange:jest.fn(),
  handleBlur:jest.fn(),
  handleSubmit:jest.fn(),
  isValid:true,
  isSubmitting:false
}

describe("render RecoveryForm", ()=>{
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // Deprecated
        removeListener: jest.fn(), // Deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      }))
    });
    delete window.matchMedia
    window.matchMedia = (query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })
  });
  it('render Input', async  ()=>{
    render(
      <BrowserRouter>
       <RecoveryForm
         values={data.values}
         touched={data.touched}
         errors={data.touched}
         handleChange={data.handleChange}
         handleBlur={data.handleBlur}
         handleSubmit={data.handleBlur}
         isValid={data.isValid}
         isSubmitting={data.isSubmitting}/>
      </BrowserRouter>
    )
    expect(await screen.findByPlaceholderText('E-Mail')).toBeInTheDocument();
    expect(screen.getByText("Восстановить аккаунт")).toBeInTheDocument();
  });
  it('render link', async  ()=>{
    render(
      <BrowserRouter>
       <RecoveryForm
         values={data.values}
         touched={data.touched}
         errors={data.touched}
         handleChange={data.handleChange}
         handleBlur={data.handleBlur}
         handleSubmit={data.handleBlur}
         isValid={data.isValid}
         isSubmitting={data.isSubmitting}/>
      </BrowserRouter>
    )
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(1);

    const linkSignin = screen.getAllByRole('link')[0];
    expect(linkSignin).toHaveAttribute('href','/signin');
  });
  it('error checking', async  ()=>{
    render(
      <BrowserRouter>
       <RecoveryForm
         values={data.values}
         touched={data.touched}
         errors={data.touched}
         handleChange={data.handleChange}
         handleBlur={data.handleBlur}
         handleSubmit={data.handleBlur}
         isValid={data.isValid}
         isSubmitting={data.isSubmitting}/>
      </BrowserRouter>
    )
    expect(screen.queryByText(/Ошибка/i)).not.toBeInTheDocument();
  });
});

