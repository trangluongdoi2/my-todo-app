import Api from "@/api";
import { API_URL } from "@/api/url";

const URL = {
  LOGIN: `${API_URL}/api/auth/login`,
  REGISTER: `${API_URL}/api/auth/register`,
};

class AuthApi extends Api {
  async login(input: any) {
    const res = await this.post(URL.LOGIN, input);
    return res; 
  }

  async register(input: any) {
    const res = await this.post(URL.REGISTER, input);
    return res;
  }
}

export default new AuthApi();