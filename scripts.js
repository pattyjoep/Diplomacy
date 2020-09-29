var ResourcesArray = ["Blacksmith", "Farm", "Gold", "Herb", "Quarry", "Vineyard", "Wood"]

class Resource {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
        this.image = "images/" + this.name + "Icon.png";
    }
}

Storage = window.localStorage;

$(document).ready(function(){
    createResourceCards();
    goldStatus();
    getLocalStorage()
    // Click Events
        // add
        $(".add-btn").click(function(){
            var ID =  $(this).attr("id")
            var QuantityLabelID = ID + "lblQuantity"
            var QuantityLabel = document.getElementById(QuantityLabelID)

            console.log("Add" + " " + ID)
            QuantityLabel.value ++
            goldStatus()

            if (typeof(Storage) !== "undefined") {
                // Store
                localStorage.setItem(ID, QuantityLabel.value)
            } else {
                // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
              }
              //$(QuantityLabelID).attr("value", localStorage.getItem(QuantityLabel.value))
        })
        // Subtract
        $(".minus-btn").click(function(){
            var ID =  $(this).attr("id")
            var QuantityLabelID = ID + "lblQuantity"
            var QuantityLabel = document.getElementById(QuantityLabelID)
            
            console.log("Minus" + " " + ID)
            QuantityLabel.value --
            goldStatus()

            if (typeof(Storage) !== "undefined") {
                // Store
                localStorage.setItem(ID, QuantityLabel.value)
            } else {
                // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
              }
        })
        // Trade
        $(".trade-btn").click(function trade(){
            var TradeModal = $("#TradeModalBody")
            // Trades any Resource for Gold - 2 for 1 ratio
            if ($(this).attr("data-id") !== "Gold"){
                var Goldlbl = document.getElementById("GoldlblQuantity")

                var ID = $(this).attr("id")
                var QuantityLabelID = ID + "lblQuantity"
                var QuantityLabel = document.getElementById(QuantityLabelID)

                if (QuantityLabel.value < 2){
                    alert("Insufficent resources to trade")
                } else {
                        console.log("Trade" + " " + ID + " " + "For Gold")
                        Goldlbl.value ++
                        QuantityLabel.value -=2

                        if (typeof(Storage) !== "undefined") {
                            // Store
                            localStorage.setItem(ID, QuantityLabel.value)
                            localStorage.setItem(Goldlbl.getAttribute("data-id"), Goldlbl.value)
                        } else {
                            // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                          }
                    }
                goldStatus()
            }
            // Trades Gold for any Resource - 2 for 1 ratio
            else if ($(this).attr("data-id") == "Gold"){
                var ID = $(this).attr("id")
                var QuantityLabelID = ID + "lblQuantity"
                var QuantityLabel = document.getElementById(QuantityLabelID)
                
                TradeModal.empty()
                for (i = 0; i < ResourcesArray.length; i++) {
                    if ($(this).attr("data-id") !== ResourcesArray[i]){
                        var CreateResourceBtn = $("<button>")
                        CreateResourceBtn.text(ResourcesArray[i])
                        CreateResourceBtn.addClass("btn btn-outline-primary trade-modal-resource-btn")
                        CreateResourceBtn.attr("data-target", ResourcesArray[i])  
                        TradeModal.append(CreateResourceBtn)
                    }
                } 
            }
             // Modal Trade Gold For Resource
            $(".trade-modal-resource-btn").click(function modalTrade(){
                var Goldlbl = document.getElementById("GoldlblQuantity")
                var DataTarget = $(this).attr("data-target")
                var QuantityLabelID = DataTarget + "lblQuantity"
                var QuantityLabel = document.getElementById(QuantityLabelID)

                if (Goldlbl.value < 2){
                    alert("Insufficent resources to trade")
                } else {
                    console.log("Trade" + " " + ID + " " + "For" + " " + DataTarget)
                    Goldlbl.value -=2
                    QuantityLabel.value ++ 

                    if (typeof(Storage) !== "undefined") {
                        // Store
                        localStorage.setItem(Goldlbl.getAttribute("data-id"), Goldlbl.value)
                        localStorage.setItem(DataTarget, QuantityLabel.value)
                    } else {
                        // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
                      }
                }
                goldStatus();
            })
        })
        // Resets all resource quantities to 0
        $(".reset-resources-btn").click(function(){
            console.log("Reset all resource quantities to 0")
            for (i = 0; i < resources.length; i++){
                var ID = resources[i].name
                var QuantityLabelID = ID + "lblQuantity"
                var QuantityLabel = document.getElementById(QuantityLabelID)

                localStorage.setItem(ID, 0)
                QuantityLabel.value = localStorage.getItem(ID)
            }
            goldStatus();
        })
        // Runs goldStatus function when cursor / keyboard focus on Gold Label is lost
        $("#GoldlblQuantity").focusout(function(){
            goldStatus()
        })
      
        $(".resource-quantity-lbl").focusout(function(){
            var ID = $(this).attr("id")
            var QuantityLabel = document.getElementById(ID)

            var DataID = $(this).attr("data-id")

            // console.log(DataID)
            console.log(QuantityLabel.value)

            if (typeof(Storage) !== "undefined") {
                // Store
                localStorage.setItem(DataID, QuantityLabel.value)
            } else {
                // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
              }
            goldStatus()
        })


        // Runs Search function
        $("#RulesSearch").keyup(function(){
            console.log("Search")
        })
})

// Creates new instance of Resource class based on the Resources Array
function createNewResourceClassInstance(){
    for (i = 0; i < ResourcesArray.length; i++){
        return ResourcesArray.map(item => new Resource(item, 0));
    }
}

// Creates Resource Cards & Appends them to the row
let resources = createNewResourceClassInstance();
function createResourceCards() {
    console.log(resources);
    for (i = 0; i < resources.length; i++){
        // Get Elements
        Row = document.getElementById("row")
        Column = document.createElement("div")
        Column.setAttribute("class", "column")
        // Resource Image
        Img = document.createElement("img")
        Img.setAttribute("class", "thumbnail")
        Img.setAttribute("src", "images/" + resources[i].name + "Icon.png")
        //https://via.placeholder.com/250"
        //"images/" + resources[i].name + "Icon.png")
        //https://via.placeholder.com/250
        // Resource Quantity
        Input = document.createElement("input")
        Input.setAttribute("id", resources[i].name + "lblQuantity")
        Input.setAttribute("class", "resource-quantity-lbl")
        Input.setAttribute("data-id", resources[i].name)

        // Sets inital local storage items if doesnt already exist
        if (localStorage.getItem(resources[i].name) === null) {
            if (typeof(Storage) !== "undefined") {
                // Store
                localStorage.setItem(resources[i].name, resources[i].amount)
                Input.setAttribute("value", localStorage.getItem(resources[i].name))
            } else {
                // document.getElementById("result").innerHTML = "Sorry, your browser does not support Web Storage...";
            }
          }

        // Resource Label
        Header = document.createElement("h5")
        Header.setAttribute("id", resources[i].name + "Header")
        Header.innerHTML = resources[i].name
        // Btn Div
        BtnDiv = document.createElement("div")
        BtnDiv.setAttribute("class", "resource-function-btnDiv")
        // Add Button
        var iTagPlus = document.createElement("i")
        iTagPlus.setAttribute("class", "fa fa-plus")
        AddBtn = document.createElement("button")
        AddBtn.setAttribute("id", resources[i].name)
        AddBtn.setAttribute("class", "btn btn-success add-btn")
        // Subtract Button
        var iTagMinus = document.createElement("i")
        iTagMinus.setAttribute("class", "fa fa-minus")
        SubtractBtn = document.createElement("button")
        SubtractBtn.setAttribute("id", resources[i].name)
        SubtractBtn.setAttribute("class", "btn btn-danger minus-btn")
        // Trade Button
        var iTagTrade = document.createElement("i")
        iTagTrade.setAttribute("class", "fa fa-exchange")
        TradeBtn = document.createElement("button")
        TradeBtn.setAttribute("id", resources[i].name)
        TradeBtn.setAttribute("class", "btn btn-outline-primary trade-btn")
        TradeBtn.setAttribute("data-id", resources[i].name)
        //Adds data-toggle attribute to Golde trade Btn
        if (resources[i].name === "Gold"){
            TradeBtn.setAttribute("data-toggle","modal")
            TradeBtn.setAttribute("data-target","#TradeModalCenter")
        }
        // Appends
        AddBtn.append(iTagPlus)
        SubtractBtn.append(iTagMinus )
        TradeBtn.append(iTagTrade)
        BtnDiv.append(SubtractBtn, AddBtn, TradeBtn)
        Header.append(Input)
        Row.append(Column)
        Column.append(Img, Header, BtnDiv)
    }
}

function goldStatus(){
    var Label = document.getElementById("GoldlblQuantity")
    var StatusBar = document.getElementById("GoldStatusBar")
    
    StatusBar.setAttribute("style", "width: 0%")
    
    for (i = 0; i < Label.value; i++){
        StatusBar.style.width = Label.value * 1.428571428571429 + "%"
    }
    if (Label.value == 70){
        alert("YOU WIN!")
    } 
}

function getLocalStorage(){
    for (i = 0; i < resources.length; i++){
        var ID = resources[i].name
        var QuantityLabelID = ID + "lblQuantity"
        var QuantityLabel = document.getElementById(QuantityLabelID)

        QuantityLabel.value = localStorage.getItem(ID)
    }
    goldStatus();
}