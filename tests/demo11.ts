let message1: string = "hello";
//message1=2 error
message1= "bye";
console.log(message1);
let age1: number =20;
console.log(age1);
let isActive: boolean = false;
console.log(isActive);
let numbers1: number[]=[1,2,3];
console.log(numbers1);
let data: any="this could be anything";
data=42;
console.log(data);

function add(a:number,b:number)
{
    return a+b;
}

console.log(add(3,4));

let user: {name: string, age:number, location: string}={name: "tom",age:34,location:"delhi"};
user.location="hyderabad";
console.log(user);
