import ApiService from "./ApiService";

export default class GlobalServices extends ApiService {
  static async login(obj: any): Promise<any> {
    obj = { email: obj.username, password: obj.password };
    console.log(obj);

    return await this.request("POST", "login", obj);
  }

  static async dashboard(header: any): Promise<any> {
    return await this.request("GET", "Dashboard", null, header);
  }

  static async dashboard2(header: any): Promise<any> {
    return await this.request("GET", "Dashboard2", null, header);
  }

  static async addNewCompany(obj: any): Promise<any> {
    // obj = { email: obj.username, password: obj.password };
    console.log(obj);

    return await this.request("POST", "newCompany", obj);
  }

  static async signup(obj: any): Promise<any> {
    // obj = { email: obj.username, password: obj.password };
    console.log(obj);

    return await this.request("POST", "register", obj);
  }

  static async generic(
    obj: any,
    method: string,
    name: string,
    header: any
  ): Promise<any> {
    // obj = { email: obj.username, password: obj.password };
    console.log(obj, header);

    return await this.request(method, name, obj, header);
  }
}
