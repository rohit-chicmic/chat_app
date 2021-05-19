import {SocketIoConfig} from 'ngx-socket-io';
import {urlShort} from '../../../environments/environment';

const token = localStorage.getItem('accessToken');
export const CONFIG: SocketIoConfig = {
  url: urlShort, options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          'Authorization': 'Bearer ' + token
        }
      }
    }
  }
};

export const CONFIG_FOR_USER: SocketIoConfig = {
  url: urlShort + 'user', options: {
    transportOptions: {
      polling: {
        extraHeaders: {
          'Authorization': 'Bearer ' + token
        }
      }
    }
  }
};
