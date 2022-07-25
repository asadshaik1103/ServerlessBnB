const { v4: uuidv4 } = require('uuid');
let abc = "";
let totalfood = "";
let axios = require('axios');
let orderid = uuidv4();


const dispatcher = async (event) => {
    let x = "";
    console.log(event);
    let intentName = event.currentIntent.name;
    let message = event.inputTranscript; 
    console.log(message);
    let tour = ["Fishing","City","Nature","Ocean","Historic","Beach"];
    let fooditemsarray = ['CROISSANT','PAIN AU CHOCOLAT','SOUR CREAM COFFEE CAKE','HOUSE BRIOCHE FRENCH TOAST','BREAKFAST BUTTY SANDWICH','BLUEBERRY PANCAKES','VEGAN CHIA PUDDING CUP','GREEN JUICE'];
    let hotelres = await axios.get("https://us-central1-serverless-bnb-6c350.cloudfunctions.net/getAllRoomsData");
    let rooms = hotelres.data.docsInfo;
    let elicitresponse = {
    "sessionAttributes":event.sessionAttributes,
	"dialogAction": {
        "type": "ElicitSlot",
        "intentName": '',
        "slots": {
             
        },
        "slotToElicit" : "",
        "message": {
            "contentType": "PlainText",
            "content": ""
        }
        
        }
    }
    
    let closresponse = {
        "sessionAttributes":event.sessionAttributes,
        "dialogAction": {
        "type": "Close",
        "fulfillmentState": "Fulfilled",
        "message": {
            "contentType": "PlainText",
            "content": ""
            }
        }
    }
    
    let eresponse = {
        "sessionAttributes":event.sessionAttributes,
        "dialogAction": {
        "type": "ElicitIntent",
        "message": {
            "contentType": "PlainText",
            "content": ""
            }
        }
    }
    //let appy = "new";
    //if(appy == "new")
    //{
     //   intentName = "Exceptional";
    //}
    
    console.log(intentName);
switch (intentName) {
        case "Bookinghotel":
            try{
                
               console.log(rooms);
               // response.dialogAction.fulfillmentState = "Fulfilled";
               if(message.includes("Hotel"))
               {
                elicitresponse.dialogAction.intentName = "Bookinghotel";
                elicitresponse.dialogAction.slots["HotelRoom"] = "null";
                elicitresponse.dialogAction.slotToElicit = "HotelRoom";
                elicitresponse.dialogAction.message.content = "Sure, which Hotel room you would like to book (Single Room, Deluxe, Suite)";
                abc = abc +"," + message;
               }
               else if(message.includes("deluxe") || message.includes("single room") || message.includes("suite"))
               {
                   let availability = "false";
                   for(let i=0;i<rooms.length;i++)
                   {
                       if(rooms[i].room_type == message && rooms[i].available == true)
                       {
                           console.log("entered for");
                        availability = "true";
                         abc = abc +"," + rooms[i].room_number;
                         break;
                        
                       }
                   }
                   if(availability == "false")
                   {
                    elicitresponse.dialogAction.intentName = "Bookinghotel";
                    elicitresponse.dialogAction.slots["HotelRoom"] = "null";
                    elicitresponse.dialogAction.slotToElicit = "HotelRoom";
                     elicitresponse.dialogAction.message.content = "Sorry, this room is not available.Please chose any other room(Single Room, Deluxe, Suite)";
                
                   }
                   else
                   {
                       elicitresponse.dialogAction.intentName = "Bookinghotel";
                        elicitresponse.dialogAction.slots["HotelDays"] = "null";
                        elicitresponse.dialogAction.slotToElicit = "HotelDays";
                        elicitresponse.dialogAction.message.content = "For how many nights you want to book hotel for?";
                        abc = abc +"," + message;
                       
                   }
               }
               else if(!isNaN(message))
               {
                   abc = abc +"," + message;
                   console.log("split arr: ", abc.split(','));
                   console.log("rooms: ", rooms);
                   const selectedRoom = rooms.find(roomInfo => {
                       return roomInfo.room_number == abc.split(',')[2];
                   });
                   const res = await axios.post("https://us-central1-serverless-bnb-6c350.cloudfunctions.net/bookRoomAndPublish", {
                        "userNotificationNumber": new Date().getTime() + "",
                        "email": getUsername,
                        "accessToken": getUserID,
                        "useridCognito": getUserID,
                        "useridBnb": getUserID + "-" + selectedRoom.room_number + "-" + new Date().getTime(),
                        "roomInfo": {
                            ...selectedRoom
                        }
                    });
                   console.log(abc);
                    closresponse.dialogAction.message.content = "Your booking has been confirmed for " + abc.split(',')[2] +" room for " + abc.split(',')[4] + " nights. Enjoy your stay.";
                     return closresponse;
               }
                console.log(elicitresponse);
            }catch{
                //response.dialogAction.fulfillmentState = "Failed";
                elicitresponse.dialogAction.message.content = "Sorry, no data found for provided country. Please try again with correct country name!";
            }
            break;
        case "Orderfood":
            //response.dialogAction.fulfillmentState = "Fulfilled";
            if(message.includes("food") || message.includes("Yes"))
               {
                   
                   //let fooditems = await axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/fetchFoodMenu');
                    console.log("ordering food");
                   //console.log(fooditems);
                   let fooditems = await axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/fetchFoodMenu',{"Content-Type": "application/json"});
                   let food = fooditems.data;
                    console.log(food);
                    let allitems = "";
                    for(let i=0;i<food.length;i++)
                    {
                        allitems = allitems + food[i].food_item + "    " + food[i].food_price + "$, ";
                    }
                   //for(let i=0;i<fooditems)
                elicitresponse.dialogAction.intentName = "Orderfood";
                elicitresponse.dialogAction.slots["FoodMenu"] = "null";
                elicitresponse.dialogAction.slotToElicit = "FoodMenu";
                elicitresponse.dialogAction.message.content = "Sure, what food would you like to order:\n" + allitems;
                //if()
                //abc = abc +"," + message;
               }
              if(fooditemsarray.includes(message))
              {
                  elicitresponse.dialogAction.intentName = "Orderfood";
                elicitresponse.dialogAction.slots["Quantity"] = "null";
                elicitresponse.dialogAction.slotToElicit = "Quantity";
                elicitresponse.dialogAction.message.content = "How much quantity would you like to order?";
                abc = abc +"," + message;
              }
              if(!isNaN(message))
              {
                  console.log("abc" + abc);
                 await axios.post('https://us-central1-csci5410-project-356905.cloudfunctions.net/foodOrder', {
                    "order_id": orderid,
                    "customer_id": getUsername,
                    "food_item": abc.split(",")[1],
                    "food_quantity": message
                })
                totalfood = totalfood + abc + "," + message;
                abc = "";
                 elicitresponse.dialogAction.intentName = "Orderfood";
                elicitresponse.dialogAction.slots["Opt"] = "null";
                elicitresponse.dialogAction.slotToElicit = "Opt";
                elicitresponse.dialogAction.message.content = "Would you like to order anything else?";
                //abc = abc + event.currentIntent.slots["HotelRoom"];
                console.log("totalfood" + totalfood);
              }
              if(message.includes("No"))
              {
                  let printfood = totalfood.split(",");
                  let userfood = "";
                  for(let j=1;j<printfood.length;j=j+2)
                  {
                      userfood = userfood + printfood[j] + " : " + printfood[j+1] + ", "
                  }
                  closresponse.dialogAction.message.content = "Your food order has been confirmed for following items(item : quantity): " + userfood + ".Enjoy your meal."
                     return closresponse;
              }
            break;
        case "Navigation":
 
               if(message.includes("tour"))
               {
                elicitresponse.dialogAction.intentName = "Navigation";
                elicitresponse.dialogAction.slots["Prefer"] = "null";
                elicitresponse.dialogAction.slots["NoPeople"] = "null";
                elicitresponse.dialogAction.slots["Budget"] = "null";
                elicitresponse.dialogAction.slots["TourDate"] = "null";
                elicitresponse.dialogAction.slotToElicit = "Prefer";
                elicitresponse.dialogAction.message.content = "Sure, where would you like to spend your time (Fishing,City,Nature,Ocean,Historic,Beach)?";
                //abc = abc +"," + message;
                console.log(abc);
               }
               else if(tour.includes(message))
               {
                elicitresponse.dialogAction.intentName = "Navigation";
                elicitresponse.dialogAction.slots["Prefer"] = "null";
                elicitresponse.dialogAction.slots["NoPeople"] = "null";
                elicitresponse.dialogAction.slots["Budget"] = "null";
                elicitresponse.dialogAction.slots["TourDate"] = "null";
                elicitresponse.dialogAction.slotToElicit = "NoPeople";
                elicitresponse.dialogAction.message.content = "May I know number of people for the tour package?"; 
                abc = abc +"," + message;
                console.log(abc);
               }
               else if(!isNaN(message) && message < 50)
               {
                elicitresponse.dialogAction.intentName = "Navigation";
                elicitresponse.dialogAction.slots["Prefer"] = "null";
                elicitresponse.dialogAction.slots["NoPeople"] = "null";
                elicitresponse.dialogAction.slots["Budget"] = "null";
                elicitresponse.dialogAction.slots["TourDate"] = "null";
                elicitresponse.dialogAction.slotToElicit = "Budget";
                elicitresponse.dialogAction.message.content = "May I know your budget for the tour package?";  
                abc = abc +"," + message;
                console.log(abc);
               }
               else if(!isNaN(message))
               {
                elicitresponse.dialogAction.intentName = "Navigation";
                elicitresponse.dialogAction.slots["Prefer"] = "null";
                elicitresponse.dialogAction.slots["NoPeople"] = "null";
                elicitresponse.dialogAction.slots["Budget"] = "null";
                elicitresponse.dialogAction.slots["TourDate"] = "null";
                elicitresponse.dialogAction.slotToElicit = "TourDate";
                elicitresponse.dialogAction.message.content = "When would you like your tour to start?";
                abc = abc +"," + message;
                console.log(abc);
               }
               else
               {
                   let responsearray = abc.split(",");
                   let tourdate = message;
                   let storedata = {"user": getUsername, "preference_type": responsearray[1] , "budget":parseInt(responsearray[3]), "number_of_people": parseInt(responsearray[2]) , "date": tourdate};
                   const res = await axios.post("https://us-central1-atomic-life-356321.cloudfunctions.net/recomendationModel",storedata);
                   console.log(res.data);
                   closresponse.dialogAction.message.content = "Your package is booked for " + res.data.tour + " for " + res.data.number_of_people + " people for date " + res.data.date + ".Cost of the tour will be " + res.data.cost + "$.Hope you ennjoy your tour."
                    return closresponse;
               }
            break;
        case "Guesthotel":
                   if(message.includes("available"))
                   {
                       let availablerooms = "";
                       for(let i=0;i<rooms.length;i++)
                        {
                           if(rooms[i].available == true)
                           {
                              console.log("entered for");
                             availablerooms = availablerooms + rooms[i].room_number +", ";
                           }
                        }
                        let length = availablerooms.length;
                        let finalrooms = availablerooms.substring(1,length);
                        closresponse.dialogAction.message.content = "Following rooms are available for booking: " + finalrooms + " .Please login to book rooms";
                        return closresponse;
                   }
                  break;
        case "Exceptional":
             try{
                 //console.log("entered");
                eresponse.dialogAction.message.content = "This option is not available for guest user. You can only book rooms."
                console.log(eresponse);
                return eresponse;
             }
             catch{
                 
             }
            break;
        default:
            //response.dialogAction.fulfillmentState = "Failed";
            elicitresponse.dialogAction.message.content = "Testing failed";
            break;
    }
    return elicitresponse;
};

exports.handler = async (event) => {
    return dispatcher(event);
};