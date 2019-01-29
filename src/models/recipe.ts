import {Ingredient} from "./ingredient";

export class Recipe {
constructor(private title:string,
            private description:string,
            public difficulty:string,
            public ingredients: Ingredient[]){}

}

