import React from "react";
import {render, screen} from "@testing-library/react";
import SidebarPartner from ".";
import { formBytes } from "../../utils/helpers";
import format from "date-fns/format";
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import 'setimmediate';
const data={
  user:{
    _id:"e236d7515asdfa2acd0bbfde5972d12r",
    fullname:'user',
    email:'user@mail.ru',

    avatar:[
      {
        filename: "author childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
        size: 15248139,
        ext: "image/webp",
        _id:"e236d7515asdfa2acd0bbfde5973d12r",
       url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
    }
    ]
  },
  attachments:[
      {
          createdAt:'2023-12-02T14:12:18.220+00:00',
          filename: "attachments3childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
          size: 15248139,
          ext: "video/mp4",
          _id:"e236d7515asdfa2acd0bbfde5973d12r",
           url:"https://youtu.be/be0JV7wWdTA?list=RDbe0JV7wWdTA",
      },
      {
        createdAt:'2023-12-02T14:12:18.220+00:00',
        filename: "attachments2.mp4",
        size: 15248139,
        ext: "application/octet-stream",
        _id:"e236d7515asdfa2acd0bbfde5973d12r",
       url:"http://localhost:3003/public\file\ðð²ñð¾ð·ð°ð¿ð¾ð»ðµð½ð½ð¸ðµ-ð±ð»ð°ð½ðºð°-ð´ð¾ð³ð¾ð²ð¾ñð°-ð¿ð¾ññð°ð²ðºð¸-global-town-1701526581503.doc",
    },
    {
      createdAt:'2023-12-02T14:12:18.220+00:00',
      filename: "attachments 1childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
      size: 15248139,
      ext: "image/webp",
      _id:"e236d7515asdfa2acd0bbfde5973d12r",
     url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
  }
  ],
  sectionSelect:'photo',
  allMembers:[
    {
      _id:"e236d7515asdfa2acd0bbfde5973d12r",
      fullname:'user1',
      avatar:[
        {
          filename: "user1 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
          _id:"e236d7515asdfa2acd0bbfde5973d12r",
           url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
      } ]},
      {
        _id:"e236d7515asdfa2acd0bbfde13512r",
        fullname:'user2',
        avatar:[
          {
            filename: "user2 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
            _id:"e236d7515asdfa2acd0bbfde5973d12r",
             url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
        } ]}
  ],
  onSelectDialogThisMember:jest.fn(),
  setVisibleModalCreateDialogPartner:jest.fn(),
  visibleModalCreateDialogPartner:jest.fn(),
  onModalOk:jest.fn(),
  onSelectFiles:jest.fn(),
  onChangeTextArea:jest.fn(),
  isLoading:true,
  imAuthor:true,
  setDialogsName:jest.fn(),
  onDeletePartnerFromDialog:jest.fn(),
  messageText:'messageText',
  onSelectSection:jest.fn(),
  visibleSettingsEdit:false,
  onToogleVisibleSettingsEdit:jest.fn(),
  toggleSidebarPartner:jest.fn(),
  SidebarPartnerRedux:false,
  sendChangeDialog:jest.fn(),
  dialogsAvatar: [
    {
            filename: "dialogAvatarFileName",
            _id:"e236d7515asdfa2acd0bbfde5973d12r",
             url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
     }, 
  ],
  name:'name partner',
  avatar:[
    {
      filename: "name partner childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
      size: 15248139,
      ext: "image/webp",
      _id:"e236d7515asdfa2acd0bbfde5973d12r",
     url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
  }
  ],
  dialogsName:'dialogsName'
}

describe("render SidebarPartner", ()=>{
  it('render standart component', async  ()=>{
   render(<SidebarPartner 
      user={data.user}
      attachments={data.attachments}
      sectionSelect={data.sectionSelect}
      allMembers={[
        {
          _id:"e236d7515asdfa2acd0bbfde5973d12r",
          fullname:'user1',
          avatar:[
            {
              filename: "childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
              _id:"e236d7515asdfa2acd0bbfde5973d12r",
               url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
          } ]},
          {
            _id:"e236d7515asdfa2acd0bbfde13512r",
            fullname:'user2',
            avatar:[
              {
                filename: "childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
                _id:"e236d7515asdfa2acd0bbfde5973d12r",
                 url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
            } ]},
            {
              _id:"e2363215asdfa2acd0bbfde13512r",
              fullname:'user3',
              avatar:[
                {
                  filename: "childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
                  _id:"e236d7515asdfa2acd0bbfde5973d12r",
                   url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
              } ]}
      ]}
      onSelectDialogThisMember={data.onSelectDialogThisMember}
      setVisibleModalCreateDialogPartner={data.setVisibleModalCreateDialogPartner}
      visibleModalCreateDialogPartner={data.visibleModalCreateDialogPartner}
      onModalOk={data.onModalOk}
      onSelectFiles={data.onSelectFiles}
      onChangeTextArea={data.onChangeTextArea}
      isLoading={data.isLoading}
      imAuthor={data.imAuthor}
      setDialogsName={data.setDialogsName}
      onDeletePartnerFromDialog={data.onDeletePartnerFromDialog}
      messageText={data.messageText}
      onSelectSection={data.onSelectSection}
      visibleSettingsEdit={data.visibleSettingsEdit}
      onToogleVisibleSettingsEdit={data.onToogleVisibleSettingsEdit}
      toggleSidebarPartner={data.toggleSidebarPartner}
      SidebarPartnerRedux={data.SidebarPartnerRedux}
      sendChangeDialog={data.sendChangeDialog}
      dialogsAvatar={[]}
      name={data.name}
      avatar={data.avatar}
      dialogsName={''}
    />)
    //test render, data partner
    expect( screen.getByText(/информация о пользователе/i)).toBeInTheDocument();
    expect(await screen.findByText(data.user.email)).toBeInTheDocument();
    expect(await screen.findByText(data.user.fullname)).toBeInTheDocument();
    //test render avatar
    expect(await screen.findByAltText(data.user.avatar[0].filename)).toBeInTheDocument();
    //test render attachments item
    expect(screen.getByText(/фото/i)).toHaveClass('active');
    expect( screen.queryByText(/Участники/i)).not.toBeInTheDocument();
    expect(await screen.findByAltText(`image ${data.attachments[2]._id}`)).toBeInTheDocument();
    //test no render, setting dialog
    expect(screen.queryByRole('form', {name:'setting'})).not.toBeInTheDocument();   
  });

  it('render group component', async  ()=>{
      render(<SidebarPartner 
       user={data.user}
       attachments={data.attachments}
       sectionSelect={'members'}
       allMembers={[
        {
          _id:"e236d7515asdfa2acd0bbfde5973d12r",
          fullname:'user1',
          last_seen:'2023-12-02T14:12:18.220+00:00',
          avatar:[
            {
              filename: "user 1 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
              _id:"e236d7515asdfa2acd0bbfde5973d12r",
               url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
              } ]},
          {
            _id:"e236d7515asdfa2acd0bbfde13512r",
            fullname:'user2',
            last_seen:'2023-12-02T14:12:18.220+00:00',
            avatar:[
              {
                filename: "user 2 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
                _id:"e236d7515asdfa2acd0bbfde5973d12r",
                 url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
            } ]},
            {
              _id:"e2363215asdfa2acd0bbfde13512r",
              fullname:'user3',
              last_seen:'2023-12-02T14:12:18.220+00:00',
              avatar:[
                {
                  filename: "user 3 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
                  _id:"e236d7515asdfa2acd0bbfde5973d12r",
                   url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
              } ]}
      ]}
       onSelectDialogThisMember={data.onSelectDialogThisMember}
       setVisibleModalCreateDialogPartner={data.setVisibleModalCreateDialogPartner}
       visibleModalCreateDialogPartner={data.visibleModalCreateDialogPartner}
       onModalOk={data.onModalOk}
       onSelectFiles={data.onSelectFiles}
       onChangeTextArea={data.onChangeTextArea}
       isLoading={data.isLoading}
       imAuthor={data.imAuthor}
       setDialogsName={data.setDialogsName}
       onDeletePartnerFromDialog={data.onDeletePartnerFromDialog}
       messageText={data.messageText}
       onSelectSection={data.onSelectSection}
       visibleSettingsEdit={data.visibleSettingsEdit}
       onToogleVisibleSettingsEdit={data.onToogleVisibleSettingsEdit}
       toggleSidebarPartner={data.toggleSidebarPartner}
       SidebarPartnerRedux={data.SidebarPartnerRedux}
       sendChangeDialog={data.sendChangeDialog}
       dialogsAvatar={data.dialogsAvatar}
       name={data.name}
       avatar={data.avatar}
       dialogsName={data.dialogsName}
     />)
     //test render, data partner
     expect( screen.getByText(/информация о пользователе/i)).toBeInTheDocument();
     expect(await screen.findByText(data.name)).toBeInTheDocument();
     expect(screen.queryByText(data.user.email)).not.toBeInTheDocument();
     //test render avatar
     expect(await screen.findByAltText(data.name)).toBeInTheDocument();
     //test render members item
     expect(await screen.findByText(/Участники/i)).toHaveClass('active');
     expect(await screen.findByText(data.allMembers[0].fullname)).toBeInTheDocument();
     expect(await screen.findByText(data.allMembers[1].fullname)).toBeInTheDocument();
     expect(await screen.findByText('user3')).toBeInTheDocument();
     expect( screen.queryByText(`image ${data.attachments[2]._id}`)).not.toBeInTheDocument();

     //test no render, setting dialog
     expect(screen.queryByRole('form', {name:'setting'})).not.toBeInTheDocument();   
   });
   it('render test video element', async  ()=>{
    render(<SidebarPartner 
      user={data.user}
      attachments={data.attachments}
      sectionSelect={'video'}
      allMembers={data.allMembers}
      onSelectDialogThisMember={data.onSelectDialogThisMember}
      setVisibleModalCreateDialogPartner={data.setVisibleModalCreateDialogPartner}
      visibleModalCreateDialogPartner={data.visibleModalCreateDialogPartner}
      onModalOk={data.onModalOk}
      onSelectFiles={data.onSelectFiles}
      onChangeTextArea={data.onChangeTextArea}
      isLoading={data.isLoading}
      imAuthor={data.imAuthor}
      setDialogsName={data.setDialogsName}
      onDeletePartnerFromDialog={data.onDeletePartnerFromDialog}
      messageText={data.messageText}
      onSelectSection={data.onSelectSection}
      visibleSettingsEdit={data.visibleSettingsEdit}
      onToogleVisibleSettingsEdit={data.onToogleVisibleSettingsEdit}
      toggleSidebarPartner={data.toggleSidebarPartner}
      SidebarPartnerRedux={data.SidebarPartnerRedux}
      sendChangeDialog={data.sendChangeDialog}
      dialogsAvatar={[]}
      name={data.name}
      avatar={data.avatar}
      dialogsName={''}
    />)
    expect(screen.getByText(/Видео/i)).toHaveClass('active');
    expect(await screen.findByTestId('video')).toBeInTheDocument();
    const videoElemLength =  (await screen.findAllByTestId('video')).length
    expect(videoElemLength).toBe(1)
   });
   it('render test other element', async  ()=>{
    render(<SidebarPartner 
      user={data.user}
      attachments={data.attachments}
      sectionSelect={'other'}
      allMembers={data.allMembers}
      onSelectDialogThisMember={data.onSelectDialogThisMember}
      setVisibleModalCreateDialogPartner={data.setVisibleModalCreateDialogPartner}
      visibleModalCreateDialogPartner={data.visibleModalCreateDialogPartner}
      onModalOk={data.onModalOk}
      onSelectFiles={data.onSelectFiles}
      onChangeTextArea={data.onChangeTextArea}
      isLoading={data.isLoading}
      imAuthor={data.imAuthor}
      setDialogsName={data.setDialogsName}
      onDeletePartnerFromDialog={data.onDeletePartnerFromDialog}
      messageText={data.messageText}
      onSelectSection={data.onSelectSection}
      visibleSettingsEdit={data.visibleSettingsEdit}
      onToogleVisibleSettingsEdit={data.onToogleVisibleSettingsEdit}
      toggleSidebarPartner={data.toggleSidebarPartner}
      SidebarPartnerRedux={data.SidebarPartnerRedux}
      sendChangeDialog={data.sendChangeDialog}
      dialogsAvatar={[]}
      name={data.name}
      avatar={data.avatar}
      dialogsName={''}
    />)
    expect(screen.getByText(/прочее/i)).toHaveClass('active');
    expect( screen.getByText(data.attachments[1].filename)).toBeInTheDocument()
    expect(await screen.findByText(data.attachments[1].url.split('.')[1])).toBeInTheDocument()
    expect(await screen.findByText(formBytes(data.attachments[1].size))).toBeInTheDocument()
    expect(await screen.findByText(format(new Date(data.attachments[1].createdAt), "dd.MM.yyyy"))).toBeInTheDocument()
   });

   it('test render setting', async  ()=>{
    render(<SidebarPartner 
      user={data.user}
      attachments={data.attachments}
      sectionSelect={'members'}
      allMembers={[
       {
         _id:"e236d7515asdfa2acd0bbfde5973d12r",
         fullname:'user1',
         last_seen:'2023-12-02T14:12:18.220+00:00',
         avatar:[
           {
             filename: "user 1 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
             _id:"e236d7515asdfa2acd0bbfde5973d12r",
              url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
             } ]},
         {
           _id:"e236d7515asdfa2acd0bbfde13512r",
           fullname:'user2',
           last_seen:'2023-12-02T14:12:18.220+00:00',
           avatar:[
             {
               filename: "user 2 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
               _id:"e236d7515asdfa2acd0bbfde5973d12r",
                url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
           } ]},
           {
             _id:"e2363215asdfa2acd0bbfde13512r",
             fullname:'user3',
             last_seen:'2023-12-02T14:12:18.220+00:00',
             avatar:[
               {
                 filename: "user 3 childhood-memories ( ghibli studio ai animation tribute )-global-town-1692816345843.mp4",
                 _id:"e236d7515asdfa2acd0bbfde5973d12r",
                  url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
             } ]}
     ]}
      onSelectDialogThisMember={data.onSelectDialogThisMember}
      setVisibleModalCreateDialogPartner={data.setVisibleModalCreateDialogPartner}
      visibleModalCreateDialogPartner={data.visibleModalCreateDialogPartner}
      onModalOk={data.onModalOk}
      onSelectFiles={data.onSelectFiles}
      onChangeTextArea={data.onChangeTextArea}
      isLoading={data.isLoading}
      imAuthor={data.imAuthor}
      setDialogsName={data.setDialogsName}
      onDeletePartnerFromDialog={data.onDeletePartnerFromDialog}
      messageText={data.messageText}
      onSelectSection={data.onSelectSection}
      visibleSettingsEdit={true}
      onToogleVisibleSettingsEdit={data.onToogleVisibleSettingsEdit}
      toggleSidebarPartner={data.toggleSidebarPartner}
      SidebarPartnerRedux={data.SidebarPartnerRedux}
      sendChangeDialog={data.sendChangeDialog}
      dialogsAvatar={data.dialogsAvatar}
      name={data.name}
      avatar={data.avatar}
      dialogsName={data.dialogsName}
    />)
    
    expect( screen.getByRole('form')).toBeInTheDocument();
    const formLength =  screen.getAllByRole('form');
    expect(formLength.length).toBe(1);
    expect(await screen.findByPlaceholderText('Название группы')).toBeInTheDocument();
    expect(await screen.findByPlaceholderText('✓')).toBeInTheDocument()
   })
});

