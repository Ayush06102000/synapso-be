export interface User {
    id: Number;
    username: String;
    password: String;
}

export interface Content {
    id:Number;
    title?:String;
    link?:String;
    type:String;
    content:String;
    tag:String[];
    userId:Number;
    imageUrl?:String;
}

export interface Link {
    id:Number;
    userId:Number;
    hash:String;
}