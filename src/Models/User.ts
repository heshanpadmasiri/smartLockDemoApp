export class User{

  name:string;
  access_level:string;
  img:string;

  constructor(_name:string,_access_level:string,_img:string) {
    this.name = _name;
    this.access_level = _access_level;
    this.img = _img;
  }

  
}
