export class User{

  constructor(auth_key: String, auth_level: String, name: String, tt: String) {
    this.auth_key = auth_key;
    this.auth_level = auth_level;
    this.name = name;
    this.tt = tt;
  }

  auth_key:String;
    auth_level:String;
    name:String;
    tt:String;
}
