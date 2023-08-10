

export default (attachments) => {

  if (!attachments) {
    return null;
  }
  let file;
if(attachments[0] && attachments[0].url){
    file = attachments[0].url.substring(attachments[0].url.lastIndexOf('.') + 1);

}
  return attachments.length && (file == "jpg" || file === "jpeg" || file === "png" || file === "gif" || file === "bmp"  );
};