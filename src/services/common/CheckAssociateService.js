// here parameter hishebe duita jinish newa hoyce. akta hocce queryObject r akta hocce accociatemodel
// now for example amra brand delete korte chaiteci.
// now, jokhn amra product create korcilam tokhn kintu akta field cilo BrandID
// so just brand k delete kore dilei hobe na. amader age dekhte hobe 
// j brand ta delte korte chaiteci oitar sathe kono product er relation ache kina
// jodi thake tahole delete kora jabe na. jodi na thake tahole delete kora jabe
// so akhn amra parameter hishbe AccociateModel jeta ase oita pathay dibo
// and QueryObject a pathay dibo id ta jeta product a BrandId hishebe ase.
// so aita dea $match a query korlei result ta pawa jabe

// for brand the data will be:
// let data = await ProductsModel.aggregate([{$match: BrandId:id}])
const CheckAssociateService = async (QueryObject, AssociateModel) => {
    try {

        let data = await AssociateModel.aggregate([
            { $match: QueryObject }
        ])
        // or,
        // let data = await AssociateModel.find(QueryObject)

        return data.length > 0;
        // if exists it will return true
        // then we will not delte this item

    }
    catch (error) {
        return false
    }
}
module.exports = CheckAssociateService