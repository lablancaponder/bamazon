var inquirer = require("inquirer");
var mysql = require("mysql");



var connection = mysql.createConnection ({
    host     : "localhost",
    port     : 3306,
    user     : "root",
    password : "P1@yap1aya",
    database : "bamazon"

});




connection.connect (function (err) {
   
   if (err) {
       throw err;
   };
   
//    console.log ("MySQL Connected....");


   showProducts();
   
  
});


function showProducts () {


    console.log("");
    console.log("");
    console.log("     ┌─┐┬  ┬┌─┐┬  ┌─┐┌┐ ┬  ┌─┐  ┌─┐┬─┐┌─┐┌┬┐┬ ┬┌─┐┌┬┐┌─┐");
    console.log("     ├─┤└┐┌┘├─┤│  ├─┤├┴┐│  ├┤   ├─┘├┬┘│ │ │││ ││   │ └─┐");
    console.log("     ┴ ┴ └┘ ┴ ┴┴─┘┴ ┴└─┘┴─┘└─┘  ┴  ┴└─└─┘─┴┘└─┘└─┘ ┴ └─┘");
    console.log("     ___________________________________________________");
    console.log("");
    console.log("");


    connection.query("SELECT * FROM products", function (err, results) {
    
        for (var i=0; i < results.length; i++) {


            console.log("     ID #: " + results[i].item_id + " | " + results[i].product_name + " for $" + results[i].price + " | QTY: " + results[i].stock_quantity  );
            console.log("");
            console.log("");
    
    
        }

    console.log("");
    console.log("");
        // // res.send("Products fetched...");
        // console.log ("Products fetched....");


    customerOrder();

        if (err) {
            console.log("There has been an error!");
            throw err;
        }

    });


}




function customerOrder () {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;

        


    inquirer.prompt ([ {
    
        type: "input",
        name: "productID",
        message: "Please give me the id number for the product you would like to order today"
    
    },

    {
    
        type: "input",
        name: "orderQuantity",
        message: "How many of these would you like to order?"
    
    }
    
]).then (function (answer) {

    var query = "SELECT stock_quantity, price FROM prodcuts WHERE id = ?";
    
    connection.query (query, [answer.productID], function (err, results) {

        var selectedItem;
    
            for (var i = 0; i < results.length; i++) {

                stockQuantity = results[i].stock_quantity;
                
                itemPrice = results[i].price;
            }


            if (answer.itemQuantity < stockQuantity) {

                var newInventory = stockQuantity - answer.itemQuantity;

                var item = answer.productID;

                var total = answer.itemQuantity * price;

                console.log("Inventory: " + inventory);

                newStockQuantity (newInventory, item, total);

                console.log("The total for your order is $" + total);

            } else {
                
                console.log("Unfortunately we are unable to fill your order at this time due to low inventory");
            }

            if (err) {
                
                console.log("Customer order has not been placed");
                throw err;
            }

            connection.end();

            
        });

    });

});
};

function newStockQuantity (newInventory, item, total) {

    connection.query ( "UPDATE products SET ? WHERE ?", 

        [{ 
            stock_quantity: newInventory,
            product_sales: total
        },

    
        {
           id: item
        
        }],


        function (err, results) {

            if (err) {
            
                console.log("Unable to update inventory at this time");
                throw err;
            }
                
        }
    )};2
