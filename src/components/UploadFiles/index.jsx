import React, { useState, useEffect } from 'react';
import { Modal, Upload } from 'antd';
const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const UploadFiles = ({attachments, removeAttachment}) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState(attachments)
  useEffect(()=>{
    setFileList(attachments)
  },[attachments])
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList }) => setFileList(fileList);

  return (
    <>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        onRemove={file=>removeAttachment(file)}
      >
      </Upload>
      <Modal 
            open={previewOpen}  
            footer={null} 
            onCancel={handleCancel}>
        <img alt="example" style={{width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
UploadFiles.defaultProps = {
  attachments:[]
}
export default UploadFiles;