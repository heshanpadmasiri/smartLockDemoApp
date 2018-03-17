export class User{

  name:string;
  access_level:string;
  img:string;
  id:string;

  constructor(_name:string,_access_level:string,_img:string,_id:string) {
    this.name = _name;
    this.access_level = _access_level;
    this.img = _img;
    this.id = _id;
  }

  
}
