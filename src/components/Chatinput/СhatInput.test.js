import React from "react";
import { render, screen} from "@testing-library/react";
import Chatinput from './index'
import '@testing-library/jest-dom'
const data = {
    value:"test text",
    setValue: jest.fn(),
    emojiPickerVisible:false,
    toggleEmojiPicker: jest.fn(),
    addEmoji:jest.fn(),
    handleSendMessage:jest.fn(),
    sendMessage:jest.fn(),
    onSelectFiles:jest.fn(),
    attachments:[
      {
        _id:"f32fdsf2dwaxvqesafwsaf12d",
        url:"https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG98ZW58MHx8MHx8fDA%3D",
      }
    ],
    isRecording:"",
    onRecord:jest.fn(),
    onHideRecording:jest.fn(),
    isLoading:false,
    removeAttachment:jest.fn(),
    theme:"dark",
    embeddedMessage:[],
    removeEmbeddedMessage:jest.fn()
}

describe("render Chatinput", ()=>{
  it('render input', async  ()=>{
    render(<Chatinput 
      value={data.value}
      setValue={data.setValue}
      emojiPickerVisible={data.emojiPickerVisible}
      toggleEmojiPicker={data.toggleEmojiPicker}
      addEmoji={data.addEmoji}
      handleSendMessage={data.handleSendMessage}
      sendMessage={data.sendMessage}
      onSelectFiles={data.onSelectFiles}
      attachments={data.attachments}
      isRecording={data.isRecording}
      onRecord={data.onRecord}
      onHideRecording={data.onHideRecording}
      isLoading={data.isLoading}
      removeAttachment={data.removeAttachment}
      theme={data.theme}
      embeddedMessage={data.embeddedMessage}
      removeEmbeddedMessage={data.removeEmbeddedMessage}
    />)
   await expect(screen.getByRole('textbox',{value:"test text"})).toBeInTheDocument();

  });
  it('test render btns',   ()=>{
      render(<Chatinput 
      value={data.value}
      setValue={data.setValue}
      emojiPickerVisible={data.emojiPickerVisible}
      toggleEmojiPicker={data.toggleEmojiPicker}
      addEmoji={data.addEmoji}
      handleSendMessage={data.handleSendMessage}
      sendMessage={data.sendMessage}
      onSelectFiles={data.onSelectFiles}
      attachments={data.attachments}
      isRecording={data.isRecording}
      onRecord={data.onRecord}
      onHideRecording={data.onHideRecording}
      isLoading={data.isLoading}
      removeAttachment={data.removeAttachment}
      theme={data.theme}
      embeddedMessage={data.embeddedMessage}
      removeEmbeddedMessage={data.removeEmbeddedMessage}
    />)
    expect(screen.getByRole('button',{name:'file'})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'smile'})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'check-circle'})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'delete'})).toBeInTheDocument();
    expect(screen.getByRole('button',{name:'smile'})).toBeInTheDocument();
  });
});


