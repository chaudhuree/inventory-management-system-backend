const mongoose = require("mongoose");
// this function will get 4 parameters
// Request: the request object from the controller
// ParentModel: the parent model that means for purchse products it will be PurchaseModel
// ChildsModel: the child model that means for purchse products it will be PurchaseProductsModel
// JoinPropertyName: the property name that will be used to join the parent and child models which is PurchaseID in this case
const CreateParentChildsService = async (
    Request,
    ParentModel,
    ChildsModel,
    JoinPropertyName
) => {
    try {

        //!: demo data
        // {
        //     "Parent": {
        //     "SupplierID":"62ddab513f9f2b0b4967cb34",
        //     "VatTax":100,
        //     "Discount":0,
        //     "OtherCost":100,
        //     "ShippingCost":100,
        //     "GrandTotal":7000,
        //     "Note":"Note"
        // },
        //     "Childs": [
        //         {
        //             "ProductID": "5f9d88b7c9e7c00f2c4f3b1e",
        //             "Qty": 5,
        //             "UnitCost": 1000,
        //             "Total": 5000
        //         },
        //         {
        //             "ProductID": "5f9d88b7c9e7c00f2c4f3b1e",
        //             "Qty": 10,
        //             "UnitCost": 170,
        //             "Total": 1700
        //         }
        //     ]
        // }


        // First Database Process

        let Parent = Request.body["Parent"]; // PurchsesModel
        Parent.UserEmail = Request.headers["email"]; // the data from the fontend will not containt email so we will add it from the headers
        let ParentCreation = await ParentModel.create(Parent);
        console.log(ParentCreation);
        if (ParentCreation["_id"]) {
            try {
                // Second Database Process
                let Childs = Request.body["Childs"];
                await Childs.forEach((element) => {
                    element[JoinPropertyName] = ParentCreation["_id"]; // Childs.PurchaseID = ParentCreation._id
                    element["UserEmail"] = Request.headers["email"]; // Childs.UserEmail = Request.headers["email"]
                });

                let ChildsCreation = await ChildsModel.insertMany(Childs); // insertMany is used here because we have an array of childs

                return {
                    status: "success",
                    Parent: ParentCreation,
                    Childs: ChildsCreation,
                };
            } catch (error) {
                // if there is any error in the second database process we will delete the parent record from the database
                await ParentModel.deleteOne({ _id: ParentCreation["_id"] });
                return {
                    status: "fail",
                    data: `child creation failed,error: ${error}`,
                };
            }
        }
    } catch (error) {
        return { status: "fail", data: `parent creation failed,error: ${error}` };
    }
};
module.exports = CreateParentChildsService;
