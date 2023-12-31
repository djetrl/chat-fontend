import React from "react";
import { render, screen} from "@testing-library/react";
import Avatar from './index'
import '@testing-library/jest-dom'
const user = {
    _id:"f32fdsf2dwaxvqesafwsaf12d",
    avatar:[
    {
      url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
    }],
    fullname:'name'  
}
const userNoImage = {
  _id:"f32fdsf2dwaxvqesafwsaf12d",
  fullname:'name' ,
  avatar:[] 
}
describe("render Avatar", ()=>{
  it('render image avatar', async ()=>{
    render(<Avatar user={user} />)
    expect(screen.getByAltText(`Avatar ${user.fullname}`)).toBeInTheDocument()
  });
  it('render standard no image avatar',  ()=>{
    render(<Avatar user={userNoImage}/>);
    expect(screen.getByText(`${userNoImage.fullname.split('')[0].toUpperCase()}`)).toBeInTheDocument();

  });
});

