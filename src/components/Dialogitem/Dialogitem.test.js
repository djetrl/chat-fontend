import React from "react";
import { render, screen} from "@testing-library/react";
import DialogItem from ".";
import { fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom'
const data = {
 _id:'e286d7515c2dfa2acd0bb1de5976d92e',
 isMe:true,
 partner:[
  {
    _id:"e236d7515asdfa2acd0bbfde5972d12r",
    fullname:'partner'
  }
 ],
 author:{
  _id:"e236d7515asdfa2acd0vrffde4932d11r",
  isOnline:true,
  fullname:'author'
 },
 currentDialogId:'e286d7515c2dfa2acd0bb1de5976d92e',
 lastMessage:{
  _id:'e236d7515as3dsaacd0bbfde5972d12rd',
  updatedAt:'2023-12-02T14:12:18.220+00:00',
  readed:false,
  undread:2,
  text:'test text',
  user:{
    _id:"e236d7515asdfa2acd0bbfde5972d12r"
  },
  attachments:[
    {
      _id:'e236d7515as3dsaacd0bbfde5972d12rd',
    },
  ]
 },
 name:'name dialog',
 avatar:[
  {
    _id:"e236d7515asdfa2acd0bbfde5973d12r",
    url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
  }],
 onCloseSidebar:jest.fn(),
 userId:"e236d7515asdfa2acd0vrffde4932d11r",
}

describe("DialogItem", ()=>{
  it('link functionality check', async  ()=>{
      render(
          <BrowserRouter>
        <DialogItem
            _id={data._id}
            isMe={data.isMe}
            partner={data.partner}
            author={data.author}
            currentDialogId={data.currentDialogId}
            lastMessage={data.lastMessage}
            name={data.name}
            avatar={data.author}
            onCloseSidebar={data.onCloseSidebar}
            userId={data.userId} />
        </BrowserRouter>)
        const link = screen.getByRole('link');
        fireEvent.click(link);
        expect(window.location.href).toBe(`http://localhost/dialog/${data._id}`);
  });
  it('render element the component', async ()=>{
    render(
      <BrowserRouter>
    <DialogItem
        _id={data._id}
        isMe={data.isMe}
        partner={data.partner}
        author={data.author}
        currentDialogId={data.currentDialogId}
        lastMessage={data.lastMessage}
        name={data.name}
        avatar={data.author}
        onCloseSidebar={data.onCloseSidebar}
        userId={data.userId} />
    </BrowserRouter>)
    //test render avatar
    expect(screen.getByRole('img')).toBeInTheDocument();
    //test render text lastMessage
    expect(screen.getByText(data.lastMessage.text)).toBeInTheDocument();
    //test render data dialog
    expect(screen.getByText('02.12.2023 21:12')).toBeInTheDocument();
    //test render name dialog
    expect(screen.getByText(data.name)).toBeInTheDocument();
  })
});


