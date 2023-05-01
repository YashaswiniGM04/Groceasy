
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"

import { getDatabase, ref, push, onValue,remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"


const appSettings = {
    databaseURL: "https://groceasy-951aa-default-rtdb.asia-southeast1.firebasedatabase.app/" //database reference URL
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "shopItems") // shopItems is the name of the reference 


const inputField = document.getElementById("input-txt")
const cartBtn = document.getElementById("cart-btn")
const shoppingList = document.getElementById("shoppingList")



onValue(itemsInDB, function (snapshot) { // itemsInDB is the ref name
    //snapshot is an object, convert that to array
    clearShoppingListEl()
    let cartItems = Object.entries(snapshot.val()) //array
    for (let i = 0; i < cartItems.length; i++) {
        let idKeypair = cartItems[i]
        appendShoppingListEl(idKeypair) // it has both id and value
    }

    
}) 

cartBtn.addEventListener("click", function () {

    let input = inputField.value
    push(itemsInDB, input) // itemsInDB is the reference 
    // appendShoppingListEl(input)
    clearInputFieldEl()
})

function clearShoppingListEl(){
    shoppingList.innerHTML=""
}

function clearInputFieldEl() {
    inputField.value = null
}

function appendShoppingListEl(input) {
    
    let listItem = document.createElement("li")
    listItem.textContent=input[1]
    shoppingList.append(listItem)

    
listItem.addEventListener("click",function(){
    let itemPathInDB = ref(database,`shopItems/${input[0]}`)
    remove(itemPathInDB)
})

}







