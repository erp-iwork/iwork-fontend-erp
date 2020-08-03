import { notification } from 'antd';

export default function(type, title, message) {
    notification[type]({
    message: title || "Error Occurred",
    description: message || "",
    placement: "topRight"
  });
}