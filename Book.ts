class Book {

    Title : string ;
    Author : string ;

    constructor(title : string , author : string){
        this.Title = title ;
        this.Author = author ;
    }

    getTitle () : string {

        return  `Title : ${ this.Title }`
    }

    getAuthor () : string {
        return `Author : ${ this.Author}`
    }
}

let PP  = new Book("Pride and Prejudice","Jane Austen")
let H   = new Book("Hamlet","William Shakespeare")
let WP  = new Book("War and Peace","Leo Tolstoy")

console.log(PP.Title)
console.log(PP.Author )
console.log(PP.getAuthor())
console.log(PP.getTitle())