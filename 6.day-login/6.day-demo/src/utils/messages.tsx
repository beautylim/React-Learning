import type { MessageInstance } from "antd/es/message/interface";



const captchaSentMessage = (messageApi: MessageInstance, mobile: string) => {
  messageApi.open({
    type: 'success',
    content: `验证码已发送至 ${mobile}`,
    duration: 0
  });
  setTimeout(messageApi.destroy, 2500);
}

const loginSuccessMessage = (messageApi: MessageInstance, mobile: string) => {
  messageApi.open({
    type: 'success',
    content: `用户 ${mobile}登录成功`,
    duration: 0
  });
  setTimeout(messageApi.destroy, 2500);
}

const logoutSuccessMessage = (messageApi: MessageInstance) => {
  messageApi.open({
    type: 'success',
    content: `退出登录成功`,
    duration: 0
  });
  setTimeout(messageApi.destroy, 2500);
}

const publishSuccessMessage = (messageApi: MessageInstance) => {
  messageApi.open({
    type: 'success',
    content: `文章发布成功`,
    duration: 0
  });
  setTimeout(messageApi.destroy, 2500);
}


const updateSuccessMessage = (messageApi: MessageInstance) => {
  messageApi.open({
    type: 'success',
    content: `文章更新成功`,
    duration: 0
  });
  setTimeout(messageApi.destroy, 2500);
}



export { captchaSentMessage, loginSuccessMessage, logoutSuccessMessage, publishSuccessMessage, updateSuccessMessage }