 export const calcAge = (birthdate:string) :number =>  {
        const yearOfBirth = new Date(birthdate).getFullYear();
        const currentYear = new Date().getFullYear();
        return currentYear - yearOfBirth;
 }


 export const ShowAge=(age:number) :string =>{


switch (age)
{case 0: return ` He is less than a year old`;
case 1: return ` He is a year old`;
default: return ` He is ${age} years old`;}


 }

