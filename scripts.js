var ResourcesArray = ["Blacksmith", "Farm", "Gold", "Herb", "Quarry", "Vineyard", "Wood"]

class Resource {
    constructor(name, amount) {
        this.name = name;
        this.amount = amount;
        this.image = "images/" + this.name + "Icon.png";
    }
}

$(document).ready(function(){
    createResourceCards();
    goldStatus();
    // Click Events
        // add
        $(".add-btn").click(function(){
            var ID =  $(this).attr("id")
            var QuantityLabelID = ID + "lblQuantity"
            var QuantityLabel = document.getElementById(QuantityLabelID)

            console.log("add")
            QuantityLabel.value ++
            goldStatus()
        })
        // Subtract
        $(".minus-btn").click(function(){
            var ID =  $(this).attr("id")
            var QuantityLabelID = ID + "lblQuantity"
            var QuantityLabel = document.getElementById(QuantityLabelID)
            
            console.log("minus")
            QuantityLabel.value --
            goldStatus()
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
                }
                    else {
                        Goldlbl.value ++
                        QuantityLabel.value -=2
                        console.log("Trade Resource For Gold")
                    }
                goldStatus()
            }
            // Trades Gold for any Resource - 2 for 1 ratio
            else if ($(this).attr("data-id") == "Gold"){
                var ID = $(this).attr("id")
                var QuantityLabelID = ID + "lblQuantity"
                var QuantityLabel = document.getElementById(QuantityLabelID)
                console.log("Trade Gold For Resource")
                
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
                var DataTarget = $(this).attr("Data-Target")
                var QuantityLabelID = DataTarget + "lblQuantity"
                var QuantityLabel = document.getElementById(QuantityLabelID)

                if (Goldlbl.value < 2){
                    alert("Insufficent resources to trade")
                }
                else {
                    Goldlbl.value -=2
                    QuantityLabel.value ++ 
                }
            })
        })
        // Resets all resource quantities to 0
        $(".reset-resources-btn").click(function(){
            console.log("Test")
            for (i = 0; i < resources.length; i++){
                resources[i].amount = 0
                window.location.reload()
            }
        })

        // Runs goldStatus function when cursor / keyboard focus on Gold Label is lost
        $("#GoldlblQuantity").focusout(function(){
            goldStatus()
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
        //Img.setAttribute("src", "images/" + resources[i].name + "Icon.png")
        // Resource Quantity
        Input = document.createElement("input")
        Input.setAttribute("id", resources[i].name + "lblQuantity")
        Input.setAttribute("class", "resource-quantity-lbl")
        Input.setAttribute("data-id", resources[i].name)
        Input.setAttribute("value", resources[i].amount)
        // Resource Label
        Header = document.createElement("h5")
        Header.setAttribute("id", resources[i].name + "Header")
        Header.innerHTML = resources[i].name
        // Add Button
        AddBtn = document.createElement("button")
        AddBtn.setAttribute("id", resources[i].name)
        AddBtn.setAttribute("class", "btn btn-success add-btn")
        AddBtn.innerText = "+"
        // Subtract Button
        SubtractBtn = document.createElement("button")
        SubtractBtn.setAttribute("id", resources[i].name)
        SubtractBtn.setAttribute("class", "btn btn-danger minus-btn")
        SubtractBtn.innerText = "-"
        // Trade Button
        TradeBtn = document.createElement("button")
        TradeBtn.setAttribute("id", resources[i].name)
        TradeBtn.setAttribute("class", "btn btn-outline-primary trade-btn")
        TradeBtn.setAttribute("data-id", resources[i].name)
        TradeBtn.innerText = "Trade"
        if (resources[i].name === "Gold"){
            TradeBtn.setAttribute("data-toggle","modal")
            TradeBtn.setAttribute("data-target","#TradeModalCenter")
        }
        // Appends
        Header.append(Input)
        Row.append(Column)
        Column.append(Img, Header, SubtractBtn, AddBtn, TradeBtn)
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
    else {

    }
    
    // if (Label.value == 35){
    //     //StatusBar.classList.add("gold-progress-bar-half")
    //     StatusBar.style.width = "50%"
    // }
    // else if (Label.value == 70) {
    //     StatusBar.classList.add("gold-progress-bar-complete")
    // }
}
   
function localStorage() {

}