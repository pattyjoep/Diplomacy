# DiplomacyNew

Use this site to keep track of resources while playing the board game, "Diplomacy". 

No sign up / account is needed to use this site.

Each Resource is created with a for loop through an array of the resources and is becmes a new instance of the Resource class.

The Resource class has 
    3 properties:
        1) Name
        2) Amount
        3) Image
    3 functions:
        1) Add - Increases applicable resource amount by 1
        2) Subtract - Decreases applicable resource amount by 1
        3) Trade - Displays a Modal to offer trade resources for Gold and vice versa
            Per the rules of Diplomacy, any player (during their turn) is able to trade any 2 resources for 1 Gold OR trade 2 Gold or 1 of any other resource
        4) Reset - Future Update


Future Items:
    1) Saving resource amounts to local storage - 
        So a page refresh doesn't remove the player's resource amounts
    2) The addition of a "Reset Button" which will reset all resources to 0 - 
        When the local storage update is implemented, the subtract button would have to be clicked multiple times or each input would have to be manually set to get all resources back to 0 for a new game. The "Reset" button would remidy this situation
